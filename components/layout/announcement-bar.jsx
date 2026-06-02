'use client';
import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 px-4 py-2 text-xs relative">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-medium">New: AI-powered component generation is here!</span>
            <a href="#" className="underline underline-offset-2 hover:no-underline font-semibold ml-1">
              Try it now →
            </a>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
