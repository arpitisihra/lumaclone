import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import prisma from '@/lib/prisma';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import { getJwtSecretKey } from '@/lib/auth';

const oauth2Client = new google.auth.OAuth2(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/google-signin/callback`
);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ message: 'Missing code' }, { status: 400 });
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const userInfo = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
    const { email, name, picture } = userInfo.data;

    if (!email) {
      return NextResponse.json({ message: 'Google account has no email' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || 'Google User',
          image: picture,
          verified: true,
        },
      });
    }

    const token = await new SignJWT({ sub: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    // Redirect back to frontend with token in a secure cookie
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/home`
    );
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });
    return response;
  } catch (error) {
    console.error('Google callback failed:', error);
    return NextResponse.json({ message: 'Google Sign-in failed' }, { status: 500 });
  }
}