import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    site: 'abn-technologist',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
}
