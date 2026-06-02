'use client';
import { useState, useMemo } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { ComponentCard } from '@/components/component-card';
import { PROMPTS } from '@/lib/prompts-data';
import * as Previews from '@/components/previews';

export default function FeaturedPage() {
  const [search, setSearch] = useState('');

  const allComponents = useMemo(() => {
    return Object.entries(PROMPTS).flatMap(([slug, items]) =>
      items.map(item => ({ ...item, categorySlug: slug }))
    );
  }, []);

  const featured = useMemo(() => {
    const items = allComponents.slice(0, 12);
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter(c => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q));
  }, [search, allComponents]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar search={search} onSearchChange={setSearch} />
        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title="Featured" />
          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Featured Components</h1>
                <p className="text-sm text-muted-foreground mt-1">Hand-picked components by the community</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {featured.map((p) => {
                  const Preview = Previews[p.preview];
                  return <ComponentCard key={p.id} component={p} preview={Preview} />;
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
