'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function TopLogoBar() {
  return (
    <div className="w-full py-4 flex justify-center items-center border-b border-border/20 bg-background/40 backdrop-blur-md sticky top-0 z-[100]">
      <Link href="/" className="group relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Logo HD Majestic */}
          <img 
            src="/logo-sparkle-hd.png" 
            alt="VixLuxia Logo" 
            className="w-14 h-14 object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:scale-110 transition-transform duration-500" 
          />
          
          {/* Ambient Glow behind logo */}
          <div className="absolute inset-0 bg-violet-500/20 blur-2xl -z-10 rounded-full scale-150 group-hover:bg-violet-500/30 transition-colors" />
        </motion.div>
      </Link>
    </div>
  );
}
