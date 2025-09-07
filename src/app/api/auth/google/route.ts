import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";

export async function GET() {
  // Check for the mock auth flag
  const useMockAuth = process.env.USE_MOCK_AUTH === "true";

  if (useMockAuth) {
    // Mocked user data for development/preview
    console.log("Using mocked authentication for sign-in redirect");

    const mockUser = {
      id: "mock-user-id",
      name: "Test User",
      email: "test@example.com",
      image: "https://placekitten.com/200/200"
    };

    const token = await new SignJWT({ sub: mockUser.id })
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    // Redirect back to frontend with a mock token
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/home?token=${token}`
    );
  }

  // Real Google OAuth logic for production
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid profile email",
    access_type: "offline",
    prompt: "consent",
  });

  return NextResponse.redirect(`${rootUrl}?${params.toString()}`);
}