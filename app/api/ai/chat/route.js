import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-pro'),
    messages,
    system: "You are an AI assistant helping a user customize UI components. Keep your answers brief and focused.",
  });

  return result.toDataStreamResponse();
}
