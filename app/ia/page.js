'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { toast } from 'sonner';
import { Bot, Code2, Loader2, Sparkles, Send, User } from 'lucide-react';
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
    <PageShell title="IA" maxWidth="max-w-[1180px]">
      <PremiumGate allowed={isPaid}>
        <div className="space-y-8 h-[calc(100vh-140px)] flex flex-col">
          <section className="rounded-lg border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="outline" className="mb-4 gap-2">
                  <Bot className="h-3.5 w-3.5" />
                  Plan {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </Badge>
                <h1 className="text-3xl font-black tracking-tight">Assistant IA VixLuxia</h1>
              </div>
              <div className="hidden md:flex gap-4">
                <MetricCard icon={Sparkles} label="Modèle" value="Gemini 1.5 Pro" tone="violet" />
                <MetricCard icon={Code2} label="Sortie" value="React / UI" tone="emerald" />
              </div>
            </div>
          </section>

          <Card className="flex flex-col flex-1 rounded-lg border-border/50 bg-card/80 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-border/50 bg-muted/20 flex justify-between items-center">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" /> Chat IA
              </h2>
              <Select value={model} onValueChange={setModel} disabled={isLoading}>
                <SelectTrigger className="h-8 w-[150px] text-xs">
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="component">Composant UI</SelectItem>
                  <SelectItem value="prompt">Générateur de Prompt</SelectItem>
                  <SelectItem value="code-review">Revue de Code</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-70">
                  <Sparkles className="w-12 h-12 mb-4 text-primary/40" />
                  <p className="text-sm font-medium">Posez une question ou demandez un composant.</p>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
                    <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleInputChange({ target: { value: 'Créer un bouton avec un effet néon au survol en Tailwind CSS.' }})}>
                      <p className="text-xs font-medium">Bouton Néon</p>
                      <p className="text-xs mt-1 opacity-70">Créer un bouton avec un effet néon au survol...</p>
                    </Card>
                    <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleInputChange({ target: { value: 'Concevoir une page de tarification pour un SaaS B2B.' }})}>
                      <p className="text-xs font-medium">Page Pricing SaaS</p>
                      <p className="text-xs mt-1 opacity-70">Concevoir une page de tarification pour un SaaS...</p>
                    </Card>
                  </div>
                </div>
              ) : (
                messages.map(m => (
                  <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl p-4 ${m.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted/50 rounded-bl-none'}`}>
                      {m.role === 'user' ? (
                        <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                      ) : (
                        <div className="text-sm prose dark:prose-invert max-w-none">
                          {m.content.split('```').map((part, index) => {
                            if (index % 2 === 1) {
                              const [lang, ...codeLines] = part.split('\n');
                              const code = codeLines.join('\n');
                              return <CodeBlock key={index} code={code} filename={`code.${lang || 'txt'}`} />;
                            }
                            return <p key={index} className="whitespace-pre-wrap leading-relaxed">{part}</p>;
                          })}
                        </div>
                      )}
                    </div>
                    {m.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))
              )}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-4 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted/50 rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-500/10 text-red-500 text-sm rounded-lg border border-red-500/20">
                  Une erreur est survenue: {error.message}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-background border-t border-border/50">
              <form onSubmit={handleFormSubmit} className="relative max-w-4xl mx-auto flex gap-2">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Écrivez votre message..."
                  className="min-h-[50px] max-h-[200px] pr-12 py-3 resize-none bg-muted/30 focus-visible:ring-1"
                  rows={1}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading || !input?.trim()} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
              <div className="text-center mt-2">
                <p className="text-[10px] text-muted-foreground opacity-70">
                  L'IA peut faire des erreurs. Vérifiez toujours le code généré.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </PremiumGate>
    </PageShell>
  );
}
