'use client';
import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-transparent border-b border-border/40 overflow-hidden">
      <div className="flex items-center justify-center gap-2 px-4 py-2 text-xs relative">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
        <span 
          className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-pink-400 via-zinc-900 to-violet-600 dark:from-violet-400 dark:via-fuchsia-300 dark:via-white dark:to-violet-400"
          style={{ backgroundSize: '300% auto', animation: 'logo-shimmer 3s linear infinite' }}
        >
          VixLuxia — La registry open-source de composants React est là !
        </span>
        <a href="/" className="underline underline-offset-2 hover:no-underline font-semibold ml-1 text-primary">
          Explorer →
        </a>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-colors text-muted-foreground"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

