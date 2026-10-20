import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { z } from "zod";

// Careers applications, sent straight to the studio inbox with the resume
// attached. No database: the email is the record.
//
// Spam protection, in order:
// 1. Rate limit: 3 applications per IP per 10 minutes.
// 2. Honeypot: a hidden "website" field people never see; bots fill it.
// 3. Timing: a real person takes more than 5 seconds to fill the form.
// 4. Validation: required fields, real links, a capped pitch length.
// 5. Resume: a real PDF (checked by its first bytes), 4 MB at most.

const MIN_FILL_MS = 5_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const ROLES = ["sales"] as const;

const rateLimiter = new RateLimiterMemory({ points: 3, duration: 600 });

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .refine((value) => value === "" || /^https?:\/\/\S+$/.test(value), {
    message: "Links must start with http:// or https://",
  });

const Application = z.object({
  role: z.enum(ROLES, { message: "Pick a role" }),
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(200),
  profile: optionalUrl.refine((value) => value !== "", {
    message: "Add your LinkedIn or X profile",
  }),
  github: optionalUrl,
  school: z.string().trim().max(200),
  pitch: z
    .string()
    .trim()
    .min(30, "Tell us a bit more in your pitch")
    .max(3000, "Keep your pitch under 3,000 characters"),
});

const roleNames: Record<(typeof ROLES)[number], string> = {
  sales: "Sales Intern",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const text = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
};

const error = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status });

// What a bot gets: looks like it worked, so it doesn't try again.
const fakeSuccess = () => NextResponse.json({ ok: true });

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  try {
    await rateLimiter.consume(ip);
  } catch {
    return error("Too many applications. Please try again later.", 429);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return error("Something went wrong. Please try again.");
  }

  if (text(form, "website") !== "") return fakeSuccess();

  const startedAt = Number(text(form, "_timestamp"));
  const age = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || age < MIN_FILL_MS) return fakeSuccess();
  if (age > MAX_FORM_AGE_MS) {
    return error("This form has expired. Refresh the page and try again.");
  }

  const parsed = Application.safeParse({
    role: text(form, "preferred_role"),
    name: text(form, "name"),
    email: text(form, "email"),
    profile: text(form, "linkedin_twitter_profile"),
    github: text(form, "github_profile"),
    school: text(form, "current_school"),
    pitch: text(form, "pitch"),
  });
  if (!parsed.success) return error(parsed.error.errors[0].message);
  const application = parsed.data;

  const resume = form.get("resume");
  if (!(resume instanceof File) || resume.size === 0) {
    return error("Upload your resume as a PDF");
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return error("Your resume must be 4 MB or smaller");
  }
  const bytes = Buffer.from(await resume.arrayBuffer());
  if (bytes.subarray(0, 5).toString("latin1") !== "%PDF-") {
    return error("Your resume must be a PDF");
  }

  const role = roleNames[application.role];
  const rows: [string, string][] = [
    ["Role", role],
    ["Name", application.name],
    ["Email", application.email],
    ["LinkedIn / X", application.profile],
    ["GitHub", application.github || "Not given"],
    ["School", application.school || "Not given"],
  ];
  const safeName = application.name.replace(/[^a-zA-Z0-9]+/g, "-");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Keizer Careers" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      replyTo: application.email,
      subject: `${role} application: ${application.name}`,
      text: [
        ...rows.map(([label, value]) => `${label}: ${value}`),
        "",
        "Pitch:",
        application.pitch,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>${escapeHtml(role)} application</h2>
          ${rows
            .map(
              ([label, value]) =>
                `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`,
            )
            .join("")}
          <p><strong>Pitch:</strong></p>
          <blockquote style="white-space: pre-wrap;">${escapeHtml(application.pitch)}</blockquote>
          <p>Resume attached. Reply to this email to answer the applicant.</p>
        </div>
      `,
      attachments: [
        {
          filename: `${safeName}-resume.pdf`,
          content: bytes,
          contentType: "application/pdf",
        },
      ],
    });
  } catch (sendError) {
    console.error("Failed to send careers application:", sendError);
    return error(
      "We couldn't send your application. Please email biz@keizerworks.com instead.",
      500,
    );
  }

  return NextResponse.json({ ok: true });
}
