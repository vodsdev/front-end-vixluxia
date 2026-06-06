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
  
  const filteredData = mockData.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    setActiveIndex(0);
  }, [search]);

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
      setActiveIndex((prev) => (prev + 1) % filteredData.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredData.length) % filteredData.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredData[activeIndex]) {
        onSelect(filteredData[activeIndex].href);
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
            placeholder="Search for components, settings, and more..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <div className="flex items-center gap-1">
            <kbd className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground font-mono">ESC</kbd>
          </div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2 relative">
          <AnimatePresence>
            {filteredData.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center text-muted-foreground"
              >
                No results found.
              </motion.div>
            ) : (
              <div className="flex flex-col relative">
                {filteredData.map((item, index) => {
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
                      <div className="flex items-center text-sm font-medium">
                        <Icon className="w-4 h-4 mr-3 text-muted-foreground" />
                        {item.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
