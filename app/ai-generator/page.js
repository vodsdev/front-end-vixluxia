'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wand2, 
  Copy, 
  Check, 
  Download, 
  AlertCircle, 
  Sparkles, 
  Code2, 
  Eye, 
  Send,
  RefreshCw,
  Layout,
  UploadCloud
} from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function AiGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [activeTab, setActiveTab] = useState('preview');
  const [isPublishing, setIsPublishing] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Veuillez entrer une description pour votre composant");
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockCode = `() => {
  const [count, setCount] = React.useState(0);
  return (
    <div className="p-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl shadow-2xl text-white text-center">
      <h2 className="text-2xl font-bold mb-4">Composant Généré par IA</h2>
      <p className="mb-6 opacity-90">Ce composant a été créé à partir de votre prompt : "${prompt}"</p>
      <button 
        onClick={() => setCount(c => c + 1)}
        className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-all font-semibold"
      >
        Compteur : {count}
      </button>
    </div>
  );
}`;
      setGeneratedCode(mockCode);
      setPreviewKey(prev => prev + 1);
      toast.success("Composant généré avec succès !");
    } catch (err) {
      setError("Une erreur est survenue lors de la génération.");
      toast.error("Échec de la génération");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedCode) return;
    setIsPublishing(true);
    
    try {
      // Simuler l'ajout au registre local/public
      const newComponent = {
        id: `ai-${Date.now()}`,
        name: prompt.slice(0, 20) + "...",
        tagline: prompt,
        author: { name: "VixLuxia AI", username: "@ai" },
        code: generatedCode,
        categorySlug: "ai-generated",
        stats: { likes: 0, views: 0 },
        publishedAt: new Date().toISOString()
      };

      // Sauvegarde locale pour simulation
      const existing = JSON.parse(localStorage.getItem('vixluxia-published-components') || '[]');
      localStorage.setItem('vixluxia-published-components', JSON.stringify([newComponent, ...existing]));

      await new Promise(r => setTimeout(r, 1000));
      toast.success("Composant publié automatiquement dans le registre !");
    } catch (err) {
      toast.error("Erreur lors de la publication");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    toast.success("Code copié");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <PageShell title="AI Generator">
      <div className="max-w-5xl mx-auto space-y-8 pb-20">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            VixLuxia AI Engine v3.0
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Générez des composants <span className="text-primary">en un instant</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Décrivez ce que vous voulez, et notre IA s'occupe du reste. Le composant sera automatiquement ajouté au registre.
          </p>
        </div>

        <Card className="p-2 border-primary/20 bg-background/40 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Wand2 className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Ex: Une carte de profil moderne avec un effet de glassmorphism..."
                className="w-full pl-12 pr-4 py-4 bg-transparent border-none focus:ring-0 text-lg placeholder:text-muted-foreground/50"
              />
            </div>
            <Button 
              size="lg" 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className="md:w-40 rounded-xl font-bold h-auto py-4"
            >
              {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4 ml-2" /> Générer</>}
            </Button>
          </div>
        </Card>

        <AnimatePresence mode="wait">
          {generatedCode && (
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex p-1 bg-muted rounded-lg">
                  <button onClick={() => setActiveTab('preview')} className={cn("flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md", activeTab === 'preview' ? "bg-background shadow-sm" : "text-muted-foreground")}>
                    <Layout className="w-4 h-4" /> Aperçu
                  </button>
                  <button onClick={() => setActiveTab('code')} className={cn("flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md", activeTab === 'code' ? "bg-background shadow-sm" : "text-muted-foreground")}>
                    <Code2 className="w-4 h-4" /> Code
                  </button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy} className="rounded-full">
                    {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />} Copier
                  </Button>
                  <Button onClick={handlePublish} disabled={isPublishing} size="sm" className="rounded-full bg-green-600 hover:bg-green-500 text-white border-none">
                    {isPublishing ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <UploadCloud className="w-4 h-4 mr-2" />}
                    Publier au Registre
                  </Button>
                </div>
              </div>

              <Card className="overflow-hidden border-border/50 bg-background/40 backdrop-blur-md">
                {activeTab === 'preview' ? (
                  <div className="min-h-[400px] flex items-center justify-center p-12 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]">
                    <LivePreview code={generatedCode} key={previewKey} />
                  </div>
                ) : (
                  <div className="bg-slate-950 p-6 overflow-x-auto">
                    <pre className="text-sm font-mono text-blue-300"><code>{generatedCode}</code></pre>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}

function LivePreview({ code }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current || !code) return;
    containerRef.current.innerHTML = `
      <div class="animate-in fade-in zoom-in duration-500">
        <div class="p-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl shadow-2xl text-white text-center">
          <h2 class="text-2xl font-bold mb-4">Composant Généré par IA</h2>
          <p class="mb-6 opacity-90 text-sm">Design fluide et responsive prêt pour la production.</p>
          <button class="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md transition-all font-semibold">Action Interactive</button>
        </div>
      </div>
    `;
  }, [code]);
  return <div ref={containerRef} className="w-full flex justify-center" />;
}
