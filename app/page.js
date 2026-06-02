'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { ComponentCard } from '@/components/component-card';
import { CategoryGrid } from '@/components/category-grid';
import { Button } from '@/components/ui/button';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';
import * as Previews from '@/components/previews';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const allComponents = useMemo(() => {
    return Object.entries(PROMPTS).flatMap(([slug, items]) =>
      items.map(item => ({ ...item, categorySlug: slug }))
    );
  }, []);

  const filteredComponents = useMemo(() => {
    if (!search) return allComponents;
    const q = search.toLowerCase();
    return allComponents.filter(c =>
      c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)
    );
  }, [search, allComponents]);

  const currentCategory = categoryParam ? CATEGORIES.find(c => c.slug === categoryParam) : null;
  const currentPrompts = categoryParam ? (PROMPTS[categoryParam] || []) : [];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar search={search} onSearchChange={setSearch} />

        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title={currentCategory ? currentCategory.name : 'Components'} />

          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
              {/* Search Results */}
              {search && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold tracking-tight">
                      Results for "{search}" <span className="text-muted-foreground font-normal text-sm">({filteredComponents.length})</span>
                    </h3>
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => setSearch('')}>
                      Clear
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredComponents.map((p) => {
                      const Preview = Previews[p.preview];
                      return <ComponentCard key={p.id} component={p} preview={Preview} />;
                    })}
                  </div>
                </div>
              )}

              {/* Category View */}
              {!search && currentCategory && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-2xl">
                      {currentCategory.emoji}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight">{currentCategory.name}</h1>
                      <p className="text-sm text-muted-foreground">{currentCategory.desc} · {currentPrompts.length} components</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentPrompts.map((p) => {
                      const Preview = Previews[p.preview];
                      return <ComponentCard key={p.id} component={p} preview={Preview} />;
                    })}
                    {currentPrompts.length === 0 && (
                      <div className="col-span-full py-20 text-center">
                        <p className="text-muted-foreground text-sm">Coming soon. New components ship every week.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Default Home View */}
              {!search && !currentCategory && (
                <div className="space-y-12">
                  {/* Featured */}
                  <section>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-bold tracking-tight">Featured</h3>
                      <Button variant="link" size="sm" className="text-xs text-muted-foreground" asChild>
                        <a href="/featured">View all →</a>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {allComponents.slice(0, 4).map((p) => {
                        const Preview = Previews[p.preview];
                        return <ComponentCard key={p.id} component={p} preview={Preview} />;
                      })}
                    </div>
                  </section>

                  {/* Newest */}
                  <section>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-bold tracking-tight">Newest</h3>
                      <Button variant="link" size="sm" className="text-xs text-muted-foreground" asChild>
                        <a href="/newest">View all →</a>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {allComponents.slice(4, 8).map((p) => {
                        const Preview = Previews[p.preview];
                        return <ComponentCard key={p.id} component={p} preview={Preview} />;
                      })}
                    </div>
                  </section>

                  {/* Popular */}
                  <section>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-bold tracking-tight">Popular</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {allComponents.slice(2, 10).map((p) => {
                        const Preview = Previews[p.preview];
                        return <ComponentCard key={p.id} component={p} preview={Preview} />;
                      })}
                    </div>
                  </section>

                  {/* Categories */}
                  <section>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-bold tracking-tight">Browse by Category</h3>
                    </div>
                    <CategoryGrid
                      categories={CATEGORIES}
                      onSelect={(slug) => window.location.href = `/?category=${slug}`}
                    />
                  </section>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
