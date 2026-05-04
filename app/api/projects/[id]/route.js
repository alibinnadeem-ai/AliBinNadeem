import { NextResponse } from 'next/server';
import projectsModule from '../../../../lib/data/projects.cjs';

const { PROJECTS } = projectsModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  const project = PROJECTS.find((item) => item.id === params.id);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json({ data: project });
}
