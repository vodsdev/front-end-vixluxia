'use client';

import React, { useState } from 'react';
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
  ArrowUpRight
} from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const PUBLIC_ITEMS = [
  { id: 1, title: "SaaS Landing Template", type: "Template", author: "Alex_Dev", likes: 245, views: "1.2k", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80" },
  { id: 2, title: "Glassmorphism Card UI", type: "Component", author: "Sarah.design", likes: 182, views: "890", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80" },
  { id: 3, title: "Crypto Dashboard 3D", type: "Full Site", author: "VixLuxia_Pro", likes: 530, views: "4.5k", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&q=80" },
  { id: 4, title: "Animated Navigation", type: "Component", author: "Marco_K", likes: 92, views: "450", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80" },
  { id: 5, title: "Portfolio Dark Mode", type: "Template", author: "Elena_V", likes: 310, views: "2.1k", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&q=80" },
  { id: 6, title: "AI Chat Interface", type: "Component", author: "NextGen_UI", likes: 156, views: "1.1k", image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80" },
];

export default function PublicRegistryPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredItems = PUBLIC_ITEMS.filter(item => {
    const matchesFilter = filter === 'All' || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <PageShell title="Public Registry">
      <div className="space-y-8 pb-20">
        {/* Hero Section */}
        <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden bg-primary/5 border border-primary/10">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Globe className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-2xl space-y-4">
            <Badge className="bg-primary/20 text-primary hover:bg-primary/20 border-none px-3 py-1">
              Communauté
            </Badge>
            <h1 className="text-4xl font-black tracking-tight">Registre Public</h1>
            <p className="text-muted-foreground text-lg">
              Découvrez les composants, templates et sites web créés par la communauté VixLuxia. Tout est open-source et prêt à être utilisé.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex p-1 bg-muted rounded-xl w-full md:w-auto overflow-x-auto">
            {['All', 'Component', 'Template', 'Full Site'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap",
                  filter === t ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t === 'All' ? 'Tout' : t}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher une création..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background/50 rounded-xl"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="group overflow-hidden border-border/50 bg-background/40 backdrop-blur-md hover:border-primary/30 transition-all duration-500">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Button size="sm" className="w-full rounded-lg">
                      Utiliser la Template
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-md text-foreground border-none">
                    {item.type}
                  </Badge>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      par <span className="text-foreground font-medium">{item.author}</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3 text-green-500" /> {item.likes}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" /> {item.views}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Clock className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
