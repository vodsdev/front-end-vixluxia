'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function MetricCard({ label, value, detail, icon: Icon, tone = 'neutral', delay = 0 }) {
  const toneClass = {
    neutral: 'bg-foreground text-background',
    violet: 'bg-violet-600 text-white',
    emerald: 'bg-emerald-600 text-white',
    amber: 'bg-amber-500 text-white',
    sky: 'bg-sky-600 text-white',
  }[tone] || 'bg-foreground text-background';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -2 }}
    >
      <Card className="h-full rounded-lg border-border/50 bg-card/80 p-4 shadow-sm backdrop-blur transition-colors hover:bg-accent/20">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-black tracking-tight">{value}</p>
          </div>
          {Icon && (
            <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-md', toneClass)}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>
        {detail && <p className="mt-3 text-xs leading-5 text-muted-foreground">{detail}</p>}
      </Card>
    </motion.div>
  );
}
