'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, Play, ArrowRight, Check, CheckCircle2, ChevronRight, Mail, Lock, Search, Star, Heart, Zap, Sparkles } from 'lucide-react';

import { Component as EtheralShadow } from './ui/etheral-shadow';
import { HeroGeometric } from './ui/shape-landing-hero';
import { SpiralAnimation } from './ui/spiral-animation';
import { SmokeBackground } from './ui/spooky-smoke-animation';
import { ParticleTextEffect } from './ui/particle-text-effect';
import { DottedSurface } from './ui/dotted-surface';
import { GlowCard } from './ui/spotlight-card';
import { SearchComponent } from './ui/animated-glowing-search-bar';

/* ============ BACKGROUND ============ */
export function SpiralDemoPreview() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-black rounded-xl">
      <SpiralAnimation />
    </div>
  );
}
export function SmokeBackgroundPreview() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl">
      <SmokeBackground smokeColor="#808080" />
    </div>
  );
}
export function ParticleTextEffectPreview() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl bg-black">
      <ParticleTextEffect />
    </div>
  );
}
export function DottedSurfacePreview() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl bg-black">
      <DottedSurface className="size-full" />
    </div>
  );
}
export function EtheralShadowPreview() {
  return <EtheralShadow color="rgba(128, 128, 128, 1)" animation={{ scale: 100, speed: 90 }} noise={{ opacity: 1, scale: 1.2 }} sizing="fill" className="w-full h-full" />;
}
export function AuroraBgPreview() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative bg-[#020617]">
      <motion.div animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-80"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 100% 0%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 0% 100%, #10b981 0%, transparent 50%), radial-gradient(circle at 100% 100%, #f43f5e 0%, transparent 50%)', filter: 'blur(15px)' }} />
      <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/10 to-transparent mix-blend-overlay" />
    </div>
  );
}
export function GridBgPreview() {
  return (
    <div className="w-full h-full rounded-xl bg-white dark:bg-black relative overflow-hidden flex items-center justify-center">
      <motion.div animate={{ backgroundPosition: ['0px 0px', '32px 32px', '0px 64px'] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#8b5cf6 1.5px, transparent 1.5px)', backgroundSize: '16px 16px', opacity: 0.6 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-black dark:via-transparent dark:to-black" />
    </div>
  );
}
export function GradientMeshPreview() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden relative">
      <motion.div animate={{ rotate: 360, scale: [1, 1.5, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-[100%] opacity-90 blur-xl"
        style={{ background: 'conic-gradient(from 0deg at 50% 50%, #ff4d4d, #f9cb28, #00c853, #00b0ff, #7c4dff, #ff4d4d)' }} />
      <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[10px]" />
    </div>
  );
}
export function NoiseBgPreview() {
  return (
    <div className="w-full h-full rounded-xl bg-neutral-900 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      <motion.div animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-40 mix-blend-overlay"
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 0%, transparent 60%)', backgroundSize: '150% 150%' }} />
      <motion.div animate={{ backgroundPosition: ['100% 100%', '0% 0%', '100% 100%'] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-30 mix-blend-color-dodge"
        style={{ backgroundImage: 'linear-gradient(45deg, #ff00cc 0%, #333399 100%)', backgroundSize: '200% 200%' }} />
    </div>
  );
}

/* ============ HERO ============ */
export function HeroGeometricPreview() {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl bg-black">
      <HeroGeometric badge="Preview" title1="Hero" title2="Component" />
      <div className="absolute inset-0 z-50 bg-transparent" />
    </div>
  );
}
export function SplitHeroPreview() {
  return (
    <div className="w-full h-full flex items-center p-4 gap-4 overflow-hidden relative">
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="flex-1 space-y-2">
        <div className="h-4 w-full bg-neutral-800 dark:bg-neutral-200 rounded-md" />
        <div className="h-3 w-4/5 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
        <motion.div whileHover={{ scale: 1.05 }} className="h-5 w-1/2 bg-violet-500 rounded-md mt-3 shadow-lg shadow-violet-500/30" />
      </motion.div>
      <motion.div animate={{ y: [-5, 5, -5], rotateY: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="flex-1 h-24 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border-2 border-dashed border-violet-300 dark:border-violet-700 flex items-center justify-center relative [perspective:500px]">
        <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
      </motion.div>
    </div>
  );
}
export function CenteredHeroPreview() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mb-3" />
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="h-4 w-4/5 bg-neutral-800 dark:bg-neutral-200 rounded-md mb-2" />
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md mb-4" />
      <div className="flex gap-2">
        <motion.div whileHover={{ scale: 1.1 }} className="h-6 w-20 bg-neutral-900 dark:bg-white rounded-md cursor-pointer" />
        <motion.div whileHover={{ scale: 1.1 }} className="h-6 w-20 border-2 border-neutral-300 dark:border-neutral-700 rounded-md cursor-pointer" />
      </div>
    </div>
  );
}
export function VideoHeroPreview() {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-neutral-900 rounded-xl overflow-hidden group">
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 10, repeat: Infinity }} className="absolute inset-0 bg-gradient-to-br from-blue-600/40 to-purple-600/40" />
      <motion.div whileHover={{ scale: 1.2, rotate: 90 }} transition={{ type: 'spring', stiffness: 300 }} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center z-10 border border-white/40 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)]">
        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
      </motion.div>
    </div>
  );
}
export function MinimalHeroPreview() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-center p-6 bg-white dark:bg-neutral-950 relative overflow-hidden">
      <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-100 dark:via-neutral-800/30 to-transparent skew-x-[-20deg]" />
      <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-[10px] text-violet-500 font-bold tracking-widest uppercase mb-2 relative z-10">THE FUTURE</motion.span>
      <div className="h-5 w-4/5 bg-neutral-900 dark:bg-white rounded-sm mb-2 relative z-10" />
      <div className="h-5 w-3/5 bg-neutral-900 dark:bg-white rounded-sm relative z-10" />
    </div>
  );
}

/* ============ BUTTONS ============ */
export function MagneticBtnPreview() {
  const [h, setH] = useState(false);
  useEffect(() => { const i = setInterval(() => setH(v => !v), 1200); return () => clearInterval(i); }, []);
  return (
    <motion.div animate={{ x: h ? 10 : -10, y: h ? -5 : 5 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }} className="px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs rounded-full font-bold shadow-xl flex items-center gap-2 cursor-pointer">
      Magnetic <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
    </motion.div>
  );
}
export function ShineBtnPreview() {
  return (
    <motion.button whileHover={{ scale: 1.05 }} className="relative overflow-hidden px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs rounded-xl font-bold group shadow-[0_0_20px_rgba(139,92,246,0.4)]">
      <span className="relative z-10">Shine Button</span>
      <motion.div animate={{ left: ['-100%', '200%'] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
        className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]" />
    </motion.button>
  );
}
export function GradientBtnPreview() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="relative p-[2px] rounded-xl overflow-hidden cursor-pointer group">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-[100%]" style={{ background: 'conic-gradient(from 0deg, transparent 0%, transparent 60%, #8b5cf6 80%, #ec4899 100%)' }} />
      <div className="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 backdrop-blur-md" />
      <div className="relative bg-white dark:bg-neutral-950 px-5 py-2.5 rounded-[10px] text-xs font-bold flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Gradient
      </div>
    </motion.div>
  );
}
export function RippleBtnPreview() {
  const [r, setR] = useState(false);
  useEffect(() => { const i = setInterval(() => { setR(true); setTimeout(() => setR(false), 600); }, 1500); return () => clearInterval(i); }, []);
  return (
    <motion.div whileTap={{ scale: 0.95 }} className="relative overflow-hidden px-5 py-2.5 bg-blue-600 text-white text-xs rounded-xl font-bold cursor-pointer shadow-lg shadow-blue-600/30">
      Click Me
      <AnimatePresence>
        {r && <motion.span initial={{ scale: 0, opacity: 0.6 }} animate={{ scale: 4, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
          className="absolute inset-0 m-auto w-6 h-6 rounded-full bg-white" />}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============ CARDS ============ */
export function SpotlightCardPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-xl overflow-hidden p-4">
      <GlowCard className="bg-neutral-800/50 text-center flex flex-col justify-center items-center">
        <h3 className="text-xl font-bold text-white mb-2">Spotlight</h3>
        <p className="text-sm text-neutral-400">Hover me to see the magic.</p>
      </GlowCard>
    </div>
  );
}
export function GlassCardPreview() {
  return (
    <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="w-36 h-44 rounded-2xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 backdrop-blur-md border border-white/40 dark:border-white/10 p-4 flex flex-col shadow-2xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-white/20 mb-auto flex items-center justify-center backdrop-blur-sm">
        <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
      </div>
      <div className="h-2 w-full bg-white/60 dark:bg-white/30 rounded mb-2" />
      <div className="h-2 w-2/3 bg-white/60 dark:bg-white/30 rounded" />
    </motion.div>
  );
}
export function TiltCardPreview() {
  return (
    <div className="[perspective:1000px] w-full h-full flex items-center justify-center">
      <motion.div animate={{ rotateX: [15, -15, 15], rotateY: [-20, 20, -20] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-36 h-44 rounded-2xl bg-gradient-to-tr from-neutral-900 to-neutral-700 shadow-2xl p-4 flex flex-col justify-between border border-white/10 relative overflow-hidden">
        <motion.div animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -inset-10 bg-gradient-to-tr from-transparent via-white to-transparent opacity-20 transform rotate-45" />
        <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
        <div className="text-white font-bold text-sm tracking-wide">3D TILT</div>
      </motion.div>
    </div>
  );
}
export function FeatureCardPreview() {
  const [h, setH] = useState(false);
  useEffect(() => { const i = setInterval(() => setH(v => !v), 1500); return () => clearInterval(i); }, []);
  return (
    <motion.div animate={{ scale: h ? 1.05 : 1, borderColor: h ? '#8b5cf6' : 'transparent' }} transition={{ type: 'spring' }}
      className="w-44 p-4 rounded-2xl border-2 border-transparent bg-white dark:bg-neutral-900 shadow-xl relative overflow-hidden">
      <motion.div animate={{ scale: h ? 20 : 1, opacity: h ? 0.05 : 1 }} className="absolute -right-4 -top-4 w-16 h-16 bg-violet-500 rounded-full" />
      <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-500 mb-3 relative z-10">
        <motion.div animate={{ rotate: h ? 360 : 0 }} transition={{ duration: 0.5 }}><Zap className="w-5 h-5 fill-current" /></motion.div>
      </div>
      <div className="text-xs font-bold relative z-10">Lightning Fast</div>
      <div className="text-[10px] text-neutral-500 mt-1 relative z-10">Built for performance.</div>
    </motion.div>
  );
}
export function StatCardPreview() {
  const [n, setN] = useState(0);
  useEffect(() => { const i = setInterval(() => setN(v => (v < 999 ? v + 11 : 0)), 50); return () => clearInterval(i); }, []);
  return (
    <motion.div whileHover={{ y: -5 }} className="w-40 p-4 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border shadow-md relative overflow-hidden">
      <motion.div animate={{ height: [`${n/10}%`, `${(n+50)/10}%`] }} className="absolute bottom-0 left-0 right-0 bg-emerald-500/10 dark:bg-emerald-500/20" />
      <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold flex items-center justify-between">
        Revenue <span className="text-emerald-500">↑24%</span>
      </div>
      <motion.div key={n} initial={{ scale: 0.9, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="text-3xl font-black mt-2 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400">
        ${n}k
      </motion.div>
    </motion.div>
  );
}

/* ============ PRICING ============ */
export function PricingTogglePreview() {
  const [y, setY] = useState(false);
  useEffect(() => { const i = setInterval(() => setY(v => !v), 2000); return () => clearInterval(i); }, []);
  return (
    <div className="flex flex-col items-center gap-4 w-full pt-2">
      <div className="relative flex bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 cursor-pointer w-32">
        <motion.div animate={{ x: y ? '100%' : '0%' }} className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white dark:bg-neutral-700 rounded-full shadow-md" />
        <div className={`flex-1 text-center py-1 text-[10px] font-bold z-10 transition-colors ${!y?'text-neutral-900 dark:text-white':'text-neutral-500'}`}>Mo</div>
        <div className={`flex-1 text-center py-1 text-[10px] font-bold z-10 transition-colors ${y?'text-neutral-900 dark:text-white':'text-neutral-500'}`}>Yr</div>
      </div>
      <motion.div animate={{ scale: y ? 1.05 : 1 }} className="w-36 p-4 rounded-2xl border-2 border-violet-500 bg-card shadow-xl text-center">
        <div className="text-xs font-bold uppercase text-violet-500">Pro</div>
        <motion.div key={y?'y':'m'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-black mt-1">
          ${y ? '199' : '19'}<span className="text-[10px] text-neutral-500 font-normal">/{y?'yr':'mo'}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
export function SimplePricingPreview() {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="w-44 rounded-2xl border-2 border-pink-500 bg-white dark:bg-neutral-950 p-5 relative shadow-[0_10px_30px_rgba(236,72,153,0.2)]">
      <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 2, repeat: Infinity }} className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">Popular</motion.div>
      <div className="text-sm font-bold text-center">Starter</div>
      <div className="text-3xl font-black text-center my-3">$10</div>
      <motion.button whileTap={{ scale: 0.95 }} className="w-full py-2 rounded-xl bg-pink-500 text-white text-xs font-bold text-center shadow-md shadow-pink-500/30">Get started</motion.button>
    </motion.div>
  );
}
export function ComparisonPreview() {
  const [h, setH] = useState(false);
  useEffect(() => { const i = setInterval(() => setH(v => !v), 1500); return () => clearInterval(i); }, []);
  return (
    <div className="w-52 border rounded-xl overflow-hidden bg-card text-[10px] shadow-lg">
      <div className="flex border-b bg-neutral-50 dark:bg-neutral-900/50">
        <div className="flex-1 p-2 font-bold">Compare</div>
        <div className="w-12 p-2 text-center font-semibold">Free</div>
        <div className="w-12 p-2 text-center font-bold text-violet-500 bg-violet-50 dark:bg-violet-900/20">Pro</div>
      </div>
      {['Users', 'Storage', 'Support'].map((f, i) => (
        <motion.div key={f} animate={{ backgroundColor: h && i===1 ? 'rgba(139,92,246,0.1)' : 'transparent' }} className="flex border-b last:border-0">
          <div className="flex-1 p-2 text-neutral-500 font-medium">{f}</div>
          <div className="w-12 p-2 flex items-center justify-center"><Check className="w-3 h-3 text-neutral-400" /></div>
          <div className="w-12 p-2 flex items-center justify-center bg-violet-50 dark:bg-violet-900/20"><motion.div animate={{ scale: h?1.2:1 }}><Check className="w-3.5 h-3.5 text-violet-500 font-bold" /></motion.div></div>
        </motion.div>
      ))}
    </div>
  );
}
export function UsagePricingPreview() {
  const [w, setW] = useState(10);
  useEffect(() => { const i = setInterval(() => setW(v => (v > 90 ? 10 : v + 20)), 1000); return () => clearInterval(i); }, []);
  return (
    <div className="w-48 p-4 rounded-2xl border bg-card shadow-xl">
      <div className="flex justify-between text-[11px] mb-3"><span>API Calls</span><span className="font-bold text-violet-500">{w}k</span></div>
      <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full relative">
        <motion.div animate={{ width: `${w}%` }} transition={{ type: 'spring' }} className="absolute left-0 top-0 bottom-0 bg-violet-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
        <motion.div animate={{ left: `${w}%` }} transition={{ type: 'spring' }} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-violet-500 rounded-full shadow-lg" />
      </div>
      <div className="text-center text-[11px] mt-4 font-bold">Est. ${(w * 0.5).toFixed(0)}/mo</div>
    </div>
  );
}

/* ============ FOOTER ============ */
export function DarkFooterPreview() {
  return (
    <div className="w-full h-full rounded-xl bg-neutral-950 relative overflow-hidden flex flex-col justify-end p-4 border border-white/10 group cursor-pointer">
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-16 bg-violet-600/40 blur-[30px] rounded-full" />
      <div className="relative z-10 flex justify-between items-center text-[11px] text-white/70">
        <motion.span whileHover={{ letterSpacing: '0.2em' }} className="text-white font-black tracking-widest transition-all">COMPANY</motion.span>
        <div className="flex gap-3">
          <motion.div whileHover={{ y: -2, color: '#fff' }}><Github className="w-4 h-4"/></motion.div>
          <motion.div whileHover={{ y: -2, color: '#fff' }}><Mail className="w-4 h-4"/></motion.div>
        </div>
      </div>
    </div>
  );
}
export function StickyFooterPreview() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xl">
      <div className="absolute inset-x-0 bottom-0 p-4 bg-white dark:bg-neutral-950 border-t shadow-[0_-15px_30px_rgba(0,0,0,0.1)] flex items-center justify-between">
        <div>
          <div className="text-[12px] font-black">Ready to start?</div>
          <div className="text-[10px] text-neutral-500">Join 50k+ devs today.</div>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-2 bg-violet-500 text-white text-[10px] font-bold rounded-xl shadow-lg shadow-violet-500/30">Sign Up</motion.button>
      </div>
    </div>
  );
}

/* ============ NAVBAR ============ */
export function GlassNavbarPreview() {
  return (
    <div className="w-full h-full flex items-start justify-center p-4 relative overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 rounded-xl">
      <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }} className="w-56 h-12 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl flex items-center justify-between px-4 z-10 relative">
        <motion.div whileHover={{ rotate: 180 }} className="w-5 h-5 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 cursor-pointer shadow-md" />
        <div className="flex gap-3">
          {[1,2,3].map(i => <motion.div key={i} whileHover={{ y: -2 }} className="w-6 h-1.5 bg-neutral-900/20 dark:bg-white/20 rounded-full cursor-pointer"/>)}
        </div>
        <motion.div whileHover={{ scale: 1.1 }} className="w-6 h-6 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center cursor-pointer"><Search className="w-3 h-3 text-white dark:text-black"/></motion.div>
      </motion.div>
    </div>
  );
}
export function ScrollNavbarPreview() {
  const [s, setS] = useState(false);
  useEffect(() => { const i = setInterval(() => setS(v => !v), 2500); return () => clearInterval(i); }, []);
  return (
    <div className="w-full h-full relative overflow-hidden bg-neutral-50 dark:bg-neutral-900 border rounded-xl">
      <motion.div animate={{ y: s ? -50 : 0, opacity: s ? 0 : 1 }} transition={{ type: 'spring' }} className="absolute top-0 inset-x-0 h-12 bg-white dark:bg-black border-b flex items-center px-4 justify-between z-10 shadow-sm">
        <span className="text-[12px] font-black">LOGO</span>
        <span className="text-[10px] font-bold px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg">Menu</span>
      </motion.div>
      <motion.div animate={{ y: s ? -50 : 0 }} transition={{ type: 'spring' }} className="mt-16 p-4 space-y-3 opacity-40">
        <div className="h-3 w-full bg-neutral-400 rounded-md"/>
        <div className="h-3 w-3/4 bg-neutral-400 rounded-md"/>
        <div className="h-3 w-5/6 bg-neutral-400 rounded-md"/>
        <div className="h-3 w-full bg-neutral-400 rounded-md"/>
      </motion.div>
    </div>
  );
}
export function PillNavbarPreview() {
  const [a, setA] = useState(0);
  useEffect(() => { const i = setInterval(() => setA(v => (v+1)%3), 1500); return () => clearInterval(i); }, []);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="inline-flex bg-neutral-200/50 dark:bg-neutral-800/50 p-1.5 rounded-full relative border dark:border-neutral-700/50 shadow-inner">
        {['Home','Features','Pricing'].map((l,i) => (
          <div key={l} className={`relative px-4 py-1.5 text-[11px] font-bold rounded-full z-10 transition-colors ${i===a?'text-neutral-900 dark:text-white drop-shadow-sm':'text-neutral-500 cursor-pointer'}`}>
            {i===a && <motion.div layoutId="pill" className="absolute inset-0 bg-white dark:bg-neutral-700 rounded-full shadow-md -z-10" transition={{ type: 'spring', stiffness: 300, damping: 25 }}/>}
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ FORMS ============ */
export function LoginFormPreview() {
  return (
    <motion.div whileHover={{ y: -5 }} className="w-56 p-5 rounded-2xl border bg-white dark:bg-neutral-900 shadow-2xl flex flex-col gap-4">
      <div className="text-[14px] font-black text-center">Welcome Back</div>
      <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.02 }} className="w-full py-2.5 bg-neutral-900 text-white rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-neutral-900/20"><Github className="w-4 h-4"/> Sign In with GitHub</motion.button>
      <div className="flex items-center gap-2 opacity-50"><div className="flex-1 h-px bg-current"/><span className="text-[9px] font-bold tracking-widest">OR</span><div className="flex-1 h-px bg-current"/></div>
      <div className="space-y-2">
        <div className="h-8 rounded-lg border bg-neutral-50 dark:bg-neutral-800 w-full" />
        <div className="h-8 rounded-lg border bg-neutral-50 dark:bg-neutral-800 w-full" />
      </div>
    </motion.div>
  );
}
export function ContactFormPreview() {
  return (
    <div className="w-56 p-5 rounded-2xl border bg-white dark:bg-neutral-900 shadow-2xl relative overflow-hidden group">
      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -right-10 -top-10 w-32 h-32 bg-violet-500 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-500 flex items-center justify-center shadow-inner"><Mail className="w-4 h-4"/></motion.div>
        <span className="text-[13px] font-black">Contact Us</span>
      </div>
      <div className="space-y-3 relative z-10">
        <div className="h-8 rounded-lg border bg-neutral-50 dark:bg-neutral-800/50 w-full" />
        <div className="h-14 rounded-lg border bg-neutral-50 dark:bg-neutral-800/50 w-full" />
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="h-8 rounded-lg bg-violet-600 text-white font-bold text-[10px] w-full mt-2 shadow-lg shadow-violet-600/20">Send Message</motion.button>
      </div>
    </div>
  );
}

/* ============ INPUTS ============ */
export function GlowingSearchBarPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-black rounded-xl">
      <SearchComponent />
    </div>
  );
}
export function FloatingLabelPreview() {
  const [f, setF] = useState(false);
  useEffect(() => { const i = setInterval(() => setF(v => !v), 2500); return () => clearInterval(i); }, []);
  return (
    <div className="w-48 relative mt-6">
      <div className={`w-full h-11 rounded-xl border-2 px-3 flex items-center transition-colors duration-300 ${f?'border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.2)]':'border-neutral-300 dark:border-neutral-700'}`}>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: f ? 1 : 0 }} className="text-[12px] font-medium text-neutral-900 dark:text-white">hello@example.com</motion.span>
      </div>
      <motion.span animate={{ y: f ? -22 : -1, x: f ? -4 : 0, scale: f ? 0.8 : 1, color: f ? '#8b5cf6' : '#737373' }} className="absolute left-3 top-3 text-[12px] font-bold bg-background px-1.5 pointer-events-none origin-left transition-colors">Email Address</motion.span>
    </div>
  );
}
export function SearchInputPreview() {
  const [f, setF] = useState(false);
  useEffect(() => { const i = setInterval(() => setF(v => !v), 2000); return () => clearInterval(i); }, []);
  return (
    <motion.div animate={{ scale: f ? 1.05 : 1, borderColor: f ? '#8b5cf6' : 'transparent', boxShadow: f ? '0 10px 25px -5px rgba(139,92,246,0.3)' : '0 1px 2px 0 rgba(0,0,0,0.05)' }} className="w-52 h-10 rounded-xl bg-white dark:bg-neutral-800 flex items-center px-3 justify-between border-2 transition-colors">
      <div className="flex items-center gap-2 text-neutral-500">
        <motion.div animate={{ rotate: f ? 90 : 0 }} transition={{ type: 'spring' }}><Search className={`w-4 h-4 ${f?'text-violet-500':''}`}/></motion.div>
        <AnimatePresence mode="wait">
          <motion.span key={f?'t':'f'} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[11px] font-medium">
            {f ? 'Searching...' : 'Search components...'}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-700 border shadow-sm text-[9px] font-bold text-neutral-500">⌘K</div>
    </motion.div>
  );
}
export function SliderInputPreview() {
  const [w, setW] = useState(60);
  useEffect(() => { const i = setInterval(() => setW(v => (v > 80 ? 20 : v + 30)), 1500); return () => clearInterval(i); }, []);
  return (
    <div className="w-48 relative pt-6 group">
      <motion.div animate={{ left: `${w}%` }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="absolute top-0 -translate-x-1/2 px-2 py-1 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-black shadow-lg">
        {w}%
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900 dark:border-t-white" />
      </motion.div>
      <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full relative cursor-pointer">
        <motion.div animate={{ width: `${w}%` }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="absolute left-0 inset-y-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
        <motion.div animate={{ left: `${w}%`, scale: [1, 1.2, 1] }} transition={{ scale: { repeat: Infinity, duration: 2 }, left: { type: 'spring', stiffness: 300, damping: 20 } }} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white border-4 border-violet-500 rounded-full shadow-xl" />
      </div>
    </div>
  );
}


// --- MIGRATED 50 PREVIEWS ---
import { Code2 } from "lucide-react";
export function GenericComponentPreview({ name }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-muted/20 border border-dashed border-muted-foreground/30 rounded-xl">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
        <Code2 className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-sm font-medium text-foreground">{name}</h3>
      <p className="text-xs text-muted-foreground mt-1">Preview not available</p>
    </div>
  );
}


