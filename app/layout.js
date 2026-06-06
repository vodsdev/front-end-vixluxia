import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { Suspense } from 'react';
import { CommandPalette } from '@/components/command-palette';
import { AiSupportBubble } from '@/components/global/ai-support-bubble';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'VixLuxia — Component Registry',
  description: 'A community-driven registry of high-quality React UI components powered by Tailwind CSS and Radix UI.',
  keywords: 'react, components, ui, tailwind, radix, shadcn, vixluxia',
  authors: [{ name: 'Vixluxia Team' }],
  openGraph: {
    title: 'VixLuxia — Component Registry',
    description: 'A community-driven registry of high-quality React UI components.',
    type: 'website',
  },
};

const themeScript = `
try {
  var t = localStorage.getItem('vixluxia-theme');
  if (!t) { t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  if (t === 'dark') document.documentElement.classList.add('dark');
} catch(e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>✨</text></svg>" />
      </head>
      <body className="font-sans antialiased text-foreground selection:bg-primary/20 dark:selection:bg-primary/30 min-h-screen relative">
        {/* Global Ambient Glow Background */}
        <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-background transition-colors duration-300">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/15 dark:bg-violet-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/15 dark:bg-orange-500/10 blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-fuchsia-500/15 dark:bg-fuchsia-500/10 blur-[100px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
        </div>
        
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <CommandPalette />
        <Toaster
          position="bottom-right"
          theme="system"
          toastOptions={{
            classNames: {
              toast: 'backdrop-blur-xl border rounded-lg shadow-lg',
              success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
              error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
              loading: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
            },
          }}
        />
        <AiSupportBubble />
        <Analytics />
      </body>
    </html>
  );
}
