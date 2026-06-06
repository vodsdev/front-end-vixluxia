import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';
import { getServerSubscription } from '@/lib/server/subscription';
import { getSupabaseAdmin } from '@/lib/server/supabase-admin';

export const maxDuration = 60;

export async function POST(req) {
  try {
    const access = await getServerSubscription(req);

    // Vérification de l'abonnement
    if (!access.isPremium) {
      return NextResponse.json({
        error: 'Abonnement Premium requis pour accéder à l\\'IA.',
        code: 'premium_required',
      }, { status: 402 });
    }

    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Le code source est requis.' }, { status: 400 });
    }

    const systemPrompt = `Tu es un expert développeur React. Ton but est d'analyser le code source d'un composant React et de générer sa documentation.
La documentation doit inclure:
1. Une brève description (README) du composant expliquant son rôle.
2. Un tableau Markdown des Props du composant avec les colonnes : Prop, Type, Default, Description.

Ne renvoie que le contenu Markdown final, sans entourer ta réponse par des backticks \`\`\`markdown et sans inclure de texte superflu.`;

    const result = await generateText({
      model: google('gemini-1.5-pro-latest'),
      system: systemPrompt,
      prompt: `Voici le code du composant React :\n\n${code}`,
    });

    const supabase = getSupabaseAdmin();
    if (supabase && access.user?.id) {
      await supabase.from('ai_generations').insert({
        user_id: access.user.id,
        prompt: 'Génération de documentation',
        mode: 'document',
        model: 'gemini-1.5-pro',
        output: result.text,
        usage: result.usage || {},
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      markdown: result.text,
      documentation: result.text
    });
  } catch (error) {
    console.error('Erreur IA documentation:', error);
    return NextResponse.json({
      error: 'Erreur lors de la génération de la documentation.',
      details: error.message
    }, { status: 500 });
  }
}
