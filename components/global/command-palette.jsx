'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Command, FileText, Settings, User } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const mockData = [
  { id: '1', title: 'Dashboard', icon: Command, href: '/dashboard', category: 'Navigation' },
  { id: '2', title: 'Components', icon: FileText, href: '/components', category: 'Navigation' },
  { id: '3', title: 'Settings', icon: Settings, href: '/settings', category: 'Preferences' },
  { id: '4', title: 'Profile', icon: User, href: '/profile', category: 'Preferences' },
];

export function CommandPalette({ open, onOpenChange }) {
  const router = useRouter();
  const [search, setSearch] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isSemanticLoading, setIsSemanticLoading] = React.useState(false);
  const [semanticResults, setSemanticResults] = React.useState(null);
  
  const isLongTailQuery = search.trim().split(/\s+/).length > 2;

  React.useEffect(() => {
    setActiveIndex(0);
    
    if (isLongTailQuery) {
      setSemanticResults(null);
      setIsSemanticLoading(true);
      const timer = setTimeout(() => {
        setIsSemanticLoading(false);
        setSemanticResults([
          { id: 's1', title: 'Pricing Section - SaaS', icon: FileText, href: '/components/pricing', category: 'Semantic' },
          { id: 's2', title: 'Pricing Tables (Dark Mode)', icon: FileText, href: '/components/pricing-tables', category: 'Semantic' },
          { id: 's3', title: 'Subscription Widget', icon: FileText, href: '/components/subscription', category: 'Semantic' }
        ]);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsSemanticLoading(false);
      setSemanticResults(null);
    }
  }, [search, isLongTailQuery]);

  const displayData = isLongTailQuery ? (semanticResults || []) : mockData.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onOpenChange]);

  const onSelect = (href) => {
    onOpenChange(false);
    router.push(href);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % displayData.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + displayData.length) % displayData.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (displayData[activeIndex]) {
        onSelect(displayData[activeIndex].href);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="p-0 overflow-hidden bg-background/80 backdrop-blur-xl border border-border shadow-2xl max-w-2xl" 
        onKeyDown={handleKeyDown}
        // Remove close button for a cleaner palette look
        showCloseButton={false}
      >
        <div className="flex items-center px-4 py-3 border-b border-border/40">
          <Search className="w-5 h-5 text-muted-foreground mr-3" />
          <input 
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
            placeholder="Search for components, settings, and more... (Try 'A pricing page for SaaS')"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <div className="flex items-center gap-1">
            <kbd className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground font-mono">ESC</kbd>
          </div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2 relative min-h-[100px]">
          <AnimatePresence mode="wait">
            {isSemanticLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center justify-center gap-4 text-muted-foreground"
              >
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm font-medium">Running semantic search...</span>
              </motion.div>
            ) : displayData.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center text-muted-foreground"
              >
                No results found.
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col relative"
              >
                {displayData.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={item.id}
                      className="relative px-4 py-3 cursor-pointer rounded-lg transition-colors z-10"
                      onClick={() => onSelect(item.href)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="command-palette-highlight"
                          className="absolute inset-0 bg-primary/10 rounded-lg z-[-1]"
                          initial={false}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm font-medium">
                          <Icon className="w-4 h-4 mr-3 text-muted-foreground" />
                          {item.title}
                        </div>
                        {item.category === 'Semantic' && (
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-primary/70 bg-primary/10 px-2 py-0.5 rounded">
                            AI Match
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-4 py-2 bg-muted/30 border-t border-border/40 text-xs flex justify-between items-center">
          <div className="flex items-center text-primary/80 font-medium">
            ✨ Semantic Search Enabled
          </div>
          <div className="text-muted-foreground">
            Type natural language for AI results
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
