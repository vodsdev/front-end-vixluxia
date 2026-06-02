'use client';
import { useState } from 'react';
import { Copy, Check, WrapText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function CodeBlock({ code, language = 'tsx', filename, className }) {
  const [copied, setCopied] = useState(false);
  const [wrapped, setWrapped] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('rounded-xl overflow-hidden border border-border/50', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {filename && (
            <span className="text-[11px] text-neutral-400 font-mono">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-7 h-7 p-0 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
            onClick={() => setWrapped(!wrapped)}
          >
            <WrapText className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-7 h-7 p-0 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
            onClick={handleCopy}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      {/* Code */}
      <div className="bg-neutral-950 p-4 overflow-auto max-h-[500px]">
        <pre className={cn(
          'text-[12px] leading-relaxed font-mono text-neutral-300',
          wrapped ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'
        )}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
