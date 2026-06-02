'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Copy, Check, Heart, Code2, Eye, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';
import * as Previews from '@/components/previews';
import Link from 'next/link';

export default function ComponentDetailPage() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const searchParams = useSearchParams();
  const componentId = searchParams.get('id');

  const component = useMemo(() => {
    for (const [slug, items] of Object.entries(PROMPTS)) {
      const found = items.find(item => item.id === componentId);
      if (found) return { ...found, categorySlug: slug };
    }
    return null;
  }, [componentId]);

  const category = component ? CATEGORIES.find(c => c.slug === component.categorySlug) : null;
  const Preview = component ? Previews[component.preview] : null;

  const handleCopy = () => {
    if (!component) return;
    navigator.clipboard.writeText(component.prompt);
    setCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  if (!component) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar search={search} onSearchChange={setSearch} />
          <main className="flex-1 flex flex-col min-w-0">
            <AppHeader title="Component" />
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Component not found</p>
                <Button variant="link" asChild className="mt-2">
                  <Link href="/">← Back to home</Link>
                </Button>
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar search={search} onSearchChange={setSearch} />
        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title={component.name}>
            <span className="text-xs text-muted-foreground">
              by <span className="text-foreground font-medium">Community</span>
            </span>
          </AppHeader>

          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
              {/* Back Link */}
              <Link href={category ? `/?category=${category.slug}` : '/'} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="w-3.5 h-3.5" />
                {category ? category.name : 'All Components'}
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Preview Area */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Tabs */}
                  <div className="flex items-center gap-1 border-b border-border/50 pb-0">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                        activeTab === 'preview'
                          ? 'border-primary text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 inline mr-1.5" />
                      Preview
                    </button>
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                        activeTab === 'code'
                          ? 'border-primary text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5 inline mr-1.5" />
                      Code
                    </button>
                  </div>

                  {/* Content */}
                  {activeTab === 'preview' ? (
                    <Card className="border-none bg-muted/20 rounded-2xl overflow-hidden">
                      <div className="aspect-video bg-white dark:bg-neutral-950 flex items-center justify-center p-8">
                        {Preview ? <Preview /> : <span className="text-6xl">✨</span>}
                      </div>
                    </Card>
                  ) : (
                    <Card className="border-none bg-muted/20 rounded-2xl overflow-hidden">
                      <div className="p-4 bg-neutral-950 rounded-2xl">
                        <pre className="text-xs text-neutral-300 font-mono overflow-auto max-h-[500px] whitespace-pre-wrap leading-relaxed">
                          {component.prompt}
                        </pre>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  {/* Component Info */}
                  <Card className="border-none bg-muted/30 rounded-2xl p-6">
                    <h1 className="text-xl font-bold tracking-tight">{component.name}</h1>
                    <p className="text-sm text-muted-foreground mt-2">{component.tagline}</p>

                    {/* Category Badge */}
                    {category && (
                      <div className="mt-4">
                        <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-background border border-border/50">
                          <span>{category.emoji}</span>
                          {category.name}
                        </span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 space-y-3">
                      <Button className="w-full rounded-xl" onClick={handleCopy}>
                        {copied ? (
                          <><Check className="w-4 h-4 mr-2" /> Copied!</>
                        ) : (
                          <><Copy className="w-4 h-4 mr-2" /> Copy Prompt</>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl"
                        onClick={() => setLiked(!liked)}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                        {liked ? 'Liked' : 'Like'}
                      </Button>
                    </div>
                  </Card>

                  {/* Stats */}
                  <Card className="border-none bg-muted/30 rounded-2xl p-6">
                    <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-4">Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Downloads</span>
                        <span className="text-xs font-medium">{Math.floor(Math.random() * 5000) + 100}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Likes</span>
                        <span className="text-xs font-medium">{Math.floor(Math.random() * 500) + 10}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Published</span>
                        <span className="text-xs font-medium">2 days ago</span>
                      </div>
                    </div>
                  </Card>

                  {/* Dependencies */}
                  <Card className="border-none bg-muted/30 rounded-2xl p-6">
                    <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-4">Dependencies</h3>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border/50 text-muted-foreground">react</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border/50 text-muted-foreground">tailwindcss</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border/50 text-muted-foreground">framer-motion</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-background border border-border/50 text-muted-foreground">lucide-react</span>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
