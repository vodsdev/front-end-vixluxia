'use client';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { PROMPTS } from '@/lib/prompts-data';
import * as Previews from '@/components/previews';
import { cn } from '@/lib/utils';

export function CategoryGrid({ categories, onSelect, selectedCategory }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((cat, idx) => {
        const firstComponent = PROMPTS[cat.slug]?.[0];
        const PreviewComponent = firstComponent ? Previews[firstComponent.preview] : null;

        return (
          <motion.div
          key={cat.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03, duration: 0.3 }}
          whileHover={{ y: -2 }}
        >
          <Card
            className={cn(
              'group cursor-pointer overflow-hidden border transition-all rounded-xl h-full flex flex-col',
              selectedCategory === cat.slug
                ? 'bg-primary/10 ring-2 ring-primary border-primary'
                : 'border-border/40 hover:border-border/80 bg-card hover:bg-accent/30'
            )}
            onClick={() => onSelect(cat.slug)}
          >
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b">
              {PreviewComponent ? (
                <div className="absolute inset-0 pointer-events-none origin-top-left scale-[0.6] md:scale-[0.8] w-[166%] h-[166%] md:w-[125%] md:h-[125%] group-hover:scale-[0.65] md:group-hover:scale-[0.85] transition-transform duration-500">
                  <PreviewComponent />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                  {cat.emoji}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-3">
              <h4 className="font-semibold text-xs leading-tight">{cat.name}</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {(PROMPTS[cat.slug] || []).length} components
              </p>
            </div>
          </Card>
        </motion.div>
      );
      })}
    </div>
  );
}
