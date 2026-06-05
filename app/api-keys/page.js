'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Copy, KeyRound, Plus, ShieldCheck } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/code-block';

export default function ApiKeysPage() {
  const [name, setName] = useState('Production key');
  const [createdKey, setCreatedKey] = useState('');
  const [loading, setLoading] = useState(false);

  const createKey = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/api-keys', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Impossible de creer la cle');
      setCreatedKey(data.key);
      toast.success('Cle API creee');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell title="API Keys" maxWidth="max-w-[900px]">
      <div className="space-y-6">
        <Card className="rounded-lg border-border/50 bg-card/80 p-6">
          <Badge variant="outline" className="mb-4 gap-2">
            <KeyRound className="h-3.5 w-3.5" />
            Developer access
          </Badge>
          <h1 className="text-2xl font-black tracking-tight">Cles API</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Genere une cle pour utiliser les endpoints VixLuxia. En prod, elle est hashee avant stockage Supabase.
          </p>
        </Card>

        <Card className="rounded-lg border-border/50 bg-card/80 p-5">
          <div className="space-y-2">
            <Label htmlFor="key-name">Nom de la cle</Label>
            <Input id="key-name" value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <Button className="mt-4 rounded-md" onClick={createKey} disabled={loading}>
            <Plus className="h-4 w-4" />
            {loading ? 'Creation...' : 'Creer une cle'}
          </Button>
        </Card>

        {createdKey && (
          <Card className="rounded-lg border-border/50 bg-card/80 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold">Nouvelle cle</h2>
                <p className="mt-1 text-xs text-muted-foreground">Copie-la maintenant, elle ne sera plus affichee.</p>
              </div>
              <Button variant="outline" className="rounded-md" onClick={() => {
                navigator.clipboard.writeText(createdKey);
                toast.success('Cle copiee');
              }}>
                <Copy className="h-4 w-4" />
                Copier
              </Button>
            </div>
            <CodeBlock code={createdKey} filename="api-key" />
          </Card>
        )}

        <Card className="rounded-lg border-border/50 bg-card/80 p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <p className="text-xs leading-5 text-muted-foreground">
              Les quotas et les scopes sont prets cote schema. Il reste a appliquer le rate limit au moment ou l API
              publique recevra du trafic reel.
            </p>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
