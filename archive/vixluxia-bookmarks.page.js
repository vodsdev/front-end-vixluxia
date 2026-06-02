'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { toast } from 'sonner';
import {
  Search, Plus, LayoutGrid, List as ListIcon, Columns3,
  Sparkles, Palette, Code2, Folder, Hash, Inbox, BookOpen, CheckCircle2,
  Archive, X, Link2, Star, GitFork, Clock, ExternalLink,
  Loader2, Trash2, ChevronLeft, Menu, Globe, Github, Youtube, Figma, Twitter,
  Sun, Moon, Play,
} from 'lucide-react';
import CommandPalette from '@/components/command-palette';

const ICONS = { Sparkles, Palette, Code2, Folder };
const COLORS = {
  lavender: 'from-violet-200/80 to-violet-100/60 text-violet-700 dark:from-violet-500/30 dark:to-violet-700/20 dark:text-violet-200',
  peach: 'from-orange-200/80 to-amber-100/60 text-orange-700 dark:from-orange-500/30 dark:to-amber-700/20 dark:text-orange-200',
  mint: 'from-emerald-200/80 to-teal-100/60 text-emerald-700 dark:from-emerald-500/30 dark:to-teal-700/20 dark:text-emerald-200',
};

const STATUSES = [
  { key: 'inbox', label: 'Inbox', Icon: Inbox, dot: 'bg-neutral-400' },
  { key: 'reading', label: 'Reading', Icon: BookOpen, dot: 'bg-amber-400' },
  { key: 'done', label: 'Done', Icon: CheckCircle2, dot: 'bg-emerald-400' },
  { key: 'archived', label: 'Archive', Icon: Archive, dot: 'bg-neutral-300' },
];

function TypeIcon({ type, className = 'h-3.5 w-3.5' }) {
  if (type === 'github') return <Github className={className} />;
  if (type === 'youtube') return <Youtube className={className} />;
  if (type === 'figma') return <Figma className={className} />;
  if (type === 'twitter') return <Twitter className={className} />;
  return <Globe className={className} />;
}

// Extract YouTube ID from URL
function getYouTubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.split('/').filter(Boolean)[0];
    if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2];
    if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2];
    return u.searchParams.get('v');
  } catch { return null; }
}

// Embed wrapper that lazy-loads iframe on click for performance
function LazyEmbed({ src, poster, alt = '', aspect = '56.25%' }) {
  const [active, setActive] = useState(false);
  return (
    <div className="relative w-full bg-neutral-100 dark:bg-neutral-800/50 overflow-hidden" style={{ paddingBottom: aspect }}>
      {active ? (
        <iframe
          src={src}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      ) : (
        <button
          onClick={() => setActive(true)}
          className="absolute inset-0 group/play w-full h-full"
          aria-label="Load preview"
        >
          {poster && (
            <img src={poster} alt={alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/play:scale-105"
              onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/95 dark:bg-neutral-900/90 backdrop-blur shadow-soft-lg flex items-center justify-center group-hover/play:scale-110 transition-transform">
              <Play className="w-5 h-5 text-neutral-900 dark:text-white ml-0.5" fill="currentColor" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

function PolymorphicCard({ bm, onStatusChange, onDelete, onTagClick, draggable, onDragStart }) {
  const status = STATUSES.find((s) => s.key === bm.status) || STATUSES[0];
  const ytId = bm.type === 'youtube' ? getYouTubeId(bm.url) : null;
  const isFigma = bm.type === 'figma';

  // Decide media block: YouTube/Figma embed > generic image
  let media = null;
  if (ytId) {
    media = (
      <LazyEmbed
        src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&autoplay=1`}
        poster={bm.image || `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`}
        alt={bm.title}
      />
    );
  } else if (isFigma) {
    media = (
      <LazyEmbed
        src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(bm.url)}`}
        poster={bm.image}
        alt={bm.title}
        aspect="60%"
      />
    );
  } else if (bm.image) {
    media = (
      <a href={bm.url} target="_blank" rel="noreferrer" className="block relative overflow-hidden">
        <img
          src={bm.image}
          alt=""
          className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </a>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      draggable={draggable}
      onDragStart={onDragStart}
      className="group relative bg-white/80 dark:bg-neutral-900/60 backdrop-blur rounded-3xl border border-black/[0.06] dark:border-white/[0.06] shadow-soft hover:shadow-soft-lg overflow-hidden cursor-default"
    >
      {media}

      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-9 h-9 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden">
            {bm.favicon ? (
              <img src={bm.favicon} alt="" className="w-5 h-5"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            ) : (
              <Globe className="w-4 h-4 text-neutral-400" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <a href={bm.url} target="_blank" rel="noreferrer" className="block">
              <h3 className="text-[15px] font-semibold leading-snug text-neutral-900 dark:text-neutral-100 line-clamp-2 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors">
                {bm.title || bm.url}
              </h3>
            </a>
            <div className="mt-1 flex items-center gap-1.5 text-[11.5px] text-neutral-500 dark:text-neutral-400">
              <TypeIcon type={bm.type} />
              <span className="truncate">{bm.domain}</span>
            </div>
          </div>
        </div>

        {bm.description && (
          <p className="mt-3 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-3">{bm.description}</p>
        )}

        {bm.type === 'github' && bm.meta?.github && (
          <div className="mt-3 flex items-center gap-3 text-[12px] text-neutral-600 dark:text-neutral-400">
            <span className="inline-flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" />{Intl.NumberFormat('en', { notation: 'compact' }).format(bm.meta.github.stars)}</span>
            <span className="inline-flex items-center gap-1"><GitFork className="w-3.5 h-3.5 text-neutral-500" />{Intl.NumberFormat('en', { notation: 'compact' }).format(bm.meta.github.forks)}</span>
            {bm.meta.github.language && (
              <span className="inline-flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-violet-400" />{bm.meta.github.language}
              </span>
            )}
          </div>
        )}

        {bm.readingTime && bm.type !== 'github' && bm.type !== 'youtube' && bm.type !== 'figma' && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-neutral-500 dark:text-neutral-400">
            <Clock className="w-3.5 h-3.5" />{bm.readingTime} min read
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">{status.label}</span>
            {bm.tags?.slice(0, 3).map((t) => (
              <button key={t} onClick={() => onTagClick?.(t)}
                className="ml-1 px-2 py-0.5 text-[11px] rounded-full bg-neutral-100 dark:bg-neutral-800/60 hover:bg-violet-100 dark:hover:bg-violet-500/15 hover:text-violet-700 dark:hover:text-violet-200 text-neutral-600 dark:text-neutral-300 border border-black/[0.04] dark:border-white/[0.04] transition-colors">
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <select
              value={bm.status}
              onChange={(e) => onStatusChange?.(bm.id, e.target.value)}
              className="text-[11px] bg-neutral-50 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 rounded-lg px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer text-neutral-700 dark:text-neutral-200"
            >
              {STATUSES.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
            <a href={bm.url} target="_blank" rel="noreferrer"
              className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400" title="Open">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button onClick={() => onDelete?.(bm.id)}
              className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/15 text-neutral-400 hover:text-rose-500 dark:hover:text-rose-300" title="Delete">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ onCapture }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-200 via-orange-100 to-emerald-100 dark:from-violet-500/30 dark:via-orange-500/20 dark:to-emerald-500/20 flex items-center justify-center shadow-soft-lg"
      >
        <Link2 className="w-10 h-10 text-violet-600/80 dark:text-violet-300" />
      </motion.div>
      <h2 className="mt-8 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Your library is a blank canvas</h2>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-sm">
        Paste any link — articles, GitHub repos, Figma files, YouTube videos.
        VixLuxia will fetch the perfect preview.
      </p>
      <button onClick={onCapture}
        className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-soft-lg transition-colors">
        <Plus className="w-4 h-4" /> Capture your first link
      </button>
    </div>
  );
}

function CaptureModal({ open, onClose, onSaved, defaultWorkspace }) {
  const [url, setUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) { setUrl(''); setPreview(null); setError(null); setTagsInput(''); }
  }, [open]);

  useEffect(() => {
    if (!url) { setPreview(null); return; }
    let cancelled = false;
    const t = setTimeout(async () => {
      try { new URL(url); } catch { setError(null); setPreview(null); return; }
      setLoading(true); setError(null);
      try {
        const res = await fetch('/api/bookmarks/enrich', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        });
        if (!res.ok) throw new Error('Could not fetch preview');
        const data = await res.json();
        if (!cancelled) setPreview(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 350);
    return () => { cancelled = true; clearTimeout(t); };
  }, [url]);

  const save = async () => {
    if (!preview) return;
    setSaving(true);
    try {
      const tags = tagsInput.split(',').map((s) => s.trim()).filter(Boolean);
      const res = await fetch('/api/bookmarks', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: preview.url, enriched: preview, tags, workspaceId: defaultWorkspace || 'default' }),
      });
      if (!res.ok) throw new Error('Save failed');
      const saved = await res.json();
      onSaved?.(saved);
      toast.success('Saved to your library');
      onClose?.();
    } catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-xl bg-white/90 dark:bg-neutral-900/85 backdrop-blur-2xl border border-black/5 dark:border-white/[0.06] rounded-3xl shadow-soft-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">Capture a link</h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Paste any URL and let VixLuxia do the rest.</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-5 relative">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                autoFocus value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-neutral-800 focus:border-violet-200 dark:focus:border-violet-500/40 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-500/10 outline-none text-sm transition-all text-neutral-900 dark:text-neutral-100"
              />
            </div>

            <div className="mt-4 min-h-[140px]">
              {loading && (
                <div className="rounded-2xl border border-black/5 dark:border-white/5 p-4 bg-white/60 dark:bg-neutral-800/40 animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
                      <div className="h-2.5 w-1/3 rounded bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                  <div className="mt-4 h-2.5 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
                  <div className="mt-2 h-2.5 w-5/6 rounded bg-neutral-200 dark:bg-neutral-700" />
                  <p className="mt-3 text-[11px] text-neutral-400 flex items-center gap-1.5">
                    <Loader2 className="w-3 h-3 animate-spin" /> AI is enriching the metadata…
                  </p>
                </div>
              )}
              {!loading && preview && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-black/5 dark:border-white/5 p-4 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800/60 dark:to-neutral-900/60"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden">
                      {preview.favicon ? <img src={preview.favicon} alt="" className="w-5 h-5" /> : <Globe className="w-4 h-4 text-neutral-400" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2">{preview.title}</p>
                      <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                        <TypeIcon type={preview.type} /> {preview.domain}
                      </p>
                    </div>
                  </div>
                  {preview.description && (
                    <p className="mt-3 text-[13px] text-neutral-600 dark:text-neutral-400 line-clamp-3">{preview.description}</p>
                  )}
                  {preview.image && (
                    <img src={preview.image} alt="" className="mt-3 w-full h-32 object-cover rounded-xl border border-black/5 dark:border-white/5"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  )}
                  {preview.meta?.github && (
                    <div className="mt-3 flex gap-3 text-[12px] text-neutral-600 dark:text-neutral-400">
                      <span className="inline-flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" />{preview.meta.github.stars}</span>
                      <span className="inline-flex items-center gap-1"><GitFork className="w-3.5 h-3.5" />{preview.meta.github.forks}</span>
                    </div>
                  )}
                </motion.div>
              )}
              {!loading && !preview && !error && (
                <div className="text-center text-xs text-neutral-400 py-10">Paste a URL to see a live preview</div>
              )}
              {error && (<div className="text-center text-xs text-rose-500 py-10">{error}</div>)}
            </div>

            <div className="mt-2">
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Tags, comma separated (e.g. design, inspiration)"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 focus:bg-white dark:focus:bg-neutral-800 focus:border-violet-200 dark:focus:border-violet-500/40 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-500/10 outline-none text-sm transition-all text-neutral-900 dark:text-neutral-100"
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded-xl text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800">Cancel</button>
              <button onClick={save} disabled={!preview || saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Save to library
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Sidebar({ open, onClose, workspaces, currentWs, setCurrentWs, tags, currentTag, setCurrentTag, theme, onToggleTheme }) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="lg:hidden fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} />
        )}
      </AnimatePresence>
      <aside className={`fixed lg:sticky top-0 z-40 lg:z-0 h-screen w-72 shrink-0 transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full px-5 py-6 flex flex-col">
          <div className="flex items-center gap-2 px-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-300 via-orange-200 to-emerald-200 shadow-soft flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white drop-shadow" />
            </div>
            <span className="text-[17px] font-semibold tracking-tight text-gradient">VixLuxia</span>
            <button onClick={onClose} className="lg:hidden ml-auto p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 px-2">
            <h3 className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Workspaces</h3>
            <nav className="mt-2 space-y-0.5">
              <button onClick={() => setCurrentWs('all')}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm transition-colors ${currentWs === 'all' ? 'bg-white dark:bg-neutral-800/80 shadow-soft text-neutral-900 dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-400 hover:bg-white/60 dark:hover:bg-neutral-800/40'}`}>
                <div className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <Folder className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                </div>
                All
              </button>
              {workspaces.map((ws) => {
                const Icon = ICONS[ws.icon] || Folder;
                const colorClass = COLORS[ws.color] || COLORS.lavender;
                const active = currentWs === ws.id;
                return (
                  <button key={ws.id} onClick={() => setCurrentWs(ws.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-sm transition-colors ${active ? 'bg-white dark:bg-neutral-800/80 shadow-soft text-neutral-900 dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-400 hover:bg-white/60 dark:hover:bg-neutral-800/40'}`}>
                    <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{ws.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-8 px-2 flex-1 min-h-0 overflow-y-auto">
            <h3 className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Tags</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tags.length === 0 && <p className="text-xs text-neutral-400 px-1">No tags yet</p>}
              {tags.map((t) => (
                <button key={t.name}
                  onClick={() => setCurrentTag(currentTag === t.name ? null : t.name)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] border transition-colors ${currentTag === t.name ? 'bg-violet-100 dark:bg-violet-500/15 border-violet-200 dark:border-violet-500/30 text-violet-700 dark:text-violet-200' : 'bg-white/70 dark:bg-neutral-800/40 border-black/[0.04] dark:border-white/[0.05] text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800/80'}`}>
                  <Hash className="w-3 h-3" />{t.name}
                  <span className="text-neutral-400">{t.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 px-2 space-y-2">
            <button onClick={onToggleTheme}
              className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/70 dark:bg-neutral-800/60 border border-black/[0.05] dark:border-white/[0.06] shadow-soft text-sm text-neutral-700 dark:text-neutral-200 hover:bg-white dark:hover:bg-neutral-800">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? 'Light mode' : 'Soft dark mode'}
            </button>
            <div className="rounded-2xl p-3 bg-white/70 dark:bg-neutral-800/60 border border-black/[0.05] dark:border-white/[0.06] shadow-soft">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-300 to-orange-200 flex items-center justify-center text-white text-xs font-semibold">V</div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-100 truncate">You</p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">Free plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function KanbanColumn({ status, items, onStatusChange, onDelete, onTagClick }) {
  const [over, setOver] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault(); setOver(false);
        const id = e.dataTransfer.getData('text/plain');
        if (id) onStatusChange(id, status.key);
      }}
      className={`flex-1 min-w-[280px] rounded-3xl p-4 border transition-colors ${over ? 'border-violet-300 dark:border-violet-500/40 bg-violet-50/40 dark:bg-violet-500/5' : 'border-black/[0.05] dark:border-white/[0.05] bg-white/40 dark:bg-neutral-900/30'}`}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${status.dot}`} />
          <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{status.label}</h3>
          <span className="text-[11px] text-neutral-400">{items.length}</span>
        </div>
      </div>
      <div className="mt-3 space-y-3">
        <LayoutGroup>
          <AnimatePresence>
            {items.map((bm) => (
              <PolymorphicCard key={bm.id} bm={bm} draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', bm.id)}
                onStatusChange={onStatusChange} onDelete={onDelete} onTagClick={onTagClick} />
            ))}
          </AnimatePresence>
        </LayoutGroup>
        {items.length === 0 && (
          <div className="text-center text-xs text-neutral-400 py-10 border border-dashed border-black/10 dark:border-white/10 rounded-2xl">Drop here</div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [tags, setTags] = useState([]);
  const [view, setView] = useState('grid');
  const [currentWs, setCurrentWs] = useState('all');
  const [currentTag, setCurrentTag] = useState(null);
  const [search, setSearch] = useState('');
  const [captureOpen, setCaptureOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  // Sync theme with localStorage + html class
  useEffect(() => {
    const t = localStorage.getItem('vixluxia-theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  }, []);
  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('vixluxia-theme', next);
  }, [theme]);

  const reloadTags = useCallback(async () => {
    try { const r = await fetch('/api/tags'); setTags(await r.json()); } catch {}
  }, []);
  const reloadBookmarks = useCallback(async () => {
    const params = new URLSearchParams();
    if (currentWs && currentWs !== 'all') params.set('workspaceId', currentWs);
    if (currentTag) params.set('tag', currentTag);
    if (search) params.set('q', search);
    const r = await fetch('/api/bookmarks?' + params.toString());
    setBookmarks(await r.json());
  }, [currentWs, currentTag, search]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const wsRes = await fetch('/api/workspaces');
        setWorkspaces(await wsRes.json());
        await reloadBookmarks();
        await reloadTags();
      } finally { setLoading(false); }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { reloadBookmarks(); }, [reloadBookmarks]);

  // Keyboard shortcuts: Cmd+N -> capture (palette handles Cmd+K)
  useEffect(() => {
    const fn = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault(); setCaptureOpen(true);
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const onSaved = (bm) => { setBookmarks((prev) => [bm, ...prev]); reloadTags(); };
  const onStatusChange = async (id, status) => {
    setBookmarks((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    try {
      await fetch(`/api/bookmarks/${id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch {}
  };
  const onDelete = async (id) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    try { await fetch(`/api/bookmarks/${id}`, { method: 'DELETE' }); toast.success('Removed'); reloadTags(); } catch {}
  };

  const filtered = bookmarks;
  const byStatus = useMemo(() => {
    const map = { inbox: [], reading: [], done: [], archived: [] };
    filtered.forEach((b) => { (map[b.status] || map.inbox).push(b); });
    return map;
  }, [filtered]);

  const headerTitle = useMemo(() => {
    if (currentTag) return `#${currentTag}`;
    if (currentWs === 'all' || !currentWs) return 'All bookmarks';
    return workspaces.find((w) => w.id === currentWs)?.name || 'Library';
  }, [currentWs, currentTag, workspaces]);

  return (
    <div className="min-h-screen flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}
        workspaces={workspaces}
        currentWs={currentWs}
        setCurrentWs={(v) => { setCurrentWs(v); setSidebarOpen(false); }}
        tags={tags} currentTag={currentTag} setCurrentTag={setCurrentTag}
        theme={theme} onToggleTheme={toggleTheme}
      />

      <main className="flex-1 min-w-0">
        <div className="sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 pt-5">
            <div className="flex items-center gap-3 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.06] rounded-2xl shadow-soft px-3 py-2">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800">
                <Menu className="w-4 h-4" />
              </button>

              <button onClick={() => setPaletteOpen(true)}
                className="relative flex-1 max-w-2xl mx-auto flex items-center gap-2.5 pl-3.5 pr-3 py-2.5 rounded-xl bg-neutral-50/60 dark:bg-neutral-800/40 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 border border-transparent hover:border-black/5 dark:hover:border-white/5 transition-colors text-left">
                <Search className="w-4 h-4 text-neutral-400" />
                <span className="text-sm text-neutral-400 flex-1 truncate">Search, jump, run commands…</span>
                <kbd className="hidden sm:block text-[10px] text-neutral-400 border border-black/5 dark:border-white/10 rounded-md px-1.5 py-0.5 bg-white dark:bg-neutral-900">⌘K</kbd>
              </button>

              <div className="flex items-center gap-1 p-0.5 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/60">
                {[
                  { k: 'grid', I: LayoutGrid },
                  { k: 'list', I: ListIcon },
                  { k: 'kanban', I: Columns3 },
                ].map(({ k, I }) => (
                  <button key={k} onClick={() => setView(k)}
                    className={`p-2 rounded-lg text-neutral-500 transition-colors ${view === k ? 'bg-white dark:bg-neutral-900 shadow-soft text-neutral-900 dark:text-neutral-100' : 'hover:bg-white/60 dark:hover:bg-neutral-800'}`}
                    title={k}>
                    <I className="w-4 h-4" />
                  </button>
                ))}
              </div>

              <button onClick={toggleTheme}
                className="hidden md:inline-flex p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300" title="Toggle theme">
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button onClick={() => setCaptureOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[13px] font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 shadow-soft transition-colors">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Capture Link</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 pt-6 pb-24">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{headerTitle}</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
                {currentTag && <button onClick={() => setCurrentTag(null)} className="ml-2 text-violet-600 dark:text-violet-300 hover:underline">clear filter</button>}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="masonry">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white/70 dark:bg-neutral-900/40 rounded-3xl border border-black/5 dark:border-white/5 p-5 shadow-soft animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-200 dark:bg-neutral-700" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
                      <div className="h-2.5 w-1/3 rounded bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-2.5 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-2.5 w-5/6 rounded bg-neutral-200 dark:bg-neutral-700" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState onCapture={() => setCaptureOpen(true)} />
          ) : view === 'grid' ? (
            <div className="masonry">
              <LayoutGroup>
                <AnimatePresence>
                  {filtered.map((bm) => (
                    <PolymorphicCard key={bm.id} bm={bm} onStatusChange={onStatusChange} onDelete={onDelete} onTagClick={setCurrentTag} />
                  ))}
                </AnimatePresence>
              </LayoutGroup>
            </div>
          ) : view === 'list' ? (
            <div className="space-y-2">
              <LayoutGroup>
                <AnimatePresence>
                  {filtered.map((bm) => (
                    <motion.a layout key={bm.id} href={bm.url} target="_blank" rel="noreferrer"
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-4 p-3 bg-white/70 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-900 border border-black/5 dark:border-white/5 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all">
                      <div className="w-9 h-9 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                        {bm.favicon ? <img src={bm.favicon} alt="" className="w-5 h-5" /> : <Globe className="w-4 h-4 text-neutral-400" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">{bm.title}</p>
                        <p className="text-[11.5px] text-neutral-500 dark:text-neutral-400 truncate">{bm.domain}{bm.readingTime ? ` · ${bm.readingTime} min` : ''}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {bm.tags?.slice(0, 2).map((t) => (
                          <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-300">{t}</span>
                        ))}
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUSES.find((s) => s.key === bm.status)?.dot || 'bg-neutral-300'}`} />
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>
              </LayoutGroup>
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
              {STATUSES.filter((s) => s.key !== 'archived').map((s) => (
                <KanbanColumn key={s.key} status={s} items={byStatus[s.key] || []}
                  onStatusChange={onStatusChange} onDelete={onDelete} onTagClick={setCurrentTag} />
              ))}
            </div>
          )}
        </div>
      </main>

      <CaptureModal
        open={captureOpen}
        onClose={() => setCaptureOpen(false)}
        onSaved={onSaved}
        defaultWorkspace={currentWs !== 'all' ? currentWs : 'default'}
      />

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        bookmarks={bookmarks}
        workspaces={workspaces}
        tags={tags}
        theme={theme}
        onCapture={() => setCaptureOpen(true)}
        onSetView={setView}
        onSetWorkspace={setCurrentWs}
        onSetTag={setCurrentTag}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}

export default App;
