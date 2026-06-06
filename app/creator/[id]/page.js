'use client';

import React from 'react';
import { Github, Twitter, Mail, MapPin, Link as LinkIcon, Code2, Heart, Eye, Award, Star, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

const mockComponents = [
  {
    id: 1,
    title: 'Glassmorphic Navigation Bar',
    description: 'A beautiful, responsive navigation bar with glassmorphism effects and smooth animations.',
    views: '12.4k',
    likes: '842',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    date: '2 days ago',
  },
  {
    id: 2,
    title: 'Pricing Cards UI',
    description: 'Modern pricing cards with hover effects, popular badges, and clear call-to-actions.',
    views: '8.2k',
    likes: '512',
    tags: ['Next.js', 'Tailwind'],
    date: '1 week ago',
  },
  {
    id: 3,
    title: 'Advanced Data Table',
    description: 'A complex data table component with sorting, filtering, and pagination out of the box.',
    views: '15.1k',
    likes: '1.2k',
    tags: ['React', 'TypeScript', 'Tailwind'],
    date: '2 weeks ago',
  },
  {
    id: 4,
    title: 'Animated Authentication Flow',
    description: 'Seamless login and signup forms with fluid transitions and validation feedback.',
    views: '5.6k',
    likes: '320',
    tags: ['React', 'Framer Motion'],
    date: '3 weeks ago',
  },
  {
    id: 5,
    title: 'Dashboard Widget Grid',
    description: 'Draggable and resizable dashboard widgets with beautiful charts and data visualization.',
    views: '22.3k',
    likes: '1.8k',
    tags: ['React', 'Recharts', 'Tailwind'],
    date: '1 month ago',
  },
  {
    id: 6,
    title: 'Command Menu (Cmd+K)',
    description: 'A global command menu palette for quick navigation and actions across your application.',
    views: '18.9k',
    likes: '945',
    tags: ['React', 'Tailwind'],
    date: '2 months ago',
  }
];

const mockBadges = [
  { id: 1, name: 'Pioneer', description: 'Early adopter and initial contributor', gradient: 'from-amber-400 to-orange-500', icon: Star },
  { id: 2, name: 'Top Contributor', description: 'Consistently provides high-quality components', gradient: 'from-purple-400 to-indigo-500', icon: Award },
  { id: 3, name: 'Community Hero', description: 'Highly active in helping others', gradient: 'from-emerald-400 to-teal-500', icon: Shield },
  { id: 4, name: 'Design Maestro', description: 'Exceptional UI/UX design skills', gradient: 'from-pink-400 to-rose-500', icon: Zap }
];

export default function CreatorPortfolio({ params }) {
  // Use React.use() to unwrap params if this was an async component in Next.js 13+ or simply destructure if client side.
  // Next 14+ best practices suggest awaiting params in Server Components or using use() hook in client, 
  // but for a simple client component, params is often passed as a prop containing promises in Next 15, or directly in older versions.
  // We'll safely access it.
  const id = params?.id || 'creator'; 
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-[#0a0a0a] to-[#0a0a0a]">
      {/* Background ambient effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Profile Header (Glassmorphic) */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-3xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* Avatar */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shrink-0 ring-2 ring-white/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-blue-500/40 mix-blend-overlay z-10" />
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}&backgroundColor=111827`} 
                  alt="Creator Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Alex Developer
                  </h1>
                  <p className="text-blue-400 font-medium mt-1">@alex_dev</p>
                </div>
                
                <p className="text-neutral-400 max-w-2xl leading-relaxed text-sm md:text-base">
                  Crafting beautiful, pixel-perfect user interfaces and highly reusable components. 
                  Passionate about React, Tailwind CSS, and the fine details of frontend engineering.
                  Building the web, one component at a time.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-neutral-400 pt-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-neutral-500" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center gap-1.5">
                    <LinkIcon className="w-4 h-4 text-neutral-500" />
                    <a href="#" className="hover:text-white transition-colors">alexdev.co</a>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3 pt-4">
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    Follow
                  </button>
                  <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-row md:flex-col gap-4 md:gap-6 mt-6 md:mt-0 md:ml-auto">
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-white">42</div>
                  <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Components</div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-white">128k</div>
                  <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Total Views</div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-white">4.8k</div>
                  <div className="text-xs text-neutral-500 font-medium uppercase tracking-wider">Followers</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Badges & Achievements Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-semibold text-white/90">
              Badges & Achievements
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {mockBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={badge.id}
                  className="group relative flex items-center gap-3 p-3 pr-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default"
                >
                  {/* Glowing background effect for icon */}
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-xl shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${badge.gradient} rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity`} />
                    <div className={`relative flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br ${badge.gradient} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/90">{badge.name}</h3>
                    <p className="text-xs text-neutral-400">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-white/90">
              <Code2 className="w-6 h-6 text-purple-400" />
              Published Components
            </h2>
            <div className="flex gap-2">
              <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-neutral-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none outline-none">
                <option className="bg-[#0a0a0a]">Most Popular</option>
                <option className="bg-[#0a0a0a]">Newest</option>
                <option className="bg-[#0a0a0a]">Most Liked</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockComponents.map((component) => (
              <div 
                key={component.id} 
                className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/[0.07] transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-1 cursor-pointer"
              >
                {/* Preview Thumbnail Mockup */}
                <div className="h-48 bg-gradient-to-br from-neutral-800 to-neutral-900 border-b border-white/10 p-4 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-black"></div>
                   {/* Abstract shape representing component */}
                   <div className="w-24 h-24 rounded-xl bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-white/20 shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                     <Code2 className="w-8 h-8 text-white/50" />
                   </div>
                </div>
                
                {/* Card Content */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-white/90 group-hover:text-white transition-colors">
                      {component.title}
                    </h3>
                    <p className="text-sm text-neutral-400 mt-1 line-clamp-2">
                      {component.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {component.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-medium text-neutral-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-neutral-500">
                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-1 hover:text-white transition-colors"><Eye className="w-4 h-4" /> {component.views}</span>
                      <span className="flex items-center gap-1 hover:text-purple-400 transition-colors"><Heart className="w-4 h-4" /> {component.likes}</span>
                    </span>
                    <span>{component.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center pt-8">
             <button className="px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all">
                Load More Components
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
