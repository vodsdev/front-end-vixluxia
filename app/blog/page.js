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

import { getAllPosts } from '@/lib/blog-data';

const categories = ['All', 'Trends', 'Tutorial', 'Design', 'Performance', 'Architecture', 'Accessibility'];

export default function BlogHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const posts = getAllPosts();
  
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

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
