'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp, Medal, Star, Eye, ThumbsUp, Code, Sparkles, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { AnimateIn } from '@/components/animate-in';

// Mock Data
const topCreators = [
  { id: 1, name: "Alice Wonderland", username: "@alice", rank: 1, score: 2840, components: 45, avatar: "https://i.pravatar.cc/150?u=1", trend: "up" },
  { id: 2, name: "Bob Builder", username: "@bob", rank: 2, score: 2100, components: 38, avatar: "https://i.pravatar.cc/150?u=2", trend: "up" },
  { id: 3, name: "Charlie Chaplin", username: "@charlie", rank: 3, score: 1850, components: 30, avatar: "https://i.pravatar.cc/150?u=3", trend: "down" },
  { id: 4, name: "Diana Prince", username: "@diana", rank: 4, score: 1640, components: 25, avatar: "https://i.pravatar.cc/150?u=4", trend: "neutral" },
  { id: 5, name: "Ethan Hunt", username: "@ethan", rank: 5, score: 1420, components: 22, avatar: "https://i.pravatar.cc/150?u=5", trend: "up" },
];

const trendingComponents = [
  { id: 1, name: "Animated Glowing Search Bar", author: "@alice", rank: 1, views: "12.5k", likes: 840, type: "UI Component", trend: "up" },
  { id: 2, name: "Particle Text Effect", author: "@charlie", rank: 2, views: "10.2k", likes: 720, type: "Animation", trend: "up" },
  { id: 3, name: "Shape Landing Hero", author: "@bob", rank: 3, views: "8.9k", likes: 650, type: "Section", trend: "down" },
  { id: 4, name: "Etheral Shadow Card", author: "@diana", rank: 4, views: "7.4k", likes: 510, type: "Card", trend: "up" },
  { id: 5, name: "Spooky Smoke Animation", author: "@ethan", rank: 5, views: "6.1k", likes: 430, type: "Animation", trend: "neutral" },
];

function RankIcon({ rank }) {
  if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
  return <span className="text-lg font-bold text-muted-foreground w-6 text-center">{rank}</span>;
}

function TrendIcon({ trend }) {
  if (trend === 'up') return <ArrowUpRight className="w-4 h-4 text-emerald-500" />;
  if (trend === 'down') return <ArrowDownRight className="w-4 h-4 text-red-500" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
}

export default function LeaderboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-transparent">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <AnnouncementBar />
          <AppHeader title="Leaderboards" />
          
          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-[1400px] mx-auto w-full space-y-8">
              
              <AnimateIn variant="fadeUp">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Trophy className="w-8 h-8 text-primary" />
                    Vixluxia Leaderboards
                  </h1>
                  <p className="text-muted-foreground">
                    Discover the top creators and most trending components in the community.
                  </p>
                </div>
              </AnimateIn>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Top Creators */}
                <AnimateIn variant="fadeUp" delay={0.1}>
                  <Card className="border-border/50 bg-background/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Top Creators
                      </CardTitle>
                      <CardDescription>
                        The most active and highly rated developers this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topCreators.map((creator) => (
                          <div key={creator.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8">
                                <RankIcon rank={creator.rank} />
                              </div>
                              <Avatar className="h-10 w-10 border border-border/50">
                                <AvatarImage src={creator.avatar} />
                                <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-sm">{creator.name}</h3>
                                  <TrendIcon trend={creator.trend} />
                                </div>
                                <p className="text-xs text-muted-foreground">{creator.username}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="hidden sm:flex flex-col items-end">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Code className="w-3 h-3" /> Components
                                </span>
                                <span className="font-medium text-sm">{creator.components}</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 text-yellow-500" /> Score
                                </span>
                                <span className="font-bold text-sm text-primary">{creator.score.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimateIn>

                {/* Trending Components */}
                <AnimateIn variant="fadeUp" delay={0.2}>
                  <Card className="border-border/50 bg-background/50 backdrop-blur h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        Trending Components
                      </CardTitle>
                      <CardDescription>
                        The most viewed and liked components this week.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {trendingComponents.map((comp) => (
                          <div key={comp.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8">
                                <RankIcon rank={comp.rank} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-sm line-clamp-1">{comp.name}</h3>
                                  <TrendIcon trend={comp.trend} />
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <p className="text-xs text-muted-foreground">by {comp.author}</p>
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                                    {comp.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="hidden sm:flex flex-col items-end">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Eye className="w-3 h-3" /> Views
                                </span>
                                <span className="font-medium text-sm">{comp.views}</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <ThumbsUp className="w-3 h-3" /> Likes
                                </span>
                                <span className="font-bold text-sm text-primary">{comp.likes}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimateIn>

              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
