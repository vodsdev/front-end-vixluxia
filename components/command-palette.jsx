'use client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, LayoutGrid, Clock, Trophy, Palette, Users, X } from 'lucide-react';
import { CATEGORIES, PROMPTS } from '@/lib/prompts-data';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const allComponents = useMemo(() => {
    return Object.entries(PROMPTS).flatMap(([slug, items]) =>
      items.map(item => ({ ...item, categorySlug: slug }))
    );
  }, []);

  const navigate = (path) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <div className="bg-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
              <Command className="w-full">
                <div className="flex items-center border-b border-border/50 px-4">
                  <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                  <Command.Input
                    placeholder="Search components, categories..."
                    className="flex-1 h-12 bg-transparent border-0 outline-none text-sm px-3 placeholder:text-muted-foreground/60"
                    autoFocus
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1 rounded-md hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <Command.List className="max-h-[320px] overflow-y-auto p-2">
                  <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                    No results found.
                  </Command.Empty>

                  {/* Navigation */}
                  <Command.Group heading="Navigation">
                    <Command.Item onSelect={() => navigate('/')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm data-[selected=true]:bg-accent">
                      <LayoutGrid className="w-4 h-4 text-muted-foreground" />
                      <span>Discover</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate('/featured')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm data-[selected=true]:bg-accent">
                      <Sparkles className="w-4 h-4 text-muted-foreground" />
                      <span>Featured</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate('/newest')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm data-[selected=true]:bg-accent">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Newest</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate('/week')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm data-[selected=true]:bg-accent">
                      <Trophy className="w-4 h-4 text-muted-foreground" />
                      <span>Best of Week</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate('/themes')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm data-[selected=true]:bg-accent">
                      <Palette className="w-4 h-4 text-muted-foreground" />
                      <span>Themes</span>
                    </Command.Item>
                    <Command.Item onSelect={() => navigate('/authors')} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm data-[selected=true]:bg-accent">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Top Authors</span>
                    </Command.Item>
                  </Command.Group>

                  {/* Categories */}
                  <Command.Group heading="Categories">
                    {CATEGORIES.map((cat) => (
                      <Command.Item
                        key={cat.slug}
                        onSelect={() => navigate(`/?category=${cat.slug}`)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm data-[selected=true]:bg-accent"
                      >
                        <span className="text-base">{cat.emoji}</span>
                        <span>{cat.name}</span>
                        <span className="ml-auto text-[10px] text-muted-foreground">
                          {(PROMPTS[cat.slug] || []).length}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  {/* Components */}
                  <Command.Group heading="Components">
                    {allComponents.slice(0, 10).map((comp) => (
                      <Command.Item
                        key={comp.id}
                        onSelect={() => navigate(`/component?id=${comp.id}`)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer text-sm data-[selected=true]:bg-accent"
                      >
                        <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-[10px]">✨</div>
                        <div className="min-w-0 flex-1">
                          <span className="block truncate">{comp.name}</span>
                          <span className="block text-[10px] text-muted-foreground truncate">{comp.tagline}</span>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>

                {/* Footer */}
                <div className="border-t border-border/50 px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[9px]">↑↓</kbd>
                    <span>Navigate</span>
                    <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[9px]">↵</kbd>
                    <span>Select</span>
                    <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[9px]">Esc</kbd>
                    <span>Close</span>
                  </div>
                </div>
              </Command>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
