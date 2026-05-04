import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { token } = body;

  if (!token) {
    return NextResponse.json({ valid: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ valid: true, user: decoded });
  } catch {
    return NextResponse.json({ valid: false });
  }
}
