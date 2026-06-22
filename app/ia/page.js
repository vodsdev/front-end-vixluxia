'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { toast } from 'sonner';
import { Bot, Code2, Loader2, Sparkles, Send, User, MonitorPlay, FileCode2, Zap, Palette, ArrowRight, X, Maximize2, Terminal, FolderOpen, Play, Github, Share2, Globe, Lock, Unlock } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { PremiumGate } from '@/components/platform/premium-gate';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@ai-sdk/react';
import { CodeBlock } from '@/components/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const PAID_PLANS = ['pro', 'studio', 'paid', 'active', 'starter', 'enterprise'];

// Component for the Code Preview Iframe
function CodePreview({ code, lang }) {
  const [iframeKey, setIframeKey] = useState(0);
  const isReact = lang === 'tsx' || lang === 'jsx' || lang === 'javascript' || lang === 'typescript' || code.includes('import ') || code.includes('export ');

  const srcDoc = isReact ? `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
        <script src="https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js"></script>
        <style>
          body { margin: 0; padding: 1rem; min-height: 100vh; background-color: transparent; font-family: sans-serif; }
          * { box-sizing: border-box; }
          #root { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel" data-type="module">
          let rawCode = \`${code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
          rawCode = rawCode.replace(/import .*;?\\n/g, '');
          rawCode = rawCode.replace(/export default /g, '');
          rawCode = rawCode.replace(/export /g, '');
          
          try {
            const componentMatch = rawCode.match(/function\\s+([A-Z][a-zA-Z0-9_]*)/);
            const componentName = componentMatch ? componentMatch[1] : null;
            
            if (componentName) {
              const fullCode = rawCode + \`\\n\\nconst root = ReactDOM.createRoot(document.getElementById('root')); root.render(React.createElement(\${componentName}));\`;
              const compiled = Babel.transform(fullCode, { presets: ['react', 'env'] }).code;
              eval(compiled);
              lucide.createIcons();
            } else {
              document.getElementById('root').innerHTML = '<div style="color:#ef4444; font-weight:bold;">Composant non trouvé. Assurez-vous d\\'utiliser une fonction avec une majuscule.</div>';
            }
          } catch (e) {
            document.getElementById('root').innerHTML = '<div style="color:#ef4444; white-space:pre-wrap; font-family:monospace;">' + e.toString() + '</div>';
          }
        </script>
      </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>body { margin: 0; padding: 1rem; min-height: 100vh; background-color: transparent; }</style>
      </head>
      <body>${code}</body>
    </html>
  `;

  return (
    <div className="w-full h-full bg-muted/5 rounded-xl overflow-hidden flex flex-col border border-border/40">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Play className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Live Preview</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md" onClick={() => setIframeKey(k => k + 1)}>
          <Zap className="w-3 h-3" />
        </Button>
      </div>
      <iframe key={iframeKey} srcDoc={srcDoc} className="w-full h-full flex-1 bg-transparent" sandbox="allow-scripts allow-same-origin" />
    </div>
  );
}

export default function IaPremiumPage() {
  const [plan, setPlan] = useState('free');
  const [serverPremium, setServerPremium] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [isPublic, setIsPublic] = useState(true);
  const [localInput, setLocalInput] = useState('');
  const messagesEndRef = useRef(null);

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

  const isPaid = useMemo(() => serverPremium || PAID_PLANS.includes(String(plan).toLowerCase()), [plan, serverPremium]);

  const { messages, append, isLoading } = useChat({
    api: '/api/ai/generate',
    body: { mode: 'bolt-architect' },
    onError: (err) => toast.error(err.message)
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant');
  const extractedCode = lastAssistantMessage?.content.match(/```(?:tsx|jsx|html|javascript|typescript)?\n([\s\S]*?)```/)?.[1] || '';

  const handleSend = (e) => {
    e?.preventDefault();
    if (!localInput.trim() || isLoading) return;
    append({ role: 'user', content: localInput });
    setLocalInput('');
  };

  return (
    <PageShell title="IA Premium Studio" maxWidth="max-w-full">
      <PremiumGate allowed={isPaid}>
        <div className="flex flex-col lg:flex-row h-[calc(100vh-180px)] gap-4 pb-4">
          
          {/* Left Side: Chat Interface */}
          <Card className="w-full lg:w-[450px] flex flex-col rounded-[24px] border-border/40 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden shrink-0">
            <div className="p-4 border-b border-border/40 bg-muted/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-black tracking-tight">VixLuxia AI</h2>
                  <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Active Studio</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsPublic(!isPublic)}>
                  {isPublic ? <Globe className="w-4 h-4 text-violet-500" /> : <Lock className="w-4 h-4 text-orange-500" />}
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <Sparkles className="w-12 h-12 text-primary/20 mb-6" />
                  <h3 className="text-xl font-black mb-2 tracking-tight">What are we building today?</h3>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    I can generate components, pages, or entire web architectures. Just describe your vision.
                  </p>
                </div>
              ) : (
                messages.map(m => (
                  <div key={m.id} className={cn("flex flex-col gap-2", m.role === 'user' ? "items-end" : "items-start")}>
                    <div className={cn(
                      "max-w-[90%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm border",
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

            <div className="p-4 border-t border-border/40 bg-muted/5">
              <form onSubmit={handleSend} className="relative">
                <Textarea 
                  value={localInput}
                  onChange={e => setLocalInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend(e)}
                  placeholder="Ask VixLuxia to build something..."
                  className="min-h-[100px] w-full rounded-2xl bg-background/50 border-border/40 p-4 pr-12 text-sm font-medium focus-visible:ring-violet-500/30 resize-none"
                />
                <Button 
                  type="submit" 
                  disabled={!localInput.trim() || isLoading}
                  size="icon" 
                  className="absolute bottom-3 right-3 h-8 w-8 rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-lg"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
            </div>
          </Card>

          {/* Right Side: Code & Preview (Bolt Style) */}
          <div className="flex-1 flex flex-col gap-4">
            <Card className="flex-1 rounded-[24px] border-border/40 bg-card/20 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-6 py-3 bg-muted/10 border-b border-border/40">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-bold text-muted-foreground">project-vixluxia</span>
                  </div>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                    <TabsList className="bg-muted/20 h-9 p-1 rounded-lg border border-border/40">
                      <TabsTrigger value="preview" className="rounded-md h-7 px-4 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary">Preview</TabsTrigger>
                      <TabsTrigger value="code" className="rounded-md h-7 px-4 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-primary">Code</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" className="h-8 rounded-lg bg-background/50 border-border/40 text-[10px] font-black uppercase tracking-widest gap-2">
                    <Github className="w-3.5 h-3.5" /> Export
                  </Button>
                  <Button size="sm" className="h-8 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-[10px] font-black uppercase tracking-widest gap-2 shadow-lg shadow-violet-500/20">
                    <Share2 className="w-3.5 h-3.5" /> Deploy
                  </Button>
                </div>
              </div>

              <div className="flex-1 p-4 relative overflow-hidden">
                {activeTab === 'preview' ? (
                  extractedCode ? (
                    <CodePreview code={extractedCode} lang="tsx" />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center bg-muted/5 rounded-xl border border-dashed border-border/40">
                      <MonitorPlay className="w-12 h-12 text-muted-foreground/20 mb-4" />
                      <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">Waiting for code generation...</p>
                    </div>
                  )
                ) : (
                  <div className="h-full rounded-xl overflow-hidden border border-border/40 bg-zinc-950 shadow-2xl">
                    <CodeBlock 
                      code={extractedCode || "// No code generated yet..."} 
                      language="tsx" 
                      className="h-full text-xs p-6" 
                    />
                  </div>
                )}
              </div>

              {/* Terminal Section */}
              <div className="h-32 border-t border-border/40 bg-zinc-950 p-4 font-mono text-[11px] text-emerald-500/80 overflow-y-auto">
                <div className="flex items-center gap-2 mb-2 text-white/40">
                  <Terminal className="w-3 h-3" />
                  <span className="font-bold uppercase tracking-widest text-[9px]">Terminal</span>
                </div>
                <div>$ npm install framer-motion lucide-react</div>
                <div className="text-white/20">Installing dependencies...</div>
                {isLoading && <div className="animate-pulse">_</div>}
              </div>
            </Card>
          </div>
        </div>
      </PremiumGate>
    </PageShell>
  );
}
