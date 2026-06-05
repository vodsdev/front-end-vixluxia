'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function PricingCard({ plan, billingCycle, highlighted = false, delay = 0, onSelect, loading = false }) {
  const price = billingCycle === 'yearly' ? plan.yearly : plan.monthly;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.35 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card
        className={cn(
          'relative flex h-full flex-col rounded-lg border p-5 transition-all',
          highlighted
            ? 'border-foreground bg-foreground text-background shadow-xl'
            : 'border-border/50 bg-card/80 hover:bg-accent/20'
        )}
      >
        {plan.badge && (
          <Badge
            className={cn(
              'absolute right-4 top-4',
              highlighted ? 'bg-background text-foreground hover:bg-background' : ''
            )}
          >
            {plan.badge}
          </Badge>
        )}
        <div className="pr-20">
          <h3 className="text-base font-black">{plan.name}</h3>
          <p className={cn('mt-1 text-xs leading-5', highlighted ? 'text-background/70' : 'text-muted-foreground')}>
            {plan.description}
          </p>
        </div>

        <div className="mt-6 flex items-end gap-1">
          <span className="text-4xl font-black tracking-tight">{price}</span>
          {price !== '0 EUR' && (
            <span className={cn('pb-1 text-xs', highlighted ? 'text-background/70' : 'text-muted-foreground')}>
              /mois
            </span>
          )}
        </div>

        <Button
          className={cn('mt-6 w-full rounded-md', highlighted ? 'bg-background text-foreground hover:bg-background/90' : '')}
          variant={highlighted ? 'default' : 'outline'}
          disabled={loading}
          onClick={() => onSelect?.(plan)}
        >
          {loading ? 'Redirection...' : plan.cta}
        </Button>

        <div className="mt-6 space-y-3">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-xs">
              <Check className={cn('mt-0.5 h-3.5 w-3.5 shrink-0', highlighted ? 'text-background' : 'text-emerald-600')} />
              <span className={highlighted ? 'text-background/85' : 'text-muted-foreground'}>{feature}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
