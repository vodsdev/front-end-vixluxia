import { NextResponse } from 'next/server';
import { getAllRegistryComponents, getRegistryComponentById } from '@/lib/component-registry';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const q = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category');
  const premium = searchParams.get('premium');
  const limit = Number(searchParams.get('limit') || 100);

  if (id) {
    const component = getRegistryComponentById(id);
    if (!component) return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    return NextResponse.json({ component });
  }

  let components = getAllRegistryComponents();

  if (category) {
    components = components.filter((component) => component.categorySlug === category);
  }

  if (premium === 'true' || premium === 'false') {
    const expected = premium === 'true';
    components = components.filter((component) => component.meta.premium === expected);
  }

  if (q) {
    components = components.filter((component) => {
      const haystack = [
        component.name,
        component.tagline,
        component.categoryName,
        component.author.name,
        ...component.tags,
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }

  return NextResponse.json({
    total: components.length,
    components: components.slice(0, Math.max(1, Math.min(limit, 250))),
  });
}
