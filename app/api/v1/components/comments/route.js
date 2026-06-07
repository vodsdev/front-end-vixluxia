import { NextResponse } from 'next/server';

// In-memory mock database for comments
let comments = [
  {
    id: 1,
    author: 'Alice Johnson',
    avatar: 'A',
    role: 'Frontend Developer',
    date: 'Il y a 2 jours',
    content: "Ce composant est exactement ce que je cherchais ! Le code est propre et très facile à intégrer dans mon projet Next.js. Ça m'a fait gagner un temps fou.",
    likes: 12,
  },
  {
    id: 2,
    author: 'Marc Durand',
    avatar: 'M',
    role: 'UI Designer',
    date: 'Il y a 5 jours',
    content: "J'adore les animations fluides. Une petite suggestion : ce serait génial d'avoir une variante sombre spécifiquement pour les états de survol. Sinon, c'est parfait !",
    likes: 8,
  },
  {
    id: 3,
    author: 'Sarah Lefevre',
    avatar: 'S',
    role: 'Fullstack Engineer',
    date: 'Il y a 1 semaine',
    content: "Très accessible et bien structuré. J'ai dû ajuster un peu les classes Tailwind pour correspondre à mon thème, mais la structure de base est solide. Super boulot.",
    likes: 24,
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const componentId = searchParams.get('componentId');
  
  // For now, we return all comments regardless of componentId to mimic the existing behavior,
  // but we can filter by componentId in a real DB.
  return NextResponse.json({ comments }, { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { content, componentId } = body;

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const newComment = {
      id: Date.now(),
      author: 'Utilisateur Anonyme',
      avatar: 'U',
      role: 'Guest',
      date: "À l'instant",
      content,
      likes: 0,
      componentId: componentId || null,
    };

    comments = [newComment, ...comments];

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
