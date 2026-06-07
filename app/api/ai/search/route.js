import { NextResponse } from 'next/server';

// Simulated component database
const components = [
  { id: 'navbar-1', description: 'navigation bar with links and logo header top menu' },
  { id: 'hero-1', description: 'hero section with large title and call to action button landing page' },
  { id: 'footer-1', description: 'footer with social links and copyright bottom' },
  { id: 'card-1', description: 'product card with image, title, and price grid item' },
  { id: 'sidebar-1', description: 'sidebar menu with collapsible items side navigation' },
  { id: 'form-1', description: 'contact form with name, email, and message inputs submit' },
  { id: 'table-1', description: 'data table with sortable columns and pagination list' },
  { id: 'button-1', description: 'primary button with hover effects click' },
];

// Simple helper to calculate a mock cosine similarity score based on word overlap
function simulateCosineSimilarity(query, description) {
  const queryWords = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
  const descWords = description.toLowerCase().split(/\s+/);
  
  let matchCount = 0;
  for (const qw of queryWords) {
    if (descWords.some(dw => dw.includes(qw) || qw.includes(dw))) {
      matchCount++;
    }
  }
  
  // Return a score between 0 and 1
  if (queryWords.length === 0) return 0;
  
  // Add some randomness to simulate a fuzzy embedding search
  const noise = Math.random() * 0.1;
  const score = (matchCount / queryWords.length) + noise;
  
  return Math.min(score, 1);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ error: 'Query is required in request body' }, { status: 400 });
    }

    // Simulate embedding generation and cosine similarity search
    const results = components.map(comp => ({
      id: comp.id,
      score: simulateCosineSimilarity(query, comp.description)
    }))
    .filter(res => res.score > 0.1) // Only return relevant items with some threshold
    .sort((a, b) => b.score - a.score);

    // Return list of relevant component IDs
    const componentIds = results.map(r => r.id);

    return NextResponse.json({ 
      success: true, 
      query,
      results: componentIds 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  // Simulate embedding generation and cosine similarity search
  const results = components.map(comp => ({
    id: comp.id,
    score: simulateCosineSimilarity(query, comp.description)
  }))
  .filter(res => res.score > 0.1) // Only return relevant items with some threshold
  .sort((a, b) => b.score - a.score);

  // Return list of relevant component IDs
  const componentIds = results.map(r => r.id);

  return NextResponse.json({ 
    success: true, 
    query,
    results: componentIds 
  });
}
