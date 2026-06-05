'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { toast } from 'sonner';
import { Bot, Code2, Loader2, Sparkles, Send, User, MonitorPlay, FileCode2 } from 'lucide-react';
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
    <PageShell title="IA" maxWidth="max-w-[1200px]">
      <PremiumGate allowed={isPaid}>
        <div className="space-y-6 h-[calc(100vh-120px)] flex flex-col">
          {/* Header Premium */}
          <section className="relative rounded-2xl border border-border/50 bg-card/50 p-8 shadow-sm backdrop-blur-sm shrink-0 overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-orange-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
              <div>
                <Badge variant="outline" className="mb-4 gap-2 bg-background/50 border-primary/20 text-primary">
                  <Bot className="h-3.5 w-3.5" />
                  Mode {plan.charAt(0).toUpperCase() + plan.slice(1)} Actif
                </Badge>
                <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-violet-400 to-orange-400 bg-clip-text text-transparent">VixLuxia AI Studio</h1>
                <p className="mt-2 text-muted-foreground text-sm max-w-md">Générez des composants React / Tailwind prêts pour la production, avec prévisualisation en temps réel de votre code.</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <MetricCard icon={Sparkles} label="Moteur" value="Gemini 1.5 Pro" tone="violet" />
                <MetricCard icon={Code2} label="Export" value="React + TSX" tone="emerald" />
              </div>
            </div>
          </section>

          {/* Chat Box */}
          <Card className="flex flex-col flex-1 rounded-2xl border-border/50 bg-card/60 overflow-hidden shadow-sm backdrop-blur-md">
            <div className="p-4 border-b border-border/50 bg-background/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-sm font-bold">Assistant Dev</h2>
              </div>
              <Select value={model} onValueChange={setModel} disabled={isLoading}>
                <SelectTrigger className="h-9 w-[180px] text-xs rounded-full bg-background border-border/50">
                  <SelectValue placeholder="Mode de génération" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="component">Composant UI</SelectItem>
                  <SelectItem value="page">Page Entière</SelectItem>
                  <SelectItem value="prompt">Affinage de Prompt</SelectItem>
                  <SelectItem value="code-review">Revue & Refactor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-90">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <Sparkles className="w-16 h-16 mb-6 text-primary relative z-10" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Que voulez-vous construire aujourd'hui ?</h3>
                  <p className="text-sm mb-8 text-center max-w-md">L'IA de VixLuxia est entraînée sur des milliers de composants modernes pour générer un code parfait.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
                    <Card className="p-5 cursor-pointer hover:bg-muted/80 hover:border-primary/50 transition-all group" onClick={() => handleInputChange({ target: { value: 'Créer un bouton de paiement avec un effet néon au survol et une icône panier en Tailwind CSS.' }})}>
                      <p className="text-sm font-bold flex items-center gap-2 group-hover:text-primary transition-colors"><MonitorPlay className="w-4 h-4" /> Bouton Néon de Paiement</p>
                      <p className="text-xs mt-2 opacity-70 leading-relaxed">Créer un bouton avec un effet néon au survol et intégration d'icônes.</p>
                    </Card>
                    <Card className="p-5 cursor-pointer hover:bg-muted/80 hover:border-primary/50 transition-all group" onClick={() => handleInputChange({ target: { value: 'Concevoir une section "Pricing" en mode sombre avec 3 cartes et le plan "Pro" mis en évidence avec un dégradé anim.' }})}>
                      <p className="text-sm font-bold flex items-center gap-2 group-hover:text-primary transition-colors"><Code2 className="w-4 h-4" /> Section Pricing Animée</p>
                      <p className="text-xs mt-2 opacity-70 leading-relaxed">Concevoir une page de tarification SaaS avec mise en évidence du plan Pro.</p>
                    </Card>
                  </div>
                </div>
              ) : (
                messages.map(m => (
                  <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'assistant' && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shrink-0 shadow-sm mt-1">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-3xl p-6 shadow-sm border border-border/50 backdrop-blur-md ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-card/90 rounded-bl-none'}`}>
                      {m.role === 'user' ? (
                        <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                      ) : (
                        <div className="text-sm prose dark:prose-invert max-w-none">
                          {m.content.split('```').map((part, index) => {
                            if (index % 2 === 1) {
                              const [lang, ...codeLines] = part.split('\n');
                              const code = codeLines.join('\n');
                              return (
                                <div key={index} className="my-6 rounded-xl overflow-hidden border border-border/50 bg-background shadow-lg">
                                  <Tabs defaultValue="preview">
                                    <div className="flex items-center justify-between px-2 py-1.5 border-b border-border/50 bg-muted/30">
                                      <TabsList className="h-8 bg-transparent">
                                        <TabsTrigger value="preview" className="text-[11px] h-6 px-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"><MonitorPlay className="w-3 h-3 mr-1.5" /> Aperçu Premium</TabsTrigger>
                                        <TabsTrigger value="code" className="text-[11px] h-6 px-3"><FileCode2 className="w-3 h-3 mr-1.5" /> Source ({lang || 'tsx'})</TabsTrigger>
                                      </TabsList>
                                      <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] text-muted-foreground hover:text-foreground" onClick={() => navigator.clipboard.writeText(code)}>Copier</Button>
                                    </div>
                                    <TabsContent value="preview" className="m-0 p-8 min-h-[200px] flex items-center justify-center bg-dot-pattern">
                                      {/* Mock Preview - In a real setup, we'd use react-live or an iframe to render code. Since we can't eval arbitrary complex React easily here, we show a clean placeholder or raw HTML if it's pure HTML */}
                                      {lang === 'html' ? (
                                        <div dangerouslySetInnerHTML={{ __html: code }} className="w-full" />
                                      ) : (
                                        <div className="text-center p-6 border border-dashed border-border/50 rounded-xl bg-background/50 backdrop-blur-sm">
                                          <MonitorPlay className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                                          <p className="text-sm font-medium">L'aperçu dynamique de composants React nécessite l'intégration VixLuxia Engine.</p>
                                          <p className="text-xs text-muted-foreground mt-1">Copiez le code pour l'utiliser dans votre projet.</p>
                                        </div>
                                      )}
                                    </TabsContent>
                                    <TabsContent value="code" className="m-0">
                                      <CodeBlock code={code} filename={`generated.${lang || 'tsx'}`} />
                                    </TabsContent>
                                  </Tabs>
                                </div>
                              );
                            }
                            return <p key={index} className="whitespace-pre-wrap leading-relaxed">{part}</p>;
                          })}
                        </div>
                      )}
                    </div>
                    {m.role === 'user' && (
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-sm border border-border/50 mt-1">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                ))
              )}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-4 justify-start">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-card/90 rounded-3xl rounded-bl-none p-5 flex items-center gap-2 border border-border/50 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-500/10 text-red-500 text-sm rounded-xl border border-red-500/20 text-center font-medium">
                  Une erreur est survenue: {error.message}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 md:p-6 bg-background/50 border-t border-border/50 backdrop-blur-xl">
              <form onSubmit={handleFormSubmit} className="relative max-w-4xl mx-auto flex items-end gap-3 bg-card rounded-3xl border border-border/50 p-2 shadow-sm focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Décrivez le composant que vous souhaitez générer..."
                  className="min-h-[44px] max-h-[200px] border-0 shadow-none focus-visible:ring-0 resize-none py-3 px-4 bg-transparent text-sm"
                  rows={1}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !input?.trim()} 
                  className="shrink-0 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground mb-1 mr-1"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                </Button>
              </form>
              <div className="text-center mt-3">
                <p className="text-[10px] text-muted-foreground opacity-70">
                  L'IA peut générer du code inexact. Vérifiez toujours le résultat avant utilisation en production.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </PremiumGate>
    </PageShell>
  );
}
