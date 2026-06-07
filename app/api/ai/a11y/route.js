import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const result = await generateObject({
      model: google('gemini-1.5-pro'),
      system: "You are an expert accessibility (a11y) auditor for web applications. Analyze the provided React/HTML code and provide structured feedback on its accessibility. Identify issues like missing aria attributes, improper semantic HTML, poor contrast (if inferrable), missing alt tags, keyboard navigation issues, etc. Also provide a score out of 100.",
      prompt: `Please audit the following code for accessibility issues:\n\n${code}`,
      schema: z.object({
        score: z.number().describe('An overall accessibility score out of 100'),
        issues: z.array(
          z.object({
            severity: z.enum(['low', 'medium', 'high', 'critical']).describe('Severity of the issue'),
            element: z.string().describe('The element or line of code where the issue occurs'),
            description: z.string().describe('Description of the accessibility issue'),
            suggestion: z.string().describe('Actionable suggestion to fix the issue'),
            wcagReference: z.string().optional().describe('Relevant WCAG guideline reference, if applicable')
          })
        ).describe('List of identified accessibility issues'),
        bestPractices: z.array(z.string()).describe('General best practices followed in the code, or suggestions for improvement'),
      }),
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error('A11y audit error:', error);
    return NextResponse.json({ error: 'Failed to perform accessibility audit' }, { status: 500 });
  }
}
