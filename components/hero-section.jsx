'use client';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Github, Code, Layout, Blocks, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 w-full min-h-[90vh] flex items-center justify-center">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Ambient glowing orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fuchsia-500/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Column: Text Content */}
        <div className="flex-1 text-center lg:text-left max-w-3xl lg:max-w-xl mx-auto lg:mx-0 pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-muted-foreground mb-8 shadow-sm hover:border-violet-500/30 transition-colors cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-foreground">Vixluxia 2.0 is now live</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
          >
            Design exactly
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500">
              what you imagine.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            Elevate your workflow with stunning, copy-paste React components. Built with Tailwind CSS, Radix UI, and Framer Motion for ultimate flexibility and performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold gap-2 w-full sm:w-auto shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all">
              Start Building
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 text-base font-semibold gap-2 w-full sm:w-auto bg-background/50 backdrop-blur-sm border-border/50 hover:bg-muted/50">
              <a href="https://github.com/vodsdev" target="_blank" rel="noreferrer">
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-8 sm:gap-12"
          >
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-3xl font-black text-foreground">500+</h4>
              <p className="text-sm font-medium text-muted-foreground mt-1">Components</p>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-3xl font-black text-foreground">50+</h4>
              <p className="text-sm font-medium text-muted-foreground mt-1">Creators</p>
            </div>
            <div className="w-px h-12 bg-border/50" />
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="text-3xl font-black text-foreground">10k+</h4>
              <p className="text-sm font-medium text-muted-foreground mt-1">Downloads</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Floating 3D Mockups */}
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto h-[400px] sm:h-[500px] lg:h-[600px]" style={{ perspective: 1200 }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            
            {/* Center Main Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -15, rotateX: 5 }}
              animate={{ opacity: 1, scale: 1, y: [0, -15, 0], rotateY: [-15, -10, -15], rotateX: [5, 10, 5] }}
              transition={{ 
                opacity: { duration: 0.8 },
                scale: { duration: 0.8, type: "spring", bounce: 0.4 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute z-30 w-64 sm:w-80 shadow-2xl shadow-violet-500/20"
            >
              <Card className="p-1 sm:p-2 bg-background/80 backdrop-blur-xl border-border/50 overflow-hidden rounded-2xl sm:rounded-3xl">
                <div className="bg-muted/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border/50">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-inner">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="h-3 sm:h-4 w-20 sm:w-24 bg-foreground/10 rounded-full mb-2"></div>
                      <div className="h-2 sm:h-3 w-12 sm:w-16 bg-foreground/5 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="h-2 sm:h-2.5 w-full bg-foreground/5 rounded-full"></div>
                    <div className="h-2 sm:h-2.5 w-4/5 bg-foreground/5 rounded-full"></div>
                    <div className="h-2 sm:h-2.5 w-full bg-foreground/5 rounded-full"></div>
                  </div>
                  <div className="mt-4 sm:mt-6 flex gap-2">
                    <div className="h-8 sm:h-10 w-full bg-violet-500/20 rounded-lg sm:rounded-xl"></div>
                    <div className="h-8 sm:h-10 w-full bg-muted rounded-lg sm:rounded-xl"></div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Left Top Card */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: -20, rotateZ: -5 }}
              animate={{ opacity: 1, x: -80, y: [-60, -45, -60], rotateZ: -12 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.2 },
                x: { duration: 0.8, type: "spring" },
                rotateZ: { duration: 0.8 },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
              className="absolute z-20 w-48 sm:w-56 hidden sm:block"
            >
              <Card className="p-3 sm:p-4 bg-background/60 backdrop-blur-md border-border/30 shadow-xl shadow-cyan-500/10 rounded-xl sm:rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Code className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div className="h-3 w-16 bg-foreground/10 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="h-2 w-12 bg-foreground/5 rounded-full"></div>
                    <div className="h-2 w-8 bg-cyan-500/40 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-2 w-16 bg-foreground/5 rounded-full"></div>
                    <div className="h-2 w-6 bg-foreground/10 rounded-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-2 w-10 bg-foreground/5 rounded-full"></div>
                    <div className="h-2 w-10 bg-violet-500/40 rounded-full"></div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Right Bottom Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20, rotateZ: 5 }}
              animate={{ opacity: 1, x: 80, y: [60, 75, 60], rotateZ: 8 }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.3 },
                x: { duration: 0.8, type: "spring" },
                rotateZ: { duration: 0.8 },
                y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
              className="absolute z-40 w-48 sm:w-56 hidden sm:block"
            >
              <Card className="p-3 sm:p-4 bg-background/70 backdrop-blur-md border-border/40 shadow-xl shadow-fuchsia-500/10 rounded-xl sm:rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-fuchsia-500/20 flex items-center justify-center">
                    <Layout className="w-4 h-4 text-fuchsia-500" />
                  </div>
                  <div className="h-3 w-20 bg-foreground/10 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-12 bg-muted rounded-lg border border-border/50 flex items-center justify-center">
                    <Blocks className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                  <div className="h-12 bg-muted rounded-lg border border-border/50 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                </div>
              </Card>
            </motion.div>
            
            {/* Mobile simplified cards - visible only on small screens to avoid clutter */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -40 }}
              animate={{ opacity: 1, x: -40, y: [-40, -30, -40] }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.2 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
              className="absolute z-20 w-32 sm:hidden -ml-20 -mt-10"
            >
              <Card className="p-2 bg-background/60 backdrop-blur-md border-border/30 shadow-lg rounded-xl">
                <div className="h-2 w-12 bg-cyan-500/40 rounded-full mb-2"></div>
                <div className="h-1.5 w-full bg-foreground/5 rounded-full mb-1"></div>
                <div className="h-1.5 w-4/5 bg-foreground/5 rounded-full"></div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30, y: 40 }}
              animate={{ opacity: 1, x: 40, y: [40, 50, 40] }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.3 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
              className="absolute z-40 w-36 sm:hidden ml-20 mt-20"
            >
              <Card className="p-2 bg-background/70 backdrop-blur-md border-border/40 shadow-lg rounded-xl flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-fuchsia-500/20 flex-shrink-0"></div>
                <div className="space-y-1 w-full">
                  <div className="h-1.5 w-full bg-foreground/10 rounded-full"></div>
                  <div className="h-1.5 w-2/3 bg-foreground/5 rounded-full"></div>
                </div>
              </Card>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
