'use client';

import { useEffect } from 'react';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plus, LayoutGrid, List as ListIcon, Columns3, Sun, Moon,
  Folder, Hash, ExternalLink, Search, Sparkles,
} from 'lucide-react';

export default function CommandPalette({
  open, onOpenChange,
  bookmarks = [], workspaces = [], tags = [],
  onCapture, onSetView, onSetWorkspace, onSetTag, onToggleTheme, theme,
}) {
  useEffect(() => {
    const fn = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-md"
            onClick={() => onOpenChange(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-xl"
          >
            <Command
              label="Command palette"
              className="bg-white/85 dark:bg-neutral-900/85 backdrop-blur-2xl border border-black/[0.06] dark:border-white/[0.06] rounded-3xl shadow-soft-lg overflow-hidden"
              filter={(value, search) => {
                if (!search) return 1;
                const v = value.toLowerCase();
                const s = search.toLowerCase();
                if (v.includes(s)) return 1;
                // fuzzy: every char of search appears in order in value
                let i = 0;
                for (const c of v) { if (c === s[i]) i++; if (i === s.length) break; }
                return i === s.length ? 0.6 : 0;
              }}
            >
              <div className="flex items-center px-3 border-b border-black/[0.05] dark:border-white/[0.05]">
                <Search className="w-4 h-4 text-neutral-400 ml-2" />
                <Command.Input placeholder="Type a command or search…" />
              </div>
              <Command.List>
                <Command.Empty>No results. Try a different keyword.</Command.Empty>

                <Command.Group heading="Actions">
                  <Command.Item value="capture new link bookmark" onSelect={() => { onOpenChange(false); onCapture(); }}>
                    <Plus className="w-4 h-4" /> Capture a link <kbd>⌘N</kbd>
                  </Command.Item>
                  <Command.Item value="toggle theme dark light mode" onSelect={() => onToggleTheme()}>
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    Switch to {theme === 'dark' ? 'light' : 'dark'} mode
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Views">
                  <Command.Item value="grid masonry view" onSelect={() => { onSetView('grid'); onOpenChange(false); }}>
                    <LayoutGrid className="w-4 h-4" /> Grid view
                  </Command.Item>
                  <Command.Item value="list view" onSelect={() => { onSetView('list'); onOpenChange(false); }}>
                    <ListIcon className="w-4 h-4" /> List view
                  </Command.Item>
                  <Command.Item value="kanban board view" onSelect={() => { onSetView('kanban'); onOpenChange(false); }}>
                    <Columns3 className="w-4 h-4" /> Kanban view
                  </Command.Item>
                </Command.Group>

                {workspaces.length > 0 && (
                  <Command.Group heading="Workspaces">
                    <Command.Item value="workspace all everything" onSelect={() => { onSetWorkspace('all'); onOpenChange(false); }}>
                      <Sparkles className="w-4 h-4" /> All bookmarks
                    </Command.Item>
                    {workspaces.map((w) => (
                      <Command.Item key={w.id} value={`workspace ${w.name}`} onSelect={() => { onSetWorkspace(w.id); onOpenChange(false); }}>
                        <Folder className="w-4 h-4" /> {w.name}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {tags.length > 0 && (
                  <Command.Group heading="Tags">
                    {tags.slice(0, 8).map((t) => (
                      <Command.Item key={t.name} value={`tag ${t.name}`} onSelect={() => { onSetTag(t.name); onOpenChange(false); }}>
                        <Hash className="w-4 h-4" /> {t.name}
                        <span className="ml-auto text-[11px] text-neutral-400">{t.count}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {bookmarks.length > 0 && (
                  <Command.Group heading="Jump to bookmark">
                    {bookmarks.slice(0, 12).map((b) => (
                      <Command.Item
                        key={b.id}
                        value={`${b.title || ''} ${b.url} ${b.domain} ${(b.tags || []).join(' ')}`}
                        onSelect={() => { window.open(b.url, '_blank'); onOpenChange(false); }}
                      >
                        {b.favicon
                          ? <img src={b.favicon} alt="" className="w-4 h-4 rounded" />
                          : <ExternalLink className="w-4 h-4" />}
                        <span className="truncate">{b.title || b.url}</span>
                        <span className="ml-auto text-[11px] text-neutral-400 truncate">{b.domain}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}
              </Command.List>
              <div className="px-4 py-2 border-t border-black/[0.05] dark:border-white/[0.05] text-[10.5px] text-neutral-400 flex items-center justify-between">
                <span>↑↓ navigate · ↵ select · esc close</span>
                <span>VixLuxia</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
