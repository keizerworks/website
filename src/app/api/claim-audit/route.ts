import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { RateLimiterMemory } from "rate-limiter-flexible";

const PlatformLinkSchema = z.object({
  id: z.string(),
  url: z.string(),
});

const AuditFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  auditType: z.enum(["social", "website", "both"]),
  platformLinks: z.array(PlatformLinkSchema).optional(),
  websiteUrl: z.string().optional(),
  mainGoal: z.string().min(1, "Please select your main goal"),
  note: z.string().optional(),
  plan: z.enum(["standard", "priority"]),
  _timestamp: z.number().optional(),
});

const MIN_SUBMIT_TIME_MS = 3000; // Minimum 3 seconds to fill form

const rateLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60,
});

export async function POST(request: Request) {
  try {
    await rateLimiter.consume(
      request.headers.get("x-forwarded-for") || "unknown"
    );

    const body = await request.json();
    const result = AuditFormSchema.safeParse(body);

    if (!result.success) {
      const errorMessages = result.error.errors.map((error) => error.message);
      return NextResponse.json({ errors: errorMessages }, { status: 400 });
    }

    const {
      name,
      email,
      auditType,
      platformLinks,
      websiteUrl,
      mainGoal,
      note,
      plan,
      _timestamp,
    } = result.data;

    
    // Spam check 2: Time-based - if submitted too fast, it's a bot
    if (_timestamp) {
      const timeTaken = Date.now() - _timestamp;
      if (timeTaken < MIN_SUBMIT_TIME_MS) {
        return NextResponse.json(
          { error: "Please take your time filling the form" },
          { status: 400 }
        );
      }
    }

    const goalLabels: Record<string, string> = {
      brand: "Build personal brand",
      clients: "Attract clients",
      followers: "Grow followers",
      engagement: "Increase engagement",
    };

    const planLabel = plan === "priority" ? "Priority ($5)" : "Standard ($1)";

    // Try to send email, but don't fail if it doesn't work
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      const auditTypeLabel = auditType === "both" ? "Social + Website" : auditType === "website" ? "Website" : "Social Media";

      const platformLabels: Record<string, string> = {
        linkedin: "LinkedIn",
        twitter: "Twitter/X",
        instagram: "Instagram",
        youtube: "YouTube",
        reddit: "Reddit",
      };

      const platformLinksText = platformLinks && platformLinks.length > 0
        ? platformLinks.map(p => `${platformLabels[p.id] || p.id}: ${p.url}`).join("\n")
        : "";

      const platformLinksHtml = platformLinks && platformLinks.length > 0
        ? platformLinks.map(p => `<p><strong>${platformLabels[p.id] || p.id}:</strong> <a href="${p.url}">${p.url}</a></p>`).join("")
        : "";

      await transporter.sendMail({
        from: `"Audit Request" <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        replyTo: email,
        subject: `[${planLabel}] ${auditTypeLabel} Audit Request from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Plan: ${planLabel}
          Audit Type: ${auditTypeLabel}
          ${platformLinksText ? `Social Profiles:\n${platformLinksText}` : ""}
          ${websiteUrl ? `Website: ${websiteUrl}` : ""}
          Main Goal: ${goalLabels[mainGoal] || mainGoal}
          ${note ? `Note: ${note}` : ""}
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1>New ${auditTypeLabel} Audit Request</h1>
            <div style="background: ${plan === "priority" ? "#3d6bbc" : "#000"}; color: white; padding: 8px 16px; border-radius: 4px; display: inline-block; margin-bottom: 16px;">
              ${planLabel}
            </div>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Audit Type:</strong> ${auditTypeLabel}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            ${platformLinksHtml ? `<p><strong>Social Profiles:</strong></p>${platformLinksHtml}` : ""}
            ${websiteUrl ? `<p><strong>Website:</strong> <a href="${websiteUrl}">${websiteUrl}</a></p>` : ""}
            <p><strong>Main Goal:</strong> ${goalLabels[mainGoal] || mainGoal}</p>
            ${note ? `<p><strong>Note:</strong> ${note}</p>` : ""}
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email sending failed (continuing anyway):", emailError);
    }

    return NextResponse.json(
      { message: "Audit request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "RateLimiterError") {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    console.error("Failed to process audit request:", error);
    return NextResponse.json(
      { error: "Failed to submit audit request" },
      { status: 500 }
    );
  }
}
