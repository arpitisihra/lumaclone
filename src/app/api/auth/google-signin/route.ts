import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import prisma from '@/lib/prisma';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import { getJwtSecretKey } from '@/lib/auth';

const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  // The redirect URI must be a valid entry in the Google Cloud Console
  `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/google-signin/callback`
);

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userInfo = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
    const { id, email, name, picture } = userInfo.data;

    if (!email) {
      return NextResponse.json({ message: 'Google account has no email' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || 'Google User',
          image: picture,
          verified: true, // Google email is already verified
        },
      });
    }

    const token = await new SignJWT({})
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    return NextResponse.json({ token, user }, { status: 200 });
  } catch (error) {
    console.error('Google Sign-in failed:', error);
    return NextResponse.json({ message: 'Google Sign-in failed' }, { status: 500 });
  }
}
