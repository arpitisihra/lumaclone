// src/app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'; // Import PrismaClient
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";

const prisma = new PrismaClient(); // Initialize PrismaClient

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, otpCode } = body; // Assuming these are sent from the client

    if (!userId || !otpCode) {
      return NextResponse.json({ message: "Missing userId or otpCode" }, { status: 400 });
    }

    // Find the OTP code for the user
    const checkOtp = await prisma.oTPCodes.findFirst({
      where: {
        userId: userId,
        code: otpCode,
        expiresAt: {
          gt: new Date(), // OTP must not be expired
        },
      },
    });

    if (!checkOtp) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    // If OTP is valid, update the user's verified status
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        verified: true, // Mark user as verified
      },
    });

    // Delete the used OTP code
    await prisma.oTPCodes.delete({
      where: {
        id: checkOtp.id,
      },
    });

    // Generate a JWT token for the now verified user
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("2h") // Token expires in 2 hours
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    // Fetch the user details, selecting 'name' instead of 'username'
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true, // Corrected from 'username' to 'name'
        image: true,
        verified: true,
      },
    });

    return NextResponse.json({ success: true, message: "Account verified successfully", token, user }, { status: 200 });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ message: "Internal server error during OTP verification", error: (error as Error).message }, { status: 500 });
  }
}
