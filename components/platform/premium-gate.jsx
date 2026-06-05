'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export function PremiumGate({ allowed, children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (allowed) return children;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden rounded-lg border-border/50 bg-card/90 max-w-xl mx-auto mt-12">
        <div className="p-8 text-center flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-6">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-4">
            {user ? "IA réservée aux abonnés" : "Connectez-vous pour l'IA"}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground mb-8">
            {user 
              ? "Cette fonctionnalité est verrouillée car votre compte n'a pas d'abonnement actif. Découvrez nos offres pour y accéder." 
              : "Veuillez vous connecter ou créer un compte pour utiliser l'assistant IA VixLuxia."}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row w-full sm:w-auto">
            {user ? (
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/abonnement">Voir les abonnements</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/auth">Se connecter</Link>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
