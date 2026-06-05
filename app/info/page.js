'use client';

import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Globe, Code2 } from 'lucide-react';

export default function InfoPage() {
  return (
    <PageShell title="Informations" maxWidth="max-w-[800px]">
      <div className="space-y-8">
        <AnimateIn variant="fadeUp">
          <section className="rounded-lg border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur lg:p-8 text-center">
            <h1 className="text-3xl font-black tracking-tight lg:text-4xl mb-4">À propos de VixLuxia</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              VixLuxia est une plateforme moderne pour les créateurs d'interfaces, conçue pour faciliter le partage, la création et la gestion de composants UI de haute qualité.
            </p>
          </section>
        </AnimateIn>

        <AnimateIn variant="fadeUp" delay={0.1}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            L'équipe
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 rounded-lg border-border/50 bg-card/80 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">VD</span>
              </div>
              <h3 className="text-xl font-bold">Vodsenterprise</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-6">Lead Developer & Fondateur</p>
              
              <div className="flex gap-3 mt-auto w-full">
                <Button variant="outline" className="flex-1 gap-2" asChild>
                  <a href="https://github.com/vodsdev" target="_blank" rel="noreferrer">
                    <Github className="w-4 h-4" /> Vodsdev
                  </a>
                </Button>
                <Button variant="default" className="flex-1 gap-2" asChild>
                  <a href="https://vods-info.tech" target="_blank" rel="noreferrer">
                    <Globe className="w-4 h-4" /> Portfolio
                  </a>
                </Button>
              </div>
            </Card>

            <Card className="p-6 rounded-lg border-border/50 bg-card/80 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-secondary-foreground">MX</span>
              </div>
              <h3 className="text-xl font-bold">Maxime</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-6">Co-fondateur & UI/UX Designer</p>
              
              <div className="flex gap-3 mt-auto w-full">
                <Button variant="outline" className="flex-1 gap-2" asChild>
                  <a href="https://github.com/Max_vods" target="_blank" rel="noreferrer">
                    <Github className="w-4 h-4" /> MaxVods
                  </a>
                </Button>
                <Button variant="secondary" className="flex-1 gap-2" asChild>
                  <a href="https://instagram.com/max_vods" target="_blank" rel="noreferrer">
                    <Instagram className="w-4 h-4" /> max_vods
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </AnimateIn>
      </div>
    </PageShell>
  );
}
