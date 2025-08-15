import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // In a real application, you would verify the email and password against your database
    // For this clone, we'll simulate a successful login for demonstration purposes
    if (email === "test@example.com" && password === "password123") {
      const token = await new SignJWT({})
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("2h") // Token expires in 2 hours
        .sign(new TextEncoder().encode(getJwtSecretKey()));

      return NextResponse.json({ success: true, token }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

// If there were other functions like GET, PUT, DELETE, etc., they would be here.
// For now, we've focused on fixing the POST handler.