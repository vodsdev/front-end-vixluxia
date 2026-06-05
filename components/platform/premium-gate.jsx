'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function PremiumGate({ allowed, children }) {
  if (allowed) return children;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden rounded-lg border-border/50 bg-card/90">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 lg:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-foreground text-background">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="mt-6 text-3xl font-black tracking-tight">IA reservee aux abonnes payants</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Cette page est verrouillee tant que le compte n'a pas un abonnement actif. Le verrou visuel est pret,
              mais la verification definitive doit aussi etre faite cote serveur avant tout appel IA.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-md">
                <Link href="/abonnement">Voir les abonnements</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-md">
                <Link href="/auth">Se connecter</Link>
              </Button>
            </div>
          </div>
          <div className="border-t border-border/50 bg-muted/40 p-6 lg:border-l lg:border-t-0 lg:p-8">
            <div className="rounded-lg border border-border/50 bg-background p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-500" />
                <span className="text-xs font-semibold">Apercu premium</span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="h-3 w-5/6 rounded-full bg-muted" />
                <div className="h-3 w-4/6 rounded-full bg-muted" />
                <div className="h-24 rounded-md border border-dashed border-border bg-muted/40" />
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-9 rounded-md bg-muted" />
                  <div className="h-9 rounded-md bg-muted" />
                  <div className="h-9 rounded-md bg-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
