'use client';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { PROMPTS } from '@/lib/prompts-data';
import { cn } from '@/lib/utils';

export function CategoryGrid({ categories, onSelect, selectedCategory }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {categories.map((cat, idx) => (
        <motion.div
          key={cat.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03, duration: 0.3 }}
          whileHover={{ y: -2 }}
        >
          <Card
            className={cn(
              'group cursor-pointer overflow-hidden border transition-all rounded-xl h-full',
              selectedCategory === cat.slug
                ? 'bg-primary/10 ring-2 ring-primary border-primary'
                : 'border-border/40 hover:border-border/80 bg-card hover:bg-accent/30'
            )}
            onClick={() => onSelect(cat.slug)}
          >
            <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
              {cat.emoji}
            </div>
            <div className="p-3">
              <h4 className="font-semibold text-xs leading-tight">{cat.name}</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {(PROMPTS[cat.slug] || []).length} components
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
