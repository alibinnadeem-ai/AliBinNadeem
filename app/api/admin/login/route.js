import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Credentials required' }, { status: 400 });
  }

  if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH || '');
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ email, isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  return NextResponse.json({ token, email });
}
