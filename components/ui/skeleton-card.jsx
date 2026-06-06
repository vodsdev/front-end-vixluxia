import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SkeletonCard({ className }) {
  return (
    <div className={cn("group h-full", className)}>
      <Card className="overflow-hidden border border-border/40 bg-card rounded-2xl h-full flex flex-col shadow-sm">
        {/* Preview Section Skeleton */}
        <div className="aspect-[16/10] bg-white dark:bg-neutral-950 flex items-center justify-center p-6 border-b border-border/30 overflow-hidden relative">
          <div className="w-full h-full animate-pulse bg-gradient-to-r from-muted/30 to-muted/10 opacity-50 rounded" />
        </div>

        {/* Content Section Skeleton */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="h-[22px] w-[60px] rounded-full animate-pulse bg-gradient-to-r from-muted to-muted/50" />
              <div className="h-[22px] w-[34px] rounded-full animate-pulse bg-gradient-to-r from-muted to-muted/50" />
            </div>
            
            <div className="h-4 w-3/4 rounded animate-pulse bg-gradient-to-r from-muted to-muted/50 mt-1 mb-2" />
            
            <div className="space-y-1.5 mt-2">
              <div className="h-[11px] w-full rounded animate-pulse bg-gradient-to-r from-muted to-muted/50" />
              <div className="h-[11px] w-5/6 rounded animate-pulse bg-gradient-to-r from-muted to-muted/50" />
            </div>
            
            <div className="mt-3 h-[10px] w-1/3 rounded animate-pulse bg-gradient-to-r from-muted to-muted/50" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30">
            <div className="flex-1 h-7 rounded-md animate-pulse bg-gradient-to-r from-muted to-muted/50" />
            <div className="w-7 h-7 rounded-md animate-pulse bg-gradient-to-r from-muted to-muted/50" />
            <div className="ml-auto w-6 h-[10px] rounded animate-pulse bg-gradient-to-r from-muted to-muted/50" />
          </div>
        </div>
      </Card>
    </div>
  );
}
