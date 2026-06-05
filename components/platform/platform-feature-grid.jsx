'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Code2, CreditCard, Share2, Upload, KeyRound } from 'lucide-react';
import { Card } from '@/components/ui/card';

const FEATURES = [
  {
    href: '/api',
    title: 'API',
    description: 'Documentation claire pour brancher les endpoints VixLuxia.',
    icon: Code2,
  },
  {
    href: '/abonnement',
    title: 'Abonnement',
    description: 'Offres Free, Pro et Studio avec une structure prete pour Stripe.',
    icon: CreditCard,
  },
  {
    href: '/affiliation',
    title: 'Affiliation',
    description: 'Lien d invitation, commissions et suivi des conversions.',
    icon: Share2,
  },
  {
    href: '/ia',
    title: 'IA premium',
    description: 'Assistant IA verrouille pour les comptes payants.',
    icon: Bot,
  },
  {
    href: '/publish',
    title: 'Publish',
    description: 'Soumission de composants avec preview et sauvegarde locale.',
    icon: Upload,
  },
  {
    href: '/api-keys',
    title: 'API Keys',
    description: 'Generation de cles pour consommer l API publique.',
    icon: KeyRound,
  },
];

export function PlatformFeatureGrid() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.35 }}
        className="mb-5"
      >
        <h3 className="text-lg font-bold tracking-tight">Nouveaux espaces</h3>
        <p className="mt-1 text-xs text-muted-foreground">API, abonnement, affiliation et IA premium.</p>
      </motion.div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              whileHover={{ y: -3 }}
            >
              <Link href={feature.href}>
                <Card className="group h-full rounded-lg border-border/50 bg-card/80 p-4 transition-all hover:bg-accent/20 hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background transition-transform group-hover:scale-105">
                      <Icon className="h-4 w-4" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                  <h4 className="mt-5 text-sm font-bold">{feature.title}</h4>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{feature.description}</p>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
