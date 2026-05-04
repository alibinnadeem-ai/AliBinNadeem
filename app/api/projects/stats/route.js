import { NextResponse } from 'next/server';
import projectsModule from '../../../../lib/data/projects.cjs';

const { PROJECTS } = projectsModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const categories = PROJECTS.reduce((acc, project) => {
    acc[project.cat] = (acc[project.cat] || 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({
    total: PROJECTS.length,
    live: PROJECTS.filter((project) => project.status === 'live').length,
    categories,
  });
}
