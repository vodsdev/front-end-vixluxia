'use client';

import { useState, useEffect } from 'react';
import { Bot, ShieldAlert, Sparkles, Activity, Users, CreditCard, Component, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useChat } from '@ai-sdk/react';

export default function AdminSecretDashboard() {
  const [stats, setStats] = useState({ users: 0, components: 0, teams: 0, subscriptions: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const { messages, append, isLoading: isAiLoading } = useChat({
    api: '/api/ai/generate',
    body: { mode: 'code-review' },
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: components } = await supabase.from('components').select('*', { count: 'exact', head: true });
      const { count: teams } = await supabase.from('teams').select('*', { count: 'exact', head: true });
      const { count: subs } = await supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active');
      
      const newStats = { users: users || 0, components: components || 0, teams: teams || 0, subscriptions: subs || 0 };
      setStats(newStats);

      append({
        role: 'user',
        content: `Analyse ces statistiques en temps réel pour VixLuxia et donne-moi une stratégie business courte : Utilisateurs: ${users}, Composants: ${components}, Teams: ${teams}, Abonnements actifs: ${subs}.`
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-red-500" /> VixLuxia Command Center
            </h1>
            <p className="text-zinc-400 mt-1">Real-time metrics & AI Intelligence</p>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-none"><Activity className="w-3 h-3 mr-2 animate-pulse" /> Live System</Badge>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title="Total Users" value={stats.users} icon={Users} loading={isLoading} />
          <MetricCard title="Active Subscriptions" value={stats.subscriptions} icon={CreditCard} loading={isLoading} />
          <MetricCard title="Total Teams" value={stats.teams} icon={Users} loading={isLoading} />
          <MetricCard title="Components Published" value={stats.components} icon={Component} loading={isLoading} />
        </div>

        <Card className="p-6 bg-zinc-900 border-zinc-800 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="w-6 h-6 text-violet-400" />
            <h2 className="text-xl font-bold">Analyse Automatisée par l'IA</h2>
          </div>
          <div className="space-y-4 text-sm text-zinc-300 leading-relaxed bg-black/50 p-6 rounded-xl min-h-[150px]">
            {isAiLoading ? (
              <div className="flex items-center gap-3 text-zinc-500"><Loader2 className="w-4 h-4 animate-spin" /> L'IA analyse les données en temps réel...</div>
            ) : (
              messages.filter(m => m.role === 'assistant').map((m, i) => (
                <div key={i} className="prose prose-invert max-w-none">{m.content}</div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, loading }) {
  return (
    <Card className="p-6 bg-zinc-900 border-zinc-800">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-zinc-400 text-sm font-medium">{title}</h3>
        <Icon className="w-5 h-5 text-zinc-500" />
      </div>
      {loading ? (
        <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
      ) : (
        <p className="text-3xl font-black text-white">{value}</p>
      )}
    </Card>
  );
}
