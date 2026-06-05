'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, Plus, Save, Send } from 'lucide-react';
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

  const publish = () => {
    const id = `local-${slugify(form.name)}-${Date.now()}`;
    const item = { ...previewComponent, id, meta: { ...previewComponent.meta, status: 'Published' } };
    const existing = JSON.parse(localStorage.getItem('vixluxia-published-components') || '[]');
    localStorage.setItem('vixluxia-published-components', JSON.stringify([item, ...existing]));
    setSavedId(id);
    toast.success('Composant publie en local');
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

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <Card className="rounded-lg border-border/50 bg-card/80 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" value={form.name} onChange={(event) => updateForm('name', event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categorie</Label>
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
                <Input id="tagline" value={form.tagline} onChange={(event) => updateForm('tagline', event.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="dependencies">Dependances</Label>
                <Input id="dependencies" value={form.dependencies} onChange={(event) => updateForm('dependencies', event.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea id="prompt" value={form.prompt} onChange={(event) => updateForm('prompt', event.target.value)} className="min-h-[120px]" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="code">Code</Label>
                <Textarea id="code" value={form.code} onChange={(event) => updateForm('code', event.target.value)} className="min-h-[220px] font-mono text-xs" />
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/50 bg-background p-3 md:col-span-2">
                <div>
                  <Label htmlFor="premium">Premium</Label>
                  <p className="text-xs text-muted-foreground">Reserve ce composant aux abonnes payants.</p>
                </div>
                <Switch id="premium" checked={form.premium} onCheckedChange={(value) => updateForm('premium', value)} />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <Button variant="outline" className="rounded-md" onClick={() => toast.message('Brouillon garde dans le formulaire')}>
                <Save className="h-4 w-4" />
                Brouillon
              </Button>
              <Button className="rounded-md" onClick={publish} disabled={!form.name.trim() || !form.code.trim()}>
                <Send className="h-4 w-4" />
                Publier
              </Button>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="rounded-lg border-border/50 bg-card/80 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant="outline">{category.name}</Badge>
                  <h2 className="mt-4 text-xl font-black">{form.name || 'Untitled component'}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{form.tagline}</p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
                  <Plus className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {previewComponent.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </Card>
            <CodeBlock code={form.code} filename={`${slugify(form.name) || 'component'}.tsx`} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
