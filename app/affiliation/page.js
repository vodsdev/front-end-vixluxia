'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Copy, Gift, Share2, TrendingUp, Users, ArrowRight, ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/animate-in';
import { MetricCard } from '@/components/platform/metric-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

const STEPS = [
  ['1', 'Partager', 'Copiez votre lien et invitez d\'autres développeurs à rejoindre VixLuxia.'],
  ['2', 'Convertir', 'Chaque inscription garde votre code de parrainage en mémoire.'],
  ['3', 'Gagner', 'Gagnez instantanément des récompenses dans le coffre de votre Team.'],
];

export default function AffiliationPage() {
  const { user } = useAuth();
  const [referralLink, setReferralLink] = useState('https://vixluxia.com/?ref=...');
  const [stats, setStats] = useState({ clicks: 0, signups: 0, revenue: 0 });

  useEffect(() => {
    if (user) {
      setReferralLink(`https://vixluxia.com/?ref=${user.id}`);
      
      fetch('/api/referrals/stats')
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setStats({
              clicks: data.clicks || 0,
              signups: data.signups || 0,
              revenue: data.revenue || 0
            });
          }
        })
        .catch(console.error);
    }
  }, [user]);

  const copyReferralLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    toast.success('Lien d\'affiliation copié avec succès !');
  };

  return (
    <PageShell title="Affiliation & Teams" maxWidth="max-w-[1200px]">
      <div className="space-y-12 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-orange-400/20 rounded-full blur-[100px] pointer-events-none" />
          <AnimateIn variant="fadeUp">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-6 gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-500 border-none font-bold text-xs uppercase tracking-wider">
                  <Gift className="h-4 w-4" /> Programme Partenaire
                </Badge>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                  Gagnez de l'argent avec vos <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">Teams</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Invitez vos amis à rejoindre votre équipe. Chaque nouvelle invitation vous rapporte de l'argent directement dans le coffre-fort de votre équipe, retirable à tout moment.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-w-0 lg:min-w-[400px]">
                <Card className="p-4 bg-background/50 border-border/50 backdrop-blur-md rounded-2xl shadow-xl">
                  <p className="text-xs font-bold text-muted-foreground mb-2 ml-1 uppercase tracking-wider">Votre lien d'invitation</p>
                  <div className="flex gap-2">
                    <Input value={referralLink} readOnly className="h-12 min-w-0 font-mono text-sm bg-muted/30 border-transparent focus-visible:ring-0 rounded-xl" />
                    <Button className="h-12 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg" onClick={copyReferralLink}>
                      <Copy className="h-4 w-4 mr-2" /> Copier
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </AnimateIn>
        </section>

        {/* Metrics Grid */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard icon={Share2} label="Clicks" value={stats.clicks.toString()} detail="Total link clicks." tone="violet" />
            <MetricCard icon={Users} label="Signups" value={stats.signups.toString()} detail="Referred users." tone="sky" delay={0.05} />
            <MetricCard icon={Wallet} label="Revenue" value={`${stats.revenue.toFixed(2)}€`} detail="Total earnings." tone="emerald" delay={0.1} />
          </div>
        </AnimateIn>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* How it works */}
          <AnimateIn variant="fadeUp" delay={0.2}>
            <Card className="rounded-3xl border-border/50 bg-card/60 backdrop-blur-sm p-8 shadow-xl h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold">Comment ça marche ?</h2>
              </div>
              <div className="grid gap-4">
                {STEPS.map(([number, title, description]) => (
                  <div key={number} className="group flex gap-4 rounded-2xl border border-border/50 bg-background/50 p-5 hover:bg-muted/50 transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-orange-400 text-white font-black shadow-lg">
                      {number}
                    </div>
                    <div>
                      <h3 className="text-base font-bold group-hover:text-primary transition-colors">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </AnimateIn>

          {/* Teams CTA */}
          <AnimateIn variant="fadeUp" delay={0.3}>
            <Card className="rounded-3xl border-violet-500/30 bg-violet-500/5 p-8 shadow-xl h-full relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-orange-500/10 pointer-events-none" />
              <div className="relative z-10 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20 mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-4">Créez votre Team !</h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  Le moyen le plus rapide de gagner de l'argent sur VixLuxia. Regroupez vos amis, partagez des ressources exclusives, et faites grossir votre coffre-fort commun avec chaque nouvelle recrue.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm font-medium"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Coffre-fort sécurisé anti-triche</li>
                  <li className="flex items-center gap-3 text-sm font-medium"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Chat privé en temps réel</li>
                  <li className="flex items-center gap-3 text-sm font-medium"><ShieldCheck className="w-5 h-5 text-emerald-500" /> Distribution instantanée des gains</li>
                </ul>
              </div>
              <Button asChild className="relative z-10 w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-bold text-lg shadow-2xl">
                <Link href="/teams">
                  Gérer ma Team <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </Card>
          </AnimateIn>
        </div>
      </div>
    </PageShell>
  );
}
