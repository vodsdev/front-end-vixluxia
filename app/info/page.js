'use client';

import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Instagram, Globe, Code2, Sparkles, Building2 } from 'lucide-react';

export default function InfoPage() {
  return (
    <PageShell title="À propos" maxWidth="max-w-[1000px]">
      <div className="space-y-12 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-10 shadow-2xl backdrop-blur-xl">
          <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-gradient-to-br from-violet-500/20 to-orange-400/20 rounded-full blur-[80px] pointer-events-none" />
          <AnimateIn variant="fadeUp">
            <div className="relative z-10 max-w-2xl text-center mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
                <Building2 className="w-4 h-4" /> La vision VixLuxia
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Redéfinir le <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">développement UI</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                VixLuxia est une plateforme moderne pour les créateurs d'interfaces, conçue pour faciliter le partage, la création et la gestion de composants UI de très haute qualité.
              </p>
            </div>
          </AnimateIn>
        </section>

        {/* Team Section */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-violet-500" />
            </div>
            <h2 className="text-3xl font-black">L'équipe dirigeante</h2>
          </div>
          
          <div className="flex justify-center">
            {/* Vodsenterprise Card */}
            <Card className="p-8 md:p-12 rounded-3xl border-border/50 bg-card/60 backdrop-blur-md flex flex-col items-center text-center shadow-xl w-full max-w-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-orange-400 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20 rotate-3 group-hover:rotate-6 transition-transform">
                  <span className="text-3xl font-black text-white">VD</span>
                </div>
                <h3 className="text-2xl font-black mb-1">Vodsenterprise</h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mb-6">
                  <Sparkles className="w-3 h-3" /> Lead Developer & Fondateur
                </div>
                <p className="text-muted-foreground text-sm mb-8 leading-relaxed px-4">
                  Créateur visionnaire de VixLuxia. Passionné par l'UX/UI, le développement full-stack et la création d'outils puissants pour les développeurs.
                </p>
                
                <div className="grid grid-cols-2 gap-3 w-full">
                  <Button variant="outline" className="w-full h-12 rounded-xl gap-2 hover:bg-muted" asChild>
                    <a href="https://github.com/vodsdev" target="_blank" rel="noreferrer">
                      <Github className="w-5 h-5" /> GitHub
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full h-12 rounded-xl gap-2 hover:bg-muted" asChild>
                    <a href="https://www.instagram.com/max_vods/" target="_blank" rel="noreferrer">
                      <Instagram className="w-5 h-5 text-pink-500" /> Instagram
                    </a>
                  </Button>
                  <Button variant="default" className="w-full h-12 rounded-xl gap-2 col-span-2 bg-gradient-to-r from-violet-500 to-orange-400 text-white shadow-md hover:opacity-90" asChild>
                    <a href="https://vods-info.tech" target="_blank" rel="noreferrer">
                      <Globe className="w-5 h-5" /> Portfolio Officiel
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </AnimateIn>
      </div>
    </PageShell>
  );
}
