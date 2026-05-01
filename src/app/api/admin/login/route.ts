import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Fail if env variables not configured
    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { success: false, error: "Admin credentials not configured" },
        { status: 500 }
      );
    }

    // Validate credentials on the server side
    if (email === adminEmail && password === adminPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
} 