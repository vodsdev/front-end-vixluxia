'use client';
import { useState, useMemo } from 'react';
import { Search, Sparkles, LayoutGrid, Clock, Trophy, Palette, Users, Megaphone } from 'lucide-react';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';
import * as Previews from '@/components/previews';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.desc.toLowerCase().includes(q)
    );
  }, [search]);

  const currentPrompts = useMemo(() => {
    if (!selectedCategory) return [];
    return PROMPTS[selectedCategory] || [];
  }, [selectedCategory]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="p-4 flex flex-row items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">21st Clone</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent className="px-2">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search components..." 
                    className="pl-9 bg-muted/50 border-none h-9 text-sm"
                  />
                </div>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={!selectedCategory} onClick={() => setSelectedCategory(null)}>
                      <LayoutGrid className="w-4 h-4" />
                      <span>Discover</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Clock className="w-4 h-4" />
                      <span>Newest</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Trophy className="w-4 h-4" />
                      <span>Best of Week</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase text-muted-foreground/70">Categories</SidebarGroupLabel>
              <SidebarGroupContent className="px-2">
                <SidebarMenu>
                  {filteredCategories.map((cat) => (
                    <SidebarMenuItem key={cat.slug}>
                      <SidebarMenuButton 
                        isActive={selectedCategory === cat.slug}
                        onClick={() => setSelectedCategory(cat.slug)}
                      >
                        <span className="text-lg mr-1">{cat.emoji}</span>
                        <span className="truncate">{cat.name}</span>
                        <span className="ml-auto text-[10px] text-muted-foreground">{(PROMPTS[cat.slug] || []).length}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h2 className="font-semibold text-sm">
                {selectedCategory ? CATEGORIES.find(c => c.slug === selectedCategory)?.name : 'Discover Components'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-xs font-medium">Log in</Button>
              <Button size="sm" className="text-xs font-medium rounded-full px-4">Publish</Button>
            </div>
          </header>

          <div className="p-8 max-w-7xl mx-auto w-full">
            {!selectedCategory ? (
              <div className="space-y-12">
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold tracking-tight">Featured</h3>
                    <Button variant="link" className="text-muted-foreground text-xs">View all</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CATEGORIES.slice(0, 6).map((cat) => (
                      <Card key={cat.slug} className="group cursor-pointer overflow-hidden border-none bg-muted/30 hover:bg-muted/50 transition-colors rounded-2xl" onClick={() => setSelectedCategory(cat.slug)}>
                        <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500">
                          {cat.emoji}
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-sm">{cat.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{cat.desc}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>
                
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold tracking-tight">Newest Components</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder for real prompts */}
                    {Object.values(PROMPTS).flat().slice(0, 9).map((p) => {
                      const Preview = Previews[p.preview];
                      return (
                        <Card key={p.id} className="group cursor-pointer overflow-hidden border-none bg-muted/30 hover:bg-muted/50 transition-colors rounded-2xl">
                          <div className="aspect-video bg-white dark:bg-neutral-950 flex items-center justify-center p-6 border-b border-border/50">
                            {Preview ? <Preview /> : <span className="text-4xl">✨</span>}
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-sm">{p.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{p.tagline}</p>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col gap-2">
                  <h1 className="text-4xl font-bold tracking-tight">{CATEGORIES.find(c => c.slug === selectedCategory)?.name}</h1>
                  <p className="text-muted-foreground">{CATEGORIES.find(c => c.slug === selectedCategory)?.desc}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPrompts.map((p) => {
                    const Preview = Previews[p.preview];
                    return (
                      <Card key={p.id} className="group cursor-pointer overflow-hidden border-none bg-muted/30 hover:bg-muted/50 transition-colors rounded-2xl">
                        <div className="aspect-video bg-white dark:bg-neutral-950 flex items-center justify-center p-6 border-b border-border/50">
                          {Preview ? <Preview /> : <span className="text-4xl">✨</span>}
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-sm">{p.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{p.tagline}</p>
                        </div>
                      </Card>
                    );
                  })}
                  {currentPrompts.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-muted-foreground">No components found in this category yet.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
