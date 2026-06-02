'use client';
// Live, animated previews approximating each component. These re-implement the visual
// of each prompt so the user sees what they'll get — not literally the same source.
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, ArrowRight, Star, Rocket, Sparkles, Play, CheckCircle2, AlertCircle, AlertTriangle, Info, Quote, ArrowUpDown } from 'lucide-react';

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
