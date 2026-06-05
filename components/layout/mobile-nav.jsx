'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, LayoutGrid, Clock, Trophy, Palette, Users, Code2, CreditCard, Share2, Bot, Upload, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { href: '/', label: 'Discover', icon: LayoutGrid },
  { href: '/featured', label: 'Featured', icon: Sparkles },
  { href: '/newest', label: 'Newest', icon: Clock },
  { href: '/week', label: 'Best of Week', icon: Trophy },
  { href: '/themes', label: 'Themes', icon: Palette },
  { href: '/authors', label: 'Top Authors', icon: Users },
  { href: '/api', label: 'API', icon: Code2 },
  { href: '/abonnement', label: 'Abonnement', icon: CreditCard },
  { href: '/affiliation', label: 'Affiliation', icon: Share2 },
  { href: '/ia', label: 'IA Premium', icon: Bot },
  { href: '/publish', label: 'Publish', icon: Upload },
  { href: '/api-keys', label: 'API Keys', icon: KeyRound },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-0"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>

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

            {/* Panel */}
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-72 bg-background border-r border-border z-50 flex flex-col"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="p-4 flex items-center justify-between border-b border-border/50">
                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-bold text-sm">21st</span>
                </Link>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={() => setOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-auto p-4">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                            isActive
                              ? 'bg-accent text-accent-foreground font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-border/50">
                <Button className="w-full rounded-xl text-xs" size="sm" asChild>
                  <Link href="/publish" onClick={() => setOpen(false)}>Publish Component</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
