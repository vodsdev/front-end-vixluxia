'use client';
import { cn } from '@/lib/utils';
import { SkeletonCard } from '@/components/ui/skeleton-card';

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export function ComponentCardSkeleton() {
  return <SkeletonCard />;
}

export function ComponentGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ComponentCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="w-64 border-r border-border/50 p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-8 w-full rounded-md" />
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full rounded-md" />
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-20" />
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="flex min-h-screen">
      <SidebarSkeleton />
      <div className="flex-1 p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
          <ComponentGridSkeleton />
        </div>
      </div>
    </div>
  );
}
