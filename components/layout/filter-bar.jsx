'use client';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FilterBar({ view = 'grid', onViewChange, sortBy = 'newest', onSortChange, total = 0 }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/30 mb-6">
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">
          {total} component{total !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Sort */}
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-[11px] gap-1.5"
          onClick={() => onSortChange?.(sortBy === 'newest' ? 'popular' : 'newest')}
        >
          <ArrowUpDown className="w-3 h-3" />
          {sortBy === 'newest' ? 'Newest' : 'Popular'}
        </Button>

        {/* View Toggle */}
        <div className="flex items-center border border-border/50 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange?.('grid')}
            className={cn(
              'p-1.5 transition-colors',
              view === 'grid' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewChange?.('list')}
            className={cn(
              'p-1.5 transition-colors',
              view === 'list' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
