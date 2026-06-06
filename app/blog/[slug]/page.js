import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, ChevronRight, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';

import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/blog-data';

export default function BlogPost({ params }) {
  const { slug } = params;
  const article = getPostBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour au blog
        </Link>
      </div>

      {/* Hero Section */}
      <article className="container mx-auto px-4">
        <header className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {article.tags?.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {article.description}
          </p>

          <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-y border-border">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-foreground">{article.author.name}</div>
                <div className="text-sm text-muted-foreground">{article.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.publishDate || article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] rounded-2xl overflow-hidden mb-16 shadow-2xl">
          <Image
            src={article.coverImage || article.imageUrl}
            alt="Article cover"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Layout */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Dans cet article</h3>
              <nav className="flex flex-col gap-3">
                {article.toc?.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center group"
                  >
                    <ChevronRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.title}
                  </a>
                ))}
              </nav>

              <div className="mt-12">
                <h3 className="font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Partager</h3>
                <div className="flex gap-4">
                  <button className="p-2 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                    <Facebook className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4 max-w-3xl">
            {/* Simulated Prose Formatting */}
            {/* Content Rendering */}
            <div 
              className="prose-custom text-lg text-muted-foreground leading-relaxed space-y-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Author Bio Footer */}
            <div className="mt-16 pt-8 border-t border-border">
              <div className="bg-secondary/50 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Écrit par {article.author.name}</h3>
                  <p className="text-primary font-medium text-sm mb-4">{article.author.role}</p>
                  <p className="text-muted-foreground">
                    {article.author.bio}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Mobile Share */}
            <div className="mt-12 lg:hidden flex justify-center gap-4">
              <span className="text-sm text-muted-foreground font-medium self-center mr-2">Partager :</span>
              <button className="p-3 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-3 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="p-3 bg-secondary rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
            </div>
            
          </div>
        </div>
      </article>
    </div>
  );
}
