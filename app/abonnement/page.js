'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CreditCard, Rocket, ShieldCheck, Sparkles, Loader2, Check } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { MetricCard } from '@/components/platform/metric-card';
import { Badge } from '@/components/ui/badge';
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

  useEffect(() => {
    async function fetchSubscription() {
      if (!user) {
        setLoadingSubscription(false);
        return;
      }
      try {
        const { data } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).in('status', ['active', 'trialing']).single();
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

  const handleSelectPlan = async (plan) => {
    if (plan.id === 'free') return;
    if (plan.id === 'enterprise') {
      window.location.href = 'mailto:contact@vixluxia.com';
      return;
    }
    setLoadingPlan(plan.id);
    try {
      const referralCode = typeof window !== 'undefined' ? (new URLSearchParams(window.location.search).get('ref') || localStorage.getItem('vixluxia-referral-code') || '') : '';
      
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 
          plan: yearly ? `${plan.id}_yearly` : plan.id, 
          referralCode,
          returnUrl: window.location.pathname
        }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur Stripe');
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de paiement non reçue');
      }
    } catch (error) {
      toast.error(error.message);
      // Fallback: If API fails, try direct Stripe links if you have them, 
      // otherwise redirect to a contact page or show a clear error.
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <PageShell title="Abonnements" maxWidth="max-w-[1300px]">
      <div className="space-y-16 pb-24">
        <section className="relative overflow-hidden rounded-[40px] border border-border/40 bg-card/40 p-10 md:p-20 shadow-2xl backdrop-blur-xl text-center">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-500/10 via-primary/5 to-orange-400/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          <AnimateIn variant="fadeUp">
            <div className="relative z-10 max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-6 gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border-none font-black text-[10px] uppercase tracking-widest mx-auto">
                <Rocket className="h-4 w-4" /> Plans Tarifaires
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
                Accélérez avec <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">VixLuxia Pro</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 font-medium">
                Débloquez l'IA génératrice, gérez vos équipes, et gagnez de l'argent avec l'affiliation.
              </p>

              <div className="flex items-center justify-center gap-4 bg-muted/30 border border-border/40 w-fit mx-auto p-2 rounded-2xl backdrop-blur-md">
                <button
                  onClick={() => setYearly(false)}
                  className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!yearly ? 'bg-background shadow-xl text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Mensuel
                </button>
                <button
                  onClick={() => setYearly(true)}
                  className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${yearly ? 'bg-background shadow-xl text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Annuel <Badge className="bg-emerald-500/20 text-emerald-500 border-none ml-1">-25%</Badge>
                </button>
              </div>
            </div>
          </AnimateIn>
        </section>

        <AnimateIn variant="fadeUp" delay={0.1}>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-start">
            {PLANS.map((plan) => {
              const isCurrentPlan = currentPlan === plan.id;
              const isPro = plan.id === 'pro';
              
              return (
                <Card 
                  key={plan.id} 
                  className={`relative flex flex-col p-8 rounded-[32px] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2
                    ${isPro ? 'border-primary/40 shadow-2xl shadow-primary/10 bg-card/80 scale-105 z-10' : 'border-border/40 bg-card/40 shadow-xl'}`}
                >
                  {isPro && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-gradient-to-r from-violet-600 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest py-2 px-6 rounded-full shadow-xl">
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-black tracking-tight mb-2">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground min-h-[40px] leading-relaxed font-bold uppercase tracking-wider">{plan.description}</p>
                  </div>

                  <div className="mb-10">
                    <span className="text-5xl font-black tracking-tighter">{yearly ? plan.yearly : plan.monthly}</span>
                    {plan.id !== 'free' && <span className="text-muted-foreground text-xs font-black uppercase tracking-widest ml-2">/ mo</span>}
                  </div>

                  <Button 
                    className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs mb-10 transition-all
                      ${isCurrentPlan ? 'bg-muted text-muted-foreground opacity-50' : 
                        isPro ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02]' : 
                        'bg-foreground text-background hover:opacity-90'}`}
                    onClick={() => !isCurrentPlan && handleSelectPlan(plan)}
                    disabled={isCurrentPlan || loadingPlan === plan.id}
                  >
                    {loadingPlan === plan.id ? <Loader2 className="w-5 h-5 animate-spin" /> : plan.cta}
                  </Button>

                  <ul className="space-y-4 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs font-bold text-foreground/70 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </AnimateIn>
      </div>
    </PageShell>
  );
}
