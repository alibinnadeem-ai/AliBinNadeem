import { NextResponse } from 'next/server';
import dbModule from '../../../../lib/server/db.cjs';
import requestModule from '../../../../lib/server/request.cjs';

const { query } = dbModule;
const { getClientIp, getSessionId } = requestModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { event_type: eventType, event_data: eventData } = body;

  if (!eventType) {
    return NextResponse.json({ error: 'event_type required' }, { status: 400 });
  }

  try {
    await query(
      `INSERT INTO analytics_events (event_type, event_data, session_id, ip_address, created_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [eventType, JSON.stringify(eventData || {}), getSessionId(request), getClientIp(request)],
    );
  } catch {
    // Keep this endpoint non-blocking for UX parity with the legacy backend.
  }

  return NextResponse.json({ success: true });
}
