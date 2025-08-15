// src/app/api/user/route.ts
import { NextResponse } from "next/server";
import { POST as GenerateTokenPost } from "../auth/generate-token/route"; // Corrected import

export async function GET() {
  // This is a placeholder GET route. In a real app, you'd fetch user data.
  return NextResponse.json({ message: "User API route - GET" }, { status: 200 });
}

export async function POST(req: Request) {
  // This POST route might be for creating a user or other user-related actions.
  // It's using the token generation logic as an example.
  const response = await GenerateTokenPost(req); // Call the imported POST function
  return response;
}