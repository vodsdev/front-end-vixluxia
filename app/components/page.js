'use client';

import { useMemo, useState } from 'react';
import { Filter, LayoutGrid, Search } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { ComponentCard } from '@/components/component-card';
import { ComponentListItem } from '@/components/component-list-item';
import { FilterBar } from '@/components/layout/filter-bar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getAllRegistryComponents, getPublishedComponentsFromStorage, AUTHORS } from '@/lib/component-registry';
import * as Previews from '@/components/previews';

const ALL = 'all';

export default function ComponentsPage() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [category, setCategory] = useState(ALL);
  const [author, setAuthor] = useState(ALL);
  const [difficulty, setDifficulty] = useState(ALL);
  const [access, setAccess] = useState(ALL);
  const [dependency, setDependency] = useState(ALL);

  const allComponents = useMemo(() => {
    return [...getPublishedComponentsFromStorage(), ...getAllRegistryComponents()];
  }, []);

  const categories = useMemo(() => Array.from(new Set(allComponents.map((item) => item.categoryName).filter(Boolean))).sort(), [allComponents]);
  const dependencies = useMemo(() => Array.from(new Set(allComponents.flatMap((item) => item.dependencies || []))).sort(), [allComponents]);

  const filteredComponents = useMemo(() => {
    const q = search.toLowerCase();
    let items = allComponents.filter((component) => {
      const haystack = [
        component.name,
        component.tagline,
        component.categoryName,
        component.author?.name,
        ...(component.tags || []),
        ...(component.dependencies || []),
      ].join(' ').toLowerCase();

      if (search && !haystack.includes(q)) return false;
      if (category !== ALL && component.categoryName !== category) return false;
      if (author !== ALL && component.author?.id !== author) return false;
      if (difficulty !== ALL && component.meta?.difficulty !== difficulty) return false;
      if (access === 'premium' && !component.meta?.premium) return false;
      if (access === 'free' && component.meta?.premium) return false;
      if (dependency !== ALL && !(component.dependencies || []).includes(dependency)) return false;
      return true;
    });

    if (sortBy === 'newest') {
      items = [...items].sort((a, b) => new Date(b.meta?.publishedAt || 0) - new Date(a.meta?.publishedAt || 0));
    } else {
      items = [...items].sort((a, b) => (b.stats?.votes || 0) - (a.stats?.votes || 0));
    }

    return items;
  }, [access, allComponents, author, category, dependency, difficulty, search, sortBy]);

  const resetFilters = () => {
    setCategory(ALL);
    setAuthor(ALL);
    setDifficulty(ALL);
    setAccess(ALL);
    setDependency(ALL);
    setSearch('');
  };

  return (
    <PageShell title="Components" maxWidth="max-w-[1400px]" search={search} onSearchChange={setSearch}>
      <div className="space-y-6">
        <AnimateIn variant="fadeUp">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">Explorer les composants</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Recherche avancee, filtres, tri, composants publies localement et metadonnees enrichies.
              </p>
            </div>
            <Badge variant="outline" className="w-fit">
              {filteredComponents.length} resultat{filteredComponents.length > 1 ? 's' : ''}
            </Badge>
          </div>
        </AnimateIn>

        <Card className="rounded-lg border-border/50 bg-card/80 p-4">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-bold">Filtres avances</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            <div className="relative xl:col-span-2">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Nom, tag, auteur, dependance..."
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Categorie" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Toutes categories</SelectItem>
                {categories.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={author} onValueChange={setAuthor}>
              <SelectTrigger><SelectValue placeholder="Auteur" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Tous auteurs</SelectItem>
                {AUTHORS.map((item) => <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger><SelectValue placeholder="Niveau" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Tous niveaux</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={access} onValueChange={setAccess}>
              <SelectTrigger><SelectValue placeholder="Acces" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Free + Premium</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dependency} onValueChange={setDependency}>
              <SelectTrigger><SelectValue placeholder="Dependance" /></SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>Toutes dependances</SelectItem>
                {dependencies.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-3 flex justify-end">
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reinitialiser
            </Button>
          </div>
        </Card>

        <FilterBar
          view={view}
          onViewChange={setView}
          sortBy={sortBy}
          onSortChange={setSortBy}
          total={filteredComponents.length}
        />

        {view === 'grid' ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredComponents.map((component) => {
              const Preview = Previews[component.preview];
              return <ComponentCard key={component.id} component={component} preview={Preview} />;
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredComponents.map((component) => {
              const Preview = Previews[component.preview];
              return <ComponentListItem key={component.id} component={component} preview={Preview} />;
            })}
          </div>
        )}
      </div>
    </PageShell>
  );
}
