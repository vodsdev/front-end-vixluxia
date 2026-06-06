'use client';
import Link from 'next/link';
import { Sparkles, Github, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['700', '900'] });

const FOOTER_LINKS = {
  product: [
    { label: 'Components', href: '/' },
    { label: 'Featured', href: '/featured' },
    { label: 'Newest', href: '/newest' },
    { label: 'Themes', href: '/themes' },
  ],
  community: [
    { label: 'Top Authors', href: '/authors' },
    { label: 'Best of Week', href: '/week' },
    { label: 'Discord', href: '#' },
    { label: 'GitHub', href: '#' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Changelog', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'API', href: '#' },
  ],
};

export function AppFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span 
                className={cn(
                  outfit.className,
                  "relative font-black text-lg tracking-tight bg-clip-text text-transparent group-hover:scale-[1.03] transition-transform duration-300",
                  "bg-gradient-to-r from-violet-600 via-pink-400 via-zinc-900 to-violet-600 dark:from-violet-400 dark:via-fuchsia-300 dark:via-white dark:to-violet-400"
                )}
                style={{ backgroundSize: '300% auto', animation: 'logo-shimmer 3s linear infinite' }}
              >
                VixLuxia
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              The open-source registry for UI components. Built by the community, for the community.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4">Product</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4">Community</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.community.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted-foreground">
            Built with Next.js, Tailwind CSS, and Radix UI.
          </p>
          <p className="text-[11px] text-muted-foreground">
            &copy; {new Date().getFullYear()} VixLuxia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
