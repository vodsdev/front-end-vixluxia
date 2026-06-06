import { NextResponse } from 'next/server';
import { getAllRegistryComponents, getRegistryComponentById } from '@/lib/component-registry';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';
import { createSupabaseServerClient } from '@/lib/supabase-server';

const rateLimit = new Map();

export async function GET(request) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 60;
  
  const record = rateLimit.get(ip) || { count: 0, resetTime: now + windowMs };
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
  } else {
    record.count++;
  }
  rateLimit.set(ip, record);

  if (record.count > maxRequests) {
    return new Response("Too many requests", { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const q = searchParams.get('q')?.toLowerCase();
  const category = searchParams.get('category');
  const premium = searchParams.get('premium');
  const limit = Number(searchParams.get('limit') || 100);

  const supabaseAuth = createSupabaseServerClient();
  const { data: { session } } = await supabaseAuth.auth.getSession();
  let isPremium = false;
  
  if (session) {
    const { data: profile } = await supabaseAuth
      .from('profiles')
      .select('subscription_status')
      .eq('id', session.user.id)
      .single();
    if (profile?.subscription_status === 'active') {
      isPremium = true;
    }
  }

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

  const sanitizeComponent = (c) => {
    if (c.meta?.premium && !isPremium) {
      return { ...c, code: '// Premium component - subscription required to view code' };
    }
    return c;
  };

  if (id) {
    const component = components.find(c => c.id === id);
    if (!component) return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    return NextResponse.json({ component: sanitizeComponent(component) });
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

  const resultComponents = components
    .slice(0, Math.max(1, Math.min(limit, 250)))
    .map(sanitizeComponent);

  return NextResponse.json({
    total: components.length,
    components: resultComponents,
  });
}
