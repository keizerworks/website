import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_id, customer, return_url, metadata } = body;

    if (!product_id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
    }

    // Determine environment - test or live
    const isLive = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode";
    const baseUrl = isLive
      ? "https://live.dodopayments.com"
      : "https://test.dodopayments.com";

    // Create checkout session via Dodo API
    const response = await fetch(`${baseUrl}/checkouts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_cart: [
          {
            product_id: product_id,
            quantity: 1,
          },
        ],
        customer: customer?.email ? { email: customer.email } : undefined,
        return_url: return_url || process.env.DODO_PAYMENTS_RETURN_URL,
        metadata: metadata || {},
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Dodo API error:", data);
      return NextResponse.json(
        { error: data.message || data.error || "Failed to create checkout" },
        { status: response.status }
      );
    }

    // Return the checkout URL
    return NextResponse.json({
      checkout_url: data.checkout_url,
      session_id: data.session_id,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
