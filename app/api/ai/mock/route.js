import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const maxDuration = 60;

export async function POST(req) {
  try {
    if (process.env.UPSTASH_REDIS_REST_URL) {
      const redis = Redis.fromEnv();
      const ratelimit = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "10 s") });
      const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
      }
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an expert JSON mock data generator. 
Your task is to generate realistic JSON mock data based on the user's prompt. 
You must ONLY output valid JSON. Do not include markdown formatting like \`\`\`json. 
Do not include any explanations or extra text.
Generate rich, realistic data with appropriate field names and data types.`;

    const result = await generateText({
      model: google('gemini-1.5-pro-latest'),
      system: systemPrompt,
      prompt: prompt,
    });

    // Clean up potential markdown formatting if the model disobeys
    let cleanedText = result.text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\n?/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\n?/, '');
    }
    
    if (cleanedText.endsWith('```')) {
      cleanedText = cleanedText.replace(/\n?```$/, '');
    }

    const parsedData = JSON.parse(cleanedText);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error generating mock data:', error);
    return NextResponse.json(
      { error: 'Failed to generate mock data', details: error.message },
      { status: 500 }
    );
  }
}
