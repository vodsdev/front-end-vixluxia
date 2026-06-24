'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Zap, ShieldAlert, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

export function PremiumGate({ allowed, children }) {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  if (allowed) return children;

  return (
    <div className="relative min-h-[600px] flex items-center justify-center p-6">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card className="overflow-hidden rounded-[32px] border-border/40 bg-card/40 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
          <div className="p-10 text-center flex flex-col items-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-violet-600/20 blur-2xl rounded-full scale-150" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-xl">
                <ShieldAlert className="h-10 w-10" />
              </div>
            </div>

            <h1 className="text-4xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              {user ? "Accès Premium Requis" : "Connexion Requise"}
            </h1>
            
            <p className="text-lg leading-relaxed text-muted-foreground mb-10 max-w-md mx-auto font-medium">
              {user 
                ? "Le Studio IA et les fonctionnalités avancées sont réservés à nos membres privilèges. Libérez votre potentiel créatif dès maintenant." 
                : "Rejoignez la communauté VixLuxia pour accéder à notre moteur d'IA générative et à des centaines de composants exclusifs."}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row w-full justify-center">
              {user ? (
                <>
                  <Button asChild size="lg" className="rounded-2xl h-14 px-10 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20 text-sm font-black uppercase tracking-widest gap-3">
                    <Link href="/abonnement">
                      <Zap className="w-4 h-4 fill-current" />
                      Devenir Premium
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="rounded-2xl h-14 px-10 border-border/40 hover:bg-muted/50 text-sm font-black uppercase tracking-widest">
                    <Link href="/">Retour à l'accueil</Link>
                  </Button>
                </>
              ) : (
                <Button asChild size="lg" className="rounded-2xl h-14 px-10 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20 text-sm font-black uppercase tracking-widest gap-3">
                  <Link href="/auth">
                    Se connecter
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Visa_2021.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
