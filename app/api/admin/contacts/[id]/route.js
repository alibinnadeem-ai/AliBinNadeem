import { NextResponse } from 'next/server';
import dbModule from '../../../../../lib/server/db.cjs';
import authModule from '../../../../../lib/server/auth.cjs';

const { query } = dbModule;
const { verifyAdminJwt } = authModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  const auth = verifyAdminJwt(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const body = await request.json().catch(() => ({}));
  const { status, notes } = body;

  try {
    await query('UPDATE contacts SET status = $1, admin_notes = $2, updated_at = NOW() WHERE id = $3', [
      status,
      notes,
      params.id,
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const auth = verifyAdminJwt(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    await query('DELETE FROM contacts WHERE id = $1', [params.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
