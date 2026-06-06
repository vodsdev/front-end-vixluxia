"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code, FileCode2, Paintbrush, FileJson } from "lucide-react";

const TABS = [
  { id: "react", label: "React", icon: FileCode2 },
  { id: "vue", label: "Vue", icon: Code },
  { id: "html", label: "HTML", icon: FileJson },
  { id: "tailwind", label: "Tailwind", icon: Paintbrush },
];

const CODE_SNIPPETS = {
  react: `import React from 'react';

export default function Button() {
  return (
    <button className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-lg shadow-indigo-500/50 hover:bg-indigo-600 transition-colors">
      Click Me
    </button>
  );
}`,
  vue: `<template>
  <button class="px-4 py-2 bg-emerald-500 text-white rounded-md shadow-lg shadow-emerald-500/50 hover:bg-emerald-600 transition-colors">
    Click Me
  </button>
</template>

<script setup>
// Component logic goes here
</script>`,
  html: `<!-- Simple Button Example -->
<button class="btn btn-primary">
  Click Me
</button>`,
  tailwind: `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-cyan-500 text-white rounded-md shadow-lg shadow-cyan-500/50 hover:bg-cyan-600 transition-colors;
  }
}`
};

export function CodeTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
      {/* Header Tabs */}
      <div className="flex px-4 pt-4 border-b border-slate-800 bg-slate-900/50">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={\`relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors outline-none
                \${isActive ? "text-white" : "text-slate-400 hover:text-slate-200"}\`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}

              {/* Glowing Underline / Highlight */}
              {isActive && (
                <motion.div
                  layoutId="active-code-tab"
                  className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-indigo-500"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-8 h-4 bg-indigo-500/40 blur-xl rounded-full" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      {/* Code Content Window */}
      <div className="p-4 bg-slate-950 min-h-[250px] font-mono text-sm">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <pre className="text-slate-300 overflow-x-auto p-4 rounded-lg bg-slate-900/50 border border-slate-800/50">
            <code>{CODE_SNIPPETS[activeTab]}</code>
          </pre>
        </motion.div>
      </div>
    </div>
  );
}
