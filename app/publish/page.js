'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, Plus, Save, Send, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CodeBlock } from '@/components/code-block';
import { CATEGORIES } from '@/lib/prompts-data';
import { AUTHORS } from '@/lib/component-registry';

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function PublishPage() {
  const [form, setForm] = useState({
    name: 'Animated Metric Card',
    tagline: 'A compact analytics card with hover motion and clean stats.',
    categorySlug: 'cards',
    prompt: 'Create a React metric card using Tailwind CSS, lucide-react icons and Framer Motion hover animation.',
    code: `export function AnimatedMetricCard() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-accent/20">
      <p className="text-xs text-muted-foreground">Revenue</p>
      <p className="mt-2 text-2xl font-black">12.4k EUR</p>
    </div>
  );
}`,
    dependencies: 'react, tailwindcss, framer-motion, lucide-react',
    premium: false,
  });
  const [savedId, setSavedId] = useState(null);

  const category = CATEGORIES.find((item) => item.slug === form.categorySlug) || CATEGORIES[0];
  const previewComponent = useMemo(() => ({
    id: savedId || `local-${slugify(form.name) || 'component'}`,
    name: form.name,
    tagline: form.tagline,
    categorySlug: category.slug,
    categoryName: category.name,
    author: AUTHORS[AUTHORS.length - 1],
    prompt: form.prompt,
    code: form.code,
    preview: null,
    dependencies: form.dependencies.split(',').map((item) => item.trim()).filter(Boolean),
    tags: [category.name, form.premium ? 'Premium' : 'Free', 'Local draft'],
    stats: { votes: 0, likes: 0, downloads: 0, comments: 0, copies: 0, rating: 5 },
    meta: {
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      difficulty: 'Medium',
      license: form.premium ? 'Commercial' : 'MIT',
      version: '1.0.0',
      premium: form.premium,
      status: 'Draft',
    },
    installCommand: `npm install ${form.dependencies.split(',').map((item) => item.trim()).filter((item) => item && !['react', 'tailwindcss'].includes(item)).join(' ')}`.trim(),
    importSnippet: `import { ${form.name.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join('')} } from "@/components/ui/${slugify(form.name)}";`,
  }), [category, form, savedId]);

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const [isPublishing, setIsPublishing] = useState(false);

  const publish = async () => {
    if (!form.name.trim() || !form.code.trim()) return;
    setIsPublishing(true);

    try {
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Vous devez être connecté pour publier un composant.');
        setIsPublishing(false);
        return;
      }

      const id = slugify(form.name) + '-' + Date.now().toString(36);
      const previewName = form.name.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join('') + 'Preview';
      
      const { error } = await supabase.from('components').insert({
        id: id,
        user_id: user.id,
        name: form.name,
        tagline: form.tagline,
        category: form.categorySlug,
        prompt: form.prompt,
        code: form.code,
        preview: previewName,
        tags: [category.name, form.premium ? 'Premium' : 'Free'],
        status: 'published',
        premium: form.premium,
        metadata: {
          dependencies: form.dependencies.split(',').map((item) => item.trim()).filter(Boolean)
        }
      });

      if (error) throw error;
      
      setSavedId(id);
      toast.success('Composant publié avec succès sur Vixluxia !');
    } catch (err) {
      toast.error("Erreur lors de la publication : " + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <PageShell title="Publish" maxWidth="max-w-[1200px]">
      <div className="space-y-6">
        <AnimateIn variant="fadeUp">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Publier un composant</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Formulaire complet avec preview et sauvegarde locale avant branchement Supabase.
              </p>
            </div>
            {savedId && (
              <Button asChild variant="outline" className="rounded-md">
                <Link href={`/component?id=${savedId}`}>
                  <Eye className="h-4 w-4" />
                  Voir la fiche
                </Link>
              </Button>
            )}
          </div>
        </AnimateIn>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="info">1. Infos</TabsTrigger>
            <TabsTrigger value="code">2. Code</TabsTrigger>
            <TabsTrigger value="preview">3. Aperçu</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <Card className="rounded-lg border-border/50 bg-card/80 p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Informations du composant</h2>
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Ex: Bouton Magique" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={form.categorySlug} onValueChange={(value) => updateForm('categorySlug', value)}>
                    <SelectTrigger id="category"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((item) => (
                        <SelectItem key={item.slug} value={item.slug}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" value={form.tagline} onChange={(event) => updateForm('tagline', event.target.value)} placeholder="Courte description de ce que fait le composant..." />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-4 md:col-span-2">
                  <div>
                    <Label htmlFor="premium" className="text-base">Premium</Label>
                    <p className="text-xs text-muted-foreground mt-1">Réserve ce composant aux abonnés payants (Pro/Studio).</p>
                  </div>
                  <Switch id="premium" checked={form.premium} onCheckedChange={(value) => updateForm('premium', value)} />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <Card className="rounded-lg border-border/50 bg-card/80 p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Code et Dépendances</h2>
              <div className="grid gap-5">
                <div className="space-y-2">
                  <Label htmlFor="dependencies">Dépendances (séparées par des virgules)</Label>
                  <Input id="dependencies" value={form.dependencies} onChange={(event) => updateForm('dependencies', event.target.value)} placeholder="react, tailwindcss, framer-motion..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt original (optionnel)</Label>
                  <Textarea id="prompt" value={form.prompt} onChange={(event) => updateForm('prompt', event.target.value)} className="min-h-[100px] resize-y" placeholder="Le prompt IA utilisé pour générer ceci..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Code source (React/JSX)</Label>
                  <Textarea id="code" value={form.code} onChange={(event) => updateForm('code', event.target.value)} className="min-h-[300px] font-mono text-sm bg-muted/30" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="rounded-lg border-border/50 bg-card/80 p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Vérification Finale</h2>
              <div className="flex items-start justify-between gap-4 p-5 rounded-lg border border-border/50 bg-background">
                <div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-primary/5">{category.name}</Badge>
                    {form.premium && <Badge variant="default" className="bg-gradient-to-r from-violet-500 to-orange-400 border-none">Premium</Badge>}
                  </div>
                  <h2 className="mt-3 text-2xl font-black">{form.name || 'Composant sans nom'}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{form.tagline || 'Aucune description fournie.'}</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Plus className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-6">
                <CodeBlock code={form.code} filename={`${slugify(form.name) || 'component'}.tsx`} />
              </div>
              
              <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-border/50">
                <Button variant="outline" className="rounded-md px-6" onClick={() => toast.message('Brouillon gardé dans le formulaire')}>
                  <Save className="mr-2 h-4 w-4" />
                  Brouillon
                </Button>
                <Button className="rounded-md px-8" onClick={publish} disabled={!form.name.trim() || !form.code.trim() || isPublishing}>
                  {isPublishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  {isPublishing ? 'Publication...' : 'Publier le composant'}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}
