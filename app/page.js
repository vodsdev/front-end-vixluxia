'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Search, ArrowLeft, Copy, Check, Sparkles, Sun, Moon, ExternalLink, Code2 } from 'lucide-react';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';
import * as Previews from '@/components/previews';

function Listing({ onPick, theme, onToggleTheme, search, setSearch }) {
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter(c => c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
  }, [search]);
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-300 via-orange-200 to-emerald-200 shadow-soft flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white"/>
            </div>
            <span className="text-[17px] font-semibold text-gradient">VixLuxia / Prompts</span>
          </div>
          <button onClick={onToggleTheme} className="p-2 rounded-xl bg-white/70 dark:bg-neutral-900/60 border border-black/5 dark:border-white/10 hover:bg-white dark:hover:bg-neutral-800">
            {theme === 'dark' ? <Sun className="w-4 h-4"/> : <Moon className="w-4 h-4"/>}
          </button>
        </div>
        <div className="mt-16 text-center">
          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Copy-paste <span className="text-gradient">prompts</span> for vibe coding
          </h1>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto text-[15px]">
            A curated catalogue of UI component prompts. Browse a category, copy a prompt, paste in Cursor / Lovable / v0 / Bolt.
          </p>
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search categories…"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur border border-black/[0.06] dark:border-white/[0.06] shadow-soft focus:bg-white dark:focus:bg-neutral-900 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-500/10 outline-none text-sm transition-all text-neutral-900 dark:text-neutral-100"/>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((c, i) => {
            const count = (PROMPTS[c.slug] || []).length;
            return (
              <motion.button key={c.slug} onClick={() => onPick(c.slug)}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                whileHover={{ y: -4 }}
                className="group text-left bg-white/70 dark:bg-neutral-900/50 backdrop-blur border border-black/[0.06] dark:border-white/[0.06] rounded-3xl p-5 shadow-soft hover:shadow-soft-lg transition-shadow">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${c.accent} flex items-center justify-center text-3xl shadow-soft`}>{c.emoji}</div>
                <h3 className="mt-4 text-[17px] font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">{c.name}</h3>
                <p className="mt-1 text-[13px] text-neutral-500 dark:text-neutral-400">{c.desc}</p>
                <div className="mt-4 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">{count} {count === 1 ? 'prompt' : 'prompts'}{count === 0 && ' · soon'}</span>
                  <span className="text-violet-600 dark:text-violet-300 opacity-0 group-hover:opacity-100 transition-opacity">Browse →</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CategoryPage({ slug, onBack }) {
  const cat = CATEGORIES.find(c => c.slug === slug);
  const prompts = PROMPTS[slug] || [];
  const [openId, setOpenId] = useState(null);
  const [copied, setCopied] = useState(null);

  const copy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success('Prompt copied — paste it in Cursor / Lovable / v0');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-20">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          <ArrowLeft className="w-4 h-4"/> All categories
        </button>
        <div className="mt-6 flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.accent} flex items-center justify-center text-3xl shadow-soft`}>{cat.emoji}</div>
          <div>
            <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">{cat.name}</h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">{cat.desc} · {prompts.length} prompts</p>
          </div>
        </div>

        {prompts.length === 0 ? (
          <div className="mt-20 text-center py-20">
            <div className="text-6xl mb-4 opacity-30">{cat.emoji}</div>
            <p className="text-neutral-500 dark:text-neutral-400">Coming soon. New prompts ship every week.</p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {prompts.map((p) => {
              const PreviewComponent = Previews[p.preview];
              return (
                <motion.div key={p.id} layout
                  className="bg-white/70 dark:bg-neutral-900/50 backdrop-blur border border-black/[0.06] dark:border-white/[0.06] rounded-3xl shadow-soft overflow-hidden">
                  <div className="h-44 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 flex items-center justify-center border-b border-black/[0.05] dark:border-white/[0.06] p-6 overflow-hidden">
                    {PreviewComponent ? <PreviewComponent/> : <div className="text-neutral-400 text-xs">Preview soon</div>}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100">{p.name}</h3>
                        <p className="mt-1 text-[12.5px] text-neutral-500 dark:text-neutral-400">{p.tagline}</p>
                      </div>
                      <button onClick={() => setOpenId(p.id)} className="shrink-0 p-2 rounded-xl text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800" title="View prompt">
                        <Code2 className="w-4 h-4"/>
                      </button>
                    </div>
                    <button onClick={() => copy(p.id, p.prompt)}
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-soft transition-colors">
                      {copied === p.id ? <><Check className="w-4 h-4"/> Copied!</> : <><Copy className="w-4 h-4"/> Copy prompt</>}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {openId && (() => {
          const p = prompts.find(x => x.id === openId);
          if (!p) return null;
          return (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-md" onClick={() => setOpenId(null)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/>
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                className="relative w-full max-w-3xl max-h-[80vh] bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-3xl shadow-soft-lg overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 dark:border-white/5">
                  <div>
                    <h2 className="font-semibold text-neutral-900 dark:text-neutral-100">{p.name}</h2>
                    <p className="text-xs text-neutral-500">Full prompt — paste in Cursor / Lovable / v0 / Bolt</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => copy(p.id, p.prompt)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium">
                      {copied === p.id ? <Check className="w-3.5 h-3.5"/> : <Copy className="w-3.5 h-3.5"/>}
                      {copied === p.id ? 'Copied' : 'Copy'}
                    </button>
                    <button onClick={() => setOpenId(null)} className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500">✕</button>
                  </div>
                </div>
                <pre className="flex-1 overflow-auto p-5 text-[12px] leading-relaxed text-neutral-700 dark:text-neutral-300 bg-neutral-50/50 dark:bg-neutral-950/50 font-mono whitespace-pre-wrap">{p.prompt}</pre>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [view, setView] = useState('list');
  const [category, setCategory] = useState(null);
  const [theme, setTheme] = useState('light');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('vixluxia-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  }, []);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('vixluxia-theme', next);
  };

  return view === 'list'
    ? <Listing onPick={(slug) => { setCategory(slug); setView('cat'); window.scrollTo(0, 0); }} theme={theme} onToggleTheme={toggleTheme} search={search} setSearch={setSearch}/>
    : <CategoryPage slug={category} onBack={() => setView('list')}/>;
}

export default App;
