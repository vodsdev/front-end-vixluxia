'use client';
'use client';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Settings } from 'lucide-react';

import { useAuth } from '@/hooks/use-auth';

export function AppHeader({ title, children }) {
  const { user, loading } = useAuth();

  return (
    <header className="h-14 flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-md z-50 border-b border-border/40">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <h2 className="font-semibold text-sm">{title}</h2>
        {children}
      </div>
      <div className="flex items-center gap-3">
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Settings className="w-4 h-4" />
          </Button>
        </Link>
        
        {!loading && !user && (
          <Button variant="ghost" size="sm" className="text-xs font-medium hidden sm:inline-flex" asChild>
            <Link href="/auth">Log in</Link>
          </Button>
        )}
        
        <Button size="sm" className="text-xs font-medium rounded-full px-4 shadow-sm" asChild>
          <Link href="/publish">Publish</Link>
        </Button>
      </div>
    </header>
  );
}
