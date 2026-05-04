import { NextResponse } from 'next/server';
import dbModule from '../../../../lib/server/db.cjs';
import authModule from '../../../../lib/server/auth.cjs';

const { query } = dbModule;
const { verifyAdminJwt } = authModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const auth = verifyAdminJwt(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const [contacts, pageviews, events] = await Promise.all([
      query('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 50'),
      query("SELECT COUNT(*) c FROM analytics_pageviews WHERE created_at > NOW() - INTERVAL '7 days'"),
      query("SELECT event_type, COUNT(*) c FROM analytics_events GROUP BY event_type ORDER BY c DESC"),
    ]);

    return NextResponse.json({
      contacts: contacts.rows,
      pageviews_7d: Number(pageviews.rows[0].c),
      top_events: events.rows,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
