import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '@/lib/mongodb';

// ---------- helpers ----------
const json = (data, status = 200) => NextResponse.json(data, { status });

function stripTags(s = '') {
  return s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeEntities(s = '') {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

function extractMeta(html, names) {
  for (const name of names) {
    const patterns = [
      new RegExp(`<meta[^>]+property=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`, 'i'),
      new RegExp(`<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']+)["'][^>]*>`, 'i'),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${name}["'][^>]*>`, 'i'),
      new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["'][^>]*>`, 'i'),
    ];
    for (const r of patterns) {
      const m = html.match(r);
      if (m && m[1]) return decodeEntities(m[1]).trim();
    }
  }
  return null;
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decodeEntities(stripTags(m[1])) : null;
}

function estimateReadingTime(html) {
  // crude: strip script/style, then count words from body text
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const text = stripTags(cleaned);
  const words = text ? text.split(/\s+/).length : 0;
  if (!words) return null;
  return Math.max(1, Math.round(words / 220));
}

function detectType(urlObj) {
  const host = urlObj.hostname.replace(/^www\./, '');
  if (host === 'github.com') return 'github';
  if (host === 'youtube.com' || host === 'youtu.be' || host === 'm.youtube.com') return 'youtube';
  if (host === 'figma.com' || host.endsWith('.figma.com')) return 'figma';
  if (host === 'twitter.com' || host === 'x.com') return 'twitter';
  if (host === 'medium.com' || host.endsWith('.medium.com') || host.includes('substack.com')) return 'article';
  return 'link';
}

function faviconFor(urlObj) {
  return `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`;
}

async function fetchWithTimeout(url, options = {}, ms = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function enrichGithub(urlObj) {
  const parts = urlObj.pathname.split('/').filter(Boolean);
  if (parts.length < 2) return null;
  const [owner, repo] = parts;
  try {
    const res = await fetchWithTimeout(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'VixLuxia' },
    }, 6000);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      ghDescription: data.description,
      ownerAvatar: data.owner?.avatar_url,
    };
  } catch {
    return null;
  }
}

async function enrichUrl(rawUrl) {
  let urlObj;
  try {
    urlObj = new URL(rawUrl);
  } catch {
    throw new Error('Invalid URL');
  }
  const type = detectType(urlObj);
  const out = {
    url: urlObj.toString(),
    domain: urlObj.hostname.replace(/^www\./, ''),
    favicon: faviconFor(urlObj),
    type,
    title: null,
    description: null,
    image: null,
    readingTime: null,
    meta: {},
  };

  // Try fetching the page
  try {
    const res = await fetchWithTimeout(rawUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; VixLuxiaBot/1.0; +https://vixluxia.app)',
        Accept: 'text/html,application/xhtml+xml',
      },
    }, 8000);
    if (res.ok) {
      const html = (await res.text()).slice(0, 400000);
      out.title =
        extractMeta(html, ['og:title', 'twitter:title']) || extractTitle(html);
      out.description = extractMeta(html, [
        'og:description',
        'twitter:description',
        'description',
      ]);
      out.image = extractMeta(html, ['og:image', 'twitter:image', 'twitter:image:src']);
      const siteName = extractMeta(html, ['og:site_name']);
      if (siteName) out.meta.siteName = siteName;
      if (type === 'article' || type === 'link') {
        out.readingTime = estimateReadingTime(html);
      }
    }
  } catch {
    // ignore — fall back to URL-only data
  }

  if (type === 'github') {
    const gh = await enrichGithub(urlObj);
    if (gh) out.meta.github = gh;
  }

  if (type === 'youtube') {
    let id = urlObj.searchParams.get('v');
    if (!id && urlObj.hostname.includes('youtu.be')) {
      id = urlObj.pathname.split('/').filter(Boolean)[0];
    }
    if (id) out.image = out.image || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }

  if (!out.title) out.title = out.domain;
  return out;
}

// ---------- router ----------
async function handler(request, { params }) {
  const pathParts = (params?.path || []);
  const route = '/' + pathParts.join('/');
  const method = request.method;

  try {
    // GET /api/health -> health
    if (method === 'GET' && route === '/health') {
      return json({ ok: true, app: 'VixLuxia', version: '1.0' });
    }

    const db = await getDb();

    // POST /api/bookmarks/enrich -> preview metadata for a URL
    if (method === 'POST' && route === '/bookmarks/enrich') {
      const body = await request.json();
      if (!body?.url) return json({ error: 'url required' }, 400);
      const data = await enrichUrl(body.url);
      return json(data);
    }

    // GET /api/bookmarks?workspaceId=...&q=...&tag=...
    if (method === 'GET' && route === '/bookmarks') {
      const { searchParams } = new URL(request.url);
      const workspaceId = searchParams.get('workspaceId');
      const q = searchParams.get('q');
      const tag = searchParams.get('tag');
      const filter = {};
      if (workspaceId && workspaceId !== 'all') filter.workspaceId = workspaceId;
      if (tag) filter.tags = tag;
      if (q) {
        const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        filter.$or = [{ title: rx }, { description: rx }, { url: rx }, { domain: rx }];
      }
      const items = await db
        .collection('bookmarks')
        .find(filter, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .toArray();
      return json(items);
    }

    // POST /api/bookmarks  -> create (auto-enrich if only url provided)
    if (method === 'POST' && route === '/bookmarks') {
      const body = await request.json();
      if (!body?.url) return json({ error: 'url required' }, 400);
      let enriched = body.enriched;
      if (!enriched) enriched = await enrichUrl(body.url);
      const now = new Date().toISOString();
      const doc = {
        id: uuidv4(),
        url: enriched.url,
        title: body.title || enriched.title,
        description: body.description || enriched.description,
        image: enriched.image || null,
        domain: enriched.domain,
        favicon: enriched.favicon,
        type: enriched.type,
        readingTime: enriched.readingTime || null,
        meta: enriched.meta || {},
        tags: Array.isArray(body.tags) ? body.tags : [],
        status: body.status || 'inbox',
        priority: body.priority || 'normal',
        workspaceId: body.workspaceId || 'default',
        createdAt: now,
        updatedAt: now,
      };
      await db.collection('bookmarks').insertOne(doc);
      const { _id, ...clean } = doc;
      return json(clean, 201);
    }

    // PATCH /api/bookmarks/:id
    const bmMatch = route.match(/^\/bookmarks\/([^/]+)$/);
    if (method === 'PATCH' && bmMatch) {
      const id = bmMatch[1];
      const body = await request.json();
      const allowed = ['title', 'description', 'tags', 'status', 'priority', 'workspaceId'];
      const update = { updatedAt: new Date().toISOString() };
      for (const k of allowed) if (k in body) update[k] = body[k];
      await db.collection('bookmarks').updateOne({ id }, { $set: update });
      const doc = await db.collection('bookmarks').findOne({ id }, { projection: { _id: 0 } });
      return json(doc);
    }

    if (method === 'DELETE' && bmMatch) {
      const id = bmMatch[1];
      await db.collection('bookmarks').deleteOne({ id });
      return json({ ok: true });
    }

    // GET /api/workspaces
    if (method === 'GET' && route === '/workspaces') {
      let items = await db
        .collection('workspaces')
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: 1 })
        .toArray();
      if (items.length === 0) {
        const seed = [
          { id: 'default', name: 'Personal', icon: 'Sparkles', color: 'lavender', createdAt: new Date().toISOString() },
          { id: uuidv4(), name: 'Design Inspiration', icon: 'Palette', color: 'peach', createdAt: new Date().toISOString() },
          { id: uuidv4(), name: 'Dev Resources', icon: 'Code2', color: 'mint', createdAt: new Date().toISOString() },
        ];
        await db.collection('workspaces').insertMany(seed);
        items = seed.map(({ ...r }) => r);
      }
      return json(items);
    }

    if (method === 'POST' && route === '/workspaces') {
      const body = await request.json();
      const doc = {
        id: uuidv4(),
        name: body.name || 'New workspace',
        icon: body.icon || 'Folder',
        color: body.color || 'lavender',
        createdAt: new Date().toISOString(),
      };
      await db.collection('workspaces').insertOne(doc);
      const { _id, ...clean } = doc;
      return json(clean, 201);
    }

    // GET /api/tags -> list of distinct tags with counts
    if (method === 'GET' && route === '/tags') {
      const agg = await db
        .collection('bookmarks')
        .aggregate([
          { $unwind: '$tags' },
          { $group: { _id: '$tags', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ])
        .toArray();
      return json(agg.map((t) => ({ name: t._id, count: t.count })));
    }

    return json({ error: 'Not found', route, method }, 404);
  } catch (err) {
    console.error('API error', err);
    return json({ error: err.message || 'Server error' }, 500);
  }
}

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const DELETE = handler;
export const dynamic = 'force-dynamic';
