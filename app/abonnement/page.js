'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CreditCard, Rocket, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { MetricCard } from '@/components/platform/metric-card';
import { PricingCard } from '@/components/platform/pricing-card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    description: 'Pour explorer les composants et tester le registre.',
    monthly: '0 EUR',
    yearly: '0 EUR',
    cta: 'Commencer',
    features: ['Acces aux composants publics', 'Recherche et favoris locaux', 'Prompts statiques', 'Support communaute'],
  },
  {
    id: 'starter',
    name: 'Starter',
    description: 'Pour publier, utiliser les cles API et demarrer l IA premium.',
    monthly: '10 EUR',
    yearly: '8 EUR',
    cta: 'Choisir Starter',
    features: ['Acces IA premium', '1 cle API', 'Historique basique', 'Affiliation 10%'],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Pour les createurs qui veulent plus de generations et de visibilite.',
    monthly: '20 EUR',
    yearly: '15 EUR',
    cta: 'Passer Pro',
    badge: 'Populaire',
    features: ['Quotas IA avances', 'Cles API personnelles', 'Historique des generations', 'Commissions affiliation boostees'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Pour equipes, agences et gros catalogues de composants.',
    monthly: '50 EUR',
    yearly: '38 EUR',
    cta: 'Choisir Enterprise',
    features: ['Workspaces equipe', 'Quotas API avances', 'Acces prioritaire aux nouveaux blocs', 'Support prioritaire'],
  },
];

export default function AbonnementPage() {
  const { user } = useAuth();
  const [yearly, setYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [currentPlan, setCurrentPlan] = useState('free');
  const [subscription, setSubscription] = useState(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const billingCycle = yearly ? 'yearly' : 'monthly';

  useEffect(() => {
    async function fetchSubscription() {
      if (!user) {
        setLoadingSubscription(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .in('status', ['active', 'trialing'])
          .single();
          
        if (data) {
          setSubscription(data);
          setCurrentPlan(data.plan_id || 'free');
        }
      } catch (error) {
        // No active subscription
      } finally {
        setLoadingSubscription(false);
      }
    }
    fetchSubscription();
  }, [user]);

  useEffect(() => {
    // Check URL params for Stripe checkout redirect
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') {
      toast.success('Paiement réussi ! Votre abonnement est actif.');
      // Nettoyer l'URL
      window.history.replaceState({}, document.title, '/abonnement');
    } else if (params.get('checkout') === 'cancelled') {
      toast.info('Paiement annulé.');
      window.history.replaceState({}, document.title, '/abonnement');
    }
  }, []);

  const handleSelectPlan = async (plan) => {
    if (plan.id === 'free') {
      toast.success('Le plan Free est deja actif');
      return;
    }

    setLoadingPlan(plan.id);
    try {
      const referralCode = new URLSearchParams(window.location.search).get('ref') || localStorage.getItem('vixluxia-referral-code') || '';
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ plan: plan.id, referralCode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Checkout Stripe indisponible');
      window.location.href = data.url;
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleManageBilling = async () => {
    toast.info('Portail de gestion Stripe à venir');
    // Implement Stripe customer portal redirect here
  };

  return (
    <PageShell title="Abonnement" maxWidth="max-w-[1180px]">
      <div className="space-y-8">
        <AnimateIn variant="fadeUp">
          <section className="rounded-lg border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4 gap-2">
                  <CreditCard className="h-3.5 w-3.5" />
                  Plans VixLuxia
                </Badge>
                <h1 className="text-3xl font-black tracking-tight lg:text-4xl">Abonnements propres et prêts pour Stripe</h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Gérez votre abonnement et accédez aux avantages créateurs.
                </p>
                
                {!loadingSubscription && user && (
                  <div className="mt-6 flex items-center gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20 inline-block">
                    <div>
                      <p className="text-sm font-medium text-foreground">Votre plan actuel : <span className="font-bold text-primary uppercase">{currentPlan}</span></p>
                    </div>
                    {currentPlan !== 'free' && (
                      <Button variant="outline" size="sm" onClick={handleManageBilling}>
                        Gérer mon abonnement
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-background px-4 py-3">
                <Label htmlFor="billing-cycle" className="text-xs font-medium">
                  Mensuel
                </Label>
                <Switch id="billing-cycle" checked={yearly} onCheckedChange={setYearly} />
                <Label htmlFor="billing-cycle" className="text-xs font-medium">
                  Annuel
                </Label>
                <Badge variant="secondary">-25%</Badge>
              </div>
            </div>
          </section>
        </AnimateIn>

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard icon={Sparkles} label="IA premium" value="Pro+" detail="La page IA est reservee aux abonnes." tone="violet" />
          <MetricCard icon={ShieldCheck} label="Droits" value="Sécurisé" detail="Vos API keys sont protégées." tone="emerald" delay={0.05} />
          <MetricCard icon={Rocket} label="Paiement" value="Stripe" detail="Checkout et webhooks actifs." tone="sky" delay={0.1} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan, index) => {
            const isCurrentPlan = currentPlan === plan.id;
            return (
              <PricingCard
                key={plan.id}
                plan={{
                  ...plan,
                  cta: isCurrentPlan ? 'Plan Actuel' : plan.cta
                }}
                billingCycle={billingCycle}
                highlighted={plan.id === 'pro'}
                delay={index * 0.06}
                onSelect={() => !isCurrentPlan && handleSelectPlan(plan)}
                loading={loadingPlan === plan.id}
                disabled={isCurrentPlan}
              />
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
