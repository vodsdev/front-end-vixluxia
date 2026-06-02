'use client';
import { motion } from 'framer-motion';
import { Copy, Check, Heart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ComponentCard({ component, preview: Preview, onCopy }) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(component.prompt);
    setCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
    onCopy?.(component.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden border-none bg-muted/30 hover:bg-muted/50 transition-colors rounded-2xl cursor-pointer h-full flex flex-col">
        {/* Preview Section */}
        <div className="aspect-video bg-white dark:bg-neutral-950 flex items-center justify-center p-6 border-b border-border/50 overflow-hidden">
          {Preview ? (
            <Preview />
          ) : (
            <div className="text-4xl opacity-50">✨</div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h4 className="font-bold text-sm leading-tight">{component.name}</h4>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
              {component.tagline}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30">
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 h-8 text-xs font-medium gap-1.5"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0"
              onClick={() => setLiked(!liked)}
            >
              <Heart
                className={cn(
                  'w-3.5 h-3.5 transition-colors',
                  liked
                    ? 'fill-red-500 text-red-500'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
