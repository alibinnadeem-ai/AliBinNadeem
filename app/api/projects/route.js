import { NextResponse } from 'next/server';
import projectsModule from '../../../lib/data/projects.cjs';

const { PROJECTS } = projectsModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cat = searchParams.get('cat');
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let results = [...PROJECTS];

  if (cat) {
    const q = cat.toLowerCase();
    results = results.filter((project) => project.cat.toLowerCase() === q);
  }

  if (status) {
    results = results.filter((project) => project.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter((project) => project.name.toLowerCase().includes(q));
  }

  const categories = [...new Set(PROJECTS.map((project) => project.cat))];

  return NextResponse.json({
    data: results,
    total: results.length,
    categories,
  });
}
