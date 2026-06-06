'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Plus, Save, Send, Loader2, Sparkles, CheckCircle2, LayoutTemplate, Terminal, CheckCircle } from 'lucide-react';
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
import { motion } from 'framer-motion';

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function PublishPage() {
  const [form, setForm] = useState({
    name: '',
    tagline: '',
    categorySlug: 'cards',
    prompt: '',
    code: '',
    dependencies: 'react, tailwindcss, lucide-react',
    premium: false,
  });
  const [savedId, setSavedId] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const category = CATEGORIES.find((item) => item.slug === form.categorySlug) || CATEGORIES[0];
  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const publish = async () => {
    if (!form.name.trim() || !form.code.trim()) {
      toast.error('Le nom et le code sont requis.');
      return;
    }
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
      toast.success('Composant publié avec succès sur VixLuxia !');
    } catch (err) {
      toast.error("Erreur lors de la publication : " + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <PageShell title="Publier" maxWidth="max-w-[1200px]">
      <div className="space-y-12 pb-24">
        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-10 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/10 to-teal-400/10 rounded-full blur-[100px] pointer-events-none" />
          <AnimateIn variant="fadeUp">
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <Badge variant="outline" className="mb-6 gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border-none font-bold text-xs uppercase tracking-wider">
                  <LayoutTemplate className="h-4 w-4" /> Contributeur
                </Badge>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                  Publier un composant
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Partagez vos créations UI avec le monde entier. Contribuez à l'écosystème VixLuxia et gagnez en visibilité.
                </p>
              </div>
              {savedId && (
                <Button asChild className="h-14 rounded-2xl px-8 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 font-bold shrink-0">
                  <Link href={`/component?id=${savedId}`}>
                    <CheckCircle2 className="h-5 w-5 mr-2" /> Voir en ligne
                  </Link>
                </Button>
              )}
            </div>
          </AnimateIn>
        </section>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            {/* Étape 1 */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-black shadow-inner">1</div>
                <h2 className="text-2xl font-black">Identité Visuelle</h2>
              </div>
              <Card className="rounded-3xl border-border/50 bg-card/60 p-8 shadow-xl backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-muted-foreground font-medium">Nom du composant</Label>
                    <Input id="name" value={form.name} onChange={(event) => updateForm('name', event.target.value)} placeholder="Ex: Bouton Néon Animé" className="h-14 rounded-2xl bg-background/50 border-border/50 text-lg font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-muted-foreground font-medium">Catégorie</Label>
                    <Select value={form.categorySlug} onValueChange={(value) => updateForm('categorySlug', value)}>
                      <SelectTrigger id="category" className="h-14 rounded-2xl bg-background/50 border-border/50 font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-border/50 shadow-xl">
                        {CATEGORIES.map((item) => (
                          <SelectItem key={item.slug} value={item.slug} className="cursor-pointer">{item.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline" className="text-muted-foreground font-medium">Description (max 80 caractères)</Label>
                    <Input id="tagline" value={form.tagline} onChange={(event) => updateForm('tagline', event.target.value)} placeholder="Une phrase d'accroche expliquant l'utilité..." className="h-14 rounded-2xl bg-background/50 border-border/50" />
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 p-6 mt-4">
                    <div>
                      <Label htmlFor="premium" className="text-base font-bold flex items-center gap-2 mb-1">
                        <Sparkles className="w-5 h-5 text-orange-400" /> Vendre en Premium
                      </Label>
                      <p className="text-sm text-muted-foreground">Réservez ce composant aux abonnés payants et touchez des royalties.</p>
                    </div>
                    <Switch id="premium" checked={form.premium} onCheckedChange={(value) => updateForm('premium', value)} className="data-[state=checked]:bg-orange-400" />
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Étape 2 */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-black shadow-inner">2</div>
                <h2 className="text-2xl font-black">Code & Implémentation</h2>
              </div>
              <Card className="rounded-3xl border-border/50 bg-card/60 p-8 shadow-xl backdrop-blur-sm">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="dependencies" className="text-muted-foreground font-medium flex items-center gap-2"><Terminal className="w-4 h-4" /> Dépendances NPM</Label>
                    <Input id="dependencies" value={form.dependencies} onChange={(event) => updateForm('dependencies', event.target.value)} placeholder="react, tailwindcss..." className="h-14 rounded-2xl bg-background/50 border-border/50 font-mono text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code" className="text-muted-foreground font-medium flex items-center gap-2"><LayoutTemplate className="w-4 h-4" /> Code Source (TSX/JSX)</Label>
                    <Textarea id="code" value={form.code} onChange={(event) => updateForm('code', event.target.value)} className="min-h-[400px] font-mono text-sm bg-zinc-950 text-zinc-300 rounded-2xl p-6 border-transparent focus-visible:ring-primary/30" placeholder="export default function MyComponent() { ... }" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prompt" className="text-muted-foreground font-medium flex items-center gap-2"><Sparkles className="w-4 h-4" /> Prompt IA (Optionnel)</Label>
                    <Textarea id="prompt" value={form.prompt} onChange={(event) => updateForm('prompt', event.target.value)} className="min-h-[100px] resize-y rounded-2xl bg-background/50 border-border/50" placeholder="Si généré par IA, quel prompt avez-vous utilisé ?" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Étape 3 (Sticky Preview & Publish) */}
          <div className="lg:col-span-5 relative">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="sticky top-24 space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-black shadow-inner">3</div>
                <h2 className="text-2xl font-black">Vérification Finale</h2>
              </div>
              <Card className="rounded-3xl border-border/50 bg-card/60 p-8 shadow-2xl backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 to-orange-400" />
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="bg-muted px-3 py-1 font-bold">{category.name}</Badge>
                      {form.premium && <Badge variant="default" className="bg-orange-500/10 text-orange-400 border-none px-3 py-1 font-bold">Premium</Badge>}
                    </div>
                    <h3 className="text-3xl font-black leading-tight break-words">{form.name || 'Brouillon sans nom'}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{form.tagline || 'Donnez vie à votre composant en ajoutant une description claire.'}</p>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-2xl border border-border/50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2"><Terminal className="w-3 h-3" /> Fichiers générés</h4>
                    <ul className="space-y-2 text-sm font-medium">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> {slugify(form.name) || 'composant'}.tsx</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> package.json (imports)</li>
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-border/50 flex flex-col gap-4">
                    <Button className="w-full h-14 rounded-2xl text-lg font-black bg-gradient-to-r from-violet-500 to-orange-400 hover:opacity-90 text-white shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={publish} disabled={!form.name.trim() || !form.code.trim() || isPublishing}>
                      {isPublishing ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Send className="mr-2 h-6 w-6" />}
                      {isPublishing ? 'Mise en ligne...' : 'Publier le Composant'}
                    </Button>
                    <Button variant="ghost" className="w-full h-12 rounded-xl font-bold text-muted-foreground hover:text-foreground" onClick={() => toast.message('Brouillon conservé localement.')}>
                      <Save className="mr-2 h-4 w-4" /> Sauvegarder pour plus tard
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
