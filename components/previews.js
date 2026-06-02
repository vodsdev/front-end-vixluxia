'use client';
// Live, animated previews approximating each component. These re-implement the visual
// of each prompt so the user sees what they'll get — not literally the same source.
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ArrowRight, Star, Rocket, Sparkles, Play } from 'lucide-react';

const SettingsIcon = ({ className }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" className={className} fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.5 0h-3l-.27 1.46c-.04.18-.18.33-.36.39-.25.09-.49.19-.72.3a.4.4 0 0 1-.4 0L3.4 1.28 1.28 3.4l.84 1.23a.4.4 0 0 1 0 .4c-.11.23-.21.47-.3.72a.4.4 0 0 1-.36.36L0 6.5v3l1.46.27c.18.04.33.18.39.36.09.25.19.49.3.72a.4.4 0 0 1 0 .4l-.84 1.23 2.12 2.12 1.23-.84a.4.4 0 0 1 .4 0c.23.11.47.21.72.3a.4.4 0 0 1 .36.36L6.5 16h3l.27-1.46a.4.4 0 0 1 .36-.39c.25-.09.49-.19.72-.3a.4.4 0 0 1 .4 0l1.23.84 2.12-2.12-.84-1.23a.4.4 0 0 1 0-.4c.11-.23.21-.47.3-.72a.4.4 0 0 1 .36-.36L16 9.5v-3l-1.46-.27a.4.4 0 0 1-.36-.39c-.09-.25-.19-.49-.3-.72a.4.4 0 0 1 0-.4l.84-1.23-2.12-2.12-1.23.84a.4.4 0 0 1-.4 0c-.23-.11-.47-.21-.72-.3a.4.4 0 0 1-.36-.36L9.5 0ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
  </svg>
);

export function UpgradeBannerPreview() {
  const [hover, setHover] = useState(false);
  useEffect(() => { const i = setInterval(() => setHover(h => !h), 1800); return () => clearInterval(i); }, []);
  return (
    <div className="relative">
      <motion.div animate={{ x: hover ? -10 : 0, y: hover ? -10 : 0, rotate: hover ? 360 : 0, opacity: hover ? 1 : 0 }}
        className="absolute left-1 top-0 text-blue-500 dark:text-blue-400"><SettingsIcon/></motion.div>
      <motion.div animate={{ x: hover ? 10 : 0, y: hover ? 10 : 0, rotate: hover ? 360 : 0, opacity: hover ? 1 : 0 }}
        className="absolute right-1 bottom-0 text-blue-500 dark:text-blue-400"><SettingsIcon/></motion.div>
      <div className="relative flex items-center gap-2 h-[35px] rounded-md border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/40 pl-2.5 pr-1 text-sm">
        <span className="text-[13px] font-medium text-blue-900 dark:text-blue-100 underline decoration-blue-200 underline-offset-4">Upgrade to Pro</span>
        <span className="text-[12px] text-blue-600 dark:text-blue-300">2x faster builds</span>
        <button className="w-6 h-6 rounded text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 flex items-center justify-center"><X size={14}/></button>
      </div>
    </div>
  );
}

export function ShinyTextPreview() {
  return (
    <div className="rounded-full border border-black/5 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 px-4 py-1.5">
      <span className="inline-flex items-center gap-1 text-sm bg-gradient-to-r from-transparent via-black/80 dark:via-white/80 via-50% to-transparent bg-clip-text text-transparent"
        style={{ backgroundSize: '100px 100%', animation: 'shiny 3s linear infinite' }}>
        ✨ Introducing Magic UI <ArrowRight className="w-3 h-3 text-neutral-400"/>
      </span>
      <style>{`@keyframes shiny { 0%,90%,100%{background-position:-200px 0} 30%,60%{background-position:200px 0} }`}</style>
    </div>
  );
}

export function HeroPillPreview() {
  return (
    <motion.p initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}
      className="inline-flex items-center rounded-full bg-white dark:bg-neutral-800 px-3 py-1 text-sm font-medium shadow-sm shadow-black/10">
      <span className="mr-2 border-r border-neutral-200 dark:border-neutral-700 pr-2">
        <Star className="w-3 h-3 fill-neutral-500 text-neutral-500"/>
      </span>
      New releases every week
    </motion.p>
  );
}

export function HeroBadgePreview() {
  return (
    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} whileHover={{ scale: 1.02 }}
      className="inline-flex items-center gap-2 rounded-full border bg-white dark:bg-neutral-800 px-4 py-1.5 text-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 transition">
      <motion.div whileHover={{ rotate: -10 }} className="text-neutral-500"><Sparkles className="w-4 h-4"/></motion.div>
      <span>New! PrismUI Components</span>
      <ArrowRight className="w-4 h-4 text-neutral-400"/>
    </motion.div>
  );
}

export function BannerCvaPreview() {
  return (
    <div className="w-full max-w-sm relative overflow-hidden rounded-md border border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 py-1.5 px-2.5">
      <motion.div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: ['-100%', '200%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}/>
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-purple-700 dark:text-purple-200"/>
          <div>
            <p className="text-sm font-semibold text-purple-900 dark:text-purple-100">AI Dashboard is here!</p>
            <p className="text-[10px] text-purple-700/80 dark:text-purple-200/80">Experience analytics</p>
          </div>
        </div>
        <button className="text-xs px-2 py-1 rounded-md bg-white/40 dark:bg-black/20 text-purple-900 dark:text-purple-100 flex items-center gap-1">Try <ArrowRight className="w-3 h-3"/></button>
      </div>
    </div>
  );
}

export function BannerRainbowPreview() {
  return (
    <div className="w-full relative overflow-hidden rounded-md h-12 flex items-center justify-center text-sm font-medium text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 shadow-sm">
      <div className="absolute inset-0 z-0 opacity-80"
        style={{
          maskImage: 'radial-gradient(circle at top center, white, transparent)',
          backgroundImage: 'repeating-linear-gradient(70deg, rgba(231,77,255,0.77) 0%, rgba(231,77,255,0.77) 7%, transparent 14%, rgba(231,77,255,0.77) 21%, transparent 28%)',
          backgroundSize: '200% 100%', filter: 'saturate(2)',
          animation: 'rainbowFlow 8s linear infinite',
        }}/>
      <span className="relative z-10">🚀 Project evolving more features soon!</span>
      <style>{`@keyframes rainbowFlow { from{background-position:0% 0} to{background-position:100% 0} }`}</style>
    </div>
  );
}

export function AnnouncementCardPreview() {
  return (
    <div className="w-full max-w-[220px] rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-3 shadow-sm">
      <div className="flex items-center justify-between text-neutral-500">
        <h5 className="text-[13px] font-medium">New Feature</h5>
        <button className="h-5 w-5 rounded text-lg leading-none hover:bg-neutral-100 dark:hover:bg-neutral-700">×</button>
      </div>
      <p className="text-[12.5px] text-neutral-900 dark:text-neutral-100 mt-1">Introducing v0 Community. Share your generations.</p>
    </div>
  );
}

export function InfoCardPreview() {
  const [hover, setHover] = useState(false);
  useEffect(() => { const i = setInterval(() => setHover(h => !h), 2200); return () => clearInterval(i); }, []);
  return (
    <div className="w-full max-w-[200px] rounded-lg border bg-white dark:bg-neutral-800 p-3" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <p className="text-[12px] font-medium text-neutral-900 dark:text-neutral-100">Video Walkthrough</p>
      <p className="text-[11px] text-neutral-500">Watch the new dashboard.</p>
      <motion.div className="relative mt-2 h-16" animate={{ height: hover ? 80 : 40 }}>
        {[0,1,2].map(i => (
          <motion.div key={i} className="absolute w-full h-12 rounded border bg-gradient-to-br from-violet-200 to-orange-200 shadow-md flex items-center justify-center"
            animate={{ rotate: hover ? (i-1) * 5 : 0, x: hover ? (i-1) * 14 : 0, y: hover ? -i * 4 : 0, scale: hover ? 0.95 + i * 0.02 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <Play className="w-4 h-4 text-white/90" fill="currentColor"/>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
