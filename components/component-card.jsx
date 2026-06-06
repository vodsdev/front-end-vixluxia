'use client';
import { motion } from 'framer-motion';
import { Copy, Check, Heart, ExternalLink } from 'lucide-react';
import { useState, memo } from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser, likeComponent, unlikeComponent } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useComponentInteractions } from '@/hooks/use-component-interactions';
import { cn } from '@/lib/utils';
import { TiltCard } from '@/components/ui/tilt-card';

export const ComponentCard = memo(function ComponentCard({ component, preview: Preview, onCopy }) {
  const [copied, setCopied] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const interactions = useComponentInteractions(component.id);
  const router = useRouter();

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(component.prompt);
    setCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
    onCopy?.(component.id);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLiking) return;

    try {
      setIsLiking(true);
      const user = await getCurrentUser();
      
      if (!user) {
        toast.error('You must be logged in to like components');
        router.push('/login');
        return;
      }

      // Optimistic update
      interactions.toggleFavorite();

      if (interactions.isFavorite) {
        // Was liked, now unliking
        await unlikeComponent(component.id, user.id);
      } else {
        // Was unliked, now liking
        await likeComponent(component.id, user.id);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like status');
      // Revert optimistic update on failure
      interactions.toggleFavorite();
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="group h-full"
    >
      <Link href={`/component?id=${component.id}`} className="block h-full">
        <TiltCard>
          <Card className="overflow-hidden border border-border/40 hover:border-border/80 bg-card hover:bg-accent/30 transition-all rounded-2xl cursor-pointer h-full flex flex-col shadow-sm hover:shadow-md">
            {/* Preview Section */}
            <div className="aspect-[16/10] bg-white dark:bg-neutral-950 flex items-center justify-center p-6 border-b border-border/30 overflow-hidden relative">
              {Preview ? (
                <Preview />
              ) : (
                <div className="text-4xl opacity-50">✨</div>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <Badge variant="outline" className="max-w-[130px] truncate text-[10px]">
                    {component.categoryName || component.categorySlug || 'Component'}
                  </Badge>
                  {component.meta?.premium && <Badge className="text-[10px]">Pro</Badge>}
                </div>
                <h4 className="font-semibold text-sm leading-tight">{component.name}</h4>
                <p className="text-[11px] text-muted-foreground mt-1.5 line-clamp-2">
                  {component.tagline}
                </p>
                {component.author && (
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    by <span className="text-foreground/80">{component.author.name}</span>
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30">
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 h-7 text-[11px] font-medium gap-1.5"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-7 h-7 p-0"
                  onClick={handleLike}
                >
                  <Heart
                    className={cn(
                      'w-3 h-3 transition-colors',
                      interactions.isFavorite
                        ? 'fill-red-500 text-red-500'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  />
                </Button>
                {component.stats && (
                  <span className="ml-auto text-[10px] tabular-nums text-muted-foreground">
                    {component.stats.likes}
                  </span>
                )}
              </div>
            </div>
          </Card>
        </TiltCard>
      </Link>
    </motion.div>
  );
});
