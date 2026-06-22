'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, LayoutGrid, Clock, Trophy, Palette, Users, Search, Settings, Sun, Moon, FolderClosed, Code2, CreditCard, Share2, Bot, Upload, KeyRound, Wand2, BarChart3, Globe } from 'lucide-react';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';
import { cn } from '@/lib/utils';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['700', '900'] });

const NAV_ITEMS = [
  { href: '/', label: 'Discover', icon: LayoutGrid },
  { href: '/featured', label: 'Featured', icon: Sparkles },
  { href: '/newest', label: 'Newest', icon: Clock },
  { href: '/week', label: 'Best of Week', icon: Trophy },
  { href: '/themes', label: 'Themes', icon: Palette },
  { href: '/authors', label: 'Top Authors', icon: Users },
  { href: '/public', label: 'Public Registry', icon: Globe },
];

const PLATFORM_ITEMS = [
  { href: '/ia', label: 'IA Premium', icon: Bot },
  { href: '/api', label: 'API Platform', icon: Code2 },
  { href: '/abonnement', label: 'Abonnement', icon: CreditCard },
  { href: '/affiliation', label: 'Affiliation', icon: Share2 },
  { href: '/publish', label: 'Publish', icon: Upload },
];

import { MessageSquareQuote, Info } from 'lucide-react';

const COMMUNITY_ITEMS = [
  { href: '/avis', label: 'Avis', icon: MessageSquareQuote },
  { href: '/info', label: 'Informations', icon: Info },
];

export function AppSidebar({ search, onSearchChange }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('vixluxia-theme');
    const t = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  }, []);

  return (
    <Sidebar className="overflow-hidden relative border-none">
      <SidebarHeader className="p-10 pb-6 flex flex-col items-center gap-6">
        {/* Logo HD repositionné (plus bas) */}
        <img src="/logo-sparkle-hd.png" alt="Logo" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
        
        {/* Texte VixLuxia Pur */}
        <Link href="/" className="relative flex items-center justify-center w-full group">
          <span 
            className={cn(
              outfit.className,
              "relative font-black text-[28px] tracking-tighter bg-clip-text text-transparent transition-all duration-500",
              "bg-gradient-to-r from-violet-600 via-pink-400 via-white to-violet-600 dark:from-violet-400 dark:via-fuchsia-300 dark:via-white dark:to-violet-400"
            )}
            style={{ 
              backgroundSize: '300% auto', 
              animation: 'logo-shimmer 4s linear infinite' 
            }}
          >
            VixLuxia
          </span>
          <style>{`
            @keyframes logo-shimmer {
              0% { background-position: 0% center; }
              100% { background-position: -300% center; }
            }
          `}</style>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-transparent">
        {/* Search */}
        <SidebarGroup>
          <SidebarGroupContent className="px-3 pt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                value={search || ''}
                onChange={(e) => onSearchChange?.(e.target.value)}
                placeholder="Search"
                className="pl-9 h-8 text-xs bg-background/50 border-transparent rounded-md shadow-sm backdrop-blur-sm focus-visible:ring-1 focus-visible:ring-border/50"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-background/50 border-transparent rounded px-1.5 py-0.5">⌘K</kbd>
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
                    <SidebarMenuButton 
                      asChild 
                      isActive={isActive}
                      className="hover:bg-foreground/5 data-[active=true]:bg-foreground/10 hover:text-foreground data-[active=true]:text-foreground transition-all duration-200"
                    >
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

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {PLATFORM_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="hover:bg-foreground/5 data-[active=true]:bg-foreground/10 hover:text-foreground data-[active=true]:text-foreground transition-all duration-200"
                    >
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

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            Communauté
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {COMMUNITY_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="hover:bg-foreground/5 data-[active=true]:bg-foreground/10 hover:text-foreground data-[active=true]:text-foreground transition-all duration-200"
                    >
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

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
            Collections
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={searchParams.get('group') === 'marketing'}
                  className="hover:bg-foreground/5 data-[active=true]:bg-foreground/10 hover:text-foreground data-[active=true]:text-foreground transition-all duration-200"
                >
                  <Link href="/?group=marketing" className="text-xs">
                    <FolderClosed className="w-4 h-4" />
                    <span>Marketing Blocks</span>
                    <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
                      10
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={searchParams.get('group') === 'ui'}
                  className="hover:bg-foreground/5 data-[active=true]:bg-foreground/10 hover:text-foreground data-[active=true]:text-foreground transition-all duration-200"
                >
                  <Link href="/?group=ui" className="text-xs">
                    <LayoutGrid className="w-4 h-4" />
                    <span>UI Components</span>
                    <span className="ml-auto text-[10px] text-muted-foreground tabular-nums">
                      10
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
