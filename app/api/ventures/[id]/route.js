import { NextResponse } from 'next/server';
import venturesModule from '../../../../lib/data/ventures.cjs';

const { VENTURES } = venturesModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  const venture = VENTURES.find((item) => item.id === params.id);

  if (!venture) {
    return NextResponse.json({ error: 'Venture not found' }, { status: 404 });
  }

  return NextResponse.json({ data: venture });
}
