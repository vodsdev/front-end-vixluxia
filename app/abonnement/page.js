'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CreditCard, Rocket, ShieldCheck, Sparkles, Loader2, Check } from 'lucide-react';
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
    name: 'Découverte',
    description: 'Idéal pour explorer la bibliothèque VixLuxia.',
    monthly: '0 EUR',
    yearly: '0 EUR',
    cta: 'Plan Actuel',
    features: ['Accès aux 500+ composants publics', 'Recherche et favoris locaux', 'Mises à jour régulières', 'Support communautaire'],
  },
  {
    id: 'starter',
    name: 'Créateur',
    description: 'Pour les développeurs qui veulent plus de puissance.',
    monthly: '10 EUR',
    yearly: '8 EUR',
    cta: 'S\'abonner',
    features: ['Accès IA Génératrice (100req/m)', '1 Clé API Publique', 'Historique basique', 'Affiliation 10% des revenus'],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'L\'expérience ultime pour les professionnels UI.',
    monthly: '20 EUR',
    yearly: '15 EUR',
    cta: 'Passer Pro',
    badge: 'Le plus populaire',
    features: ['Génération IA Illimitée', 'Jusqu\'à 5 clés API privées', 'Historique complet des générations', 'Commissions affiliation boostées (25%)', 'Priorité serveur maximale'],
  },
  {
    id: 'enterprise',
    name: 'Équipe',
    description: 'Pour les agences et équipes de développement.',
    monthly: '50 EUR',
    yearly: '38 EUR',
    cta: 'Contacter les Ventes',
    features: ['Workspaces partagés', 'Quotas API d\'entreprise', 'Accès prioritaire aux nouveautés', 'Support dédié 24/7', 'Coffre d\'équipe illimité'],
  },
];

export default function AbonnementPage() {
  const { user } = useAuth();
  const [yearly, setYearly] = useState(true);
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
        const { data, error } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).in('status', ['active', 'trialing']).single();
        if (data) {
          setSubscription(data);
          setCurrentPlan(data.plan_id || 'free');
        }
      } catch (error) {} finally {
        setLoadingSubscription(false);
      }
    }
    fetchSubscription();
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') {
      toast.success('Paiement réussi ! Votre abonnement est actif.');
      window.history.replaceState({}, document.title, '/abonnement');
    } else if (params.get('checkout') === 'cancelled') {
      toast.info('Paiement annulé.');
      window.history.replaceState({}, document.title, '/abonnement');
    }
  }, []);

  const handleSelectPlan = async (plan) => {
    if (plan.id === 'free') return;
    if (plan.id === 'enterprise') {
      toast.info('Veuillez contacter le support pour le plan Entreprise.');
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

  return (
    <PageShell title="Abonnements" maxWidth="max-w-[1300px]">
      <div className="space-y-16 pb-24">
        {/* Header Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-10 md:p-16 shadow-2xl backdrop-blur-xl text-center">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/20 via-primary/10 to-orange-400/20 rounded-full blur-[100px] pointer-events-none" />
          <AnimateIn variant="fadeUp">
            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-6 gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary border-none font-bold text-xs uppercase tracking-wider mx-auto">
                <Rocket className="h-4 w-4" /> Plans Tarifaires
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                Accélérez votre développement avec <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">VixLuxia Pro</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
                Débloquez l'IA génératrice, gérez vos équipes, et gagnez de l'argent avec l'affiliation. Choisissez le plan adapté à vos ambitions.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-4 bg-background/50 border border-border/50 w-fit mx-auto p-2 rounded-2xl backdrop-blur-md">
                <button
                  onClick={() => setYearly(false)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${!yearly ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setYearly(true)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${yearly ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Annuel <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-none ml-1">-25%</Badge>
                </button>
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* Pricing Cards Grid */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">
            {PLANS.map((plan, index) => {
              const isCurrentPlan = currentPlan === plan.id;
              const isPro = plan.id === 'pro';
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative flex flex-col p-8 rounded-3xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-2
                    ${isPro ? 'border-primary/50 shadow-2xl shadow-primary/20 bg-card/80 scale-105 z-10' : 'border-border/50 bg-card/40 shadow-xl'}`}
                >
                  {isPro && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-gradient-to-r from-violet-500 to-orange-400 text-white text-xs font-black uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground min-h-[40px] leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    <span className="text-4xl font-black">{yearly ? plan.yearly : plan.monthly}</span>
                    {plan.id !== 'free' && <span className="text-muted-foreground text-sm font-medium"> / mois</span>}
                    {yearly && plan.id !== 'free' && (
                      <p className="text-xs text-emerald-500 font-bold mt-2">Facturé annuellement</p>
                    )}
                  </div>

                  <Button 
                    className={`w-full h-12 rounded-xl font-bold mb-8 transition-all
                      ${isCurrentPlan ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed' : 
                        isPro ? 'bg-gradient-to-r from-violet-500 to-orange-400 hover:from-violet-600 hover:to-orange-500 text-white shadow-lg shadow-orange-500/20' : 
                        'bg-foreground text-background hover:bg-foreground/90'}`}
                    onClick={() => !isCurrentPlan && handleSelectPlan(plan)}
                    disabled={isCurrentPlan || loadingPlan === plan.id}
                  >
                    {loadingPlan === plan.id ? <Loader2 className="w-5 h-5 animate-spin" /> : plan.cta}
                  </Button>

                  <ul className="space-y-4 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-emerald-500 font-bold" />
                        </div>
                        <span className="text-sm font-medium text-foreground/80 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </AnimateIn>

        {/* Current Plan Indicator */}
        {!loadingSubscription && user && currentPlan !== 'free' && (
          <AnimateIn variant="fadeUp" delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl w-full">
                <p className="text-sm text-muted-foreground mb-2">Vous êtes actuellement sur le plan :</p>
                <p className="text-xl font-black text-primary uppercase tracking-wider mb-4">{currentPlan}</p>
                <Button variant="outline" className="w-full rounded-xl" onClick={() => toast.info('Portail Stripe à venir')}>
                  Gérer ma facturation Stripe
                </Button>
              </div>
            </div>
          </AnimateIn>
        )}
      </div>
    </PageShell>
  );
}
