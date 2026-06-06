"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function CliBlock({ 
  command, 
  className,
  prefix = "$",
  title = "Terminal"
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={cn("rounded-lg overflow-hidden border bg-zinc-950 shadow-sm", className)}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium text-zinc-400 font-mono">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-zinc-950">
        <div className="flex items-center gap-3 font-mono text-sm overflow-x-auto text-zinc-50">
          <span className="text-zinc-500 select-none shrink-0">{prefix}</span>
          <span className="whitespace-pre">{command}</span>
        </div>
        <button
          onClick={handleCopy}
          className="ml-4 p-2 shrink-0 rounded-md hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-100"
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}
