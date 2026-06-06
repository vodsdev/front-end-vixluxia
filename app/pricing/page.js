'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Rocket, Sparkles, Loader2, Check } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';

const PLANS = [
  {
    id: 'free',
    name: 'Découverte',
    description: 'Idéal pour explorer la bibliothèque VixLuxia.',
    monthly: '0',
    yearly: '0',
    cta: 'Plan Actuel',
    features: ['Accès aux 500+ composants publics', 'Recherche et favoris locaux', 'Mises à jour régulières', 'Support communautaire'],
  },
  {
    id: 'starter',
    name: 'Créateur',
    description: 'Pour les développeurs qui veulent plus de puissance.',
    monthly: '10',
    yearly: '8',
    cta: 'S\'abonner',
    features: ['Accès IA Génératrice (100req/m)', '1 Clé API Publique', 'Historique basique', 'Affiliation 10% des revenus'],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'L\'expérience ultime pour les professionnels UI.',
    monthly: '20',
    yearly: '15',
    cta: 'Passer Pro',
    badge: 'Most Popular',
    isPopular: true,
    features: ['Génération IA Illimitée', 'Jusqu\'à 5 clés API privées', 'Historique complet des générations', 'Commissions affiliation boostées (25%)', 'Priorité serveur maximale'],
  },
  {
    id: 'enterprise',
    name: 'Équipe',
    description: 'Pour les agences et équipes de développement.',
    monthly: '50',
    yearly: '38',
    cta: 'Contacter les Ventes',
    features: ['Workspaces partagés', 'Quotas API d\'entreprise', 'Accès prioritaire aux nouveautés', 'Support dédié 24/7', 'Coffre d\'équipe illimité'],
  },
];

export default function PricingPage() {
  const { user } = useAuth();
  const [isYearly, setIsYearly] = useState(true);
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
      window.history.replaceState({}, document.title, '/pricing');
    } else if (params.get('checkout') === 'cancelled') {
      toast.info('Paiement annulé.');
      window.history.replaceState({}, document.title, '/pricing');
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
    <PageShell title="Pricing" maxWidth="max-w-[1300px]">
      <div className="space-y-16 pb-24">
        {/* Header Hero */}
        <section className="relative flex flex-col items-center justify-center text-center pt-20 pb-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-primary/30 to-violet-500/10 rounded-[100%] blur-[120px] pointer-events-none" />
          
          <AnimateIn variant="fadeUp">
            <Badge variant="outline" className="mb-6 gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border-primary/20 font-bold text-sm uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Unlocking the Future
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
              Simple, transparent <br />
              <span className="bg-gradient-to-r from-primary via-violet-400 to-orange-400 bg-clip-text text-transparent">
                pricing for everyone.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Start building your next big idea today. No hidden fees, no surprises. 
              Choose the plan that fits your needs.
            </p>

            {/* Tailwind State Toggle Switch */}
            <div className="flex items-center justify-center gap-4 relative z-10">
              <span className={`text-base font-semibold transition-colors duration-300 ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isYearly} 
                  onChange={() => setIsYearly(!isYearly)} 
                />
                <div className="w-14 h-8 bg-muted border border-border rounded-full peer 
                                peer-checked:after:translate-x-6 after:content-[''] after:absolute 
                                after:top-[4px] after:left-[4px] after:bg-foreground after:rounded-full 
                                after:h-6 after:w-6 after:transition-all after:duration-300
                                peer-checked:bg-primary peer-checked:border-primary peer-checked:after:bg-primary-foreground
                                hover:after:scale-95">
                </div>
              </label>

              <span className={`text-base font-semibold flex items-center gap-2 transition-colors duration-300 ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
                <Badge variant="secondary" className="bg-primary/20 text-primary border-none rounded-full px-2 py-0.5 text-xs animate-pulse">
                  Save 25%
                </Badge>
              </span>
            </div>
          </AnimateIn>
        </section>

        {/* Pricing Cards Grid */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-end mt-12">
            {PLANS.map((plan) => {
              const isCurrentPlan = currentPlan === plan.id;
              
              return (
                <div key={plan.id} className={`relative flex flex-col group ${plan.isPopular ? 'lg:-mt-8 z-10' : ''}`}>
                  {plan.isPopular && (
                    <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-primary via-violet-500 to-orange-500 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  )}
                  {plan.isPopular && (
                    <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-primary to-orange-500 opacity-50" />
                  )}
                  
                  <div className={`relative h-full flex flex-col p-8 rounded-3xl transition-transform duration-300 ${plan.isPopular ? 'bg-card border-none scale-105 shadow-2xl' : 'bg-card/40 border border-border/50 hover:bg-card/60 hover:-translate-y-1'}`}>
                    
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                        <div className="bg-gradient-to-r from-primary to-orange-500 text-primary-foreground text-xs font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1">
                          <Rocket className="w-3 h-3" /> {plan.badge}
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground min-h-[40px]">{plan.description}</p>
                    </div>

                    <div className="mb-8 flex items-baseline gap-1">
                      <span className="text-5xl font-black tracking-tight">
                        €{isYearly ? plan.yearly : plan.monthly}
                      </span>
                      {plan.id !== 'free' && <span className="text-muted-foreground font-medium">/mo</span>}
                    </div>

                    <Button 
                      className={`w-full h-12 rounded-xl font-bold mb-8 transition-all duration-300
                        ${isCurrentPlan ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed' : 
                          plan.isPopular ? 'bg-foreground text-background hover:scale-[1.02] hover:shadow-xl shadow-primary/20' : 
                          'bg-primary/10 text-primary hover:bg-primary/20'}`}
                      onClick={() => !isCurrentPlan && handleSelectPlan(plan)}
                      disabled={isCurrentPlan || loadingPlan === plan.id}
                    >
                      {loadingPlan === plan.id ? <Loader2 className="w-5 h-5 animate-spin" /> : plan.cta}
                    </Button>

                    <ul className="space-y-4 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${plan.isPopular ? 'bg-primary/20' : 'bg-primary/10'}`}>
                            <Check className={`w-3 h-3 ${plan.isPopular ? 'text-primary' : 'text-primary'}`} />
                          </div>
                          <span className="text-sm font-medium text-foreground/80 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimateIn>

        {/* Current Plan Indicator */}
        {!loadingSubscription && user && currentPlan !== 'free' && (
          <AnimateIn variant="fadeUp" delay={0.2}>
            <div className="mt-16 flex flex-col items-center justify-center text-center max-w-lg mx-auto">
              <div className="p-6 bg-card/50 border border-border/50 rounded-3xl w-full backdrop-blur-sm">
                <p className="text-sm text-muted-foreground mb-2">Current Active Plan</p>
                <p className="text-2xl font-black text-primary uppercase tracking-wider mb-6">{currentPlan}</p>
                <Button variant="outline" className="w-full rounded-xl h-12 font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors" onClick={() => toast.info('Portail Stripe à venir')}>
                  Manage Billing
                </Button>
              </div>
            </div>
          </AnimateIn>
        )}
      </div>
    </PageShell>
  );
}
