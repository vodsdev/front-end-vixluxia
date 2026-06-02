'use client';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center max-w-3xl mx-auto px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/80 border border-border/50 text-xs text-muted-foreground mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-500" />
          <span>Open-source component registry</span>
          <ArrowRight className="w-3 h-3" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
        >
          The{' '}
          <span className="text-gradient">npm</span>
          {' '}for{' '}
          <br className="hidden sm:block" />
          design engineers
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-5 text-base lg:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
        >
          Copy-paste beautiful React components built with Tailwind CSS, Radix UI, and Framer Motion. Ready for your next project.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Button size="lg" className="rounded-full px-6 text-sm font-medium gap-2">
            Browse Components
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-6 text-sm font-medium gap-2">
            <Github className="w-4 h-4" />
            GitHub
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex items-center justify-center gap-8 text-sm"
        >
          <div className="text-center">
            <p className="font-bold text-lg">500+</p>
            <p className="text-xs text-muted-foreground">Components</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="font-bold text-lg">50+</p>
            <p className="text-xs text-muted-foreground">Authors</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="font-bold text-lg">10k+</p>
            <p className="text-xs text-muted-foreground">Downloads</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
