import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, points } = body;

    if (!userId || typeof points !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input. Expected userId (string) and points (number).' },
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

    // Safely increment points by first reading the current value.
    // Note: If you have an RPC function for atomic increments, that would be preferable.
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('points')
      .eq('id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 is "No rows found"
      console.error('Error fetching user profile:', fetchError);
      return NextResponse.json(
        { error: 'Failed to fetch user profile.' },
        { status: 500 }
      );
    }

    const currentPoints = profile?.points || 0;
    const newPoints = currentPoints + points;

    // Update the profile with new points
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .upsert({ 
        id: userId, 
        points: newPoints 
      }, { onConflict: 'id' })
      .select('points')
      .single();

    if (updateError) {
      console.error('Error updating points:', updateError);
      return NextResponse.json(
        { error: 'Failed to update points.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, points: updatedProfile.points },
      { status: 200 }
    );
  } catch (error) {
    console.error('API /user/add-points error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
