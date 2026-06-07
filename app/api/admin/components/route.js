import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export async function GET(req) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error('Supabase admin not configured');
    
    const { data: components, error } = await supabase
      .from('components')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return NextResponse.json({ components });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }
    
    const supabase = getSupabaseAdmin();
    if (!supabase) throw new Error('Supabase admin not configured');
    
    const { data, error } = await supabase
      .from('components')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return NextResponse.json({ success: true, component: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
