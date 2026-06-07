'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { toast } from 'sonner';
import { Bot, Code2, Loader2, Sparkles, Send, User, MonitorPlay, FileCode2, Zap, Palette, ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { PremiumGate } from '@/components/platform/premium-gate';
import { MetricCard } from '@/components/platform/metric-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@ai-sdk/react';
import { CodeBlock } from '@/components/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PAID_PLANS = ['pro', 'studio', 'paid', 'active', 'starter', 'enterprise'];

// Iframe Preview Component to render generated code
function CodePreview({ code, lang }) {
  const [iframeKey, setIframeKey] = useState(0);

  // If it's React/TSX, we inject babel standalone and react umd.
  // If it's HTML, we just inject tailwind.
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
        <style>
          body { margin: 0; padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: transparent; }
          * { box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div id="root" style="width: 100%;"></div>
        <script type="text/babel" data-type="module">
          // Strip imports/exports for simple preview
          let rawCode = \`${code.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
          rawCode = rawCode.replace(/import .*;?\\n/g, '');
          rawCode = rawCode.replace(/export default /g, '');
          rawCode = rawCode.replace(/export /g, '');
          
          try {
            // Find the main component name (assuming it's a function)
            const componentMatch = rawCode.match(/function\\s+([A-Z][a-zA-Z0-9_]*)/);
            const componentName = componentMatch ? componentMatch[1] : null;
            
            // Render it
            if (componentName) {
              const fullCode = rawCode + \`\\n\\nconst root = ReactDOM.createRoot(document.getElementById('root')); root.render(React.createElement(\${componentName}));\`;
              const compiled = Babel.transform(fullCode, { presets: ['react', 'env'] }).code;
              eval(compiled);
              lucide.createIcons();
            } else {
              document.getElementById('root').innerHTML = '<div style="color:red; font-family:sans-serif;">Impossible de trouver le composant principal à rendre.</div>';
            }
          } catch (e) {
            document.getElementById('root').innerHTML = '<div style="color:red; font-family:sans-serif; white-space:pre-wrap;">' + e.toString() + '</div>';
          }
        </script>
      </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { margin: 0; padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: transparent; }
        </style>
      </head>
      <body>
        ${code}
      </body>
    </html>
  `;

  return (
    <div className="w-full h-full min-h-[300px] relative bg-dot-pattern rounded-xl overflow-hidden border border-border/50 group flex flex-col">
      <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="secondary" size="sm" className="h-7 text-xs rounded-md shadow-lg" onClick={() => setIframeKey(k => k + 1)}>Rafraîchir</Button>
      </div>
      <iframe
        key={iframeKey}
        srcDoc={srcDoc}
        className="w-full h-full flex-1 border-0"
        sandbox="allow-scripts allow-same-origin"
        title="VixLuxia Preview"
      />
    </div>
  );
}

export default function IaPage() {
  const [plan, setPlan] = useState('free');
  const [model, setModel] = useState('component');
  const [serverPremium, setServerPremium] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedPlan = localStorage.getItem('vixluxia-plan') || 'free';
    setPlan(storedPlan);
    fetch('/api/account/subscription')
      .then((response) => response.json())
      .then((data) => {
        setServerPremium(!!data.isPremium);
        if (data.plan || data.status) setPlan(data.plan || data.status);
      })
      .catch(() => {});
  }, []);

  const isPaid = useMemo(() => serverPremium || PAID_PLANS.includes(String(plan).toLowerCase()), [plan, serverPremium]);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/ai/generate',
    body: { mode: model },
    headers: {
      'x-vixluxia-plan': plan,
    },
    onError: (err) => {
      toast.error(err.message || 'Erreur lors de la génération.');
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!input?.trim() || isLoading) return;
    handleSubmit(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e);
    }
  };

  return (
    <PageShell title="IA Premium" maxWidth="max-w-[1400px]">
      <PremiumGate allowed={isPaid}>
        <div className="space-y-6 flex flex-col pb-10">
          {/* Header Premium */}
          <section className="relative rounded-3xl border border-primary/20 bg-card/60 p-6 md:p-8 shadow-2xl shadow-primary/5 backdrop-blur-xl overflow-hidden shrink-0">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/20 to-orange-400/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
              <div>
                <Badge variant="outline" className="mb-4 gap-2 px-3 py-1 bg-gradient-to-r from-violet-500/10 to-orange-400/10 border-transparent text-foreground shadow-sm">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  <span className="font-bold">Privilège VixLuxia {plan.charAt(0).toUpperCase() + plan.slice(1)}</span>
                </Badge>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">Studio IA</span> de Génération
                </h1>
                <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed font-medium">
                  Concevez des composants UI, des sections ou des pages entières. Code prêt pour React & Tailwind avec aperçu natif instantané.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 w-full md:w-auto shrink-0">
                <MetricCard icon={Zap} label="Générations" value="Illimitées" detail="Lié à l'abonnement" tone="violet" />
                <MetricCard icon={Code2} label="Aperçu" value="Temps Réel" detail="Moteur natif" tone="emerald" />
              </div>
            </div>
          </section>

          {/* Chat Interface */}
          <Card className="flex flex-col rounded-3xl border-border/50 bg-card/60 overflow-hidden shadow-2xl backdrop-blur-md relative h-[600px] md:h-[800px]">
            {/* Toolbar */}
            <div className="p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm flex flex-col md:flex-row justify-between md:items-center gap-4 z-10 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-black">Assistant Architecte UI</h2>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Connecté au réseau</p>
                </div>
              </div>
              <Select value={model} onValueChange={setModel} disabled={isLoading}>
                <SelectTrigger className="h-10 w-[200px] text-sm rounded-xl font-bold bg-muted/50 border-transparent hover:bg-muted focus:ring-primary/30">
                  <SelectValue placeholder="Mode de génération" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-border/50 shadow-xl">
                  <SelectItem value="component" className="font-medium cursor-pointer"><div className="flex items-center gap-2"><Palette className="w-4 h-4 text-violet-500" /> Composant UI Isolé</div></SelectItem>
                  <SelectItem value="page" className="font-medium cursor-pointer"><div className="flex items-center gap-2"><MonitorPlay className="w-4 h-4 text-orange-500" /> Page Complète</div></SelectItem>
                  <SelectItem value="code-review" className="font-medium cursor-pointer"><div className="flex items-center gap-2"><Code2 className="w-4 h-4 text-emerald-500" /> Revue de Code Tailwind</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 scroll-smooth relative z-0">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/10 to-orange-400/10 flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                    <Sparkles className="w-10 h-10 text-primary relative z-10" />
                  </div>
                  <h3 className="text-3xl font-black mb-4">Votre Toile Vierge</h3>
                  <p className="text-muted-foreground text-lg mb-12 max-w-2xl leading-relaxed">
                    Décrivez ce que vous souhaitez accomplir. L'IA générera le code React/Tailwind complet et vous offrira un aperçu visuel instantané.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                    <Card 
                      className="p-6 cursor-pointer rounded-2xl border-border/50 bg-background/50 hover:bg-muted hover:border-primary/50 hover:shadow-xl transition-all group text-left" 
                      onClick={() => handleInputChange({ target: { value: 'Créer un bouton de paiement avec un effet néon au survol et une icône panier en Tailwind CSS.' }})}
                    >
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <MonitorPlay className="w-5 h-5 text-violet-500" />
                      </div>
                      <p className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Bouton Néon de Paiement</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">Générez un bouton moderne avec des effets de lueur et des micro-interactions au survol.</p>
                      <div className="mt-4 flex items-center text-xs font-bold text-violet-500 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Essayer <ArrowRight className="w-3 h-3" />
                      </div>
                    </Card>
                    <Card 
                      className="p-6 cursor-pointer rounded-2xl border-border/50 bg-background/50 hover:bg-muted hover:border-primary/50 hover:shadow-xl transition-all group text-left" 
                      onClick={() => handleInputChange({ target: { value: 'Concevoir une section "Pricing" en mode sombre avec 3 cartes et le plan "Pro" mis en évidence avec un dégradé animé.' }})}
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Code2 className="w-5 h-5 text-orange-500" />
                      </div>
                      <p className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Section Pricing Animée</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">Concevoir une page de tarification SaaS complète avec mise en évidence du plan Pro.</p>
                      <div className="mt-4 flex items-center text-xs font-bold text-orange-500 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Essayer <ArrowRight className="w-3 h-3" />
                      </div>
                    </Card>
                  </div>
                </div>
              ) : (
                messages.map(m => (
                  <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'assistant' && (
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shrink-0 shadow-lg mt-1">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-3xl p-6 shadow-md border backdrop-blur-md ${m.role === 'user' ? 'bg-primary text-primary-foreground border-primary rounded-br-none' : 'bg-background/80 border-border/50 rounded-bl-none'}`}>
                      {m.role === 'user' ? (
                        <p className="text-base font-medium whitespace-pre-wrap leading-relaxed">{m.content}</p>
                      ) : (
                        <div className="text-base prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:my-0">
                          {m.content.split('```').map((part, index) => {
                            if (index % 2 === 1) {
                              const [lang, ...codeLines] = part.split('\n');
                              const code = codeLines.join('\n');
                              return (
                                <div key={index} className="my-8 rounded-2xl overflow-hidden border border-border bg-card shadow-2xl">
                                  <Tabs defaultValue="preview" className="w-full">
                                    <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/50">
                                      <TabsList className="h-10 bg-transparent gap-2">
                                        <TabsTrigger value="preview" className="text-xs font-bold rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm">
                                          <MonitorPlay className="w-4 h-4 mr-2" /> Aperçu Premium
                                        </TabsTrigger>
                                        <TabsTrigger value="code" className="text-xs font-bold rounded-xl data-[state=active]:bg-card shadow-sm border border-transparent data-[state=active]:border-border/50">
                                          <FileCode2 className="w-4 h-4 mr-2" /> Code ({lang || 'tsx'})
                                        </TabsTrigger>
                                      </TabsList>
                                      <Button variant="ghost" size="sm" className="h-8 rounded-lg font-bold" onClick={() => {
                                        navigator.clipboard.writeText(code);
                                        toast.success('Code copié !');
                                      }}>
                                        Copier le code
                                      </Button>
                                    </div>
                                    <TabsContent value="preview" className="m-0 bg-background">
                                      <CodePreview code={code} lang={lang?.trim()} />
                                    </TabsContent>
                                    <TabsContent value="code" className="m-0">
                                      <CodeBlock code={code} filename={`vixluxia-generated.${lang || 'tsx'}`} />
                                    </TabsContent>
                                  </Tabs>
                                </div>
                              );
                            }
                            return <p key={index} className="whitespace-pre-wrap">{part}</p>;
                          })}
                        </div>
                      )}
                    </div>
                    {m.role === 'user' && (
                      <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center shrink-0 shadow-sm border border-border mt-1">
                        <User className="w-6 h-6 text-foreground" />
                      </div>
                    )}
                  </div>
                ))
              )}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-4 justify-start">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shrink-0 shadow-lg mt-1">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="bg-background/80 rounded-3xl rounded-bl-none p-6 flex items-center gap-3 border border-border/50 shadow-md">
                    <div className="w-3 h-3 rounded-full bg-primary animate-bounce shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                    <div className="w-3 h-3 rounded-full bg-primary animate-bounce shadow-[0_0_10px_rgba(var(--primary),0.5)]" style={{ animationDelay: '0.2s' }} />
                    <div className="w-3 h-3 rounded-full bg-primary animate-bounce shadow-[0_0_10px_rgba(var(--primary),0.5)]" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-500/10 text-red-500 text-sm rounded-2xl border border-red-500/20 text-center font-bold">
                  Une erreur est survenue: {error.message}
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Form */}
            <div className="p-6 bg-background/80 border-t border-border/50 backdrop-blur-xl relative z-10">
              <form onSubmit={handleFormSubmit} className="relative max-w-5xl mx-auto flex items-end gap-4 bg-card rounded-3xl border-2 border-border/50 p-2 shadow-xl focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Demandez un bouton de paiement animé, une section pricing sombre, ou un tableau de bord complet..."
                  className="min-h-[56px] max-h-[300px] border-0 shadow-none focus-visible:ring-0 resize-none py-4 px-6 bg-transparent text-base font-medium placeholder:text-muted-foreground/60"
                  rows={1}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !input?.trim()} 
                  className="shrink-0 h-14 w-14 rounded-2xl bg-gradient-to-r from-violet-500 to-orange-400 hover:opacity-90 text-white shadow-lg shadow-orange-500/20 mb-1 mr-1 disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
                >
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6 ml-1" />}
                </Button>
              </form>
              <div className="text-center mt-4">
                <p className="text-xs font-bold text-muted-foreground/50 uppercase tracking-wider">
                  Le code généré est la propriété de votre compte • VixLuxia Engine v2.0
                </p>
              </div>
            </div>
          </Card>
        </div>
      </PremiumGate>
    </PageShell>
  );
}
