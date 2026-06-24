import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, code, category, description, isPublic } = await req.json();

    if (!name || !code) {
      return NextResponse.json({ error: 'Name and code are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('components')
      .insert({
        user_id: user.id,
        name,
        code,
        category: category || 'UI',
        description: description || '',
        is_public: isPublic ?? true,
        author_name: user.user_metadata?.full_name || user.email,
        author_avatar: user.user_metadata?.avatar_url || ''
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error publishing component:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
