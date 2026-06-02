'use client';
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const AUTHORS = [
  {
    id: 'serafimcloud',
    name: 'Serafim',
    username: '@serafimcloud',
    avatar: '🧑‍💻',
    components: 42,
    likes: 1280,
    bio: 'Building 21st.dev — npm for design engineers',
    tags: ['UI', 'Animations', 'Layout'],
  },
  {
    id: 'shadcnblocks',
    name: 'Shadcn Blocks',
    username: '@shadcnblockscom',
    avatar: '🎨',
    components: 36,
    likes: 980,
    bio: 'Hundreds of finely crafted components built with React & Tailwind',
    tags: ['Blocks', 'Marketing', 'Landing'],
  },
  {
    id: 'magicui',
    name: 'Magic UI',
    username: '@magicuidesign',
    avatar: '✨',
    components: 28,
    likes: 850,
    bio: 'Beautiful animated components for modern web apps',
    tags: ['Animations', 'Effects', 'Motion'],
  },
  {
    id: 'aceternity',
    name: 'Aceternity',
    username: '@acetaboratory',
    avatar: '🌟',
    components: 24,
    likes: 720,
    bio: 'Copy paste the most trending components and use them in your websites',
    tags: ['3D', 'Shaders', 'Interactive'],
  },
  {
    id: 'luxeui',
    name: 'Luxe UI',
    username: '@luxeui',
    avatar: '💎',
    components: 18,
    likes: 540,
    bio: 'Premium quality UI components for Next.js',
    tags: ['Premium', 'Elegant', 'Modern'],
  },
  {
    id: 'ibelick',
    name: 'Ibelick',
    username: '@ibelick',
    avatar: '🔥',
    components: 15,
    likes: 460,
    bio: 'Creative developer building unique UI experiences',
    tags: ['Creative', 'Backgrounds', 'Experimental'],
  },
];

export default function AuthorsPage() {
  const [search, setSearch] = useState('');

  const filteredAuthors = search
    ? AUTHORS.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.username.toLowerCase().includes(search.toLowerCase())
      )
    : AUTHORS;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar search={search} onSearchChange={setSearch} />
        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title="Top Authors" />
          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Top Authors</h1>
                <p className="text-sm text-muted-foreground mt-1">Discover the most active contributors in the community</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuthors.map((author, idx) => (
                  <Card key={author.id} className="overflow-hidden border-none bg-muted/30 hover:bg-muted/50 transition-colors rounded-2xl">
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-2xl shrink-0">
                          {author.avatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm truncate">{author.name}</h3>
                            {idx < 3 && (
                              <span className="text-[10px] font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-1.5 py-0.5 rounded-full">
                                Top {idx + 1}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{author.username}</p>
                          <p className="text-xs text-foreground/80 mt-2 line-clamp-2">{author.bio}</p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {author.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border/50 text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/30">
                        <div className="text-center">
                          <p className="text-sm font-bold">{author.components}</p>
                          <p className="text-[10px] text-muted-foreground">Components</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold">{author.likes.toLocaleString()}</p>
                          <p className="text-[10px] text-muted-foreground">Likes</p>
                        </div>
                        <div className="ml-auto">
                          <Button variant="outline" size="sm" className="text-xs h-7 rounded-full px-3">
                            <Github className="w-3 h-3 mr-1" />
                            Follow
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
