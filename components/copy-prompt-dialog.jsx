'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X, Terminal, FileCode, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'prompt', label: 'AI Prompt', icon: Wand2 },
  { id: 'cli', label: 'CLI', icon: Terminal },
  { id: 'manual', label: 'Manual', icon: FileCode },
];

export function CopyPromptDialog({ open, onClose, component }) {
  const [activeTab, setActiveTab] = useState('prompt');
  const [copied, setCopied] = useState(false);

  if (!component) return null;

  const getContent = () => {
    switch (activeTab) {
      case 'prompt':
        return component.prompt || 'No prompt available';
      case 'cli':
        return `npx shadcn-ui@latest add ${component.id}\n\n# Or manually install dependencies:\nnpm install framer-motion lucide-react`;
      case 'manual':
        return `1. Copy the component code to /components/ui/${component.id}.tsx\n2. Install dependencies: npm install framer-motion lucide-react\n3. Import and use: import { ${component.name.replace(/\s+/g, '')} } from "@/components/ui/${component.id}"`;
      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getContent());
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
                <div>
                  <h3 className="font-bold text-sm">{component.name}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{component.tagline}</p>
                </div>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 px-6 pt-4">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                        activeTab === tab.id
                          ? 'bg-accent text-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-neutral-950 rounded-xl p-4 relative">
                  <pre className="text-[11px] leading-relaxed font-mono text-neutral-300 overflow-auto max-h-[300px] whitespace-pre-wrap">
                    {getContent()}
                  </pre>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-muted/20">
                <p className="text-[10px] text-muted-foreground">
                  Paste this into your AI coding tool (Cursor, v0, etc.)
                </p>
                <Button size="sm" className="rounded-lg text-xs gap-1.5" onClick={handleCopy}>
                  {copied ? (
                    <><Check className="w-3.5 h-3.5" /> Copied</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy</>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
