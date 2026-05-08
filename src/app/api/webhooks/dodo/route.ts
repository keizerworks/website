import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

// Verify webhook signature from Dodo
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("x-dodo-signature") || "";
    const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_KEY;

    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      const isValid = verifySignature(payload, signature, webhookSecret);
      if (!isValid) {
        console.error("Invalid webhook signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(payload);
    console.log("Dodo webhook event:", event.type);

    // Handle payment success
    if (event.type === "payment.succeeded" || event.type === "payment_intent.succeeded") {
      const payment = event.data;
      const metadata = payment.metadata || {};
      const customer = payment.customer || {};

      const goalLabels: Record<string, string> = {
        brand: "Build personal brand",
        clients: "Attract clients",
        followers: "Grow followers",
        engagement: "Increase engagement",
      };

      const planLabel = metadata.plan === "priority" ? "Priority ($5)" : "Standard ($1)";

      // Send notification email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Social Audit - PAID" <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        replyTo: customer.email,
        subject: `[PAID - ${planLabel}] Social Audit from ${customer.name || "Customer"}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #22c55e; color: white; padding: 12px 20px; border-radius: 8px; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 18px;">Payment Received - ${planLabel}</h1>
            </div>

            <h2>Customer Details</h2>
            <p><strong>Name:</strong> ${customer.name || "Not provided"}</p>
            <p><strong>Email:</strong> ${customer.email || "Not provided"}</p>
            <p><strong>Response Preference:</strong> ${metadata.responsePreference === "discord" ? "Discord" : "Email"}</p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

            <h2>Audit Details</h2>
            <p><strong>Platforms:</strong> ${metadata.platforms || "Not specified"}</p>
            <p><strong>Main Goal:</strong> ${goalLabels[metadata.goal] || metadata.goal || "Not specified"}</p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

            <p style="color: #666; font-size: 14px;">
              Payment ID: ${payment.id || "N/A"}<br/>
              Amount: ${payment.amount ? `$${(payment.amount / 100).toFixed(2)}` : planLabel}
            </p>
          </div>
        `,
      });

      console.log("Audit notification email sent");
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
