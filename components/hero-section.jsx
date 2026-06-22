'use client';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, Github, Code, Layout, Blocks, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRef } from 'react';
import Link from 'next/link';

export function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring animations for scrolling
  const smoothY1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, -250]), { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative overflow-hidden py-20 lg:py-32 w-full min-h-[95vh] flex items-center justify-center">
      {/* Animated Grid Background with subtle pulse */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />
      
      {/* Dynamic ambient glowing orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 left-1/4 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[140px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[900px] h-[900px] bg-fuchsia-500/5 rounded-full blur-[160px]" 
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col lg:flex-row items-center gap-20 lg:gap-16">
        
        {/* Left Column: Text Content */}
        <div className="flex-1 text-center lg:text-left max-w-4xl lg:max-w-2xl mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-500/5 border border-violet-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400 mb-10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Platform v3.0 is now live
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-7xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] mb-8"
          >
            Design exactly
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 animate-gradient-x">
              what you imagine.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-8 text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium opacity-80"
          >
            Elevate your workflow with stunning, copy-paste React components. Built with Tailwind CSS, Radix UI, and Framer Motion for ultimate flexibility and performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
          >
            <Button asChild size="lg" className="rounded-2xl px-12 h-16 text-sm font-black uppercase tracking-widest gap-3 w-full sm:w-auto shadow-[0_20px_40px_-15px_rgba(139,92,246,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(139,92,246,0.5)] transition-all bg-violet-600 hover:bg-violet-700 text-white border-none active:scale-95">
              <Link href="/ia">
                Start Building
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-2xl px-12 h-16 text-sm font-black uppercase tracking-widest gap-3 w-full sm:w-auto hover:bg-muted/50 border border-border/40 active:scale-95">
              <a href="https://github.com/vodsdev" target="_blank" rel="noreferrer">
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 flex items-center justify-center lg:justify-start gap-16"
          >
            <div className="group cursor-default">
              <h4 className="text-6xl font-black tracking-tighter group-hover:text-violet-500 transition-colors">500+</h4>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-2">Components</p>
            </div>
            <div className="w-px h-12 bg-border/20" />
            <div className="group cursor-default">
              <h4 className="text-6xl font-black tracking-tighter group-hover:text-fuchsia-500 transition-colors">50+</h4>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-2">Creators</p>
            </div>
            <div className="w-px h-12 bg-border/20" />
            <div className="group cursor-default">
              <h4 className="text-6xl font-black tracking-tighter group-hover:text-orange-500 transition-colors">10k+</h4>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-2">Downloads</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: High-Performance 3D Animation */}
        <div className="flex-1 relative w-full max-w-2xl h-[600px] lg:h-[700px] perspective-[3000px]">
          <motion.div 
            style={{ y: smoothY1, rotateX: 5, rotateY: -10 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                y: [0, -30, 0],
                rotateY: [-12, -8, -12],
                rotateX: [6, 10, 6]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-30 w-80 sm:w-[28rem]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40 blur-[100px] -z-10 rounded-[60px]" />
              <Card className="p-4 bg-background/30 backdrop-blur-3xl border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] rounded-[40px] overflow-hidden">
                <div className="bg-gradient-to-br from-white/10 to-white/0 rounded-[30px] p-8 border border-white/10">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-2xl shadow-violet-500/40">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-5 w-40 bg-foreground/10 rounded-full"></div>
                      <div className="h-4 w-24 bg-foreground/5 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-4 mb-10">
                    <div className="h-3 w-full bg-foreground/5 rounded-full"></div>
                    <div className="h-3 w-11/12 bg-foreground/5 rounded-full"></div>
                    <div className="h-3 w-full bg-foreground/5 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20"></div>
                    <div className="h-14 rounded-2xl bg-foreground/5 border border-foreground/5"></div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Floating Elements with smooth springs */}
            <motion.div
              style={{ y: smoothY2 }}
              animate={{ 
                y: [-60, -90, -60],
                x: [-120, -140, -120],
                rotate: [-5, 5, -5]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-40 hidden sm:block"
            >
              <div className="px-6 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[20px] shadow-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Code className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="h-2.5 w-20 bg-white/20 rounded-full"></div>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [140, 170, 140],
                x: [120, 140, 120],
                rotate: [5, -5, 5]
              }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute z-40 hidden sm:block"
            >
              <div className="px-6 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[20px] shadow-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 flex items-center justify-center">
                  <Layout className="w-5 h-5 text-fuchsia-400" />
                </div>
                <div className="h-2.5 w-24 bg-white/20 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </section>
  );
}
