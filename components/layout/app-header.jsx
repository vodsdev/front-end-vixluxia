'use client';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Settings } from 'lucide-react';

export function AppHeader({ title, children }) {
  return (
    <header className="h-14 border-b border-border/50 flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <h2 className="font-semibold text-sm">{title}</h2>
        {children}
      </div>
      <div className="flex items-center gap-2">
        <Link href="/settings">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Settings className="w-4 h-4" />
          </Button>
        </Link>
        <Button variant="ghost" size="sm" className="text-xs font-medium">
          Log in
        </Button>
        <Button size="sm" className="text-xs font-medium rounded-full px-4 bg-primary text-primary-foreground hover:bg-primary/90">
          Publish
        </Button>
      </div>
    </header>
  );
}
