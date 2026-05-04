import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(`${origin}/?auth=error`);
  }

  try {
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINKEDIN_CALLBACK_URL || '',
        client_id: process.env.LINKEDIN_CLIENT_ID || '',
        client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
      }),
    });

    const tokenData = await tokenRes.json();

    const profileRes = await fetch('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const profile = await profileRes.json();

    const token = jwt.sign(
      {
        linkedin_id: profile.id,
        name: `${profile.localizedFirstName || ''} ${profile.localizedLastName || ''}`.trim(),
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    return NextResponse.redirect(`${origin}/?auth=success&token=${token}`);
  } catch (e) {
    console.error('[AUTH] LinkedIn error:', e.message);
    return NextResponse.redirect(`${origin}/?auth=error`);
  }
}
