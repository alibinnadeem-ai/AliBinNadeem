import { NextResponse } from 'next/server';
import venturesModule from '../../../lib/data/ventures.cjs';

const { VENTURES } = venturesModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const status = searchParams.get('status');

  let results = [...VENTURES];

  if (type) {
    const q = type.toLowerCase();
    results = results.filter((venture) => venture.type.toLowerCase().includes(q));
  }

  if (status) {
    results = results.filter((venture) => venture.status === status);
  }

  const types = [...new Set(VENTURES.map((venture) => venture.type))];

  return NextResponse.json({
    data: results,
    total: results.length,
    types,
  });
}
