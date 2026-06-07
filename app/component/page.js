'use client';

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Clock,
  Copy,
  Download,
  Heart,
  MessageSquare,
  MoreHorizontal,
  Package,
  Reply,
  ShieldCheck,
  Star,
  Terminal,
  ThumbsDown,
  ThumbsUp,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import JSZip from 'jszip';
import { PageShell } from '@/components/layout/page-shell';
import { LivePreview } from '@/components/live-preview';
import { CodeBlock } from '@/components/code-block';
import { AnimateIn } from '@/components/animate-in';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { getRegistryComponentById } from '@/lib/component-registry';
import { useComponentInteractions } from '@/hooks/use-component-interactions';
import * as Previews from '@/components/previews';
import { CopilotPanel } from '@/components/ai/copilot-panel';
function daysAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  return Math.max(1, Math.round(diff / 86400000));
}

function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border/50 bg-background px-3 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-bold tabular-nums">{value}</span>
    </div>
  );
}

export default function ComponentDetailPage() {
  const searchParams = useSearchParams();
  const componentId = searchParams.get('id');
  const [copied, setCopied] = useState('');
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const component = useMemo(() => getRegistryComponentById(componentId), [componentId]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await fetch(`/api/v1/components/comments?componentId=${componentId || ''}`);
        if (res.ok) {
          const data = await res.json();
          setCommentsList(data.comments || []);
        }
      } catch (error) {
        console.error('Failed to fetch comments', error);
      }
    }
    fetchComments();
  }, [componentId]);

  const handlePostComment = async () => {
    if (!comment.trim()) return;
    setIsSubmittingComment(true);
    try {
      const res = await fetch('/api/v1/components/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: comment, componentId })
      });
      if (res.ok) {
        const data = await res.json();
        setCommentsList(prev => [data.comment, ...prev]);
        setComment('');
        toast.success("Commentaire publié");
      } else {
        toast.error("Erreur lors de la publication du commentaire");
      }
    } catch (error) {
      toast.error("Erreur de réseau");
    } finally {
      setIsSubmittingComment(false);
    }
  };
  const interactions = useComponentInteractions(componentId || 'unknown');

  // Mock user subscription tier
  const user = { plan: 'free' };
  const hasAccess = user.plan === 'pro' || user.plan === 'enterprise';
  const isPremium = component?.is_premium || component?.meta?.premium;

  const Preview = component ? Previews[component.preview] : null;
  const score = (component?.stats.votes || 0) + interactions.vote;

  const copy = async (value, label) => {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    toast.success(`${label} copie`);
    setTimeout(() => setCopied(''), 1600);
  };

  const handleDownloadZip = async () => {
    if (!component) return;
    const zip = new JSZip();

    if (isPremium && !hasAccess) {
      toast.error('Unlock Pro to download premium components');
      return;
    }
    
    zip.file(`${component.id}.tsx`, component.code);
    
    const instructions = `
# Installation Instructions

## Install Dependencies
${component.installCommand}

## Import Snippet
${component.importSnippet}
`.trim();
    zip.file("instructions.md", instructions);

    if (component.prompt) {
      zip.file("prompt.md", component.prompt);
    }
    
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${component.id}.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("ZIP téléchargé");
  };


  if (!component) {
    return (
      <PageShell title="Component" maxWidth="max-w-[900px]">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-black">Composant introuvable</h1>
            <p className="mt-2 text-sm text-muted-foreground">L identifiant dans l URL ne correspond a aucun composant.</p>
            <Button variant="outline" asChild className="mt-5 rounded-md">
              <Link href="/components">
                <ArrowLeft className="h-4 w-4" />
                Retour aux composants
              </Link>
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title={component.name} maxWidth="max-w-[1400px]">
      <div className="space-y-6">
        <AnimateIn variant="fadeUp">
          <Link
            href={component.categorySlug ? `/?category=${component.categorySlug}` : '/components'}
            className="mb-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {component.categoryName}
          </Link>

          <section className="rounded-lg border border-border/50 bg-card/80 p-5 shadow-sm backdrop-blur lg:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{component.categoryName}</Badge>
                  <Badge variant={component.meta.premium ? 'default' : 'secondary'}>
                    {component.meta.premium ? 'Premium' : 'Free'}
                  </Badge>
                  <Badge variant="outline">{component.meta.difficulty}</Badge>
                </div>
                <h1 className="mt-4 text-3xl font-black tracking-tight lg:text-4xl">{component.name}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{component.tagline}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant={interactions.isFavorite ? 'default' : 'outline'}
                  className="rounded-md"
                  onClick={interactions.toggleFavorite}
                >
                  <Heart className={interactions.isFavorite ? 'h-4 w-4 fill-current' : 'h-4 w-4'} />
                  {interactions.isFavorite ? 'Favori' : 'Favoris'}
                </Button>
                <Button className="rounded-md" onClick={() => copy(component.prompt, 'Prompt')}>
                  {copied === 'Prompt' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  Copier
                </Button>
                <Button className="rounded-md" onClick={handleDownloadZip}>
                  <Download className="h-4 w-4" />
                  Download ZIP
                </Button>
              </div>
            </div>
          </section>
        </AnimateIn>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0 space-y-5">
            <Tabs defaultValue="preview" className="space-y-4">
              <TabsList className="grid h-auto w-full grid-cols-4 rounded-lg sm:w-auto">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="install">Install</TabsTrigger>
                <TabsTrigger value="prompt">Prompt</TabsTrigger>
              </TabsList>

              <TabsContent value="preview">
                <LivePreview>
                  {Preview ? <Preview /> : <div className="text-sm text-muted-foreground">Aucun preview disponible.</div>}
                </LivePreview>
              </TabsContent>

              <TabsContent value="code">
                {isPremium && !hasAccess ? (
                  <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-border/50 bg-card p-6 text-center shadow-sm">
                    <ShieldCheck className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-bold">Unlock Pro to View Source</h3>
                    <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                      Upgrade to a Pro or Enterprise subscription to access the source code for premium components.
                    </p>
                    <Button asChild>
                      <Link href="/pricing">Upgrade to Pro</Link>
                    </Button>
                  </div>
                ) : (
                  <CodeBlock code={component.code} filename={`${component.id}.tsx`} />
                )}
              </TabsContent>

              <TabsContent value="install" className="space-y-4">
                {isPremium && !hasAccess ? (
                  <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-border/50 bg-card p-6 text-center shadow-sm">
                    <ShieldCheck className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-bold">Unlock Pro to View Source</h3>
                    <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                      Upgrade to a Pro or Enterprise subscription to access the installation details for premium components.
                    </p>
                    <Button asChild>
                      <Link href="/pricing">Upgrade to Pro</Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    <CodeBlock code={component.installCommand} language="bash" filename="terminal" />
                    <CodeBlock code={component.importSnippet} filename="usage.tsx" />
                    <Card className="rounded-lg border-border/50 bg-card/80 p-5">
                      <div className="flex items-start gap-3">
                        <Package className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <div>
                          <h3 className="text-sm font-bold">Dependances detectees</h3>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {component.dependencies.map((dependency) => (
                              <Badge key={dependency} variant="outline" className="font-mono">
                                {dependency}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </>
                )}
              </TabsContent>

              <TabsContent value="prompt">
                {isPremium && !hasAccess ? (
                  <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-border/50 bg-card p-6 text-center shadow-sm">
                    <ShieldCheck className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-bold">Unlock Pro to View Source</h3>
                    <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                      Upgrade to a Pro or Enterprise subscription to access the prompt for premium components.
                    </p>
                    <Button asChild>
                      <Link href="/pricing">Upgrade to Pro</Link>
                    </Button>
                  </div>
                ) : (
                  <CodeBlock code={component.prompt} filename="prompt.md" language="markdown" />
                )}
              </TabsContent>
            </Tabs>

            {/* Old Comments Card Removed */}
          </div>

          <aside className="space-y-5">
            <Card className="rounded-lg border-border/50 bg-card/80 p-5">
              <h2 className="text-sm font-bold">Interactions</h2>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Button
                  variant={interactions.vote === 1 ? 'default' : 'outline'}
                  className="rounded-md"
                  onClick={() => interactions.setVote(1)}
                >
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <div className="flex items-center justify-center rounded-md border border-border/50 bg-background text-sm font-black">
                  {score}
                </div>
                <Button
                  variant={interactions.vote === -1 ? 'default' : 'outline'}
                  className="rounded-md"
                  onClick={() => interactions.setVote(-1)}
                >
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="rounded-lg border-border/50 bg-card/80 p-5">
              <h2 className="text-sm font-bold">Statistiques</h2>
              <div className="mt-4 space-y-2">
                <StatRow label="Downloads" value={component.stats.downloads.toLocaleString()} />
                <StatRow label="Likes" value={component.stats.likes.toLocaleString()} />
                <StatRow label="Copies" value={component.stats.copies.toLocaleString()} />
                <StatRow label="Rating" value={`${component.stats.rating}/5`} />
              </div>
            </Card>

            <Card className="rounded-lg border-border/50 bg-card/80 p-5">
              <h2 className="text-sm font-bold">Auteur</h2>
              <div className="mt-4 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-foreground text-xs font-black text-background">
                  {component.author.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold">{component.author.name}</p>
                  <p className="text-xs text-muted-foreground">{component.author.username}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{component.author.bio}</p>
                </div>
              </div>
            </Card>

            <Card className="rounded-lg border-border/50 bg-card/80 p-5">
              <h2 className="text-sm font-bold">Metadonnees</h2>
              <div className="mt-4 space-y-2">
                <StatRow label="Version" value={component.meta.version} />
                <StatRow label="Licence" value={component.meta.license} />
                <StatRow label="Publie" value={`${daysAgo(component.meta.publishedAt)}j`} />
                <StatRow label="Status" value={component.meta.status} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {component.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="rounded-lg border-border/50 bg-card/80 p-5">
              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Compatible Tailwind et shadcn.
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  Install command generé automatiquement.
                </div>
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Données prêtes pour API publique.
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profil Auteur Supabase disponible.
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Favoris et votes persistants.
                </div>
              </div>
            </Card>
          </aside>
        </div>

        {/* Visually Appealing Comments Section */}
        <div className="mt-16 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Discussion</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Partagez vos retours, posez des questions et aidez la communauté.
              </p>
            </div>
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              {commentsList.length} commentaire{commentsList.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <Card className="border-border/50 bg-card/50 p-6 shadow-sm backdrop-blur">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                U
              </div>
              <div className="flex-1 space-y-4">
                <Textarea
                  placeholder="Qu'en pensez-vous ? Ajoutez un commentaire..."
                  className="min-h-[100px] resize-none bg-background text-sm"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={isSubmittingComment}
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Terminal className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button className="rounded-full px-6" onClick={handlePostComment} disabled={isSubmittingComment || !comment.trim()}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {isSubmittingComment ? 'Publication...' : 'Publier'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            {commentsList.map((comment) => (
              <div key={comment.id} className="group flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-bold text-secondary-foreground">
                  {comment.avatar}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between rounded-2xl rounded-tl-none border border-border/50 bg-card p-4 shadow-sm">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{comment.author}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                          {comment.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 px-2">
                    <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {comment.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                      <Reply className="h-3.5 w-3.5" />
                      Répondre
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CopilotPanel />
    </PageShell>
  );
}
