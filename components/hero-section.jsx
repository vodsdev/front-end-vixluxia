'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Github, Code, Layout, Blocks, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRef } from 'react';

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-20 lg:py-28 w-full min-h-[90vh] flex items-center justify-center">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Ambient glowing orbs - Reduced intensity for professional look */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-fuchsia-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
        
        {/* Left Column: Text Content */}
        <div className="flex-1 text-center lg:text-left max-w-3xl lg:max-w-xl mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/5 border border-violet-500/20 text-[13px] font-semibold text-violet-600 dark:text-violet-400 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Vixluxia 3.0 is now live
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6"
          >
            Design exactly
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500">
              what you imagine.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
          >
            Elevate your workflow with stunning, copy-paste React components. Built with Tailwind CSS, Radix UI, and Framer Motion for ultimate flexibility and performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5"
          >
            <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold gap-2 w-full sm:w-auto shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 transition-all bg-violet-600 hover:bg-violet-700 text-white border-none">
              Start Building
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-10 h-14 text-base font-bold gap-2 w-full sm:w-auto hover:bg-muted/50">
              <a href="https://github.com/vodsdev" target="_blank" rel="noreferrer">
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 flex items-center justify-center lg:justify-start gap-12"
          >
            <div>
              <h4 className="text-4xl font-black tracking-tighter">500+</h4>
              <p className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Components</p>
            </div>
            <div className="w-px h-10 bg-border/50" />
            <div>
              <h4 className="text-4xl font-black tracking-tighter">50+</h4>
              <p className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Creators</p>
            </div>
            <div className="w-px h-10 bg-border/50" />
            <div>
              <h4 className="text-4xl font-black tracking-tighter">10k+</h4>
              <p className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Downloads</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Ultra-Fluid 3D Animation */}
        <div className="flex-1 relative w-full max-w-xl h-[500px] lg:h-[600px] perspective-[2000px]">
          <motion.div 
            style={{ y: y1, rotateX: 5, rotateY: -10 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Main Premium Card */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotateY: [-10, -5, -10],
                rotateX: [5, 8, 5]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-30 w-72 sm:w-96"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 blur-3xl -z-10 rounded-[40px]" />
              <Card className="p-3 bg-background/40 backdrop-blur-2xl border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] rounded-[32px] overflow-hidden">
                <div className="bg-gradient-to-br from-white/5 to-white/0 rounded-[24px] p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-foreground/10 rounded-full"></div>
                      <div className="h-3 w-20 bg-foreground/5 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-8">
                    <div className="h-2.5 w-full bg-foreground/5 rounded-full"></div>
                    <div className="h-2.5 w-5/6 bg-foreground/5 rounded-full"></div>
                    <div className="h-2.5 w-full bg-foreground/5 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-12 rounded-xl bg-violet-500/10 border border-violet-500/20"></div>
                    <div className="h-12 rounded-xl bg-foreground/5 border border-foreground/5"></div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Floating Elements - More subtle and fluid */}
            <motion.div
              style={{ y: y2 }}
              animate={{ 
                y: [-40, -60, -40],
                x: [-100, -110, -100]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-40 hidden sm:block"
            >
              <div className="px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Code className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="h-2 w-16 bg-white/20 rounded-full"></div>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [120, 140, 120],
                x: [100, 110, 100]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute z-40 hidden sm:block"
            >
              <div className="px-5 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center">
                  <Layout className="w-4 h-4 text-fuchsia-400" />
                </div>
                <div className="h-2 w-20 bg-white/20 rounded-full"></div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
