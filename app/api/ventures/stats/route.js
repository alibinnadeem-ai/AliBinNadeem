import { NextResponse } from 'next/server';
import venturesModule from '../../../../lib/data/ventures.cjs';

const { VENTURES } = venturesModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const byType = VENTURES.reduce((acc, venture) => {
    acc[venture.type] = (acc[venture.type] || 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({
    total: VENTURES.length,
    active: VENTURES.filter((venture) => venture.status === 'active').length,
    by_type: byType,
  });
}
