'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight, BookOpen, Code2, Copy, Database, KeyRound, Server, ShieldCheck, Plus, Trash2, Loader2 } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/animate-in';
import { ApiEndpointCard } from '@/components/platform/api-endpoint-card';
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
import { useRouter } from 'next/navigation';
import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/animate-in';
import { ApiEndpointCard } from '@/components/platform/api-endpoint-card';
import { MetricCard } from '@/components/platform/metric-card';

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/health',
    title: 'Verifier le statut',
    description: 'Retourne un objet simple pour confirmer que le backend VixLuxia repond.',
  },
  {
    method: 'GET',
    path: '/api/v1/components?q=button&category=buttons',
    title: 'Explorer les composants',
    description: 'Retourne les composants enrichis avec auteurs, stats, tags, premium et metadonnees.',
  },
  {
    method: 'POST',
    path: '/api/v1/api-keys',
    title: 'Creer une cle API',
    description: 'Genere une cle API, la hashe et la stocke pour l utilisateur connecte.',
  },
  {
    method: 'POST',
    path: '/api/stripe/checkout',
    title: 'Lancer Stripe Checkout',
    description: 'Cree une session Stripe pour Starter, Pro ou Enterprise.',
  },
  {
    method: 'POST',
    path: '/api/stripe/webhook',
    title: 'Recevoir les webhooks Stripe',
    description: 'Met a jour les abonnements et convertit les affiliations apres paiement.',
  },
  {
    method: 'POST',
    path: '/api/ai/generate',
    title: 'Generer avec NVIDIA NIM',
    description: 'Appelle le NIM local ou cloud apres verification de l abonnement premium.',
  },
  {
    method: 'POST',
    path: '/api/referrals/track',
    title: 'Tracker une affiliation',
    description: 'Sauvegarde le code referral dans un cookie et prepare la conversion Stripe.',
  },
  {
    method: 'POST',
    path: '/api/bookmarks/enrich',
    title: 'Enrichir une URL',
    description: 'Recupere les metadonnees utiles d une URL: titre, description, image, domaine et type.',
  },
  {
    method: 'GET',
    path: '/api/bookmarks?workspaceId=default&q=react',
    title: 'Lister les favoris',
    description: 'Filtre les favoris par workspace, recherche texte ou tag.',
  },
  {
    method: 'POST',
    path: '/api/bookmarks',
    title: 'Creer un favori',
    description: 'Ajoute une ressource au registre avec enrichissement automatique si necessaire.',
  },
  {
    method: 'PATCH',
    path: '/api/bookmarks/:id',
    title: 'Modifier un favori',
    description: 'Met a jour le titre, les tags, le statut, la priorite ou le workspace.',
  },
  {
    method: 'DELETE',
    path: '/api/bookmarks/:id',
    title: 'Supprimer un favori',
    description: 'Supprime un favori par son identifiant public.',
  },
  {
    method: 'GET',
    path: '/api/workspaces',
    title: 'Lister les workspaces',
    description: 'Retourne les espaces de travail disponibles et cree un jeu initial si besoin.',
  },
  {
    method: 'GET',
    path: '/api/tags',
    title: 'Lister les tags',
    description: 'Agrege les tags utilises dans les favoris avec leur nombre d occurrences.',
  },
];

const CURL_SAMPLE = `curl -X POST "$BASE_URL/api/bookmarks/enrich" \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://github.com/vercel/next.js"}'`;

export default function ApiPage() {
  const [baseUrl, setBaseUrl] = useState('https://vixluxia.com');
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
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
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setKeys(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des clés:', error);
      toast.error('Impossible de charger vos clés API');
    } finally {
      setLoadingKeys(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadKeys();
    }
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
      if (!response.ok) throw new Error(data.error || 'Impossible de creer la cle');
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
      toast.success('Clé supprimée');
      loadKeys();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const copyBaseUrl = async () => {
    await navigator.clipboard.writeText(baseUrl);
    toast.success('URL API copiee');
  };

  return (
    <PageShell title="API" maxWidth="max-w-[1180px]">
      <div className="space-y-8">
        <AnimateIn variant="fadeUp">
          <section className="rounded-lg border border-border/50 bg-card/80 p-6 shadow-sm backdrop-blur lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-4 gap-2">
                  <Server className="h-3.5 w-3.5" />
                  Developer platform
                </Badge>
                <h1 className="text-3xl font-black tracking-tight lg:text-4xl">API VixLuxia</h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Une page propre pour documenter les routes existantes, montrer des exemples et preparer les cles
                  API avant l ouverture publique.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="outline" className="rounded-md" onClick={copyBaseUrl}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copier base URL
                </Button>
              </div>
            </div>
          </section>
        </AnimateIn>

        {user && (
          <AnimateIn variant="fadeUp">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <Card className="rounded-lg border-border/50 bg-card/80 p-5">
                  <div className="space-y-2">
                    <Label htmlFor="key-name">Nom de la clé</Label>
                    <Input id="key-name" value={name} onChange={(event) => setName(event.target.value)} />
                  </div>
                  <Button className="mt-4 rounded-md w-full" onClick={createKey} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                    {loading ? 'Création...' : 'Générer une nouvelle clé'}
                  </Button>
                </Card>

                {createdKey && (
                  <Card className="rounded-lg border-primary/50 bg-primary/5 p-5 border-2">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-bold text-primary">Nouvelle clé</h2>
                        <p className="mt-1 text-xs text-muted-foreground">Copie-la maintenant.</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-md" onClick={() => {
                        navigator.clipboard.writeText(createdKey);
                        toast.success('Clé copiée');
                      }}>
                        <Copy className="h-3 w-3 mr-2" /> Copier
                      </Button>
                    </div>
                    <CodeBlock code={createdKey} filename="api-key" />
                  </Card>
                )}
              </div>

              <Card className="rounded-lg border-border/50 bg-card/80 p-5 h-[240px] overflow-y-auto">
                <h2 className="text-sm font-bold mb-4">Vos clés actives</h2>
                {loadingKeys ? (
                  <div className="py-4 flex justify-center"><Loader2 className="animate-spin w-5 h-5 text-muted-foreground" /></div>
                ) : keys.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-4 text-center">Aucune clé API.</p>
                ) : (
                  <div className="space-y-3">
                    {keys.map((key) => (
                      <div key={key.id} className="flex items-center justify-between p-3 border rounded-lg bg-background/50">
                        <div>
                          <h3 className="font-medium text-xs">{key.name}</h3>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                            <code>{key.key_prefix}...</code>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => deleteKey(key.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </AnimateIn>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard icon={Code2} label="Endpoints" value={ENDPOINTS.length} detail="Routes principales deja referencees." tone="violet" />
          <MetricCard icon={Database} label="Donnees" value="MongoDB" detail="Bookmarks, workspaces et tags." tone="emerald" delay={0.05} />
          <MetricCard icon={ShieldCheck} label="Securite" value="A brancher" detail="Cles API et quotas restent a coder." tone="amber" delay={0.1} />
        </div>

        <Tabs defaultValue="endpoints" className="space-y-5">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="example">Exemple</TabsTrigger>
            <TabsTrigger value="access">Acces</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-3">
            <StaggerContainer className="space-y-3" staggerDelay={0.03}>
              {ENDPOINTS.map((endpoint, index) => (
                <StaggerItem key={`${endpoint.method}-${endpoint.path}`}>
                  <ApiEndpointCard {...endpoint} delay={index * 0.02} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </TabsContent>

          <TabsContent value="example">
            <Card className="rounded-lg border-border/50 bg-neutral-950 p-5 text-neutral-50">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-neutral-400" />
                  <span className="text-xs font-semibold text-neutral-300">Exemple cURL</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-neutral-300 hover:bg-white/10 hover:text-white"
                  onClick={() => {
                    navigator.clipboard.writeText(CURL_SAMPLE.replace('$BASE_URL', baseUrl));
                    toast.success('Exemple copie');
                  }}
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copier
                </Button>
              </div>
              <pre className="overflow-x-auto text-xs leading-6 text-neutral-200">
                <code>{CURL_SAMPLE.replace('$BASE_URL', baseUrl)}</code>
              </pre>
            </Card>
          </TabsContent>

          <TabsContent value="access">
            <Card className="rounded-lg border-border/50 bg-card/80 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
                  <KeyRound className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Acces API public a finaliser</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    La generation de cle, le checkout Stripe, les webhooks et la verification premium IA sont codes.
                    Le rate limit et les quotas fins par plan restent a activer au deploiement.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}
