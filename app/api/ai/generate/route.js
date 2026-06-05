import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';
import { getServerSubscription } from '@/lib/server/subscription';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

// Optionnel: configurer le timeout
export const maxDuration = 60;

export async function POST(req) {
  try {
    const access = await getServerSubscription(req);
    
    const { messages, mode } = await req.json();

    // Vérification de l'abonnement
    if (!access.isPremium && mode !== 'support') {
      return NextResponse.json({
        error: 'Abonnement Premium requis pour accéder à l\'IA.',
        code: 'premium_required',
      }, { status: 402 });
    }

    const systemPrompt = mode === 'component' 
      ? 'Tu es un expert développeur React et Tailwind CSS. Génère ou modifie des composants UI modernes, propres et performants.'
      : mode === 'support'
      ? 'Tu es l\'IA de support expert et officiel de VixLuxia. Ton but est d\'aider les utilisateurs avec bienveillance et expertise concernant VixLuxia (la marketplace de composants, les abonnements, l\'affiliation, etc.). Sois concis et professionnel.'
      : mode === 'code-review'
      ? 'Tu es un ingénieur senior. Fais une revue de code détaillée, bienveillante et pertinente.'
      : 'Tu es un assistant IA spécialisé dans l\'UX/UI et le développement web.';

    // Appel à l'API Gemini via AI SDK
    const result = await streamText({
      model: google('gemini-1.5-pro-latest'),
      system: systemPrompt,
      messages,
      onFinish: async ({ text, usage }) => {
        // Enregistrer la génération dans Supabase après la fin du streaming
        const supabase = getSupabaseAdmin();
        if (supabase && access.user?.id) {
          const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
          await supabase.from('ai_generations').insert({
            user_id: access.user.id,
            prompt: lastUserMessage?.content || 'Conversation',
            mode: mode || 'chat',
            model: 'gemini-1.5-pro',
            output: text,
            usage: usage || {},
            created_at: new Date().toISOString(),
          });
        }
      }
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Erreur IA:', error);
    return NextResponse.json({
      error: 'Erreur lors de la génération avec Gemini.',
      details: error.message
    }, { status: 500 });
  }
}
