'use client';

import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Mail
} from 'lucide-react';

const outfit = Outfit({ subsets: ['latin'], weight: ['700', '900'] });

const FOOTER_LINKS = {
  product: [
    { label: 'Components', href: '/' },
    { label: 'Templates', href: '/templates' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Showcase', href: '/showcase' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Partners', href: '/partners' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Licenses', href: '/licenses' },
    { label: 'Settings', href: '/settings' },
  ],
  social: [
    { label: 'Twitter / X', href: '#', icon: Twitter },
    { label: 'GitHub', href: '#', icon: Github },
    { label: 'Discord', href: '#', icon: MessageCircle },
    { label: 'LinkedIn', href: '#', icon: Linkedin },
  ],
};

export function AppFooter() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 py-16 lg:px-8 lg:py-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          {/* Brand & Newsletter Column */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span 
                className={cn(
                  outfit.className,
                  "relative font-black text-2xl tracking-tight text-white group-hover:scale-[1.02] transition-transform duration-300"
                )}
              >
                VixLuxia
                <span className="text-violet-500">.</span>
              </span>
            </Link>
            <p className="text-sm leading-6 max-w-sm">
              The premium open-source UI component library for building modern web applications. Beautifully designed, accessible, and ready for production.
            </p>
            
            <div className="pt-4 space-y-4">
              <h3 className="text-sm font-semibold text-white">Subscribe to our newsletter</h3>
              <p className="text-xs text-zinc-500">Get weekly updates on new components and templates.</p>
              <form className="flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 pl-10 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-all"
                    required
                  />
                </div>
                <Button type="submit" className="bg-white text-zinc-950 hover:bg-zinc-200 transition-colors">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Product</h3>
                <ul className="space-y-4">
                  {FOOTER_LINKS.product.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm hover:text-white transition-colors duration-200 relative group flex w-fit">
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-500 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Company</h3>
                <ul className="space-y-4">
                  {FOOTER_LINKS.company.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm hover:text-white transition-colors duration-200 relative group flex w-fit">
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-500 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Legal</h3>
                <ul className="space-y-4">
                  {FOOTER_LINKS.legal.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm hover:text-white transition-colors duration-200 relative group flex w-fit">
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-500 group-hover:w-full transition-all duration-300"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-6">Social</h3>
                <ul className="space-y-4">
                  {FOOTER_LINKS.social.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        <Link href={link.href} className="text-sm hover:text-white transition-colors duration-200 flex items-center gap-3 group">
                          <Icon className="h-4 w-4 text-zinc-500 group-hover:text-violet-400 transition-colors" />
                          <span className="relative">
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-500 group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} VixLuxia Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              All systems operational
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
            <Link href="#" className="hover:text-white transition-colors">Design System</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
