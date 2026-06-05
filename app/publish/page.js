'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Eye, Plus, Save, Send, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
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
import { motion } from 'framer-motion';

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
  const [isPublishing, setIsPublishing] = useState(false);

  const category = CATEGORIES.find((item) => item.slug === form.categorySlug) || CATEGORIES[0];
  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

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
    <PageShell title="Publish" maxWidth="max-w-[1000px]">
      <div className="space-y-12 pb-24">
        <AnimateIn variant="fadeUp">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Créer un composant</h1>
              <p className="mt-2 text-base text-muted-foreground max-w-xl">
                Partagez votre création avec la communauté. Remplissez les informations ci-dessous, vérifiez l'aperçu, et publiez-le en un clic.
              </p>
            </div>
            {savedId && (
              <Button asChild variant="outline" className="rounded-full px-6 h-10 shadow-sm border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500">
                <Link href={`/component?id=${savedId}`}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Voir en ligne
                </Link>
              </Button>
            )}
          </div>
        </AnimateIn>

        <div className="space-y-12">
          {/* Section 1: Informations */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">1</div>
              <h2 className="text-xl font-bold">Informations générales</h2>
            </div>
            <Card className="rounded-2xl border-border/50 bg-card/50 p-8 shadow-sm backdrop-blur-sm">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du composant</Label>
                  <Input id="name" value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Ex: Bouton Magique" className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={form.categorySlug} onValueChange={(value) => updateForm('categorySlug', value)}>
                    <SelectTrigger id="category" className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((item) => (
                        <SelectItem key={item.slug} value={item.slug}>{item.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="tagline">Description courte</Label>
                  <Input id="tagline" value={form.tagline} onChange={(event) => updateForm('tagline', event.target.value)} placeholder="Courte description de ce que fait le composant..." className="h-11 rounded-xl" />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-5 md:col-span-2">
                  <div>
                    <Label htmlFor="premium" className="text-base flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-400" />
                      Rendre Premium
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">Réserve ce composant aux abonnés payants (Pro/Studio).</p>
                  </div>
                  <Switch id="premium" checked={form.premium} onCheckedChange={(value) => updateForm('premium', value)} />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 2: Code */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">2</div>
              <h2 className="text-xl font-bold">Code & Source</h2>
            </div>
            <Card className="rounded-2xl border-border/50 bg-card/50 p-8 shadow-sm backdrop-blur-sm">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dependencies">Dépendances NPM (séparées par des virgules)</Label>
                  <Input id="dependencies" value={form.dependencies} onChange={(event) => updateForm('dependencies', event.target.value)} placeholder="react, tailwindcss, framer-motion..." className="h-11 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt IA original (optionnel)</Label>
                  <Textarea id="prompt" value={form.prompt} onChange={(event) => updateForm('prompt', event.target.value)} className="min-h-[100px] resize-y rounded-xl" placeholder="Le prompt IA utilisé pour générer ceci..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Code source (React/JSX)</Label>
                  <Textarea id="code" value={form.code} onChange={(event) => updateForm('code', event.target.value)} className="min-h-[300px] font-mono text-sm bg-muted/30 rounded-xl" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Section 3: Verification */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">3</div>
              <h2 className="text-xl font-bold">Vérification & Publication</h2>
            </div>
            <Card className="rounded-2xl border-border/50 bg-card/50 p-8 shadow-sm backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6 p-6 rounded-xl border border-border/50 bg-background mb-8">
                <div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-primary/5">{category.name}</Badge>
                    {form.premium && <Badge variant="default" className="bg-gradient-to-r from-violet-500 to-orange-400 border-none">Premium</Badge>}
                  </div>
                  <h2 className="mt-4 text-2xl font-black">{form.name || 'Composant sans nom'}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{form.tagline || 'Aucune description fournie.'}</p>
                </div>
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-orange-400 text-white shadow-lg shadow-orange-500/20">
                  <Plus className="h-8 w-8" />
                </div>
              </div>
              
              <CodeBlock code={form.code} filename={`${slugify(form.name) || 'component'}.tsx`} />
              
              <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-border/50">
                <Button variant="outline" className="rounded-full h-12 px-8" onClick={() => toast.message('Brouillon gardé en mémoire')}>
                  <Save className="mr-2 h-4 w-4" />
                  Sauvegarder en brouillon
                </Button>
                <Button className="rounded-full h-12 px-10 text-md font-bold bg-gradient-to-r from-violet-500 to-orange-400 hover:from-violet-600 hover:to-orange-500 shadow-lg shadow-orange-500/20" onClick={publish} disabled={!form.name.trim() || !form.code.trim() || isPublishing}>
                  {isPublishing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                  {isPublishing ? 'Publication en cours...' : 'Publier sur VixLuxia'}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
