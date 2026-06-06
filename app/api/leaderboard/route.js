import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { redis } from '@/lib/redis';

export const revalidate = 0;

export async function GET() {
  const CACHE_KEY = 'leaderboard:top50';
  
  try {
    if (redis) {
      const cachedData = await redis.get(CACHE_KEY);
      if (cachedData) {
        return NextResponse.json(cachedData);
      }
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('points', { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (redis && data) {
      await redis.set(CACHE_KEY, data, { ex: 60 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
