'use client';

import { useState, useEffect } from 'react';
import { Bot, Lock, ShieldAlert, Sparkles, Activity, Users, CreditCard, Component, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useChat } from '@ai-sdk/react';

const ADMIN_PASSWORD_400_CHARS = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

export default function AdminSecretDashboard() {
  const [authStage, setAuthStage] = useState(0); 
  const [answer, setAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({ users: 0, components: 0, teams: 0, subscriptions: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const { messages, append, isLoading: isAiLoading } = useChat({
    api: '/api/ai/generate',
    body: { mode: 'code-review' },
  });

  const checkAnswer = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === 'mon ex') setAuthStage(1);
    else alert('Erreur de sécurité. IP loggée.');
  };

  const checkPassword = (e) => {
    e.preventDefault();
    if (password.length >= 400) setAuthStage(2);
    else alert('Mot de passe trop court ou invalide. Il faut 400 caractères minimum.');
  };

  useEffect(() => {
    if (authStage === 2) {
      loadStats();
    }
  }, [authStage]);

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

  if (authStage === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <Card className="w-full max-w-md p-6 bg-zinc-950 border-red-900/50 shadow-2xl shadow-red-900/20">
          <ShieldAlert className="w-12 h-12 text-red-500 mb-6 mx-auto" />
          <h1 className="text-xl font-black text-center text-white mb-6">Zone Sécurisée VixLuxia</h1>
          <form onSubmit={checkAnswer} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1 block">Question de sécurité: Ta plus grosse douleur ?</label>
              <Input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="bg-zinc-900 border-zinc-800 text-white" />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">Continuer</Button>
          </form>
        </Card>
      </div>
    );
  }

  if (authStage === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <Card className="w-full max-w-2xl p-6 bg-zinc-950 border-red-900/50 shadow-2xl shadow-red-900/20">
          <Lock className="w-12 h-12 text-red-500 mb-6 mx-auto" />
          <h1 className="text-xl font-black text-center text-white mb-6">Entrez la clé maître (400 caractères minimum)</h1>
          <form onSubmit={checkPassword} className="space-y-4">
            <div>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-zinc-900 border-zinc-800 text-white" />
              <p className="text-xs text-zinc-500 mt-2 text-right">{password.length} / 400</p>
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">Déverrouiller</Button>
          </form>
        </Card>
      </div>
    );
  }

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
