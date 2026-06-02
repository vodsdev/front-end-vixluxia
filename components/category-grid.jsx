'use client';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function CategoryGrid({ categories, onSelect, selectedCategory }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat, idx) => (
        <motion.div
          key={cat.slug}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.3 }}
          whileHover={{ y: -4 }}
        >
          <Card
            className={cn(
              'group cursor-pointer overflow-hidden border-none transition-all rounded-2xl h-full',
              selectedCategory === cat.slug
                ? 'bg-primary/10 ring-2 ring-primary'
                : 'bg-muted/30 hover:bg-muted/50'
            )}
            onClick={() => onSelect(cat.slug)}
          >
            <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
              {cat.emoji}
            </div>
            <div className="p-4">
              <h4 className="font-bold text-sm leading-tight">{cat.name}</h4>
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">
                {cat.desc}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
