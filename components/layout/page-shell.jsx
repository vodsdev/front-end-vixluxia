'use client';

import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { cn } from '@/lib/utils';

export function PageShell({
  title,
  children,
  headerChildren,
  contentClassName,
  maxWidth = 'max-w-[1200px]',
  search,
  onSearchChange,
}) {
  const [internalSearch, setInternalSearch] = useState('');
  const activeSearch = search ?? internalSearch;
  const handleSearchChange = onSearchChange ?? setInternalSearch;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent">
        <AppSidebar search={activeSearch} onSearchChange={handleSearchChange} />
        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title={title}>{headerChildren}</AppHeader>
          <div className="flex-1 overflow-auto">
            <div className={cn('p-6 lg:p-8 mx-auto w-full', maxWidth, contentClassName)}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
