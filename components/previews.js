'use client';
// Live, animated previews approximating each component. These re-implement the visual
// of each prompt so the user sees what they'll get — not literally the same source.
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ArrowRight, Star, Rocket, Sparkles, Play, CheckCircle2, AlertCircle, AlertTriangle, Info, Quote, ArrowUpDown, Search, ArrowUp, ArrowDown, Maximize2, UploadCloud, Calendar, ChevronDown, ChevronLeft, ChevronRight, Copy, Share2, Inbox, TrendingUp, Heart, Check, ImageIcon } from 'lucide-react';

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

// ============ LOADERS ============
export function SpinnerRingPreview() {
  return (
    <div className="text-violet-500 dark:text-violet-400">
      <div className="w-10 h-10 rounded-full animate-spin"
        style={{
          background: 'conic-gradient(from 0deg, transparent, currentColor)',
          WebkitMask: 'radial-gradient(circle at center, transparent 14px, black 15px)',
          mask: 'radial-gradient(circle at center, transparent 14px, black 15px)',
        }}/>
    </div>
  );
}
export function DotsPulsePreview() {
  return (
    <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
      {[0,1,2].map(i => (
        <span key={i} className="block w-2.5 h-2.5 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${i*150}ms`, animationDuration: '900ms' }}/>
      ))}
    </div>
  );
}
export function ProgressShimmerPreview() {
  return (
    <div className="w-48 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative">
      <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-violet-500 to-transparent"
        style={{ animation: 'sh 1.5s infinite linear' }}/>
      <style>{`@keyframes sh { 0%{left:-33%} 100%{left:100%} }`}</style>
    </div>
  );
}

// ============ TOASTS ============
export function SuccessToastPreview() {
  return (
    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="flex items-start gap-2.5 max-w-[230px] p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 shadow-md">
      <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300"/>
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-emerald-900 dark:text-emerald-100">Saved successfully</p>
        <p className="text-[10.5px] text-emerald-700 dark:text-emerald-300/80">Your changes are live</p>
      </div>
    </motion.div>
  );
}
export function ActionToastPreview() {
  return (
    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between gap-3 pl-3.5 pr-1 py-1 rounded-full bg-neutral-900 text-white shadow-xl">
      <p className="text-[12px]">File moved to trash</p>
      <button className="px-2.5 py-1 rounded-full bg-white text-neutral-900 text-[10px] font-medium">Undo</button>
    </motion.div>
  );
}
export function StackToastPreview() {
  const [hover, setHover] = useState(false);
  useEffect(() => { const i = setInterval(() => setHover(h => !h), 2400); return () => clearInterval(i); }, []);
  return (
    <div className="relative w-44 h-20" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {[0,1,2].map(i => (
        <motion.div key={i} className="absolute left-0 right-0 p-2 rounded-lg bg-white dark:bg-neutral-800 border shadow-md text-[11px]"
          animate={{ y: hover ? i * 28 : i * 4, scale: 1 - i * 0.04, opacity: 1 - i * 0.2, zIndex: 10 - i }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
          Notification {i+1}
        </motion.div>
      ))}
    </div>
  );
}

// ============ MODALS ============
export function ConfirmModalPreview() {
  return (
    <div className="w-48 rounded-lg bg-white dark:bg-neutral-800 border shadow-xl p-3">
      <p className="text-[12px] font-semibold">Delete project?</p>
      <p className="text-[10.5px] text-neutral-500 mt-0.5">This cannot be undone.</p>
      <div className="flex justify-end gap-1.5 mt-3">
        <button className="px-2.5 py-1 rounded text-[10.5px] text-neutral-600 dark:text-neutral-300">Cancel</button>
        <button className="px-2.5 py-1 rounded bg-red-600 text-white text-[10.5px] font-medium">Delete</button>
      </div>
    </div>
  );
}
export function AlertModalPreview() {
  return (
    <div className="w-44 rounded-lg bg-white dark:bg-neutral-800 border shadow-xl p-3 text-center">
      <div className="mx-auto w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950 flex items-center justify-center">
        <AlertTriangle className="w-4 h-4 text-amber-500"/>
      </div>
      <p className="mt-2 text-[12px] font-semibold">Connection lost</p>
      <button className="mt-2 w-full py-1.5 rounded bg-neutral-900 dark:bg-white dark:text-neutral-900 text-white text-[10.5px] font-medium">Got it</button>
    </div>
  );
}
export function DrawerModalPreview() {
  return (
    <div className="relative w-40 h-24 rounded-lg bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
      <motion.div className="absolute inset-x-0 bottom-0 rounded-t-xl bg-white dark:bg-neutral-800 border-t border-x p-2"
        animate={{ y: [40, 0, 0, 40] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.25, 0.75, 1] }}>
        <div className="w-8 h-1 mx-auto rounded-full bg-neutral-300 mb-1.5"/>
        <p className="text-[10.5px] font-medium text-center">Bottom Drawer</p>
      </motion.div>
    </div>
  );
}

// ============ TABS ============
export function UnderlineTabsPreview() {
  const items = ['Overview', 'Activity', 'Settings'];
  const [active, setActive] = useState(0);
  useEffect(() => { const i = setInterval(() => setActive(a => (a+1) % items.length), 1800); return () => clearInterval(i); }, []);
  return (
    <div className="flex gap-1 border-b border-neutral-200 dark:border-neutral-700">
      {items.map((l, i) => (
        <button key={l} className="relative px-3 py-1.5 text-[12px]">
          {i === active && <motion.span layoutId="ul" className="absolute inset-x-0 -bottom-px h-[2px] bg-neutral-900 dark:bg-white"/>}
          <span className={i === active ? 'text-neutral-900 dark:text-neutral-100 font-medium' : 'text-neutral-500'}>{l}</span>
        </button>
      ))}
    </div>
  );
}
export function PillTabsPreview() {
  const items = ['Day', 'Week', 'Month'];
  const [active, setActive] = useState(0);
  useEffect(() => { const i = setInterval(() => setActive(a => (a+1) % items.length), 1800); return () => clearInterval(i); }, []);
  return (
    <div className="inline-flex gap-0.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800">
      {items.map((l, i) => (
        <button key={l} className="relative px-3 py-1 text-[12px] font-medium">
          {i === active && <motion.span layoutId="pt" className="absolute inset-0 rounded-lg bg-white dark:bg-neutral-700 shadow-sm"/>}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  );
}
export function GlassTabsPreview() {
  const items = ['Home', 'Search', 'Profile'];
  const [active, setActive] = useState(0);
  useEffect(() => { const i = setInterval(() => setActive(a => (a+1) % items.length), 1800); return () => clearInterval(i); }, []);
  return (
    <div className="inline-flex gap-0.5 p-1 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-md">
      {items.map((l, i) => (
        <button key={l} className={`px-3 py-1 rounded-xl text-[11.5px] transition-all ${i === active ? 'bg-gradient-to-br from-violet-500/30 to-pink-500/30 text-foreground' : 'text-neutral-500'}`}>{l}</button>
      ))}
    </div>
  );
}

// ============ TABLES ============
export function StripedTablePreview() {
  return (
    <div className="w-48 rounded-lg overflow-hidden border text-[10.5px]">
      <div className="grid grid-cols-2 px-2 py-1 bg-neutral-100 dark:bg-neutral-800 font-medium">
        <span>Name</span><span>Role</span>
      </div>
      {[['Ana','Dev'],['Theo','Design'],['Mia','PM']].map((r,i) => (
        <div key={i} className={`grid grid-cols-2 px-2 py-1 ${i%2 ? 'bg-neutral-50/60 dark:bg-neutral-900/30' : ''}`}>
          <span>{r[0]}</span><span className="text-neutral-500">{r[1]}</span>
        </div>
      ))}
    </div>
  );
}
export function SortableTablePreview() {
  return (
    <div className="w-48 rounded-lg overflow-hidden border text-[10.5px]">
      <div className="grid grid-cols-2 px-2 py-1 bg-neutral-100 dark:bg-neutral-800">
        <span className="inline-flex items-center gap-1 font-medium">Name <ArrowUpDown className="w-2.5 h-2.5"/></span>
        <span className="inline-flex items-center gap-1 font-medium">Score <ArrowUpDown className="w-2.5 h-2.5"/></span>
      </div>
      {[['Alpha','92'],['Beta','78'],['Gamma','64']].map((r,i) => (
        <div key={i} className="grid grid-cols-2 px-2 py-1 border-t"><span>{r[0]}</span><span>{r[1]}</span></div>
      ))}
    </div>
  );
}
export function CompactTablePreview() {
  const dot = { a: 'bg-emerald-500', p: 'bg-amber-500', d: 'bg-neutral-400' };
  return (
    <ul className="w-48 rounded-lg border bg-card divide-y text-[11px]">
      {[{n:'Deploy',s:'a'},{n:'Migrate',s:'p'},{n:'Archive',s:'d'}].map((it,i) => (
        <li key={i} className="flex items-center gap-2 px-2 py-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${dot[it.s]}`}/>
          <span className="flex-1">{it.n}</span>
          <span className="text-neutral-400 text-[10px]">{it.s === 'a' ? 'active' : it.s === 'p' ? 'paused' : 'done'}</span>
        </li>
      ))}
    </ul>
  );
}

// ============ AVATARS ============
const AV = ['https://i.pravatar.cc/60?img=1','https://i.pravatar.cc/60?img=5','https://i.pravatar.cc/60?img=8','https://i.pravatar.cc/60?img=12','https://i.pravatar.cc/60?img=15'];

export function AvatarStackPreview() {
  return (
    <div className="flex -space-x-2">
      {AV.slice(0,3).map((a,i) => <img key={i} src={a} alt="" className="w-9 h-9 rounded-full ring-2 ring-white dark:ring-neutral-800 object-cover"/>)}
      <div className="w-9 h-9 rounded-full ring-2 ring-white dark:ring-neutral-800 bg-neutral-200 dark:bg-neutral-700 text-[10.5px] font-medium flex items-center justify-center">+5</div>
    </div>
  );
}
export function AvatarStatusPreview() {
  return (
    <div className="relative">
      <img src={AV[0]} alt="" className="w-12 h-12 rounded-full object-cover"/>
      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-neutral-800">
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-70"/>
      </span>
    </div>
  );
}
export function AvatarGroupPreview() {
  const [hover, setHover] = useState(false);
  useEffect(() => { const i = setInterval(() => setHover(h => !h), 2000); return () => clearInterval(i); }, []);
  return (
    <div className="flex">
      {AV.slice(0,4).map((a,i) => (
        <motion.img key={i} src={a} alt="" className="w-9 h-9 rounded-full ring-2 ring-white dark:ring-neutral-800 object-cover -ml-2.5 first:ml-0"
          animate={{ y: hover ? -4 : 0, scale: hover ? 1.05 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.04 }}/>
      ))}
    </div>
  );
}

// ============ BADGES ============
export function BadgeVariantsPreview() {
  return (
    <div className="flex flex-wrap gap-1.5 max-w-[220px] justify-center">
      {[
        ['Success','bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900'],
        ['Warning','bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900'],
        ['Danger','bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-900'],
        ['Info','bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900'],
        ['Purple','bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-900'],
      ].map(([l, c]) => (
        <span key={l} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-medium border ${c}`}>
          <span className="w-1 h-1 rounded-full bg-current"/>{l}
        </span>
      ))}
    </div>
  );
}
export function BadgePulsePreview() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs font-medium">
      <span className="relative flex w-2 h-2">
        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"/>
        <span className="relative w-2 h-2 rounded-full bg-red-500"/>
      </span>
      LIVE
    </span>
  );
}
export function BadgeCounterPreview() {
  const [n, setN] = useState(3);
  useEffect(() => { const i = setInterval(() => setN(v => (v >= 12 ? 1 : v+1)), 1200); return () => clearInterval(i); }, []);
  return (
    <div className="relative inline-block">
      <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"><Star className="w-4 h-4 text-neutral-500"/></div>
      <motion.span key={n} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type:'spring', stiffness:400, damping:15 }}
        className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">{n}</motion.span>
    </div>
  );
}

// ============ MENUS ============
export function DropdownMenuPreview() {
  return (
    <div className="w-44 rounded-xl border bg-white dark:bg-neutral-800 p-1 shadow-xl">
      {[['Profile','⌘P'],['Settings','⌘,'],['Sign out','⇧⌘Q']].map(([l, s]) => (
        <div key={l} className="flex items-center justify-between px-2 py-1.5 text-[11.5px] rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
          <span>{l}</span><kbd className="text-[9.5px] text-neutral-400">{s}</kbd>
        </div>
      ))}
    </div>
  );
}
export function ContextMenuPreview() {
  return (
    <div className="relative">
      <div className="w-32 h-16 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-[10.5px] text-neutral-500">Right-click</div>
      <div className="absolute top-6 left-20 w-32 rounded-lg border bg-white dark:bg-neutral-800 p-1 shadow-xl text-[10.5px]">
        {['Copy','Paste','Delete'].map(l => (
          <div key={l} className="px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">{l}</div>
        ))}
      </div>
    </div>
  );
}
export function MegaMenuPreview() {
  return (
    <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-white dark:bg-neutral-800 border shadow-xl w-56">
      {['Components','Templates','Hooks','Docs'].map(t => (
        <div key={t} className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer">
          <p className="text-[11px] font-medium">{t}</p>
          <p className="text-[9.5px] text-neutral-500">Browse all</p>
        </div>
      ))}
    </div>
  );
}

// ============ TOOLTIPS ============
export function TooltipDefaultPreview() {
  const [show, setShow] = useState(false);
  useEffect(() => { const i = setInterval(() => setShow(s => !s), 1800); return () => clearInterval(i); }, []);
  return (
    <div className="relative inline-block">
      <button className="px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[12px]">Hover me</button>
      <AnimatePresence>
        {show && (
          <motion.span initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-neutral-900 text-white text-[10.5px] whitespace-nowrap shadow-lg">
            Helpful hint
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-neutral-900"/>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
export function TooltipRichPreview() {
  return (
    <div className="w-48 rounded-xl bg-white dark:bg-neutral-800 border shadow-xl p-2.5">
      <div className="w-full h-12 rounded-md bg-gradient-to-br from-violet-200 via-orange-200 to-emerald-200 mb-2"/>
      <p className="text-[11px] font-medium">Magic UI Components</p>
      <p className="text-[10px] text-neutral-500 mt-0.5">120+ animated components.</p>
    </div>
  );
}
export function TooltipGlowPreview() {
  return (
    <span className="inline-flex px-3 py-1.5 rounded-lg text-[11.5px] text-white font-medium bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-[0_0_30px_-4px_rgba(139,92,246,0.7)]">
      <Sparkles className="w-3 h-3 mr-1"/>Pro feature
    </span>
  );
}

// ============ TESTIMONIALS ============
export function TestimonialCardPreview() {
  return (
    <figure className="w-48 p-3 rounded-xl border bg-white dark:bg-neutral-800 shadow-sm">
      <div className="flex gap-0.5 mb-1.5">{[0,1,2,3,4].map(i => <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400"/>)}</div>
      <blockquote className="text-[10.5px] leading-relaxed">"Best UI library I've used."</blockquote>
      <figcaption className="flex items-center gap-1.5 mt-2 pt-2 border-t">
        <img src={AV[1]} alt="" className="w-5 h-5 rounded-full object-cover"/>
        <div>
          <p className="text-[10px] font-medium">Sarah K.</p>
          <p className="text-[9px] text-neutral-500">Lead Engineer</p>
        </div>
      </figcaption>
    </figure>
  );
}
export function TestimonialMarqueePreview() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-2" style={{ animation: 'tm 15s linear infinite' }}>
        {[0,1,2,0,1,2].map((i, k) => (
          <div key={k} className="shrink-0 w-32 p-2 rounded-lg border bg-white dark:bg-neutral-800 text-[10px]">
            <p>"Game changer for our team."</p>
            <p className="text-neutral-500 mt-1">User {i+1}</p>
          </div>
        ))}
      </div>
      <style>{`@keyframes tm { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}
export function TestimonialQuotePreview() {
  return (
    <figure className="relative max-w-[220px] text-center px-3 py-2">
      <Quote className="absolute -top-1 -left-1 w-5 h-5 text-neutral-200 dark:text-neutral-700" fill="currentColor"/>
      <blockquote className="text-[12px] font-medium italic">"Beautifully crafted, every detail counts."</blockquote>
      <figcaption className="mt-2 text-[10px] text-neutral-500">— Anna · CEO</figcaption>
    </figure>
  );
}

// ============ POWERFUL NEW DROPS ============

export function OrbitLoaderPreview() {
  const rings = [
    { r: 28, speed: '2s', color: 'rgb(139,92,246)' },
    { r: 18, speed: '1.4s', color: 'rgb(236,72,153)' },
    { r: 10, speed: '0.9s', color: 'rgb(245,158,11)' },
  ];
  return (
    <div className="relative w-16 h-16">
      {rings.map((ring, i) => (
        <div key={i} className="absolute inset-0 flex items-center justify-center"
          style={{ animation: `orbS ${ring.speed} linear infinite` }}>
          <div className="absolute rounded-full border border-neutral-300/40 dark:border-white/10"
            style={{ width: ring.r * 2, height: ring.r * 2 }}/>
          <span className="absolute w-2 h-2 rounded-full"
            style={{ top: `calc(50% - ${ring.r}px - 4px)`, left: 'calc(50% - 4px)', background: ring.color, boxShadow: `0 0 12px ${ring.color}` }}/>
        </div>
      ))}
      <style>{`@keyframes orbS { to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}

export function GlowToastPreview() {
  return (
    <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      className="relative max-w-[240px] p-[1.5px] rounded-2xl"
      style={{ background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #f59e0b, #8b5cf6)', animation: 'gtRot 3s linear infinite' }}>
      <div className="relative flex items-center gap-2.5 p-2.5 rounded-2xl bg-white dark:bg-neutral-900"
        style={{ boxShadow: '0 0 40px -8px rgba(139,92,246,0.5)' }}>
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-white"/>
        </div>
        <div className="min-w-0">
          <p className="text-[11.5px] font-semibold">Pro upgraded</p>
          <p className="text-[10px] text-neutral-500">Welcome aboard ✨</p>
        </div>
      </div>
      <style>{`@keyframes gtRot { to{filter:hue-rotate(360deg)} }`}</style>
    </motion.div>
  );
}

export function GlassSheetPreview() {
  return (
    <div className="relative w-48 h-32 rounded-xl overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(120px 80px at 20% 30%, rgba(139,92,246,0.55), transparent), radial-gradient(120px 80px at 80% 70%, rgba(236,72,153,0.5), transparent)',
      }}/>
      <motion.div initial={{ y: 8, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
        className="absolute inset-3 rounded-xl p-3 bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/15">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[11px] font-semibold text-white drop-shadow">Glass Sheet</p>
          <X className="w-3 h-3 text-white/70"/>
        </div>
        <div className="space-y-1">
          <div className="h-1.5 rounded bg-white/40 dark:bg-white/20 w-full"/>
          <div className="h-1.5 rounded bg-white/40 dark:bg-white/20 w-4/5"/>
          <div className="h-1.5 rounded bg-white/40 dark:bg-white/20 w-2/3"/>
        </div>
      </motion.div>
    </div>
  );
}

export function MagneticTabsPreview() {
  const items = ['Design', 'Build', 'Ship'];
  const [hovered, setHovered] = useState(0);
  useEffect(() => { const i = setInterval(() => setHovered(h => (h+1) % items.length), 1500); return () => clearInterval(i); }, []);
  return (
    <div className="relative inline-flex p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border">
      {items.map((l, i) => (
        <button key={l} className="relative px-4 py-1.5 text-[12px] font-medium z-10">
          {i === hovered && <motion.span layoutId="mgPrev" className="absolute inset-0 rounded-xl bg-white dark:bg-neutral-700 shadow-md"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}/>}
          <span className={`relative ${i === hovered ? 'text-violet-600 dark:text-violet-300' : ''}`}>{l}</span>
        </button>
      ))}
    </div>
  );
}

export function ExpandableTablePreview() {
  const [open, setOpen] = useState(0);
  useEffect(() => { const i = setInterval(() => setOpen(o => (o+1) % 3), 2000); return () => clearInterval(i); }, []);
  const rows = [{ t: 'Q1 Goals', m: '5 items' }, { t: 'Q2 Sprint', m: '12 items' }, { t: 'Roadmap', m: '24 items' }];
  return (
    <div className="w-52 rounded-lg border bg-white dark:bg-neutral-800 overflow-hidden text-[10.5px]">
      {rows.map((r, i) => (
        <div key={i} className={i > 0 ? 'border-t' : ''}>
          <div className="flex items-center gap-2 px-2.5 py-1.5">
            <motion.span animate={{ rotate: open === i ? 90 : 0 }}>▸</motion.span>
            <span className="flex-1 font-medium">{r.t}</span>
            <span className="text-neutral-400">{r.m}</span>
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                className="overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">
                <div className="px-3 py-1.5 text-[10px] text-neutral-500">Details unfold here…</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function AIAvatarPreview() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full p-[2.5px]"
        style={{ background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #f59e0b, #10b981, #8b5cf6)', animation: 'aiSpin 3s linear infinite' }}>
        <div className="w-full h-full rounded-full bg-white dark:bg-neutral-900"/>
      </div>
      <img src={AV[2]} alt="" className="absolute inset-[3px] rounded-full object-cover"/>
      <style>{`@keyframes aiSpin { to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}

export function Badge3DPreview() {
  return (
    <div className="[perspective:600px]">
      <motion.div className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-sm cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #f59e0b)',
          boxShadow: '0 8px 30px -6px rgba(236,72,153,0.5)',
        }}
        animate={{ rotateX: [10, -10, 10], rotateY: [-15, 15, -15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <Star className="w-3.5 h-3.5 fill-white drop-shadow" />
        PRO
        <motion.span className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.45), transparent 70%)' }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}/>
      </motion.div>
    </div>
  );
}

export function RadialMenuPreview() {
  const radius = 36;
  const arc = Math.PI;
  const items = ['📷', '🎵', '📍', '💬', '⭐'];
  const [open, setOpen] = useState(true);
  useEffect(() => { const i = setInterval(() => setOpen(o => !o), 2200); return () => clearInterval(i); }, []);
  return (
    <div className="relative w-32 h-20 flex items-end justify-center">
      <button className="relative z-10 w-10 h-10 rounded-full text-white shadow-xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-lg">+</motion.span>
      </button>
      <AnimatePresence>
        {open && items.map((emoji, i) => {
          const angle = -arc / 2 + (arc / (items.length - 1)) * i;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div key={i}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{ x, y, scale: 1, opacity: 1 }}
              exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22, delay: i * 0.03 }}
              className="absolute bottom-5 w-7 h-7 rounded-full bg-white dark:bg-neutral-800 shadow-md border flex items-center justify-center text-sm">
              {emoji}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function TooltipPathPreview() {
  const [show, setShow] = useState(true);
  useEffect(() => { const i = setInterval(() => setShow(s => !s), 2200); return () => clearInterval(i); }, []);
  return (
    <div className="relative inline-block">
      <div className="px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[11.5px]">Trigger</div>
      <AnimatePresence>
        {show && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-2.5 py-1.5 rounded-xl bg-neutral-900 text-white text-[10.5px] whitespace-nowrap shadow-xl">
            ✨ Drawn callout
            <svg viewBox="0 0 60 30" className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-12 h-6">
              <motion.path d="M 0 0 Q 30 30, 60 0" fill="none" stroke="currentColor" strokeWidth="2"
                className="text-neutral-900"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }}/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TestimonialDeckPreview() {
  const [n, setN] = useState(0);
  useEffect(() => { const i = setInterval(() => setN(x => x+1), 1800); return () => clearInterval(i); }, []);
  const cards = [
    { q: 'Game changer for our workflow.', name: 'Mia', av: AV[1] },
    { q: 'Pure design joy.', name: 'Leo', av: AV[2] },
    { q: 'Ships pixel-perfect every time.', name: 'Zoe', av: AV[3] },
  ];
  return (
    <div className="relative w-44 h-24">
      <AnimatePresence>
        {[0, 1, 2].map(i => {
          const c = cards[(n + i) % cards.length];
          const z = i === 0;
          return (
            <motion.div key={n + '-' + i}
              initial={{ scale: 0.92, y: 14, opacity: 0 }}
              animate={{ scale: 1 - (2 - i) * 0.04, y: (2 - i) * 5, opacity: 1, x: z ? 0 : 0 }}
              exit={{ x: 200, opacity: 0, transition: { duration: 0.5 } }}
              className="absolute inset-0 p-2.5 rounded-xl bg-white dark:bg-neutral-800 border shadow-lg">
              <p className="text-[10px] leading-snug">"{c.q}"</p>
              <div className="flex items-center gap-1.5 mt-1.5 pt-1.5 border-t">
                <img src={c.av} className="w-4 h-4 rounded-full" alt=""/>
                <p className="text-[9px] font-medium">{c.name}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export * from './previews-marketing';





export function ComponentSearchPreview() { return <div className="flex items-center justify-center h-full w-full px-4"><div className="w-full max-w-[200px] border border-neutral-200/50 dark:border-neutral-700/50 rounded-full px-3 py-1.5 flex items-center gap-2 text-[10px] text-neutral-400 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-md shadow-sm"><Search className="w-3 h-3 text-neutral-400"/><span className="flex-1">Search components...</span><div className="flex gap-0.5"><kbd className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-700 font-mono text-[8px]">⌘</kbd><kbd className="px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-700 font-mono text-[8px]">K</kbd></div></div></div>; }
export function AuthorProfilePreview() { return <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center h-full gap-3 cursor-pointer"><div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5 shadow-lg"><div className="w-full h-full rounded-full bg-white dark:bg-neutral-900 border-2 border-white dark:border-neutral-900 overflow-hidden"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover"/></div></div><div className="flex flex-col"><span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-100">Jane Doe</span><span className="text-[9px] text-blue-500 font-medium">@janedoe</span></div></motion.div>; }
export function SubmitFormPreview() { return <div className="flex items-center justify-center h-full w-full px-4"><div className="w-full max-w-[220px] rounded-xl p-3 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"><div className="w-full h-3 bg-neutral-100 dark:bg-neutral-800 rounded-md mb-2"></div><div className="w-3/4 h-3 bg-neutral-100 dark:bg-neutral-800 rounded-md mb-3"></div><div className="w-full py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-center text-white text-[9px] font-bold shadow-md">Submit Component</div></div></div>; }
export function CodeSandboxPreview() { return <motion.div whileHover={{ y: -2 }} className="flex flex-col items-center justify-center h-full w-full px-4 gap-1 cursor-pointer"><div className="w-full max-w-[180px] h-12 bg-[#151515] rounded-xl flex items-center justify-between px-3 shadow-xl border border-neutral-800"><div className="flex gap-2 items-center"><div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-sm"></div><span className="text-[10px] text-neutral-300 font-mono">App.tsx</span></div><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div></div></motion.div>; }
export function VersionHistoryPreview() { return <div className="flex flex-col justify-center h-full px-6 gap-3 relative"><div className="absolute left-7 top-4 bottom-4 w-[1px] bg-neutral-200 dark:bg-neutral-800"></div><div className="flex gap-3 text-[10px] items-center relative z-10"><div className="w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-neutral-950"></div><span className="font-bold text-blue-500">v2.0.0</span><span className="text-neutral-400">Latest</span></div><div className="flex gap-3 text-[10px] items-center relative z-10"><div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600 ring-2 ring-white dark:ring-neutral-950"></div><span className="font-medium text-neutral-500">v1.5.2</span><span className="text-neutral-400">2w ago</span></div></div>; }
export function CommentsSectionPreview() { return <div className="flex flex-col justify-center h-full w-full px-4 gap-2"><div className="flex gap-2 items-start"><div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-orange-400 mt-0.5 shrink-0"></div><div className="flex-1 bg-white dark:bg-neutral-800 rounded-r-xl rounded-bl-xl p-2 shadow-sm border border-neutral-100 dark:border-neutral-700/50"><div className="w-16 h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-1.5"></div><div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-700/50 rounded-full"></div></div></div></div>; }
export function VotingSystemPreview() { return <div className="flex items-center justify-center h-full gap-0"><motion.div whileHover={{ y: -2 }} className="w-6 h-8 rounded-l-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-500 cursor-pointer"><ArrowUp className="w-3 h-3"/></motion.div><div className="h-8 px-3 bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800 flex items-center justify-center"><span className="text-[11px] font-bold">142</span></div><motion.div whileHover={{ y: 2 }} className="w-6 h-8 rounded-r-lg bg-rose-50 dark:bg-rose-950/30 flex items-center justify-center text-rose-500 cursor-pointer"><ArrowDown className="w-3 h-3"/></motion.div></div>; }
export function DividerPreview() { return <div className="flex flex-col items-center justify-center h-full w-full px-8 gap-4"><div className="w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent"></div><div className="w-full flex items-center gap-3"><div className="flex-1 h-[1px] bg-neutral-200 dark:bg-neutral-800"></div><span className="text-[9px] font-medium tracking-widest text-neutral-400 uppercase">Or</span><div className="flex-1 h-[1px] bg-neutral-200 dark:bg-neutral-800"></div></div></div>; }
export function GradientTextPreview() { return <div className="flex items-center justify-center h-full"><motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 3, repeat: Infinity }} className="text-xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_auto] bg-clip-text text-transparent">Luminous</motion.span></div>; }
export function BlurBackgroundPreview() { return <div className="flex items-center justify-center h-full w-full relative overflow-hidden bg-neutral-50 dark:bg-neutral-950"><div className="absolute -left-6 top-0 w-24 h-24 bg-blue-500/40 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div><div className="absolute -right-6 bottom-0 w-24 h-24 bg-purple-500/40 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div><div className="relative w-24 h-12 bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl shadow-xl flex items-center justify-center"><span className="text-[10px] font-medium opacity-70">Glassmorphism</span></div></div>; }
export function ParallaxScrollPreview() { return <div className="flex flex-col items-center justify-center h-full w-full px-6 gap-2 overflow-hidden perspective-1000"><motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="w-full h-4 bg-neutral-200/50 dark:bg-neutral-800/50 rounded"></motion.div><motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="w-full h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg shadow-lg"></motion.div><motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="w-full h-4 bg-neutral-200/50 dark:bg-neutral-800/50 rounded"></motion.div></div>; }
export function ResponsiveImagePreview() { return <div className="flex items-center justify-center h-full w-full px-6"><motion.div whileHover={{ scale: 1.05 }} className="w-full aspect-video bg-neutral-200 dark:bg-neutral-800 rounded-xl overflow-hidden relative shadow-lg group cursor-pointer"><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/><div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Maximize2 className="w-4 h-4 text-white"/></div></motion.div></div>; }
export function VideoPlayerPreview() { return <div className="flex items-center justify-center h-full w-full px-6"><div className="w-full aspect-video bg-neutral-900 rounded-xl flex items-center justify-center relative shadow-xl overflow-hidden"><img src="https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=200&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50"/><motion.div whileHover={{ scale: 1.1 }} className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center cursor-pointer border border-white/40"><Play className="w-3 h-3 text-white fill-white ml-0.5"/></motion.div><div className="absolute bottom-2 left-2 right-2 h-1 bg-white/20 rounded-full overflow-hidden"><div className="w-1/3 h-full bg-red-500"></div></div></div></div>; }
export function AudioPlayerPreview() { return <div className="flex items-center justify-center h-full w-full px-4"><div className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm rounded-full px-2 py-1.5 flex items-center gap-2"><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white"><Play className="w-2.5 h-2.5 fill-white ml-0.5"/></motion.button><div className="flex-1 h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden"><motion.div initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="h-full bg-indigo-500"></motion.div></div></div></div>; }
export function ColorPickerPreview() { return <div className="flex items-center justify-center h-full gap-2"><motion.div whileHover={{ scale: 1.2, y: -2 }} className="w-5 h-5 rounded-full bg-rose-500 shadow-md cursor-pointer"></motion.div><motion.div whileHover={{ scale: 1.2, y: -2 }} className="w-5 h-5 rounded-full bg-emerald-500 shadow-md cursor-pointer"></motion.div><motion.div whileHover={{ scale: 1.2, y: -2 }} className="w-5 h-5 rounded-full bg-blue-500 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-neutral-950 shadow-md cursor-pointer"></motion.div></div>; }
export function CountdownTimerPreview() { return <div className="flex items-center justify-center h-full gap-1.5"><div className="flex flex-col items-center"><div className="bg-neutral-900 text-white dark:bg-white dark:text-black px-2 py-1 rounded text-xs font-mono font-bold shadow-sm">12</div><span className="text-[7px] text-neutral-400 mt-0.5 uppercase">Hrs</span></div><span className="text-neutral-400 font-bold mb-3">:</span><div className="flex flex-col items-center"><div className="bg-neutral-900 text-white dark:bg-white dark:text-black px-2 py-1 rounded text-xs font-mono font-bold shadow-sm">34</div><span className="text-[7px] text-neutral-400 mt-0.5 uppercase">Min</span></div><span className="text-neutral-400 font-bold mb-3">:</span><div className="flex flex-col items-center"><div className="bg-neutral-900 text-white dark:bg-white dark:text-black px-2 py-1 rounded text-xs font-mono font-bold shadow-sm">56</div><span className="text-[7px] text-neutral-400 mt-0.5 uppercase">Sec</span></div></div>; }
export function ConfettiAnimationPreview() { return <div className="flex items-center justify-center h-full relative cursor-pointer"><motion.div whileTap={{ scale: 0.9 }} className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-[10px] font-bold shadow-lg flex items-center gap-1"><Sparkles className="w-3 h-3"/> Celebrate</motion.div></div>; }

export function PaginationAdvancedPreview() { return <div className="flex gap-1 items-center"><div className="w-5 h-5 rounded border flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"><ChevronLeft className="w-3 h-3 text-neutral-500"/></div><div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center text-[10px] text-white font-medium shadow-sm">1</div><div className="w-5 h-5 rounded flex items-center justify-center text-[10px] text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">2</div><div className="w-5 h-5 rounded border flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"><ChevronRight className="w-3 h-3 text-neutral-500"/></div></div>; }
export function ScrollToTopPreview() { return <motion.div whileHover={{ y: -3 }} className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-900 shadow-lg cursor-pointer"><ArrowUp className="w-4 h-4"/></motion.div>; }
export function InputValidationPreview() { return <div className="flex flex-col justify-center h-full w-full px-4 gap-1 relative"><div className="w-full border border-red-500 rounded-lg px-2 py-1.5 text-[10px] text-neutral-600 dark:text-neutral-300 bg-red-50/30 dark:bg-red-950/20 flex items-center justify-between"><span>email@domain</span><AlertCircle className="w-3 h-3 text-red-500"/></div><motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[9px] text-red-500 font-medium ml-1">Please enter a valid email.</motion.span></div>; }
export function CustomCheckboxPreview() { return <div className="flex items-center justify-center h-full gap-2"><motion.div whileTap={{ scale: 0.9 }} className="w-5 h-5 bg-blue-500 rounded-md flex items-center justify-center text-white shadow-md cursor-pointer"><Check className="w-3.5 h-3.5" strokeWidth={3} /></motion.div><span className="text-[11px] font-medium">Accept terms</span></div>; }
export function ToggleSwitchPreview() { return <div className="flex items-center justify-center h-full gap-2"><span className="text-[10px] text-neutral-500 font-medium">Off</span><motion.div className="w-9 h-5 bg-green-500 rounded-full p-0.5 flex items-center shadow-inner cursor-pointer justify-end"><motion.div layout className="w-4 h-4 bg-white rounded-full shadow-sm"></motion.div></motion.div><span className="text-[10px] font-bold text-green-600 dark:text-green-400">On</span></div>; }
export function RangeSliderPreview() { return <div className="flex flex-col justify-center h-full w-full px-6 gap-2"><div className="flex justify-between w-full text-[9px] font-bold text-neutral-400"><span>$10</span><span>$100</span></div><div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full relative"><div className="absolute left-[20%] right-[30%] h-full bg-blue-500 rounded-full"></div><motion.div whileHover={{ scale: 1.3 }} className="absolute left-[20%] w-3 h-3 bg-white border-2 border-blue-500 rounded-full -translate-y-[3px] shadow-md cursor-grab"></motion.div><motion.div whileHover={{ scale: 1.3 }} className="absolute right-[30%] w-3 h-3 bg-white border-2 border-blue-500 rounded-full -translate-y-[3px] shadow-md cursor-grab"></motion.div></div></div>; }
export function DatePickerPreview() { return <div className="flex items-center justify-center h-full w-full px-4"><div className="border border-neutral-200 dark:border-neutral-800 rounded-lg px-2.5 py-1.5 w-full bg-white dark:bg-neutral-900 shadow-sm flex items-center gap-2 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"><Calendar className="w-3.5 h-3.5 text-blue-500"/><span className="text-[10px] font-medium text-neutral-600 dark:text-neutral-300">Oct 12, 2026</span></div></div>; }
export function FileUploaderPreview() { return <div className="flex items-center justify-center h-full w-full px-4"><motion.div whileHover={{ scale: 1.02 }} className="border-2 border-dashed border-blue-300 dark:border-blue-900/50 rounded-xl p-3 w-full bg-blue-50/50 dark:bg-blue-950/20 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"><UploadCloud className="w-5 h-5 text-blue-500"/><span className="text-[9px] font-medium text-blue-600 dark:text-blue-400">Drag & drop files here</span></motion.div></div>; }
export function MultiSelectPreview() { return <div className="flex flex-col justify-center h-full w-full px-4 gap-1"><div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-1 w-full bg-white dark:bg-neutral-900 flex flex-wrap gap-1 shadow-sm items-center"><div className="px-1.5 py-0.5 rounded text-[9px] bg-neutral-100 dark:bg-neutral-800 font-medium flex items-center gap-1">Design <X className="w-2 h-2 cursor-pointer"/></div><div className="px-1.5 py-0.5 rounded text-[9px] bg-neutral-100 dark:bg-neutral-800 font-medium flex items-center gap-1">UI <X className="w-2 h-2 cursor-pointer"/></div><div className="w-px h-3 bg-neutral-200 dark:bg-neutral-700 ml-auto mr-1"></div><ChevronDown className="w-3 h-3 text-neutral-400 mr-1"/></div></div>; }
export function TagsInputPreview() { return <div className="flex flex-col justify-center h-full w-full px-4 gap-1"><div className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-1.5 w-full bg-white dark:bg-neutral-900 flex items-center gap-1.5 shadow-sm focus-within:ring-2 ring-blue-500/20"><div className="px-1.5 py-0.5 rounded text-[9px] bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">react <X className="w-2 h-2 cursor-pointer hover:text-blue-800"/></div><span className="text-[10px] text-neutral-400 animate-pulse">|</span></div></div>; }
export function RichTextEditorPreview() { return <div className="flex items-center justify-center h-full w-full px-4"><div className="w-full border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900 flex flex-col shadow-sm overflow-hidden"><div className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 p-1 flex gap-1"><div className="w-4 h-4 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-center cursor-pointer font-serif text-[10px] font-bold">B</div><div className="w-4 h-4 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-center cursor-pointer font-serif text-[10px] italic">I</div><div className="w-4 h-4 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 flex items-center justify-center cursor-pointer text-[10px] underline">U</div></div><div className="p-2 h-8"><div className="w-16 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded mb-1"></div><div className="w-10 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded"></div></div></div></div>; }
export function RatingComponentPreview() { return <div className="flex items-center justify-center h-full gap-1"><motion.div whileHover={{ scale: 1.2 }}><Star className="w-5 h-5 fill-amber-400 text-amber-400 cursor-pointer"/></motion.div><motion.div whileHover={{ scale: 1.2 }}><Star className="w-5 h-5 fill-amber-400 text-amber-400 cursor-pointer"/></motion.div><motion.div whileHover={{ scale: 1.2 }}><Star className="w-5 h-5 fill-amber-400 text-amber-400 cursor-pointer"/></motion.div><motion.div whileHover={{ scale: 1.2 }}><Star className="w-5 h-5 fill-amber-400 text-amber-400 opacity-50 cursor-pointer overflow-hidden"/></motion.div><motion.div whileHover={{ scale: 1.2 }}><Star className="w-5 h-5 text-neutral-300 dark:text-neutral-700 cursor-pointer"/></motion.div></div>; }
export function DataTablePreview() { return <div className="flex flex-col items-center justify-center h-full w-full px-4"><div className="w-full border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-900 shadow-sm"><div className="bg-neutral-50 dark:bg-neutral-950 px-2 py-1 border-b border-neutral-200 dark:border-neutral-800 flex gap-2"><div className="w-6 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded"></div><div className="w-12 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded"></div></div><div className="px-2 py-1.5 border-b border-neutral-100 dark:border-neutral-800/50 flex gap-2"><div className="w-6 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded"></div><div className="w-10 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded"></div></div><div className="px-2 py-1.5 flex gap-2"><div className="w-6 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded"></div><div className="w-16 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded"></div></div></div></div>; }
export function ProgressBarPreview() { return <div className="flex flex-col justify-center h-full px-6 w-full gap-1.5"><div className="flex justify-between text-[10px] font-bold"><span className="text-neutral-700 dark:text-neutral-300">Uploading...</span><span className="text-blue-500">75%</span></div><div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden shadow-inner"><motion.div initial={{ width: '0%' }} animate={{ width: '75%' }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full relative overflow-hidden"><div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 20px)' }}></div></motion.div></div></div>; }
export function BadgeTagPreview() { return <div className="flex items-center justify-center h-full gap-2"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold rounded-md flex items-center gap-1 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Active</span><span className="px-2 py-0.5 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 text-[10px] font-medium rounded-full shadow-sm hover:bg-neutral-50 cursor-pointer transition-colors">v2.0.1</span></div>; }
export function TooltipPopoverPreview() { return <div className="flex flex-col items-center justify-center h-full gap-2"><motion.div initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-medium rounded-md relative shadow-xl">Top tooltip<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 dark:bg-white rotate-45"></div></motion.div><div className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md text-[10px] font-medium text-neutral-500 cursor-pointer border border-neutral-200 dark:border-neutral-700 border-dashed">Hover me</div></div>; }
export function AccordionPreview() { return <div className="flex flex-col justify-center h-full w-full px-6 gap-0"><div className="w-full flex justify-between items-center py-1.5 border-b border-neutral-200 dark:border-neutral-800 cursor-pointer"><span className="text-[10px] font-bold">What is Vixluxia?</span><ChevronDown className="w-3 h-3 text-neutral-400"/></div><div className="w-full py-1.5 border-b border-neutral-200 dark:border-neutral-800 cursor-pointer flex justify-between"><span className="text-[10px] font-bold text-neutral-400">How to use it?</span><ChevronDown className="w-3 h-3 text-neutral-300 rotate-180"/></div><div className="w-full py-1"><div className="w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded mb-1"></div><div className="w-2/3 h-1 bg-neutral-100 dark:bg-neutral-800 rounded"></div></div></div>; }
export function TabsPreview() { return <div className="flex flex-col items-center justify-center h-full w-full px-4 gap-2"><div className="flex p-1 bg-neutral-100 dark:bg-neutral-800/50 rounded-lg w-full relative"><motion.div layoutId="tab" className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-neutral-700 rounded-md shadow-sm"></motion.div><div className="flex-1 py-1 text-center text-[10px] font-bold relative z-10 cursor-pointer">Preview</div><div className="flex-1 py-1 text-center text-[10px] font-medium text-neutral-500 relative z-10 cursor-pointer">Code</div></div></div>; }
export function CarouselPreview() { return <div className="flex items-center justify-center h-full gap-2 w-full px-2 overflow-hidden"><div className="w-8 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg shrink-0 opacity-50 -ml-4"></div><motion.div whileHover={{ scale: 1.05 }} className="w-20 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg shrink-0 flex items-center justify-center cursor-pointer"><ImageIcon className="w-6 h-6 text-white/50"/></motion.div><div className="w-8 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg shrink-0 opacity-50 -mr-4"></div></div>; }
export function TimelinePreview() { return <div className="flex flex-col justify-center h-full px-8 relative"><div className="absolute left-9 top-4 bottom-4 w-px bg-neutral-200 dark:bg-neutral-800"></div><div className="flex items-start gap-3 relative z-10 mb-2"><div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-neutral-950 mt-0.5"></div><div className="flex flex-col"><span className="text-[10px] font-bold">Created</span><span className="text-[8px] text-neutral-500">10:00 AM</span></div></div><div className="flex items-start gap-3 relative z-10"><div className="w-3 h-3 rounded-full bg-neutral-200 dark:bg-neutral-800 ring-4 ring-white dark:ring-neutral-950 mt-0.5"></div><div className="flex flex-col"><span className="text-[10px] font-medium text-neutral-500">Assigned</span></div></div></div>; }
export function ModalDialogPreview() { return <div className="flex items-center justify-center h-full w-full bg-neutral-900/10 dark:bg-black/40"><motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-32 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"><div className="p-2 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center"><span className="text-[10px] font-bold">Confirm</span><X className="w-3 h-3 text-neutral-400 cursor-pointer"/></div><div className="p-2 bg-neutral-50/50 dark:bg-neutral-900/50 flex gap-2 justify-end"><div className="px-2 py-1 rounded bg-neutral-200 dark:bg-neutral-800 text-[8px] font-medium cursor-pointer">Cancel</div><div className="px-2 py-1 rounded bg-blue-500 text-white text-[8px] font-medium cursor-pointer shadow-sm">Save</div></div></motion.div></div>; }
export function ToastNotificationPreview() { return <div className="flex items-end justify-center h-full pb-2"><motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200/50 dark:border-neutral-800"><div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"><Check className="w-3 h-3 text-green-600 dark:text-green-400"/></div><div className="flex flex-col"><span className="text-[10px] font-bold">Success</span><span className="text-[8px] text-neutral-500">Item deleted.</span></div></motion.div></div>; }
export function SkeletonLoaderPreview() { return <div className="flex flex-col gap-3 w-full px-6 justify-center h-full"><div className="flex gap-3 items-center"><motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="w-8 h-8 rounded-full bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700"></motion.div><div className="flex flex-col gap-1.5 w-full"><motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.2 }} className="h-2 w-1/2 bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 rounded-full"></motion.div><motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }} className="h-2 w-3/4 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800/50 dark:to-neutral-800 rounded-full"></motion.div></div></div></div>; }

export function LikeButtonPreview() { 
  const [liked, setLiked] = useState(false);
  return <div className="flex items-center justify-center h-full"><motion.button onClick={() => setLiked(!liked)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9, rotate: -5 }} className="relative group flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black text-[12px] font-bold rounded-full shadow-xl overflow-hidden"><motion.div className="absolute inset-0 bg-rose-500 opacity-0 group-hover:opacity-10 transition-opacity" /><Heart className={`w-4 h-4 transition-all duration-300 ${liked ? 'fill-rose-500 text-rose-500 scale-110' : ''}`}/> <span className="relative z-10">{liked ? 'Liked' : 'Like'}</span>{liked && <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 bg-rose-500 rounded-full" />}</motion.button></div>; 
}

export function CopyButtonPreview() { 
  const [copied, setCopied] = useState(false);
  return <div className="flex items-center justify-center h-full"><motion.button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.95 }} className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-b from-neutral-800 to-neutral-900 dark:from-neutral-100 dark:to-neutral-300 border border-neutral-700 dark:border-white/50 text-white dark:text-black text-[12px] font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.05)] overflow-hidden group"><motion.div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" /><div className="relative z-10 flex items-center gap-2"><AnimatePresence mode="wait">{copied ? <motion.div key="check" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}><Check className="w-4 h-4 text-emerald-400" /></motion.div> : <motion.div key="copy" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}><Copy className="w-4 h-4" /></motion.div>}</AnimatePresence> <span className="w-16 text-left">{copied ? 'Copied!' : 'Copy Code'}</span></div></motion.button></div>; 
}

export function ShareButtonPreview() { 
  return <div className="flex items-center justify-center h-full"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative flex items-center gap-2 px-5 py-2 bg-blue-500 text-white text-[12px] font-bold rounded-full overflow-hidden group"><motion.div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /><motion.div animate={{ x: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" /><div className="relative z-10 flex items-center gap-2"><Share2 className="w-4 h-4 group-hover:-rotate-12 transition-transform duration-300"/> Share</div></motion.button></div>; 
}

export function EmptyStatePreview() { return <div className="flex flex-col items-center justify-center h-full text-neutral-400 gap-3"><motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="w-14 h-14 rounded-full bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shadow-lg"><Inbox className="w-6 h-6 text-neutral-300 dark:text-neutral-600"/></motion.div><span className="text-[11px] font-medium text-neutral-500 tracking-wide uppercase">No Data</span></div>; }

export function LoadingSpinnerPreview() { return <div className="flex items-center justify-center h-full gap-2"><motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-blue-500 rounded-full"></motion.div><motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-blue-500 rounded-full"></motion.div><motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-blue-500 rounded-full"></motion.div></div>; }

export function StatisticCardPreview() { return <div className="flex items-center justify-center h-full"><motion.div whileHover={{ y: -5, scale: 1.02 }} className="p-4 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-xl shadow-neutral-200/50 dark:shadow-black/50 w-36 relative overflow-hidden group"><motion.div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors" /><div className="absolute top-3 right-3 p-1.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-emerald-500"><TrendingUp className="w-3.5 h-3.5"/></div><div className="text-[10px] text-neutral-500 font-medium mb-1">Revenue</div><div className="text-xl font-black tracking-tight">$12,450</div><div className="text-[9px] text-emerald-500 font-bold mt-2 flex items-center gap-1"><ArrowUp className="w-2.5 h-2.5"/> +14.5%</div></motion.div></div>; }

export function MagneticBtnPreview() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = (e) => {
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPos({ x: x * 0.3, y: y * 0.3 });
  };
  return <div className="flex items-center justify-center h-full"><motion.button onMouseMove={handleMouse} onMouseLeave={() => setPos({x:0, y:0})} animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }} className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-[12px] rounded-full shadow-2xl relative overflow-hidden group"><motion.div className="absolute inset-0 bg-white/20 dark:bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" /><motion.span animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }} className="block relative z-10">Hover Me</motion.span></motion.button></div>;
}

export function ShineBtnPreview() {
  return <div className="flex items-center justify-center h-full"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group relative px-6 py-2.5 font-bold text-[12px] text-white bg-neutral-950 rounded-xl overflow-hidden shadow-2xl"><motion.div animate={{ x: ['-200%', '200%'] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }} className="absolute inset-0 z-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg]"/><span className="relative z-10 flex items-center gap-2"><Sparkles className="w-4 h-4 text-yellow-300"/> Shine Effect</span></motion.button></div>;
}

export function GradientBtnPreview() {
  return <div className="flex items-center justify-center h-full"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative px-6 py-2.5 font-bold text-[12px] text-white rounded-xl shadow-xl shadow-purple-500/30 overflow-hidden group"><div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 transition-all duration-500 group-hover:scale-110" /><span className="relative z-10 flex items-center gap-2"><Rocket className="w-4 h-4"/> Launch App</span></motion.button></div>;
}

export function RippleBtnPreview() {
  const [ripples, setRipples] = useState([]);
  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples([...ripples, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }]);
  };
  return <div className="flex items-center justify-center h-full"><motion.button onClick={addRipple} whileHover={{ scale: 1.02 }} className="relative px-6 py-2.5 font-bold text-[12px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl overflow-hidden shadow-sm"><span className="relative z-10">Click For Ripple</span><AnimatePresence>{ripples.map(r => <motion.span key={r.id} initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 4, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute bg-blue-400/30 rounded-full w-12 h-12 -ml-6 -mt-6 pointer-events-none" style={{ left: r.x, top: r.y }} />)}</AnimatePresence></motion.button></div>;
}

export function GlassNavbarPreview() {
  return <div className="flex items-start justify-center h-full w-full px-4 pt-4"><motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full h-12 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl flex items-center justify-between px-4"><div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-orange-400"></div><div className="flex gap-3"><div className="w-10 h-1.5 bg-neutral-900/20 dark:bg-white/20 rounded-full"></div><div className="w-10 h-1.5 bg-neutral-900/20 dark:bg-white/20 rounded-full"></div><div className="w-10 h-1.5 bg-neutral-900/20 dark:bg-white/20 rounded-full"></div></div></motion.div></div>;
}

export function ScrollNavbarPreview() {
  return <div className="flex items-start justify-center h-full w-full"><motion.div animate={{ width: ['90%', '60%', '90%'], y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} className="h-10 mt-2 bg-neutral-900 dark:bg-white rounded-full shadow-2xl flex items-center justify-between px-4"><div className="w-4 h-4 rounded-full bg-white/20 dark:bg-black/20"></div><div className="flex gap-2"><div className="w-8 h-1 bg-white/20 dark:bg-black/20 rounded-full"></div><div className="w-8 h-1 bg-white/20 dark:bg-black/20 rounded-full"></div></div></motion.div></div>;
}

export function PillNavbarPreview() {
  return <div className="flex items-center justify-center h-full w-full"><div className="p-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full flex gap-1 shadow-inner relative"><motion.div layoutId="pill" className="absolute top-1.5 bottom-1.5 left-1.5 w-12 bg-white dark:bg-neutral-700 rounded-full shadow-sm"></motion.div><div className="w-12 h-6 flex items-center justify-center relative z-10"><div className="w-4 h-1 bg-neutral-400 rounded-full"></div></div><div className="w-12 h-6 flex items-center justify-center relative z-10"><div className="w-4 h-1 bg-neutral-400 rounded-full"></div></div><div className="w-12 h-6 flex items-center justify-center relative z-10"><div className="w-4 h-1 bg-neutral-400 rounded-full"></div></div></div></div>;
}

export function SidebarNavPreview() {
  return <div className="flex items-center justify-start h-full w-full px-4"><motion.div whileHover={{ width: 100 }} className="w-12 h-24 bg-white dark:bg-neutral-900 rounded-r-2xl border border-l-0 border-neutral-200 dark:border-neutral-800 shadow-xl flex flex-col gap-3 py-4 px-3 overflow-hidden"><div className="w-5 h-5 rounded bg-blue-500 shrink-0"></div><div className="w-5 h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full shrink-0 mt-auto"></div></motion.div></div>;
}

export function MinimalFooterPreview() {
  return (
    <div className="flex w-full h-full items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm border-t border-border pt-4 flex justify-between items-center text-xs text-muted-foreground">
        <span>© 2026 Vixluxia.</span>
        <div className="flex gap-3"><span className="hover:text-primary cursor-pointer">Terms</span><span className="hover:text-primary cursor-pointer">Privacy</span></div>
      </div>
    </div>
  );
}

export function MegaFooterPreview() {
  return (
    <div className="flex w-full h-full items-center justify-center bg-background p-2">
      <div className="w-full h-32 rounded-lg border bg-card p-4 grid grid-cols-3 gap-2">
        <div className="space-y-2"><div className="w-8 h-8 rounded-full bg-primary/20"></div><div className="w-16 h-2 bg-muted rounded"></div></div>
        <div className="space-y-2"><div className="w-12 h-3 bg-muted rounded"></div><div className="w-10 h-2 bg-muted-foreground/30 rounded"></div><div className="w-10 h-2 bg-muted-foreground/30 rounded"></div></div>
        <div className="space-y-2"><div className="w-12 h-3 bg-muted rounded"></div><div className="w-10 h-2 bg-muted-foreground/30 rounded"></div><div className="w-10 h-2 bg-muted-foreground/30 rounded"></div></div>
      </div>
    </div>
  );
}

export function MultiStepFormPreview() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">1</div>
        <div className="w-8 h-[2px] bg-primary"></div>
        <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">2</div>
        <div className="w-8 h-[2px] bg-muted"></div>
        <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-[10px]">3</div>
      </div>
    </div>
  );
}

export function OtpFormPreview() {
  return (
    <div className="flex w-full h-full items-center justify-center gap-2">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="w-10 h-12 rounded-md border-2 border-muted bg-background flex items-center justify-center font-bold text-lg">
          {i === 1 ? '4' : i === 2 ? '2' : ''}
          {i === 3 && <div className="w-px h-5 bg-primary animate-pulse"></div>}
        </div>
      ))}
    </div>
  );
}

export function TagInputPreview() {
  return (
    <div className="flex w-full h-full items-center justify-center p-4">
      <div className="flex flex-wrap gap-1.5 p-2 rounded-md border w-full bg-background items-center">
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center gap-1">React <span className="text-primary/50 text-[8px]">×</span></span>
        <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-md flex items-center gap-1">Tailwind <span className="text-primary/50 text-[8px]">×</span></span>
        <div className="w-px h-3 bg-primary animate-pulse ml-1"></div>
      </div>
    </div>
  );
}
