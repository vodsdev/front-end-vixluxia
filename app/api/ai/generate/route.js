import { NextResponse } from 'next/server';
import { generateWithNvidiaNim } from '@/lib/server/nvidia';
import { getServerSubscription } from '@/lib/server/subscription';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const prompt = String(body.prompt || '').trim();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  const access = await getServerSubscription(request);
  if (!access.isPremium) {
    return NextResponse.json({
      error: 'Premium subscription required',
      code: 'premium_required',
    }, { status: 402 });
  }

  try {
    const result = await generateWithNvidiaNim({
      prompt,
      mode: body.mode || 'component',
      maxTokens: Math.min(Number(body.maxTokens || 900), 1800),
    });

    const supabase = getSupabaseAdmin();
    if (supabase && access.user?.id) {
      await supabase.from('ai_generations').insert({
        user_id: access.user.id,
        prompt,
        mode: body.mode || 'component',
        model: result.model,
        output: result.content,
        usage: result.usage,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      hint: 'Start the local NVIDIA NIM on port 8000 or set NVIDIA_NIM_BASE_URL / NVIDIA_API_KEY.',
    }, { status: 502 });
  }
}
