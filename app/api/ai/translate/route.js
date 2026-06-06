import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req) {
  try {
    const { code, targetFramework } = await req.json();

    if (!code || !targetFramework) {
      return Response.json(
        { error: 'Code and target framework are required' },
        { status: 400 }
      );
    }

    const { text } = await generateText({
      model: google('gemini-1.5-pro'),
      prompt: `Translate the following code to ${targetFramework}. Provide ONLY the translated code, without any markdown formatting or explanation. Code to translate:\n\n${code}`,
    });

    return Response.json({ code: text });
  } catch (error) {
    console.error('AI Translation error:', error);
    return Response.json(
      { error: 'Failed to translate code' },
      { status: 500 }
    );
  }
}
