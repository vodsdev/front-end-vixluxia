import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';
import { createClient } from '@/utils/supabase/server';

export async function POST(request) {
  try {
    const { teamId, simulate } = await request.json();

    const supabaseUserClient = createClient();
    const { data: { user } } = await supabaseUserClient.auth.getUser();
    const userId = user?.id;

    if (!teamId || !userId) {
      return NextResponse.json({ error: 'Missing fields or unauthorized' }, { status: 400 });
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

    // Fetch vault balance
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('vault_balance')
      .eq('id', teamId)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    const balance = Number(team.vault_balance) || 0;

    // Fetch members to distribute credits
    const { data: members, error: membersError } = await supabase
      .from('team_members')
      .select('user_id')
      .eq('team_id', teamId);

    if (membersError) throw membersError;

    const membersCount = members ? members.length : 0;
    const share = membersCount > 0 ? balance / membersCount : 0;

    if (simulate) {
      return NextResponse.json({ 
        success: true, 
        simulated: true, 
        vaultBalance: balance, 
        membersCount, 
        sharePerMember: share 
      });
    }

    if (balance > 0 && membersCount > 0) {
      // Distribute points/credits to each member
      for (const m of members) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('points')
          .eq('id', m.user_id)
          .single();
          
        if (profile) {
          const newPoints = (profile.points || 0) + share;
          await supabase
            .from('profiles')
            .update({ points: newPoints })
            .eq('id', m.user_id);
        }
      }
    }

    // Reset vault to 0
    const { error: updateError } = await supabase
      .from('teams')
      .update({ vault_balance: 0 })
      .eq('id', teamId);

    if (updateError) throw updateError;

    return NextResponse.json({ 
      success: true, 
      vaultBalance: balance,
      membersCount,
      sharePerMember: share
    });

  } catch (err) {
    console.error('Distribute vault error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
