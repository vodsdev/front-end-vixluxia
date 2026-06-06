import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIRecommendations({ recommendations = [] }) {
  const items = recommendations.length > 0 ? recommendations : [
    {
      id: "1",
      title: "Hero Section",
      description: "A conversion-optimized hero section with animated gradients.",
      category: "Marketing",
    },
    {
      id: "2",
      title: "Pricing Table",
      description: "A responsive pricing table with a toggle for monthly/yearly billing.",
      category: "E-commerce",
    },
    {
      id: "3",
      title: "Dashboard Layout",
      description: "A sidebar layout with an expanding header and data visualization cards.",
      category: "Application",
    },
    {
      id: "4",
      title: "Auth Modal",
      description: "A smooth glassmorphism authentication modal with social login.",
      category: "Authentication",
    }
  ];

  return (
    <div className="w-full space-y-6 my-8 py-4">
      <div className="flex items-center gap-2 px-4">
        <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          ✨ AI Recommended for You
        </h2>
      </div>

      <div className="flex overflow-x-auto pb-8 pt-4 px-4 gap-6 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {items.map((item) => (
          <div key={item.id} className="relative group shrink-0 w-80 snap-center">
            {/* Magical Glowing Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            
            <Card className="relative h-full flex flex-col bg-card/95 backdrop-blur-sm border-muted/50 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    {item.category}
                  </span>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-0">
                <Button variant="ghost" className="w-full justify-between text-muted-foreground group-hover:text-primary transition-colors">
                  View Component
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIRecommendations;
