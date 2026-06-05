import { NextResponse } from 'next/server';
import { getAllRegistryComponents, getRegistryComponentById } from '@/lib/component-registry';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const q = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category');
  const premium = searchParams.get('premium');
  const limit = Number(searchParams.get('limit') || 100);

  const supabase = getSupabaseAdmin();
  let dbComponents = [];
  
  if (supabase) {
    const { data } = await supabase.from('components').select('*').eq('status', 'published');
    if (data) {
      dbComponents = data.map(c => ({
        id: c.id,
        name: c.name,
        tagline: c.tagline,
        categorySlug: c.category,
        categoryName: c.category,
        prompt: c.prompt,
        code: c.code,
        preview: c.preview,
        tags: c.tags || [],
        author: { name: 'Community', id: c.user_id },
        stats: { votes: 0, likes: 0, downloads: 0, comments: 0, copies: 0, rating: 5 },
        meta: { premium: c.premium, status: c.status, ...c.metadata }
      }));
    }
  }

  let components = [...dbComponents, ...getAllRegistryComponents()];

  if (id) {
    const component = components.find(c => c.id === id);
    if (!component) return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    return NextResponse.json({ component });
  }

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
