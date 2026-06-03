'use client';
import { useState, useMemo, Suspense } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { FilterBar } from '@/components/layout/filter-bar';
import { ComponentCard } from '@/components/component-card';
import { ComponentListItem } from '@/components/component-list-item';
import { AnimateIn } from '@/components/animate-in';
import { Button } from '@/components/ui/button';
import { NEW_COMPONENTS, getComponentsByCategory } from '@/lib/new-components-data';
import * as Previews from '@/components/previews';

const CATEGORIES = [
  { slug: 'navigation', name: 'Navigation', emoji: '🧭' },
  { slug: 'forms', name: 'Forms & Inputs', emoji: '📝' },
  { slug: 'display', name: 'Display & Data', emoji: '📊' },
  { slug: 'interaction', name: 'Interaction', emoji: '🎯' },
  { slug: 'registry', name: 'Registry', emoji: '📦' },
  { slug: 'utility', name: 'Utilities', emoji: '🛠️' },
];

function ComponentsContent() {
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredComponents = useMemo(() => {
    let result = NEW_COMPONENTS;
    if (selectedCategory) {
      result = getComponentsByCategory(selectedCategory);
    }
    return result;
  }, [selectedCategory]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title="50 New Components" />

          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
              {/* Category Tabs */}
              <AnimateIn variant="fadeUp">
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                  <Button
                    variant={selectedCategory === null ? 'default' : 'outline'}
                    size="sm"
                    className="rounded-full text-xs whitespace-nowrap"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All ({NEW_COMPONENTS.length})
                  </Button>
                  {CATEGORIES.map((cat) => {
                    const count = getComponentsByCategory(cat.slug).length;
                    return (
                      <Button
                        key={cat.slug}
                        variant={selectedCategory === cat.slug ? 'default' : 'outline'}
                        size="sm"
                        className="rounded-full text-xs whitespace-nowrap gap-1.5"
                        onClick={() => setSelectedCategory(cat.slug)}
                      >
                        <span>{cat.emoji}</span>
                        {cat.name} ({count})
                      </Button>
                    );
                  })}
                </div>
              </AnimateIn>

              {/* Filter Bar */}
              <FilterBar
                view={view}
                onViewChange={setView}
                sortBy={sortBy}
                onSortChange={setSortBy}
                total={filteredComponents.length}
              />

              {/* Components Grid */}
              {view === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredComponents.map((comp, idx) => {
                    const Preview = Previews[comp.preview];
                    return (
                      <AnimateIn
                        key={comp.id}
                        variant="fadeUp"
                        delay={idx * 0.02}
                      >
                        <ComponentCard component={comp} preview={Preview} />
                      </AnimateIn>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredComponents.map((comp) => {
                    const Preview = Previews[comp.preview];
                    return (
                      <ComponentListItem
                        key={comp.id}
                        component={comp}
                        preview={Preview}
                      />
                    );
                  })}
                </div>
              )}

              {filteredComponents.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground text-sm">No components found in this category.</p>
                </div>
              )}

              <AppFooter />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default function ComponentsPage() {
  return (
    <Suspense fallback={null}>
      <ComponentsContent />
    </Suspense>
  );
}
