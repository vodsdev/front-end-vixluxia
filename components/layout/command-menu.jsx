'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Home, LayoutGrid, CreditCard, Palette, Code2, Users } from 'lucide-react';

const LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/components', label: 'Components', icon: LayoutGrid },
  { href: '/pricing', label: 'Pricing', icon: CreditCard },
  { href: '/themes', label: 'Themes', icon: Palette },
  { href: '/api', label: 'API', icon: Code2 },
  { href: '/authors', label: 'Authors', icon: Users },
];

export function CommandMenu({ open, onOpenChange }) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onOpenChange]);

  const filteredLinks = LINKS.filter(link => 
    link.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (href) => {
    onOpenChange(false);
    router.push(href);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="w-full max-w-lg pointer-events-auto px-4"
            >
              <div className="bg-background border border-border/40 shadow-2xl rounded-xl overflow-hidden flex flex-col">
                <div className="flex items-center px-4 py-3 border-b border-border/40">
                  <Search className="w-5 h-5 text-muted-foreground mr-3" />
                  <input
                    autoFocus
                    className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
                    placeholder="Search pages..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') onOpenChange(false);
                      if (e.key === 'Enter' && filteredLinks.length > 0) {
                        handleSelect(filteredLinks[0].href);
                      }
                    }}
                  />
                  <kbd className="bg-muted px-2 py-1 rounded text-[10px] text-muted-foreground font-mono">ESC</kbd>
                </div>
                <div className="p-2 max-h-[300px] overflow-y-auto">
                  {filteredLinks.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      No results found.
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {filteredLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={link.href}
                            onClick={() => handleSelect(link.href)}
                            className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-primary/10 hover:text-primary transition-colors text-left"
                          >
                            <Icon className="w-4 h-4 mr-3 text-muted-foreground" />
                            {link.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
