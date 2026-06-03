'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, LayoutGrid, Clock, Trophy, Palette, Users, Search, Settings, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Discover', icon: LayoutGrid },
  { href: '/featured', label: 'Featured', icon: Sparkles },
  { href: '/newest', label: 'Newest', icon: Clock },
  { href: '/week', label: 'Best of Week', icon: Trophy },
  { href: '/themes', label: 'Themes', icon: Palette },
  { href: '/authors', label: 'Top Authors', icon: Users },
];

export function AppSidebar({ search, onSearchChange }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('vixluxia-theme');
    const t = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('vixluxia-theme', next);
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-4 flex flex-row items-center gap-2 border-b border-border/50">
      </SidebarHeader>

      <SidebarContent>
        {/* Search */}
        <SidebarGroup>
          <SidebarGroupContent className="px-3 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                value={search || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search"
                className="pl-9 h-8 text-xs bg-muted/50 border-none rounded-md"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-background border border-border rounded px-1.5 py-0.5">⌘K</kbd>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href} className="text-xs">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Marketing Blocks */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            Marketing Blocks
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {CATEGORIES.filter((_, i) => i < 10).map((cat) => (
                <SidebarMenuItem key={cat.slug}>
                  <SidebarMenuButton asChild isActive={pathname === `/category/${cat.slug}`}>
                    <Link href={`/?category=${cat.slug}`} className="text-xs">
                      <span className="text-sm">{cat.emoji}</span>
                      <span className="truncate">{cat.name}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
                        {(PROMPTS[cat.slug] || []).length}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* UI Components */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            UI Components
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {CATEGORIES.filter((_, i) => i >= 10).map((cat) => (
                <SidebarMenuItem key={cat.slug}>
                  <SidebarMenuButton asChild isActive={pathname === `/category/${cat.slug}`}>
                    <Link href={`/?category=${cat.slug}`} className="text-xs">
                      <span className="text-sm">{cat.emoji}</span>
                      <span className="truncate">{cat.name}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
                        {(PROMPTS[cat.slug] || []).length}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
