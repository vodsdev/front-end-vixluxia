'use client';
import { useState, useMemo } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { ComponentCard } from '@/components/component-card';
import { getAllRegistryComponents } from '@/lib/component-registry';
import * as Previews from '@/components/previews';

export default function WeekPage() {
  const [search, setSearch] = useState('');

  const allComponents = useMemo(() => {
    return getAllRegistryComponents().sort((a, b) => b.stats.votes - a.stats.votes);
  }, []);

  const weekBest = useMemo(() => {
    const items = allComponents.slice(0, 8);
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter(c => c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q));
  }, [search, allComponents]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar search={search} onSearchChange={setSearch} />
        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title="Best of the Week" />
          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <span className="text-white text-lg">🏆</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Best of the Week</h1>
                    <p className="text-sm text-muted-foreground">Top voted components this week</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {weekBest.map((p, idx) => {
                  const Preview = Previews[p.preview];
                  return (
                    <div key={p.id} className="relative">
                      {idx < 3 && (
                        <div className="absolute -top-2 -left-2 z-10 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold shadow-sm">
                          #{idx + 1}
                        </div>
                      )}
                      <ComponentCard component={p} preview={Preview} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
