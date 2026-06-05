import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

function createPlainKey() {
  return `vxl_${crypto.randomBytes(24).toString('hex')}`;
}

function hashKey(key) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

export async function POST(request) {
  const key = createPlainKey();
  const keyHash = hashKey(key);
  const now = new Date().toISOString();

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({
      key,
      keyPrefix: key.slice(0, 12),
      createdAt: now,
      warning: 'Supabase is not configured, key was not persisted.',
    }, { status: 201 });
  }

  const supabase = createClient();
  const { data: { user } = {} } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { error } = await supabase.from('api_keys').insert({
    user_id: user.id,
    name: body.name || 'Default API key',
    key_hash: keyHash,
    key_prefix: key.slice(0, 12),
    scopes: body.scopes || ['components:read', 'ai:generate'],
    created_at: now,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    key,
    keyPrefix: key.slice(0, 12),
    createdAt: now,
  }, { status: 201 });
}
