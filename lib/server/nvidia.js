const DEFAULT_MODEL = 'nvidia/nemotron-3-super-120b-a12b';

export async function generateWithNvidiaNim({ prompt, mode = 'component', maxTokens = 900 }) {
  const baseUrl = process.env.NVIDIA_NIM_BASE_URL || 'http://127.0.0.1:8000/v1';
  const model = process.env.NVIDIA_NIM_MODEL || DEFAULT_MODEL;
  const apiKey = process.env.NVIDIA_API_KEY || process.env.NGC_API_KEY;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);

  const systemPrompt = [
    'You are VixLuxia AI, a senior React, Tailwind CSS and Framer Motion component engineer.',
    'Return practical production-ready output.',
    mode === 'prompt'
      ? 'Focus on a clean reusable prompt for a component registry.'
      : 'Focus on a React component with Tailwind classes, install notes and usage guidance.',
  ].join(' ');

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        temperature: 0.45,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`NVIDIA NIM error ${response.status}: ${text.slice(0, 240)}`);
    }

    const data = await response.json();
    return {
      model,
      content: data.choices?.[0]?.message?.content || '',
      usage: data.usage || null,
    };
  } finally {
    clearTimeout(timeout);
  }
}
