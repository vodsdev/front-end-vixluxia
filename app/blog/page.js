'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    title: 'The Future of Frontend Development in 2026',
    slug: 'future-frontend-development',
    excerpt: 'Explore the emerging trends, tools, and paradigms that are shaping the next generation of web applications and changing how developers work.',
    author: {
      name: 'Sarah Drasner',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    date: 'Jun 4, 2026',
    category: 'Trends',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  },
  {
    id: 2,
    title: 'Mastering Server Components in Next.js',
    slug: 'mastering-server-components',
    excerpt: 'A deep dive into React Server Components, how they work under the hood, and practical patterns for building high-performance applications.',
    author: {
      name: 'Dan Abramov',
      avatar: 'https://i.pravatar.cc/150?u=dan'
    },
    date: 'May 28, 2026',
    category: 'Tutorial',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  },
  {
    id: 3,
    title: 'Design Systems at Scale',
    slug: 'design-systems-scale',
    excerpt: 'How to build and maintain a robust design system that works across multiple products, teams, and platforms without losing consistency.',
    author: {
      name: 'Diana Mounter',
      avatar: 'https://i.pravatar.cc/150?u=diana'
    },
    date: 'May 15, 2026',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
  {
    id: 4,
    title: 'Optimizing Web Vitals for E-commerce',
    slug: 'optimizing-web-vitals',
    excerpt: 'Learn strategies to improve your LCP, INP, and CLS scores specifically tailored for complex e-commerce storefronts and high-traffic sites.',
    author: {
      name: 'Addy Osmani',
      avatar: 'https://i.pravatar.cc/150?u=addy'
    },
    date: 'May 2, 2026',
    category: 'Performance',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 5,
    title: 'State Management in 2026',
    slug: 'state-management-2026',
    excerpt: 'Evaluating the current ecosystem of state management libraries from Zustand to Jotai, and when to choose which tool for your project.',
    author: {
      name: 'Lee Robinson',
      avatar: 'https://i.pravatar.cc/150?u=lee'
    },
    date: 'Apr 20, 2026',
    category: 'Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
  },
  {
    id: 6,
    title: 'Building Accessible Data Visualizations',
    slug: 'accessible-data-visualizations',
    excerpt: 'Practical techniques for ensuring your charts, graphs, and complex data representations are fully accessible to screen readers and keyboard users.',
    author: {
      name: 'Marcy Sutton',
      avatar: 'https://i.pravatar.cc/150?u=marcy'
    },
    date: 'Apr 10, 2026',
    category: 'Accessibility',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  }
];

const categories = ['All', 'Trends', 'Tutorial', 'Design', 'Performance', 'Architecture', 'Accessibility'];

export default function BlogHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredPosts = activeCategory === 'All' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === activeCategory);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title="Blog" />
          
          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full space-y-8">
              
              <div className="flex flex-col space-y-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h1 className="text-4xl font-black tracking-tight">Vixluxia Blog</h1>
                  <p className="text-muted-foreground mt-2 text-lg">
                    Insights, tutorials, and updates from the Vixluxia team.
                  </p>
                </div>
              </div>

              {/* Category Filter Bar */}
              <div className="flex overflow-x-auto pb-2 gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === cat 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted/50 hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md hover:border-primary/50 bg-background/50 backdrop-blur-sm">
                      <div className="relative w-full h-48 overflow-hidden">
                        <Image 
                          src={post.imageUrl} 
                          alt={post.title} 
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur-md">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader className="flex-none pb-2">
                        <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                      </CardHeader>
                      
                      <CardContent className="flex-1">
                        <p className="text-muted-foreground line-clamp-3 text-sm">
                          {post.excerpt}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="flex-none flex items-center justify-between border-t border-border/50 pt-4 mt-auto">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{post.author.name}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground text-xs gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {post.date}
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-muted-foreground">No posts found in this category.</p>
                </div>
              )}
              
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
