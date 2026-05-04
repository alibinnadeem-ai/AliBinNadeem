import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID || '',
    redirect_uri: process.env.LINKEDIN_CALLBACK_URL || '',
    scope: 'r_liteprofile r_emailaddress',
    state: Math.random().toString(36).substring(7),
  });

  return NextResponse.redirect(`https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`);
}
