'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Copy, Check, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { useComponentInteractions } from '@/hooks/use-component-interactions';
import { cn } from '@/lib/utils';

export function ComponentListItem({ component, preview: Preview }) {
  const [copied, setCopied] = useState(false);
  const interactions = useComponentInteractions(component.id);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(component.prompt);
    setCopied(true);
    toast.success('Prompt copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative"
    >
      {/* Ambilight glow effect */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 via-purple-500/30 to-primary/30 opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100" />
      <Link href={`/component?id=${component.id}`} className="block relative z-10">
      <div className="group flex items-center gap-4 p-4 rounded-xl border border-border/40 hover:border-border/80 bg-card hover:bg-accent/20 transition-all cursor-pointer shadow-sm hover:shadow-lg">
        {/* Preview Thumbnail */}
        <div className="w-20 h-14 rounded-lg bg-white dark:bg-neutral-950 border border-border/30 flex items-center justify-center overflow-hidden shrink-0">
          {Preview ? (
            <div className="scale-[0.4] transform">
              <Preview />
            </div>
          ) : (
            <span className="text-lg">✨</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm truncate">{component.name}</h4>
            {component.meta?.premium && <Badge className="text-[10px]">Pro</Badge>}
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{component.tagline}</p>
          <p className="mt-1 text-[10px] text-muted-foreground truncate">
            {component.categoryName || component.categorySlug}
            {component.author ? ` · ${component.author.name}` : ''}
            {component.stats ? ` · ${component.stats.downloads.toLocaleString()} downloads` : ''}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-[11px] gap-1"
            onClick={handleCopy}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-7 h-7 p-0"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); interactions.toggleFavorite(); }}
          >
            <Heart className={cn('w-3 h-3', interactions.isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
          </Button>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      </Link>
    </motion.div>
  );
}
