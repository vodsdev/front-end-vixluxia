import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid input. Expected userId (string).' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    
    if (!supabase) {
      console.error('Supabase admin client not found');
      return NextResponse.json(
        { error: 'Internal Server Error: Supabase Admin not configured' },
        { status: 500 }
      );
    }

    // Fetch user's current streak and last login
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('current_streak, last_login_at')
      .eq('id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user profile:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch user profile.' },
        { status: 500 }
      );
    }

    const now = new Date();
    // Normalize "today" and "yesterday" to midnight to compare dates correctly
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let currentStreak = profile?.current_streak || 0;
    const lastLoginAt = profile?.last_login_at ? new Date(profile.last_login_at) : null;

    if (lastLoginAt) {
      const lastLoginDate = new Date(lastLoginAt.getFullYear(), lastLoginAt.getMonth(), lastLoginAt.getDate());
      
      if (lastLoginDate.getTime() === yesterday.getTime()) {
        currentStreak += 1;
      } else if (lastLoginDate.getTime() !== today.getTime()) {
        currentStreak = 1; // Reset streak if login was before yesterday
      }
    } else {
      currentStreak = 1; // First login
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .upsert({ 
        id: userId, 
        current_streak: currentStreak,
        last_login_at: now.toISOString()
      }, { onConflict: 'id' })
      .select('current_streak, last_login_at')
      .single();

    if (updateError) {
      console.error('Error updating streak:', updateError);
      return NextResponse.json(
        { error: 'Failed to update streak.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, current_streak: updatedProfile.current_streak, last_login_at: updatedProfile.last_login_at },
      { status: 200 }
    );
  } catch (error) {
    console.error('API /user/streaks error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
