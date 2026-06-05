'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, Package, ThumbsUp, TrendingUp } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAuthorsWithStats } from '@/lib/component-registry';

export default function AuthorsPage() {
  const [search, setSearch] = useState('');
  const authors = useMemo(() => getAuthorsWithStats(), []);

  const filteredAuthors = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return authors;
    return authors.filter((author) => {
      const haystack = [
        author.name,
        author.username,
        author.bio,
        author.role,
        ...(author.tags || []),
      ].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [authors, search]);

  return (
    <PageShell title="Top Authors" maxWidth="max-w-[1200px]" search={search} onSearchChange={setSearch}>
      <div className="space-y-6">
        <AnimateIn variant="fadeUp">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Top Authors</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Profils fictifs mais realistes pour simuler une marketplace complete.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredAuthors.map((author, index) => (
            <Card key={author.id} className="rounded-lg border-border/50 bg-card/80 p-5 transition-colors hover:bg-accent/20">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-foreground text-sm font-black text-background">
                  {author.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-black">{author.name}</h2>
                    {index < 3 && <Badge>Top {index + 1}</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{author.username} · {author.role}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{author.bio}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-md border border-border/50 bg-background p-3">
                  <Package className="mb-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-black">{author.stats.components}</p>
                  <p className="text-[10px] text-muted-foreground">Components</p>
                </div>
                <div className="rounded-md border border-border/50 bg-background p-3">
                  <ThumbsUp className="mb-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-black">{author.stats.likes.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Likes</p>
                </div>
                <div className="rounded-md border border-border/50 bg-background p-3">
                  <TrendingUp className="mb-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-black">{author.stats.downloads.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Downloads</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(author.tags || []).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant={tag === 'Owner' ? 'default' : 'outline'}
                    className={tag === 'Owner' ? 'bg-primary text-primary-foreground font-bold shadow-sm' : ''}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Composants recents</p>
                {author.featuredComponents.map((component) => (
                  <Link
                    key={component.id}
                    href={`/component?id=${component.id}`}
                    className="flex items-center justify-between gap-3 rounded-md border border-border/50 bg-background px-3 py-2 text-xs transition-colors hover:bg-accent/50"
                  >
                    <span className="truncate font-medium">{component.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex justify-end">
                <Button variant="outline" size="sm" className="rounded-md">
                  <Github className="h-3.5 w-3.5" />
                  Follow
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
