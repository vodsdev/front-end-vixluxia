'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { FilterBar } from '@/components/layout/filter-bar';
import { ComponentCard } from '@/components/component-card';
import { ComponentListItem } from '@/components/component-list-item';
import { CategoryGrid } from '@/components/category-grid';
import { HeroSection } from '@/components/hero-section';
import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/animate-in';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';
import * as Previews from '@/components/previews';
import { Sparkles, ArrowRight } from 'lucide-react';

function HomeContent() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
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
          <AnnouncementBar />
          <AppHeader title={currentCategory ? currentCategory.name : 'Components'} />

          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
              {/* Search Results */}
              {search && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold tracking-tight">
                      Results for &ldquo;{search}&rdquo;{' '}
                      <span className="text-muted-foreground font-normal text-sm">
                        ({filteredComponents.length})
                      </span>
                    </h3>
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => setSearch('')}>
                      Clear
                    </Button>
                  </div>
                  <FilterBar
                    view={view}
                    onViewChange={setView}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    total={filteredComponents.length}
                  />
                  {view === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {filteredComponents.map((p) => {
                        const Preview = Previews[p.preview];
                        return <ComponentCard key={p.id} component={p} preview={Preview} />;
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredComponents.map((p) => {
                        const Preview = Previews[p.preview];
                        return <ComponentListItem key={p.id} component={p} preview={Preview} />;
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Category View */}
              {!search && currentCategory && (
                <div className="space-y-4">
                  <AnimateIn variant="fadeUp">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-2xl">
                        {currentCategory.emoji}
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold tracking-tight">{currentCategory.name}</h1>
                        <p className="text-sm text-muted-foreground">
                          {currentCategory.desc} &middot; {currentPrompts.length} components
                        </p>
                      </div>
                    </div>
                  </AnimateIn>
                  <FilterBar
                    view={view}
                    onViewChange={setView}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    total={currentPrompts.length}
                  />
                  {view === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {currentPrompts.map((p) => {
                        const Preview = Previews[p.preview];
                        return <ComponentCard key={p.id} component={p} preview={Preview} />;
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {currentPrompts.map((p) => {
                        const Preview = Previews[p.preview];
                        return <ComponentListItem key={p.id} component={p} preview={Preview} />;
                      })}
                    </div>
                  )}
                  {currentPrompts.length === 0 && (
                    <div className="py-20 text-center">
                      <p className="text-muted-foreground text-sm">Coming soon. New components ship every week.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Default Home View */}
              {!search && !currentCategory && (
                <div className="space-y-16">
                  {/* Hero */}
                  <HeroSection />

                  {/* New Components Section */}
                  <section>
                    <AnimateIn variant="fadeUp">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-violet-500" />
                            50 New Components
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Freshly designed UI components with detailed prompts
                          </p>
                        </div>
                        <Link href="/components">
                          <Button variant="link" size="sm" className="text-xs text-muted-foreground">
                            View all →
                          </Button>
                        </Link>
                      </div>
                    </AnimateIn>
                    <Link href="/components">
                      <Card className="p-6 hover:border-border/80 hover:bg-accent/20 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-sm">Browse 50 New Components</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              Navigation, Forms, Display, Interaction, Registry, Utilities and more
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                      </Card>
                    </Link>
                  </section>

                  {/* Featured */}
                  <section>
                    <AnimateIn variant="fadeUp">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold tracking-tight">Featured</h3>
                        <Button variant="link" size="sm" className="text-xs text-muted-foreground" asChild>
                          <a href="/featured">View all &rarr;</a>
                        </Button>
                      </div>
                    </AnimateIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {allComponents.slice(0, 4).map((p) => {
                        const Preview = Previews[p.preview];
                        return <ComponentCard key={p.id} component={p} preview={Preview} />;
                      })}
                    </div>
                  </section>

                  {/* Newest */}
                  <section>
                    <AnimateIn variant="fadeUp">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold tracking-tight">Newest</h3>
                        <Button variant="link" size="sm" className="text-xs text-muted-foreground" asChild>
                          <a href="/newest">View all &rarr;</a>
                        </Button>
                      </div>
                    </AnimateIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {allComponents.slice(4, 8).map((p) => {
                        const Preview = Previews[p.preview];
                        return <ComponentCard key={p.id} component={p} preview={Preview} />;
                      })}
                    </div>
                  </section>

                  {/* Popular */}
                  <section>
                    <AnimateIn variant="fadeUp">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold tracking-tight">Popular</h3>
                      </div>
                    </AnimateIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {allComponents.slice(2, 10).map((p) => {
                        const Preview = Previews[p.preview];
                        return <ComponentCard key={p.id} component={p} preview={Preview} />;
                      })}
                    </div>
                  </section>

                  {/* Browse by Category */}
                  <section>
                    <AnimateIn variant="fadeUp">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold tracking-tight">Browse by Category</h3>
                      </div>
                    </AnimateIn>
                    <CategoryGrid
                      categories={CATEGORIES}
                      onSelect={(slug) => {
                        window.location.href = `/?category=${slug}`;
                      }}
                    />
                  </section>

                  {/* Footer */}
                  <AppFooter />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
