'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BookOpen, Code2, Copy, Database, KeyRound, Server, ShieldCheck, Plus, Trash2, Loader2, Sparkles, TerminalSquare, LayoutDashboard, FileCode, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/animate-in';
import { MetricCard } from '@/components/platform/metric-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CodeBlock } from '@/components/code-block';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';

const ENDPOINTS = [
  { method: 'GET', path: '/api/v1/components?q=button', title: 'Recherche de composants', description: 'Recherchez parmi la bibliothèque de composants VixLuxia avec des filtres avancés.' },
  { method: 'POST', path: '/api/v1/api-keys', title: 'Gestion des Clés API', description: 'Créez ou révoquez des clés d\'accès programmatiques sécurisées.' },
  { method: 'POST', path: '/api/ai/generate', title: 'Génération IA', description: 'Invoquez le moteur IA pour générer ou modifier des composants (Nécessite Premium).' },
  { method: 'POST', path: '/api/teams/join', title: 'Rejoindre une Team', description: 'Système d\'affiliation sécurisé avec protection IP et attribution de récompense.' },
];

const CURL_SAMPLE = `curl -X GET "$BASE_URL/api/v1/components?category=buttons" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`;

export default function ApiUnifiedPage() {
  const [baseUrl, setBaseUrl] = useState('https://vixluxia.com');
  const { user } = useAuth();
  
  const [name, setName] = useState('Production key');
  const [createdKey, setCreatedKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState([]);
  const [loadingKeys, setLoadingKeys] = useState(true);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  const loadKeys = async () => {
    if (!user) return;
    setLoadingKeys(true);
    try {
      const { data, error } = await supabase.from('api_keys').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      if (error) throw error;
      setKeys(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingKeys(false);
    }
  };

  useEffect(() => {
    if (user) loadKeys();
  }, [user]);

  const createKey = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/api-keys', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Erreur API');
      setCreatedKey(data.key);
      toast.success('Clé API créée');
      loadKeys();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteKey = async (id) => {
    try {
      const { error } = await supabase.from('api_keys').delete().eq('id', id);
      if (error) throw error;
      toast.success('Clé révoquée');
      loadKeys();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <PageShell title="API Platform" maxWidth="max-w-[1200px]">
      <div className="space-y-12 pb-24">
        {/* Header Hero */}
        <section className="relative overflow-hidden rounded-[32px] border border-border/50 bg-card p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/20 to-cyan-400/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
          <AnimateIn variant="fadeUp">
            <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-6 gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border-none font-bold text-[10px] uppercase tracking-widest">
                  <TerminalSquare className="h-4 w-4" /> Plateforme Développeur
                </Badge>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
                  API <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Developer Hub</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                  Gérez vos clés d'accès et consultez la documentation technique en un seul endroit.
                </p>
              </div>
              <div className="flex shrink-0">
                <Button variant="outline" className="rounded-2xl h-12 px-6 bg-background/50 backdrop-blur-md shadow-sm border-border/50 hover:bg-muted font-bold" onClick={() => {
                  navigator.clipboard.writeText(baseUrl);
                  toast.success('URL Base copiée !');
                }}>
                  <Copy className="h-4 w-4 mr-2" /> {baseUrl}
                </Button>
              </div>
            </div>
          </AnimateIn>
        </section>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="w-full justify-start border-b border-border/20 bg-transparent rounded-none h-14 p-0 mb-8 overflow-x-auto gap-8">
            <TabsTrigger value="dashboard" className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 h-full font-black text-sm tracking-tight flex gap-2">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="docs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-2 h-full font-black text-sm tracking-tight flex gap-2">
              <FileCode className="w-4 h-4" /> API Docs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8 m-0 outline-none">
            {user ? (
              <div className="grid gap-6 lg:grid-cols-12">
                {/* Création Clé */}
                <div className="lg:col-span-5 space-y-6">
                  <Card className="rounded-3xl border-border/50 bg-card/40 backdrop-blur-sm p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <KeyRound className="w-5 h-5 text-emerald-500" />
                      </div>
                      <h2 className="text-xl font-black tracking-tight">Nouvelle Clé API</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="key-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 ml-1">Nom de la clé</Label>
                        <Input id="key-name" value={name} onChange={(event) => setName(event.target.value)} className="h-12 rounded-2xl bg-background/50 border-border/50" placeholder="ex: Production" />
                      </div>
                      <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 hover:from-emerald-600 hover:to-cyan-500 text-white font-black shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]" onClick={createKey} disabled={loading}>
                        {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                        Générer la clé
                      </Button>
                    </div>
                  </Card>

                  {createdKey && (
                    <Card className="rounded-3xl border-emerald-500/50 bg-emerald-500/5 p-6 border-2 relative overflow-hidden animate-in fade-in zoom-in duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 animate-pulse" />
                      <div className="relative z-10">
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <h2 className="font-black text-emerald-400 flex items-center gap-2 tracking-tight">
                              <Sparkles className="w-4 h-4" /> Clé Secrète
                            </h2>
                            <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">Copiez-la maintenant !</p>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-xl bg-background/80 font-bold" onClick={() => {
                            navigator.clipboard.writeText(createdKey);
                            toast.success('Clé copiée !');
                          }}>
                            <Copy className="h-3.5 w-3.5 mr-2" /> Copier
                          </Button>
                        </div>
                        <div className="bg-black/50 p-4 rounded-2xl font-mono text-xs text-emerald-300 break-all border border-emerald-500/20">
                          {createdKey}
                        </div>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Liste des Clés */}
                <div className="lg:col-span-7">
                  <Card className="rounded-3xl border-border/50 bg-card/40 backdrop-blur-sm p-8 shadow-xl h-full flex flex-col min-h-[400px]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Server className="w-5 h-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-black tracking-tight">Clés Actives</h2>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2">
                      {loadingKeys ? (
                        <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-primary/50" /></div>
                      ) : keys.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border/20 rounded-3xl bg-muted/5">
                          <KeyRound className="w-12 h-12 text-muted-foreground/20 mb-4" />
                          <p className="text-muted-foreground font-bold tracking-tight">Aucune clé API active.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {keys.map((key) => (
                            <div key={key.id} className="group flex items-center justify-between p-4 border border-border/40 rounded-2xl bg-background/40 hover:bg-muted/30 transition-all duration-200">
                              <div>
                                <h3 className="font-black text-sm tracking-tight">{key.name}</h3>
                                <div className="flex items-center gap-3 mt-1.5">
                                  <code className="text-[10px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded font-mono">{key.key_prefix}••••••••••••</code>
                                  <span className="text-[9px] text-muted-foreground/50 font-black uppercase tracking-widest">{new Date(key.created_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-red-400 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all" onClick={() => deleteKey(key.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="rounded-[32px] border-border/50 bg-card p-12 text-center shadow-xl">
                <ShieldCheck className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
                <h2 className="text-2xl font-black tracking-tight mb-2">Authentification requise</h2>
                <p className="text-muted-foreground font-medium mb-8">Connectez-vous pour accéder à votre dashboard développeur.</p>
                <Button className="rounded-full px-8 h-12 font-bold bg-primary text-primary-foreground">Se connecter</Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="docs" className="space-y-8 m-0 outline-none">
            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard icon={Code2} label="Endpoints" value={ENDPOINTS.length} detail="Routes documentées." tone="violet" />
              <MetricCard icon={Database} label="Performance" value="< 50ms" detail="Latence moyenne." tone="emerald" delay={0.05} />
              <MetricCard icon={ShieldCheck} label="Sécurité" value="Bearer" detail="Auth par token." tone="amber" delay={0.1} />
            </div>

            <StaggerContainer className="grid md:grid-cols-2 gap-4" staggerDelay={0.05}>
              {ENDPOINTS.map((endpoint) => (
                <StaggerItem key={`${endpoint.method}-${endpoint.path}`}>
                  <Card className="p-6 rounded-3xl border-border/50 bg-card/40 hover:bg-card hover:shadow-2xl transition-all cursor-pointer group">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" className={cn(
                        "font-black text-[10px] px-2 py-0.5 border-none rounded-md",
                        endpoint.method === 'GET' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-violet-500/10 text-violet-500'
                      )}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-[11px] font-mono text-muted-foreground/70">{endpoint.path}</code>
                    </div>
                    <h3 className="font-black tracking-tight mb-2 group-hover:text-primary transition-colors">{endpoint.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{endpoint.description}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <Card className="rounded-[32px] border-border/50 bg-zinc-950 p-8 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-orange-400" />
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white/70" />
                  </div>
                  <h3 className="font-black text-white tracking-tight">Exemple d'Intégration (cURL)</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl font-bold" onClick={() => {
                  navigator.clipboard.writeText(CURL_SAMPLE);
                  toast.success('Copié !');
                }}>
                  <Copy className="w-4 h-4 mr-2" /> Copier
                </Button>
              </div>
              <CodeBlock code={CURL_SAMPLE} language="bash" className="bg-transparent border-none p-0 text-sm" />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}
