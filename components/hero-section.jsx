'use client';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Github, Code, Layout, Blocks, Zap, Search, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 w-full flex flex-col items-center">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/5 border border-violet-500/10 text-[10px] font-bold uppercase tracking-widest text-violet-500 mb-8"
          >
            <Zap className="w-3 h-3 fill-current" />
            VixLuxia Studio 3.0
          </motion.div>

          {/* Elegant & Slim Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
          >
            Design exactly what you imagine.
          </motion.h1>

          {/* Balanced Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl font-medium leading-relaxed opacity-70 mb-10"
          >
            The professional component registry for modern developers. 
            Build faster with high-performance React blocks optimized for Tailwind CSS.
          </motion.p>

          {/* Compact Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button asChild className="rounded-xl px-8 h-12 text-xs font-bold uppercase tracking-wider bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20">
              <Link href="/ia">Start Building</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl px-8 h-12 text-xs font-bold uppercase tracking-wider border-border/40 hover:bg-muted/50">
              <Link href="/public">Browse Public</Link>
            </Button>
          </motion.div>
        </div>

        {/* New Feature Grid - More Content, Less Empty Space */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-background/40 backdrop-blur-xl border-border/30 hover:border-violet-500/30 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5 text-violet-500" />
              </div>
              <h3 className="text-sm font-bold mb-2">AI Studio</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Generate and preview React components in real-time with our Bolt-inspired AI engine.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-background/40 backdrop-blur-xl border-border/30 hover:border-fuchsia-500/30 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-fuchsia-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code className="w-5 h-5 text-fuchsia-500" />
              </div>
              <h3 className="text-sm font-bold mb-2">Clean Code</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Production-ready code using Tailwind CSS, Radix UI, and Framer Motion for best performance.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-6 bg-background/40 backdrop-blur-xl border-border/30 hover:border-orange-500/30 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="text-sm font-bold mb-2">Public Registry</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Share your creations or use templates from the community to jumpstart your next project.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Stats Strip - Compact & Professional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-12 py-8 border-y border-border/10"
        >
          <div className="text-center">
            <p className="text-2xl font-bold tracking-tight">500+</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Components</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold tracking-tight">50+</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Creators</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold tracking-tight">10k+</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Downloads</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold tracking-tight">100%</p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Open Source</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Icons for the grid
function Bot(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
  )
}
