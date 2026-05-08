import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { RateLimiterMemory } from "rate-limiter-flexible";

const AuditFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  socialLinks: z.string().trim().min(10, "Please provide your social links"),
  mainGoal: z.string().min(1, "Please select your main goal"),
  focusArea: z.string().optional(),
  struggles: z.string().optional(),
  responsePreference: z.enum(["email", "discord"]),
  plan: z.enum(["standard", "priority"]),
  website: z.string().optional(), // Honeypot field
  _timestamp: z.number().optional(), // Form load timestamp
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
      platforms,
      socialLinks,
      mainGoal,
      focusArea,
      struggles,
      responsePreference,
      plan,
      website,
      _timestamp,
    } = result.data;

    // Spam check 1: Honeypot - if filled, it's a bot
    if (website && website.length > 0) {
      return NextResponse.json(
        { message: "Audit request submitted successfully" },
        { status: 200 }
      );
    }

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

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Social Audit Request" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      replyTo: email,
      subject: `[${planLabel}] Social Audit Request from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Plan: ${planLabel}
        Response Preference: ${responsePreference}

        Platforms: ${platforms.join(", ")}

        Social Links:
        ${socialLinks}

        Main Goal: ${goalLabels[mainGoal] || mainGoal}

        Focus Area: ${focusArea || "Not specified"}

        Struggles: ${struggles || "Not specified"}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>New Social Audit Request</h1>
          <div style="background: ${plan === "priority" ? "#3d6bbc" : "#000"}; color: white; padding: 8px 16px; border-radius: 4px; display: inline-block; margin-bottom: 16px;">
            ${planLabel}
          </div>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Response Preference:</strong> ${responsePreference === "discord" ? "Discord" : "Email"}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Platforms:</strong> ${platforms.join(", ")}</p>
          <p><strong>Social Links:</strong></p>
          <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px;">${socialLinks}</pre>
          <p><strong>Main Goal:</strong> ${goalLabels[mainGoal] || mainGoal}</p>
          <p><strong>Focus Area:</strong> ${focusArea || "Not specified"}</p>
          <p><strong>Struggles:</strong> ${struggles || "Not specified"}</p>
        </div>
      `,
    });

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
