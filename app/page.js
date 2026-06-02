'use client';
import { useState, useMemo } from 'react';
import { Sparkles, LayoutGrid, Clock, Trophy } from 'lucide-react';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';
import * as Previews from '@/components/previews';
import { ComponentCard } from '@/components/component-card';
import { CategoryGrid } from '@/components/category-grid';
import { SearchBar } from '@/components/search-bar';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
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
        {/* Sidebar */}
        <Sidebar className="border-r border-border/50">
          <SidebarHeader className="p-4 flex flex-row items-center gap-2 border-b border-border/50">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm tracking-tight">21st Clone</span>
          </SidebarHeader>
          <SidebarContent>
            {/* Search */}
            <SidebarGroup>
              <SidebarGroupContent className="px-2 py-4">
                <SearchBar 
                  value={search}
                  onChange={setSearch}
                  placeholder="Search components..."
                />
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Navigation */}
            <SidebarGroup>
              <SidebarGroupContent className="px-2">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={!selectedCategory} 
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm"
                    >
                      <LayoutGrid className="w-4 h-4" />
                      <span>Discover</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Newest</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sm">
                      <Trophy className="w-4 h-4" />
                      <span>Best of Week</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Categories */}
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-semibold uppercase text-muted-foreground/70">
                Categories
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-2">
                <SidebarMenu>
                  {filteredCategories.map((cat) => (
                    <SidebarMenuItem key={cat.slug}>
                      <SidebarMenuButton 
                        isActive={selectedCategory === cat.slug}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className="text-xs"
                      >
                        <span className="text-base">{cat.emoji}</span>
                        <span className="truncate text-xs">{cat.name}</span>
                        <span className="ml-auto text-[10px] text-muted-foreground">
                          {(PROMPTS[cat.slug] || []).length}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b border-border/50 flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden" />
              <h2 className="font-semibold text-sm">
                {selectedCategory 
                  ? CATEGORIES.find(c => c.slug === selectedCategory)?.name 
                  : 'Discover Components'}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-xs font-medium">
                Log in
              </Button>
              <Button size="sm" className="text-xs font-medium rounded-full px-4">
                Publish
              </Button>
            </div>
          </header>

          {/* Content */}
          <div className="p-8 max-w-7xl mx-auto w-full overflow-auto">
            {!selectedCategory ? (
              <div className="space-y-12">
                {/* Featured Section */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold tracking-tight">Featured</h3>
                    <Button variant="link" className="text-muted-foreground text-xs">
                      View all →
                    </Button>
                  </div>
                  <CategoryGrid 
                    categories={CATEGORIES.slice(0, 6)}
                    onSelect={setSelectedCategory}
                    selectedCategory={selectedCategory}
                  />
                </section>
                
                {/* Newest Components Section */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold tracking-tight">Newest Components</h3>
                    <Button variant="link" className="text-muted-foreground text-xs">
                      View all →
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.values(PROMPTS)
                      .flat()
                      .slice(0, 9)
                      .map((p) => {
                        const Preview = Previews[p.preview];
                        return (
                          <ComponentCard
                            key={p.id}
                            component={p}
                            preview={Preview}
                          />
                        );
                      })}
                  </div>
                </section>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Category Header */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center text-2xl">
                      {CATEGORIES.find(c => c.slug === selectedCategory)?.emoji}
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">
                        {CATEGORIES.find(c => c.slug === selectedCategory)?.name}
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        {CATEGORIES.find(c => c.slug === selectedCategory)?.desc}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Components Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPrompts.map((p) => {
                    const Preview = Previews[p.preview];
                    return (
                      <ComponentCard
                        key={p.id}
                        component={p}
                        preview={Preview}
                      />
                    );
                  })}
                  {currentPrompts.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                      <p className="text-muted-foreground text-sm">
                        No components found in this category yet.
                      </p>
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
