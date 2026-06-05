'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Copy, KeyRound, Plus, ShieldCheck, Trash2, Loader2 } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/code-block';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export default function ApiKeysPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState('Production key');
  const [createdKey, setCreatedKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [keys, setKeys] = useState([]);
  const [loadingKeys, setLoadingKeys] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router]);

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

  if (authLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;
  if (!user) return null;

  return (
    <PageShell title="API Keys" maxWidth="max-w-[900px]">
      <div className="space-y-6">
        <Card className="rounded-lg border-border/50 bg-card/80 p-6">
          <Badge variant="outline" className="mb-4 gap-2">
            <KeyRound className="h-3.5 w-3.5" />
            Developer access
          </Badge>
          <h1 className="text-2xl font-black tracking-tight">Clés API</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Génère une clé pour utiliser les endpoints VixLuxia. En prod, elle est hashée avant stockage Supabase.
          </p>
        </Card>

        <Card className="rounded-lg border-border/50 bg-card/80 p-5">
          <div className="space-y-2">
            <Label htmlFor="key-name">Nom de la clé</Label>
            <Input id="key-name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <Button className="mt-4 rounded-md" onClick={createKey} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            {loading ? 'Création...' : 'Créer une clé'}
          </Button>
        </Card>

        {createdKey && (
          <Card className="rounded-lg border-primary/50 bg-primary/5 p-5 border-2">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-primary">Nouvelle clé générée</h2>
                <p className="mt-1 text-xs text-muted-foreground">Copie-la maintenant, elle ne sera plus affichée.</p>
              </div>
              <Button variant="outline" className="rounded-md" onClick={() => {
                navigator.clipboard.writeText(createdKey);
                toast.success('Clé copiée');
              }}>
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </Button>
            </div>
            <CodeBlock code={createdKey} filename="api-key" />
          </Card>
        )}

        <Card className="rounded-lg border-border/50 bg-card/80 p-5">
          <h2 className="text-lg font-bold mb-4">Vos clés existantes</h2>
          {loadingKeys ? (
            <div className="py-8 flex justify-center"><Loader2 className="animate-spin w-6 h-6 text-muted-foreground" /></div>
          ) : keys.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">Vous n'avez pas encore de clés API.</p>
          ) : (
            <div className="space-y-4">
              {keys.map((key) => (
                <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg bg-background/50">
                  <div>
                    <h3 className="font-medium text-sm">{key.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <code>{key.key_prefix}...</code>
                      <span>•</span>
                      <span>Créée le {new Date(key.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => deleteKey(key.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="rounded-lg border-border/50 bg-card/80 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <p className="text-xs leading-5 text-muted-foreground">
              Les quotas et les scopes sont prêts côté schéma. Il reste à appliquer le rate limit au moment où l'API publique recevra du trafic réel.
            </p>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
