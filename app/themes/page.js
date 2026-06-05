'use client';
import { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const THEMES = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean and minimal with neutral tones',
    colors: ['#ffffff', '#f4f4f5', '#18181b', '#a1a1aa'],
    accent: '#18181b',
    primary: '240 5.9% 10%',
  },
  {
    id: 'violet',
    name: 'Violet',
    description: 'Rich purple accents for a modern feel',
    colors: ['#faf5ff', '#ede9fe', '#7c3aed', '#c4b5fd'],
    accent: '#7c3aed',
    primary: '262 83% 58%',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Cool blue tones inspired by the sea',
    colors: ['#eff6ff', '#dbeafe', '#2563eb', '#93c5fd'],
    accent: '#2563eb',
    primary: '221 83% 53%',
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural green palette for a calm interface',
    colors: ['#f0fdf4', '#dcfce7', '#16a34a', '#86efac'],
    accent: '#16a34a',
    primary: '142 71% 45%',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm orange and amber gradients',
    colors: ['#fffbeb', '#fef3c7', '#d97706', '#fcd34d'],
    accent: '#d97706',
    primary: '32 95% 44%',
  },
  {
    id: 'rose',
    name: 'Rose',
    description: 'Soft pink tones for an elegant look',
    colors: ['#fff1f2', '#ffe4e6', '#e11d48', '#fda4af'],
    accent: '#e11d48',
    primary: '347 77% 50%',
  },
];

export default function ThemesPage() {
  const [search, setSearch] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('default');

  useEffect(() => {
    const saved = localStorage.getItem('vixluxia-color-theme') || 'default';
    const theme = THEMES.find((item) => item.id === saved) || THEMES[0];
    applyTheme(theme);
  }, []);

  const applyTheme = (theme) => {
    setSelectedTheme(theme.id);
    localStorage.setItem('vixluxia-color-theme', theme.id);
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--ring', theme.primary);
    document.documentElement.style.setProperty('--sidebar-primary', theme.primary);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar search={search} onSearchChange={setSearch} />
        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title="Themes" />
          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Themes</h1>
                <p className="text-sm text-muted-foreground mt-1">Browse and apply color themes to your components</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {THEMES.map((theme) => (
                  <Card
                    key={theme.id}
                    className={cn(
                      'cursor-pointer overflow-hidden border transition-all rounded-2xl',
                      selectedTheme === theme.id
                        ? 'ring-2 ring-primary border-primary'
                        : 'border-border/50 hover:border-border'
                    )}
                    onClick={() => applyTheme(theme)}
                  >
                    {/* Color Preview */}
                    <div className="h-32 relative overflow-hidden">
                      <div className="absolute inset-0 grid grid-cols-4">
                        {theme.colors.map((color, i) => (
                          <div key={i} style={{ backgroundColor: color }} />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: theme.accent }}
                        >
                          Aa
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm">{theme.name}</h3>
                        {selectedTheme === theme.id && (
                          <span className="text-[10px] font-medium bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{theme.description}</p>

                      {/* Color dots */}
                      <div className="flex items-center gap-1.5 mt-3">
                        {theme.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-border/50"
                            style={{ backgroundColor: color }}
                          />
                        ))}
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
