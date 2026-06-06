import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export async function GET(request) {
  const supabase = createClient();
  const { data: { user } = {} } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  const adminClient = getSupabaseAdmin();
  if (!adminClient) {
    return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 });
  }

  const { count, error } = await adminClient
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('referred_by', user.id);

  if (error) {
    console.error('Error fetching referral stats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    clicks: 0,
    signups: count || 0,
    revenue: 0
  });
}
