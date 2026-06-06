import { createClient } from '@/utils/supabase/server';
import { formatDistanceToNow } from 'date-fns';
import { Activity, Code, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ActivityFeedPage() {
  const supabase = createClient();
  
  // Try to join with profiles. If there's no FK relationship configured for profiles in PostgREST,
  // we will just fetch components and map them. We'll try the join first.
  const { data: components, error } = await supabase
    .from('components')
    .select(`
      id,
      name,
      category,
      created_at,
      user_id,
      tagline,
      profiles (
        username,
        full_name,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })
    .limit(50);

  // If the join fails due to missing relationship, fallback to fetching just components
  let feedData = components || [];
  
  if (error) {
    console.error("Error fetching components for activity feed:", error.message);
    // Fallback if the profiles join fails
    const { data: fallbackComponents, error: fallbackError } = await supabase
      .from('components')
      .select('id, name, category, created_at, user_id, tagline')
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (!fallbackError && fallbackComponents) {
      feedData = fallbackComponents;
    }
  }

  return (
    <div className="container max-w-4xl py-10 mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recent Activity</h1>
          <p className="text-muted-foreground">Discover the latest components published by the community.</p>
        </div>
      </div>

      <div className="relative border-l border-border ml-4 md:ml-6 space-y-8 pb-8">
        {feedData.length === 0 ? (
          <div className="pl-6 text-muted-foreground py-8">
            No recent activity found.
          </div>
        ) : (
          feedData.map((component) => {
            const profile = component.profiles || null;
            const authorName = profile?.username || profile?.full_name || 'A user';
            
            return (
              <div key={component.id} className="relative pl-8 md:pl-10">
                {/* Timeline dot */}
                <span className="absolute -left-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-border shadow-sm">
                  <Code className="h-3 w-3 text-muted-foreground" />
                </span>

                <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground flex-wrap gap-2">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1.5" />
                          <span className="font-medium text-foreground">{authorName}</span>
                        </div>
                        <span>published a new component</span>
                      </div>
                      
                      <div>
                        <Link href={`/component/${component.id}`} className="group">
                          <h3 className="text-xl font-semibold flex items-center gap-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {component.name}
                            <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </h3>
                        </Link>
                        {component.tagline && (
                          <p className="text-muted-foreground mt-1 text-sm line-clamp-2">
                            {component.tagline}
                          </p>
                        )}
                      </div>
                      
                      {component.category && (
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                          {component.category}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-xs text-muted-foreground shrink-0 mt-2 sm:mt-0">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      {component.created_at ? formatDistanceToNow(new Date(component.created_at), { addSuffix: true }) : 'Unknown time'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
