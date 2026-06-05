import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export async function POST(request) {
  try {
    const { teamId, userId } = await request.json();

    if (!teamId || !userId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 });
    }

    // Verify ownership
    const { data: member, error: memberError } = await supabase
      .from('team_members')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', userId)
      .single();

    if (memberError || !member || member.role !== 'owner') {
      return NextResponse.json({ error: 'Unauthorized. Only owner can distribute.' }, { status: 403 });
    }

    // Reset vault to 0
    const { error: updateError } = await supabase
      .from('teams')
      .update({ vault_balance: 0 })
      .eq('id', teamId);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Distribute vault error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
