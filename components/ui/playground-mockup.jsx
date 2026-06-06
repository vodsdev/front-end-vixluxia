"use client"

import React from 'react';
import { Play, Maximize2, Code2, Terminal, Copy, Settings2, RefreshCw, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

export function PlaygroundMockup({ className }) {
  return (
    <div className={cn("w-full h-[600px] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col font-sans shadow-2xl", className)}>
      {/* Header bar */}
      <div className="h-12 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between px-4 select-none backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {/* Mac window controls */}
          <div className="flex gap-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500/90 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/90 border border-green-500/50" />
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-zinc-800/80 text-xs text-zinc-300 font-medium border border-zinc-700/50">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Playground</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
            <Settings2 className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run</span>
          </button>
        </div>
      </div>

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Editor Panel */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col bg-[#1e1e1e]">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-[#1e1e1e]">
              <div className="flex gap-5 text-xs font-medium text-zinc-400">
                <span className="text-zinc-100 border-b-2 border-blue-500 pb-2 -mb-2 flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-blue-400" />
                  index.jsx
                </span>
                <span className="hover:text-zinc-200 cursor-pointer pb-2 -mb-2 flex items-center gap-2">
                  styles.css
                </span>
              </div>
              <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* Editor Content */}
            <div className="flex-1 p-4 font-mono text-[13px] overflow-auto leading-relaxed">
              <div className="flex">
                {/* Line numbers */}
                <div className="w-8 text-zinc-600/80 text-right pr-4 select-none flex flex-col">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map(n => <span key={n}>{n}</span>)}
                </div>
                {/* Code syntax highlighted (mock) */}
                <div className="flex-1 text-zinc-300">
                  <pre className="font-mono m-0">
                    <span className="text-[#c678dd]">import</span> React <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'react'</span>;{'\n'}
                    <span className="text-[#c678dd]">import</span> {'{'} Button {'}'} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'@/components/ui/button'</span>;{'\n'}
                    {'\n'}
                    <span className="text-[#c678dd]">export default function</span> <span className="text-[#61afef]">App</span>() {'{'}{'\n'}
                    {'  '}<span className="text-[#c678dd]">return</span> ({'\n'}
                    {'    '}&lt;<span className="text-[#e06c75]">div</span> <span className="text-[#d19a66]">className</span>=<span className="text-[#98c379]">"p-8 flex items-center justify-center min-h-screen bg-black"</span>&gt;{'\n'}
                    {'      '}&lt;<span className="text-[#e06c75]">div</span> <span className="text-[#d19a66]">className</span>=<span className="text-[#98c379]">"text-center space-y-6"</span>&gt;{'\n'}
                    {'        '}&lt;<span className="text-[#e06c75]">h1</span> <span className="text-[#d19a66]">className</span>=<span className="text-[#98c379]">"text-4xl font-bold tracking-tight text-white"</span>&gt;{'\n'}
                    {'          '}Interactive UI Mockup{'\n'}
                    {'        '}&lt;/<span className="text-[#e06c75]">h1</span>&gt;{'\n'}
                    {'        '}&lt;<span className="text-[#e06c75]">p</span> <span className="text-[#d19a66]">className</span>=<span className="text-[#98c379]">"text-zinc-400 text-lg"</span>&gt;{'\n'}
                    {'          '}Preview changes instantly as you type.{'\n'}
                    {'        '}&lt;/<span className="text-[#e06c75]">p</span>&gt;{'\n'}
                    {'        '}&lt;<span className="text-[#e06c75]">div</span> <span className="text-[#d19a66]">className</span>=<span className="text-[#98c379]">"pt-4"</span>&gt;{'\n'}
                    {'          '}&lt;<span className="text-[#e06c75]">Button</span> <span className="text-[#d19a66]">size</span>=<span className="text-[#98c379]">"lg"</span> <span className="text-[#d19a66]">className</span>=<span className="text-[#98c379]">"bg-white text-black hover:bg-zinc-200"</span>&gt;{'\n'}
                    {'            '}Get Started{'\n'}
                    {'          '}&lt;/<span className="text-[#e06c75]">Button</span>&gt;{'\n'}
                    {'        '}&lt;/<span className="text-[#e06c75]">div</span>&gt;{'\n'}
                    {'      '}&lt;/<span className="text-[#e06c75]">div</span>&gt;{'\n'}
                    {'    '}&lt;/<span className="text-[#e06c75]">div</span>&gt;{'\n'}
                    {'  '});{'\n'}
                    {'}'}
                  </pre>
                </div>
              </div>
            </div>
            
            {/* Terminal mock */}
            <div className="h-36 border-t border-zinc-800 bg-[#181818] flex flex-col">
              <div className="flex items-center gap-5 px-4 py-2 border-b border-zinc-800 bg-[#1e1e1e]/80 text-xs font-medium text-zinc-400">
                <span className="text-zinc-100 flex items-center gap-1.5 border-b border-zinc-100 pb-1 -mb-2">
                  <Terminal className="w-3.5 h-3.5"/> Terminal
                </span>
                <span className="hover:text-zinc-200 cursor-pointer pb-1 -mb-2">Problems <span className="ml-1 bg-zinc-800 px-1.5 py-0.5 rounded-full text-[10px]">0</span></span>
                <span className="hover:text-zinc-200 cursor-pointer pb-1 -mb-2">Output</span>
              </div>
              <div className="flex-1 p-3 font-mono text-[13px] text-zinc-400 overflow-auto">
                <div className="flex items-start gap-2">
                  <span className="text-[#98c379]">➜</span>
                  <span className="text-[#61afef]">~/project</span>
                  <span className="text-zinc-300">npm run dev</span>
                </div>
                <div className="text-zinc-500 mt-1">
                  &gt; project@0.1.0 dev<br/>
                  &gt; next dev
                </div>
                <div className="text-[#98c379] mt-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#98c379] animate-pulse"></span>
                  ready - started server on 0.0.0.0:3000, url: http://localhost:3000
                </div>
                <div className="text-[#61afef] mt-1">
                  event - compiled client and server successfully in 1250 ms (142 modules)
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle className="bg-zinc-800 hover:bg-blue-500/50 transition-colors" />

        {/* Preview Panel */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col bg-zinc-950 relative">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50 absolute top-0 w-full z-20">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-400 w-64 shadow-inner backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
                  <span className="truncate">localhost:3000</span>
                </div>
                <button className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors backdrop-blur-md">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors backdrop-blur-md">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Live Preview Area */}
            <div className="flex-1 bg-black flex items-center justify-center p-8 relative overflow-hidden h-full">
              {/* Background effect */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
              
              <div className="relative z-10 text-center space-y-6 max-w-md mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Live Preview
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Interactive UI Mockup
                </h1>
                <p className="text-zinc-400 text-lg">
                  Preview changes instantly as you type. This mockup shows a typical editor and preview split screen.
                </p>
                <div className="pt-4">
                  <button className="px-8 py-3.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default PlaygroundMockup;
