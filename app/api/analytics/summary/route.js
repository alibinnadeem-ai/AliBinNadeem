import { NextResponse } from 'next/server';
import dbModule from '../../../../lib/server/db.cjs';
import authModule from '../../../../lib/server/auth.cjs';

const { query } = dbModule;
const { isAdminSecretAuthorized } = authModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  if (!isAdminSecretAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [total, today, week, contacts, topPages, topEvents] = await Promise.all([
      query('SELECT COUNT(*) c FROM analytics_pageviews'),
      query("SELECT COUNT(*) c FROM analytics_pageviews WHERE created_at > NOW() - INTERVAL '24 hours'"),
      query("SELECT COUNT(*) c FROM analytics_pageviews WHERE created_at > NOW() - INTERVAL '7 days'"),
      query("SELECT COUNT(*) c FROM contacts WHERE created_at > NOW() - INTERVAL '7 days'"),
      query('SELECT page, COUNT(*) views FROM analytics_pageviews GROUP BY page ORDER BY views DESC LIMIT 10'),
      query('SELECT event_type, COUNT(*) c FROM analytics_events GROUP BY event_type ORDER BY c DESC LIMIT 10'),
    ]);

    return NextResponse.json({
      pageviews: {
        total: Number(total.rows[0].c),
        today: Number(today.rows[0].c),
        week: Number(week.rows[0].c),
      },
      contacts_this_week: Number(contacts.rows[0].c),
      top_pages: topPages.rows,
      top_events: topEvents.rows,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
