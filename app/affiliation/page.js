'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Copy, Gift, Share2, TrendingUp, Users } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { MetricCard } from '@/components/platform/metric-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const STEPS = [
  ['1', 'Partager', 'Copie ton lien et invite des createurs a rejoindre VixLuxia.'],
  ['2', 'Convertir', 'Chaque inscription garde ton code de parrainage dans le profil.'],
  ['3', 'Gagner', 'Quand un invite devient payant, la commission est calculee.'],
];

const TIERS = [
  ['Starter', '10%', '1 a 10 abonnes payants'],
  ['Partner', '18%', '11 a 50 abonnes payants'],
  ['Ambassador', '25%', '50+ abonnes payants'],
];

export default function AffiliationPage() {
  const [referralLink, setReferralLink] = useState('https://vixluxia.com/?ref=creator');

  useEffect(() => {
    setReferralLink(`${window.location.origin}/?ref=creator`);
  }, []);

  const copyReferralLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    toast.success('Lien d affiliation copie');
  };

  return (
    <PageShell title="Affiliation" maxWidth="max-w-[1180px]">
      <div className="space-y-8">
        <AnimateIn variant="fadeUp">
          <section className="rounded-lg border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4 gap-2">
                  <Share2 className="h-3.5 w-3.5" />
                  Programme createur
                </Badge>
                <h1 className="text-3xl font-black tracking-tight lg:text-4xl">Invite des gens et gagne via l affiliation</h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Une page claire pour partager un lien, expliquer les commissions et preparer le suivi des invitations.
                </p>
              </div>
              <div className="flex min-w-0 flex-col gap-2 sm:min-w-[360px]">
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="h-10 min-w-0 font-mono text-xs" />
                  <Button className="rounded-md" onClick={copyReferralLink}>
                    <Copy className="h-4 w-4" />
                    Copier
                  </Button>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground">Ou rejoins une équipe pour cumuler les gains dans un coffre commun !</p>
                  <Button asChild variant="default" className="w-full gap-2">
                    <a href="/teams">
                      <Users className="w-4 h-4" />
                      Voir les Teams
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </AnimateIn>

        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard icon={Users} label="Invites" value="0" detail="A connecter aux inscriptions." tone="violet" />
          <MetricCard icon={TrendingUp} label="Conversions" value="0%" detail="Calcul apres paiement Stripe." tone="emerald" delay={0.05} />
          <MetricCard icon={Gift} label="Commission" value="10%" detail="Palier Starter par defaut." tone="amber" delay={0.1} />
          <MetricCard icon={Share2} label="Lien" value="Pret" detail="Copie clipboard fonctionnelle." tone="sky" delay={0.15} />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <Card className="rounded-lg border-border/50 bg-card/80 p-5">
            <h2 className="text-sm font-bold">Fonctionnement</h2>
            <div className="mt-5 grid gap-3">
              {STEPS.map(([number, title, description]) => (
                <div key={number} className="flex gap-3 rounded-md border border-border/50 bg-background p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground text-xs font-bold text-background">
                    {number}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-lg border-border/50 bg-card/80 p-5">
            <h2 className="text-sm font-bold">Paliers de commission</h2>
            <div className="mt-5 space-y-3">
              {TIERS.map(([name, rate, condition]) => (
                <div key={name} className="flex items-center justify-between gap-4 rounded-md border border-border/50 bg-background p-4">
                  <div>
                    <h3 className="text-sm font-semibold">{name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{condition}</p>
                  </div>
                  <span className="text-xl font-black">{rate}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="rounded-lg border-border/50 bg-card/80 p-5">
          <h2 className="text-sm font-bold">A connecter ensuite</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {['Stocker le referrer en base', 'Attribuer une commission apres paiement', 'Afficher retraits et factures affiliate'].map((item) => (
              <div key={item} className="rounded-md border border-border/50 bg-background p-3 text-xs text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
