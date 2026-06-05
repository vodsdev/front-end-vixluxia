'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const METHOD_STYLES = {
  GET: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  POST: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
  PATCH: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
  DELETE: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300',
};

export function ApiEndpointCard({ method, path, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card className="rounded-lg border-border/50 bg-card/80 p-4 transition-colors hover:bg-accent/20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={cn('font-mono text-[10px]', METHOD_STYLES[method])}>
                {method}
              </Badge>
              <code className="break-all rounded-md bg-muted px-2 py-1 text-xs text-foreground">{path}</code>
            </div>
            <h3 className="mt-3 text-sm font-bold">{title}</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
