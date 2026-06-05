import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const referralCode = String(body.referralCode || '').trim();

  if (!referralCode) {
    return NextResponse.json({ error: 'referralCode is required' }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true, referralCode });
  response.cookies.set('vixluxia_ref', referralCode, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });

  const supabase = getSupabaseAdmin();
  if (supabase) {
    try {
      await supabase.from('referrals').insert({
        referral_code: referralCode,
        status: 'clicked',
        created_at: new Date().toISOString(),
      });
    } catch {}
  }

  return response;
}
