'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Code2, Play, Save, Share2, 
  Terminal, FileCode, Wand2, Loader2, 
  ChevronRight, Github, Globe, Zap,
  Layout, Smartphone, Monitor, RotateCcw,
  MessageSquare, Send, Sparkles, X, Lock, Unlock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@ai-sdk/react';
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview,
  SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import { cn } from '@/lib/utils';
import { PageShell } from '@/components/layout/page-shell';
import { PremiumGate } from '@/components/platform/premium-gate';
import { toast } from 'sonner';

const PAID_PLANS = ['pro', 'studio', 'paid', 'active', 'starter', 'enterprise'];

export default function IAStudioPage() {
  const [activeFile, setActiveFile] = useState('/App.js');
  const [viewMode, setViewMode] = useState('desktop');
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState('free');
  const [serverPremium, setServerPremium] = useState(false);
  const messagesEndRef = useRef(null);
  
  const [code, setCode] = useState(`
import React from 'react';
import { Sparkles } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-bold">
          <Sparkles className="w-4 h-4" />
          VixLuxia AI Studio
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter">
          Génère ton <span className="text-violet-500">futur.</span>
        </h1>
        <p className="text-slate-400 max-w-md mx-auto text-sm">
          Décris le composant ou le site de tes rêves et regarde l'IA le coder en direct avec React et Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
  `);

  useEffect(() => {
    const storedPlan = localStorage.getItem('vixluxia-plan') || 'free';
    setPlan(storedPlan);
    fetch('/api/account/subscription')
      .then(r => r.json())
      .then(d => {
        setServerPremium(!!d.isPremium);
        if (d.plan) setPlan(d.plan);
      }).catch(() => {});
  }, []);

  const isPaid = serverPremium || PAID_PLANS.includes(String(plan).toLowerCase());

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/generate',
    body: { mode: 'bolt-architect' },
    onFinish: (message) => {
      const codeMatch = message.content.match(/```(?:jsx|javascript|js|react|tsx)\n([\s\S]*?)```/);
      if (codeMatch && codeMatch[1]) {
        setCode(codeMatch[1]);
        toast.success("Code généré et synchronisé !");
      }
      setIsGenerating(false);
    },
    onError: (err) => {
      toast.error(err.message);
      setIsGenerating(false);
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onGenerate = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setIsGenerating(true);
    handleSubmit(e);
  };

  const onPublish = async () => {
    try {
      const name = prompt("Donnez un nom à votre composant :", "Mon Nouveau Composant");
      if (!name) return;

      const response = await fetch('/api/components/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          code,
          category: 'UI',
          description: 'Généré par VixLuxia AI Studio',
          isPublic: true
        })
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Composant publié avec succès au registre !");
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      toast.error("Erreur lors de la publication : " + err.message);
    }
  };

  return (
    <PageShell title="IA Premium Studio" maxWidth="max-w-full">
      <PremiumGate allowed={isPaid}>
        <div className="flex h-[calc(100vh-180px)] overflow-hidden gap-4 pb-4">
          {/* Left Panel: Chat & Controls */}
          <Card className="w-[400px] border border-border/40 flex flex-col bg-card/40 backdrop-blur-xl rounded-[24px] overflow-hidden shadow-2xl shrink-0">
            <div className="p-5 border-b border-border/40 bg-gradient-to-b from-violet-500/5 to-transparent">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-black text-sm tracking-tight leading-none mb-1">AI Studio</h1>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Engine v3.0
                  </p>
                </div>
              </div>

              <form onSubmit={onGenerate} className="relative">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask VixLuxia to build something..."
                  className="w-full h-32 bg-background/50 border border-border/40 rounded-2xl p-4 text-sm font-medium focus:ring-1 focus:ring-violet-500/30 resize-none transition-all outline-none scrollbar-hide"
                />
                <Button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute bottom-3 right-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20 h-10 px-4 active:scale-95 transition-all"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  <span className="ml-2 text-[10px] font-black uppercase tracking-wider">Generate</span>
                </Button>
              </form>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-40">
                  <Sparkles className="w-10 h-10 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">Start a new creation</p>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className={cn("flex flex-col gap-2", m.role === 'user' ? "items-end" : "items-start")}>
                    <div className={cn(
                      "max-w-[90%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-sm border",
                      m.role === 'user' 
                        ? "bg-violet-600 text-white border-violet-500 rounded-br-none" 
                        : "bg-background/80 border-border/40 rounded-bl-none"
                    )}>
                      {m.content.split('```')[0]}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-5 border-t border-border/40 bg-muted/5 space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3 rounded-xl h-11 border-border/40 hover:bg-muted/50 text-xs font-bold uppercase tracking-wider">
                <Github className="w-4 h-4" /> Export to GitHub
              </Button>
              <Button 
                onClick={onPublish}
                className="w-full justify-start gap-3 rounded-xl h-11 bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-lg shadow-emerald-500/10 text-xs font-bold uppercase tracking-wider"
              >
                <Save className="w-4 h-4" /> Publish to Registry
              </Button>
            </div>
          </Card>

          {/* Right Panel: Code & Preview */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-950 rounded-[24px] border border-white/5 shadow-2xl">
            <SandpackProvider
              template="react"
              theme="dark"
              files={{
                "/App.js": code,
              }}
              options={{
                externalResources: ["https://cdn.tailwindcss.com"],
              }}
              className="h-full flex flex-col"
            >
              <div className="h-14 border-b border-white/5 bg-slate-900/50 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-violet-400" />
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Live Preview Engine</span>
                  </div>
                  <div className="h-4 w-px bg-white/10" />
                  <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn("h-7 w-7 rounded-md transition-all", viewMode === 'desktop' ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300")}
                      onClick={() => setViewMode('desktop')}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={cn("h-7 w-7 rounded-md transition-all", viewMode === 'mobile' ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300")}
                      onClick={() => setViewMode('mobile')}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={cn(
                    "text-[9px] font-black px-3 py-1 uppercase tracking-widest transition-all duration-500",
                    isGenerating 
                      ? "bg-orange-500/20 text-orange-400 border-orange-500/30 animate-pulse" 
                      : "bg-violet-500/10 text-violet-400 border-violet-500/20"
                  )}>
                    {isGenerating ? "AI Architect Compiling..." : "Live Sync Active"}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => window.location.reload()}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <SandpackLayout className="flex-1 border-none rounded-none bg-transparent overflow-hidden">
                <div className="flex-1 flex overflow-hidden h-full">
                  <div className="w-[45%] border-r border-white/5 flex flex-col overflow-hidden bg-slate-950">
                    <SandpackCodeEditor 
                      showTabs={false}
                      showLineNumbers={true}
                      showInlineErrors={true}
                      wrapContent={true}
                      closableTabs={false}
                      className="h-full font-mono text-[11px]"
                    />
                    {/* Terminal Bottom Area */}
                    <div className="h-24 border-t border-white/5 bg-black/40 p-4 font-mono text-[10px] text-emerald-500/60">
                      <div className="flex items-center gap-2 mb-2 text-white/20">
                        <Terminal className="w-3 h-3" />
                        <span className="font-black uppercase tracking-widest text-[8px]">Output Console</span>
                      </div>
                      <div className="opacity-80">$ vixluxia-ai compile --target=preview</div>
                      <div className="opacity-40">Ready to render...</div>
                      {isGenerating && <div className="animate-pulse">_ Compiling generated module...</div>}
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-900/50 flex items-center justify-center p-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/5 via-transparent to-transparent pointer-events-none" />
                    <div className={cn(
                      "bg-white shadow-[0_30px_100px_rgba(0,0,0,0.5)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
                      viewMode === 'desktop' ? "w-full h-full rounded-2xl" : "w-[320px] h-[568px] rounded-[40px] border-[10px] border-slate-800"
                    )}>
                      <SandpackPreview 
                        showNavigator={false}
                        showOpenInCodeSandbox={false}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                </div>
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </div>
      </PremiumGate>
    </PageShell>
  );
}
