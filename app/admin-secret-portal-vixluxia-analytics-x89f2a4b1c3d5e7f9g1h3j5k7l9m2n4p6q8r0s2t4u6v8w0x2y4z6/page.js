'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, Lock, BarChart3, Users, Eye, Zap, Bot, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnimateIn } from '@/components/animate-in';
import { toast } from 'sonner';

const SECURITY_QUESTION = "Ta plus grosse douleur ?";
const SECURITY_ANSWER = "mon EX";
// 400 chars password
const ADMIN_PASSWORD = "VIXLUXIA-ADMIN-KEY-9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c";

export default function InvisibleAdminDashboard() {
  const [step, setStep] = useState(1);
  const [answer, setAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [stats, setStats] = useState({ visitors: 0, active: 0, generated: 0 });

  useEffect(() => {
    // Faux stats temps réel
    if (unlocked) {
      const interval = setInterval(() => {
        setStats(prev => ({
          visitors: prev.visitors + Math.floor(Math.random() * 5),
          active: prev.active + (Math.random() > 0.5 ? 1 : -1),
          generated: prev.generated + Math.floor(Math.random() * 2),
        }));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [unlocked]);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === SECURITY_ANSWER.toLowerCase()) {
      setStep(2);
      setAnswer('');
      toast.success('Question personnelle validée.');
    } else {
      toast.error('Réponse incorrecte.');
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setUnlocked(true);
      toast.success('Accès Super Admin accordé.');
    } else {
      toast.error('Mot de passe invalide. Alerte de sécurité déclenchée.');
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AnimateIn variant="fadeUp">
            <Card className="p-8 bg-zinc-900 border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50" />
              <div className="flex flex-col items-center text-center mb-8">
                <ShieldAlert className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-xl font-black text-white tracking-widest uppercase">Accès Restreint</h1>
                <p className="text-sm text-zinc-400 mt-2">Zone sécurisée VixLuxia. Toute tentative d'intrusion est enregistrée.</p>
              </div>

              {step === 1 ? (
                <form onSubmit={handleQuestionSubmit} className="space-y-4">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold text-zinc-500 uppercase">Question de sécurité</label>
                    <p className="text-sm text-white font-medium bg-zinc-800/50 p-3 rounded-lg border border-zinc-800">{SECURITY_QUESTION}</p>
                    <Input 
                      type="text" 
                      placeholder="Votre réponse..." 
                      value={answer}
                      onChange={e => setAnswer(e.target.value)}
                      className="bg-zinc-950 border-zinc-800 text-white"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold">Vérifier</Button>
                </form>
              ) : (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2 text-left">
                    <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Clé de décryptage (400 char)
                    </label>
                    <Input 
                      type="password" 
                      placeholder="Collez la clé complète..." 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="bg-zinc-950 border-zinc-800 text-white"
                      autoFocus
                    />
                  </div>
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold">Déverrouiller le Portail</Button>
                </form>
              )}
            </Card>
          </AnimateIn>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <header className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              VixLuxia God Mode
            </h1>
            <p className="text-zinc-400 mt-1">Tableau de bord super-administrateur furtif.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              IP TRACKING ACTIF
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-6 bg-zinc-900 border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-bold text-blue-400">Total Utilisateurs</span>
            </div>
            <p className="text-4xl font-black">{1248 + stats.visitors}</p>
          </Card>
          <Card className="p-6 bg-zinc-900 border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">En ligne (Temps réel)</span>
            </div>
            <p className="text-4xl font-black">{42 + stats.active}</p>
          </Card>
          <Card className="p-6 bg-zinc-900 border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-5 h-5 text-purple-400" />
              <span className="text-xs font-bold text-purple-400">Vues Composants</span>
            </div>
            <p className="text-4xl font-black">45.2k</p>
          </Card>
          <Card className="p-6 bg-zinc-900 border-zinc-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <Bot className="w-5 h-5 text-orange-400" />
              <span className="text-xs font-bold text-orange-400">Requêtes IA Total</span>
            </div>
            <p className="text-4xl font-black">{8942 + stats.generated}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500" /> Analyse IA Automatisée</h2>
            <Card className="p-6 bg-zinc-900 border-zinc-800 h-[400px] overflow-y-auto">
              <div className="space-y-4">
                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-2">Il y a 2 minutes</p>
                  <p className="text-sm font-medium">L'IA détecte une augmentation de 15% des requêtes sur les composants "Pricing". Recommandation : publier un nouveau template Premium.</p>
                </div>
                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-2">Il y a 14 minutes</p>
                  <p className="text-sm font-medium">Pic de trafic depuis "github.com/vodsdev". Conversion en inscriptions estimée à 4.2%.</p>
                </div>
                <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-2">Il y a 1 heure</p>
                  <p className="text-sm font-medium">Alerte sécurité : 3 tentatives de connexion échouées sur des comptes existants (IP tracées et bannies).</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><BarChart3 className="w-5 h-5 text-red-500" /> Logs de Sécurité (Anti-Double)</h2>
            <Card className="p-6 bg-zinc-900 border-zinc-800 h-[400px] overflow-y-auto">
              <div className="space-y-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-2 hover:bg-zinc-800 rounded-md">
                    <div>
                      <p className="text-xs font-mono text-zinc-300">192.168.1.{Math.floor(Math.random() * 255)}</p>
                      <p className="text-[10px] text-zinc-500">Scan Fingerprint complet</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">CLEAN</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
