import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';
import { createClient } from '@/utils/supabase/server';

export async function POST(request) {
  try {
    const { teamId, password, simulate } = await request.json();

    const supabaseUserClient = createClient();
    const { data: { user } } = await supabaseUserClient.auth.getUser();
    const userId = user?.id;

    if (!teamId || !password || !userId) {
      return NextResponse.json({ error: 'Missing fields or unauthorized' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Admin client not configured' }, { status: 500 });
    }

    // 1. Fetch team to verify password
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .select('password, vault_balance')
      .eq('id', teamId)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    if (team.password !== password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 403 });
    }

    // 2. Check IP for anti-abuse
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

    // Prevent multi-accounting from same IP on the same team
    const { data: existingMembersWithIp } = await supabase
      .from('team_members')
      .select('id')
      .eq('team_id', teamId)
      .eq('joined_ip', ip);

    const isAbuse = existingMembersWithIp && existingMembersWithIp.length >= 2;

    if (simulate) {
      // Check if user is already in the team
      const { data: existingMember } = await supabase
        .from('team_members')
        .select('id')
        .eq('team_id', teamId)
        .eq('user_id', userId)
        .single();
      
      if (existingMember) {
        return NextResponse.json({ error: 'You are already in this team' }, { status: 400 });
      }

      return NextResponse.json({ success: true, rewarded: !isAbuse, simulated: true });
    }

    // 3. Add member
    const { error: insertError } = await supabase.from('team_members').insert({
      team_id: teamId,
      user_id: userId,
      role: 'member',
      joined_ip: ip
    });

    if (insertError) {
      if (insertError.code === '23505') {
        return NextResponse.json({ error: 'You are already in this team' }, { status: 400 });
      }
      throw insertError;
    }

    // 4. Reward the vault if it's not an abuse
    if (!isAbuse) {
      await supabase
        .from('teams')
        .update({ vault_balance: Number(team.vault_balance) + 0.50 })
        .eq('id', teamId);
    }

    return NextResponse.json({ success: true, rewarded: !isAbuse });

  } catch (err) {
    console.error('Join team error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
