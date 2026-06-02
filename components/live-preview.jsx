'use client';
import { useState } from 'react';
import { Maximize2, Minimize2, RotateCcw, Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const VIEWPORTS = [
  { id: 'desktop', icon: Monitor, width: '100%', label: 'Desktop' },
  { id: 'tablet', icon: Tablet, width: '768px', label: 'Tablet' },
  { id: 'mobile', icon: Smartphone, width: '375px', label: 'Mobile' },
];

export function LivePreview({ children, className }) {
  const [viewport, setViewport] = useState('desktop');
  const [fullscreen, setFullscreen] = useState(false);

  const currentViewport = VIEWPORTS.find(v => v.id === viewport);

  return (
    <div className={cn(
      'rounded-xl overflow-hidden border border-border/50',
      fullscreen && 'fixed inset-4 z-50 bg-background shadow-2xl',
      className
    )}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border/50">
        <div className="flex items-center gap-1">
          {VIEWPORTS.map((vp) => {
            const Icon = vp.icon;
            return (
              <Button
                key={vp.id}
                variant="ghost"
                size="sm"
                className={cn(
                  'w-7 h-7 p-0',
                  viewport === vp.id ? 'text-foreground bg-accent' : 'text-muted-foreground'
                )}
                onClick={() => setViewport(vp.id)}
                title={vp.label}
              >
                <Icon className="w-3.5 h-3.5" />
              </Button>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-7 h-7 p-0 text-muted-foreground"
            onClick={() => setFullscreen(!fullscreen)}
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="bg-white dark:bg-neutral-950 flex items-center justify-center p-8 min-h-[300px] overflow-auto">
        <div
          className="w-full transition-all duration-300 flex items-center justify-center"
          style={{ maxWidth: currentViewport?.width || '100%' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
