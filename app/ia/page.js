'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Bot, Code2, Loader2, MessageSquareText, Sparkles, Wand2 } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { PremiumGate } from '@/components/platform/premium-gate';
import { MetricCard } from '@/components/platform/metric-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const PAID_PLANS = ['pro', 'studio', 'paid', 'active'];

export default function IaPage() {
  const [plan, setPlan] = useState('free');
  const [prompt, setPrompt] = useState('Cree une card pricing animee pour un SaaS moderne.');
  const [model, setModel] = useState('component');
  const [loading, setLoading] = useState(false);
  const [serverPremium, setServerPremium] = useState(false);
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState([]);

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

  const generate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-vixluxia-plan': plan,
        },
        body: JSON.stringify({
          prompt,
          mode: model,
          maxTokens: 1000,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Generation impossible');
      setOutput(data.content || '');
      setHistory((items) => [
        { id: Date.now(), prompt, output: data.content || '', model: data.model },
        ...items.slice(0, 4),
      ]);
      toast.success('Generation terminee');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="IA" maxWidth="max-w-[1180px]">
      <PremiumGate allowed={isPaid}>
        <div className="space-y-8">
          <section className="rounded-lg border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur lg:p-8">
            <Badge variant="outline" className="mb-4 gap-2">
              <Bot className="h-3.5 w-3.5" />
              Plan {plan}
            </Badge>
            <h1 className="text-3xl font-black tracking-tight lg:text-4xl">Assistant IA VixLuxia</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Genere des prompts, blocs React et variantes UI pour les abonnes payants. L interface est prete pour
              etre reliee a un endpoint IA serveur.
            </p>
          </section>

          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard icon={Sparkles} label="Mode" value="Premium" detail="Acces limite aux abonnes actifs." tone="violet" />
            <MetricCard icon={Code2} label="Sortie" value="React" detail="Prompts et composants Tailwind." tone="emerald" delay={0.05} />
            <MetricCard icon={MessageSquareText} label="Historique" value="A coder" detail="Sauvegarde des generations." tone="amber" delay={0.1} />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
            <Card className="rounded-lg border-border/50 bg-card/80 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-bold">Prompt</h2>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="h-9 w-[180px]">
                    <SelectValue placeholder="Modele" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="component">Component</SelectItem>
                    <SelectItem value="prompt">Prompt</SelectItem>
                    <SelectItem value="code-review">Code review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="mt-4 min-h-[180px] resize-none"
                placeholder="Decris le composant a generer..."
              />
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">Le controle serveur devra revifier l abonnement avant generation.</p>
                <Button className="rounded-md" onClick={generate} disabled={loading || !prompt.trim()}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                  Generer
                </Button>
              </div>
            </Card>

            <Card className="rounded-lg border-border/50 bg-neutral-950 p-5 text-neutral-50">
              <h2 className="text-sm font-bold">Apercu de sortie</h2>
              <div className="mt-4 rounded-md border border-white/10 bg-white/[0.03] p-4">
                <pre className="whitespace-pre-wrap text-xs leading-6 text-neutral-300">
{output || `La reponse NVIDIA NIM apparaitra ici.

Configure:
NVIDIA_NIM_BASE_URL=http://127.0.0.1:8000/v1
NVIDIA_NIM_MODEL=nvidia/nemotron-3-super-120b-a12b`}
                </pre>
              </div>
            </Card>
          </div>

          <Card className="rounded-lg border-border/50 bg-card/80 p-5">
            <h2 className="text-sm font-bold">Historique local</h2>
            <div className="mt-4 space-y-3">
              {history.length === 0 && (
                <p className="text-xs text-muted-foreground">Aucune generation dans cette session.</p>
              )}
              {history.map((item) => (
                <div key={item.id} className="rounded-md border border-border/50 bg-background p-3">
                  <p className="text-xs font-semibold">{item.prompt}</p>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-muted-foreground">{item.output}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </PremiumGate>
    </PageShell>
  );
}
