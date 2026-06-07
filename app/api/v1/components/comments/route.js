import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const componentId = searchParams.get('componentId') || searchParams.get('component_id');
  
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 });
  }

  try {
    let query = supabase.from('comments').select('*');
    if (componentId) {
      query = query.eq('component_id', componentId);
    }
    
    const { data: comments, error } = await query;
    if (error) throw error;
    
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase configuration missing' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { content, componentId, component_id, author_name, user_id } = body;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const finalComponentId = component_id || componentId || null;

    const newCommentData = {
      component_id: finalComponentId,
      content,
      author_name: author_name || 'Utilisateur Anonyme',
      user_id: user_id || null,
    };

    const { data: newComment, error } = await supabase
      .from('comments')
      .insert(newCommentData)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Invalid request body' }, { status: 400 });
  }
}
