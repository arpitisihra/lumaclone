// src/app/api/auth/send-otp/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    // In a real application, you would integrate with an email service (e.g., SendGrid, Mailgun)
    // to actually send an OTP to the provided email address.
    // For this clone, we'll just simulate a successful OTP send.

    console.log(`Simulating OTP sent to: ${email}`);

    return NextResponse.json({ success: true, message: "OTP sent successfully (simulated)" }, { status: 200 });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 });
  }
}