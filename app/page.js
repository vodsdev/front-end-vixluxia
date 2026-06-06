'use client';
import { useEffect, useState, useMemo, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { FilterBar } from '@/components/layout/filter-bar';
import { ComponentCard } from '@/components/component-card';
import { ComponentListItem } from '@/components/component-list-item';
import { CategoryGrid } from '@/components/category-grid';
import { HeroSection } from '@/components/hero-section';
import { PlatformFeatureGrid } from '@/components/platform/platform-feature-grid';
import { AnimateIn, StaggerContainer, StaggerItem } from '@/components/animate-in';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CATEGORIES } from '@/lib/prompts-data';
import { getAllRegistryComponents } from '@/lib/component-registry';
import dynamic from 'next/dynamic';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background animate-pulse duration-10000" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[150px]"
      />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
    </div>
  );
};

const previewCache = {};
function getPreview(name) {
  if (!name) return null;
  if (!previewCache[name]) {
    previewCache[name] = dynamic(() => import('@/components/previews').then(mod => ({ default: mod[name] })), {
      ssr: false,
    });
  }
  return previewCache[name];
}

function HomeContent() {
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const groupParam = searchParams.get('group');
  const referralParam = searchParams.get('ref');

  useEffect(() => {
    if (!referralParam) return;
    localStorage.setItem('vixluxia-referral-code', referralParam);
    fetch('/api/referrals/track', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ referralCode: referralParam }),
    }).catch(() => {});
  }, [referralParam]);

  const allComponents = useMemo(() => {
    return getAllRegistryComponents();
  }, []);

  const filteredComponents = useMemo(() => {
    if (!search) return allComponents;
    const q = search.toLowerCase();
    return allComponents.filter(c =>
      c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)
    );
  }, [search, allComponents]);

  const currentCategory = categoryParam ? CATEGORIES.find(c => c.slug === categoryParam) : null;
  const currentPrompts = categoryParam ? allComponents.filter((item) => item.categorySlug === categoryParam) : [];

  const groupCategories = useMemo(() => {
    if (groupParam === 'marketing') return CATEGORIES.filter((_, i) => i < 10);
    if (groupParam === 'ui') return CATEGORIES.filter((_, i) => i >= 10);
    return [];
  }, [groupParam]);

  const handleCategorySelect = useCallback((slug) => {
    window.location.href = `/?category=${slug}`;
  }, []);

  return (
    <SidebarProvider>
      <AnimatedBackground />
      <div className="flex min-h-screen w-full bg-transparent relative z-10">
        <AppSidebar search={search} onSearchChange={setSearch} />

        <main className="flex-1 flex flex-col min-w-0">
          <AnnouncementBar />
          <AppHeader title={currentCategory ? currentCategory.name : 'Components'} />

          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full">
              {/* Search Results */}
              {search && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold tracking-tight">
                      Results for &ldquo;{search}&rdquo;{' '}
                      <span className="text-muted-foreground font-normal text-sm">
                        ({filteredComponents.length})
                      </span>
                    </h3>
                    <Button variant="ghost" size="sm" className="text-xs" onClick={() => setSearch('')}>
                      Clear
                    </Button>
                  </div>
                  <FilterBar
                    view={view}
                    onViewChange={setView}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    total={filteredComponents.length}
                  />
                  {view === 'grid' ? (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    >
                      {filteredComponents.map((p) => {
                        const Preview = getPreview(p.preview);
                        return (
                          <motion.div 
                            key={p.id}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 }
                            }}
                          >
                            <ComponentCard component={p} preview={Preview} />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                      className="space-y-2"
                    >
                      {filteredComponents.map((p) => {
                        const Preview = getPreview(p.preview);
                        return (
                          <motion.div 
                            key={p.id}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 }
                            }}
                          >
                            <ComponentListItem component={p} preview={Preview} />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Category View */}
              {!search && currentCategory && (
                <div className="space-y-4">
                  <AnimateIn variant="fadeUp">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-2xl">
                        {currentCategory.emoji}
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold tracking-tight">{currentCategory.name}</h1>
                        <p className="text-sm text-muted-foreground">
                          {currentCategory.desc} &middot; {currentPrompts.length} components
                        </p>
                      </div>
                    </div>
                  </AnimateIn>
                  <FilterBar
                    view={view}
                    onViewChange={setView}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    total={currentPrompts.length}
                  />
                  {view === 'grid' ? (
                    <motion.div 
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    >
                      {currentPrompts.map((p) => {
                        const Preview = getPreview(p.preview);
                        return (
                          <motion.div 
                            key={p.id}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: { opacity: 1, y: 0 }
                            }}
                          >
                            <ComponentCard component={p} preview={Preview} />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 }
                        }
                      }}
                      className="space-y-2"
                    >
                      {currentPrompts.map((p) => {
                        const Preview = getPreview(p.preview);
                        return (
                          <motion.div 
                            key={p.id}
                            variants={{
                              hidden: { opacity: 0, x: -20 },
                              visible: { opacity: 1, x: 0 }
                            }}
                          >
                            <ComponentListItem component={p} preview={Preview} />
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                  {currentPrompts.length === 0 && (
                    <div className="py-20 text-center">
                      <p className="text-muted-foreground text-sm">Coming soon. New components ship every week.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Group View */}
              {!search && !currentCategory && groupParam && groupCategories.length > 0 && (
                <div className="space-y-4">
                  <AnimateIn variant="fadeUp">
                    <div className="flex items-center gap-4 mb-8">
                      <div>
                        <h1 className="text-3xl font-black tracking-tight">
                          {groupParam === 'marketing' ? 'Marketing Blocks' : 'UI Components'}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-2">
                          Browse all categories in this collection. Select a category to view its components.
                        </p>
                      </div>
                    </div>
                  </AnimateIn>
                  <CategoryGrid
                    categories={groupCategories}
                    onSelect={handleCategorySelect}
                  />
                </div>
              )}

              {/* Default Home View */}
              {!search && !currentCategory && !groupParam && (
                <div className="space-y-16">
                  {/* Hero */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <HeroSection />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                  >
                    <PlatformFeatureGrid />
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
