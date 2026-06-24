'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Globe, 
  Layout, 
  Code2, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  Share2,
  Loader2,
  Heart
} from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function PublicRegistryPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('components')
          .select('*')
          .eq('is_public', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error('Error loading public items:', err);
        toast.error("Erreur lors du chargement du registre.");
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PageShell title="Public Registry">
      <div className="space-y-8 pb-20">
        {/* Hero Section */}
        <div className="relative p-8 md:p-12 rounded-[32px] overflow-hidden bg-primary/5 border border-primary/10 shadow-inner">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Globe className="w-64 h-64 text-primary" />
          </div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/20 border-none px-3 py-1 font-bold uppercase tracking-widest text-[10px]">
              Communauté
            </Badge>
            <h1 className="text-5xl font-black tracking-tighter">Registre Public</h1>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              Découvrez les composants, templates et sites web créés par la communauté VixLuxia. Tout est open-source et prêt à être utilisé.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex p-1 bg-muted/50 backdrop-blur-sm border border-border/40 rounded-2xl w-full md:w-auto overflow-x-auto scrollbar-hide">
            {['All', 'UI', 'Template', 'Full Site'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={cn(
                  "px-6 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap",
                  filter === t ? "bg-background shadow-lg text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === 'All' ? 'Tout' : t}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher une création..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 bg-background/50 border-border/40 rounded-2xl font-medium"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary/50" />
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Synchronisation du registre...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-border/20 rounded-[32px] bg-muted/5">
            <Search className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground font-bold tracking-tight">Aucun résultat trouvé.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="group overflow-hidden border-border/40 bg-card/40 backdrop-blur-xl hover:border-primary/40 transition-all duration-500 rounded-[24px] shadow-xl">
                  <div className="aspect-video relative overflow-hidden bg-slate-900">
                    <div className="absolute inset-0 flex items-center justify-center text-primary/10">
                      <Code2 className="w-20 h-20" />
                    </div>
                    {/* Preview Image if available */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <Button asChild size="sm" className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                        <Link href={`/ia?template=${item.id}`}>
                          Utiliser la Template
                          <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-md text-foreground border-none font-bold text-[10px] uppercase tracking-widest px-3 py-1">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-black text-lg tracking-tight group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-2 mt-1 font-bold uppercase tracking-wider">
                        <Users className="w-3 h-3" /> par <span className="text-foreground">{item.author_name || 'Anonyme'}</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border/20">
                      <div className="flex items-center gap-6">
                        <button className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-red-500 transition-colors">
                          <Heart className="w-3.5 h-3.5" /> {item.likes_count || 0}
                        </button>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> {Math.floor(Math.random() * 100) + 10}
                        </span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-muted">
                        <Share2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
