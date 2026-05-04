import { NextResponse } from 'next/server';
import dbModule from '../../../../lib/server/db.cjs';
import requestModule from '../../../../lib/server/request.cjs';

const { query } = dbModule;
const { getClientIp, getSessionId } = requestModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { page, referrer } = body;

  try {
    await query(
      `INSERT INTO analytics_pageviews (page, referrer, user_agent, session_id, ip_address, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [
        page || '/',
        referrer || null,
        request.headers.get('user-agent') || null,
        getSessionId(request),
        getClientIp(request),
      ],
    );
  } catch {
    // Keep this endpoint non-blocking for UX parity with the legacy backend.
  }

  return NextResponse.json({ success: true });
}
