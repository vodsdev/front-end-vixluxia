'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Key, 
  Plus, 
  Copy, 
  Eye, 
  EyeOff, 
  Trash2, 
  Activity, 
  Zap, 
  Shield, 
  Clock,
  Check,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function ApiDashboardPage() {
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production Main', key: 'vx_live_8f2j3n4v8d9s0a1b2c3d4e5f6', status: 'active', usage: 12540, limit: 50000, created: '2024-03-10', lastUsed: 'Il y a 2 min' },
    { id: '2', name: 'Development Test', key: 'vx_test_k9l0m1n2o3p4q5r6s7t8u9v0', status: 'active', usage: 450, limit: 1000, created: '2024-03-12', lastUsed: 'Il y a 1 heure' },
  ]);

  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [visibleKeys, setVisibleKeys] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Clé copiée dans le presse-papier");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Veuillez donner un nom à votre clé");
      return;
    }
    const newKey = {
      id: Math.random().toString(36).substr(2, 9),
      name: newKeyName,
      key: `vx_live_${Math.random().toString(36).substr(2, 24)}`,
      status: 'active',
      usage: 0,
      limit: 10000,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Jamais'
    };
    setApiKeys([newKey, ...apiKeys]);
    setNewKeyName('');
    setShowNewKeyForm(false);
    toast.success("Nouvelle clé API générée");
  };

  const handleDeleteKey = (id) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    toast.info("Clé API supprimée");
  };

  return (
    <PageShell title="API Dashboard">
      <div className="space-y-8 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestion des Clés API</h1>
            <p className="text-muted-foreground mt-1">Gérez vos accès programmatiques et surveillez votre consommation.</p>
          </div>
          <Button onClick={() => setShowNewKeyForm(true)} className="rounded-full shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle Clé
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Requêtes Totales" value="12,990" icon={<Activity className="w-4 h-4" />} trend="+12.5%" />
          <StatCard title="Temps de Réponse" value="42ms" icon={<Zap className="w-4 h-4" />} trend="-5ms" />
          <StatCard title="Clés Actives" value={apiKeys.length.toString()} icon={<Shield className="w-4 h-4" />} />
          <StatCard title="Quota Utilisé" value="26%" icon={<BarChart3 className="w-4 h-4" />} trend="Stable" />
        </div>

        {/* New Key Form */}
        <AnimatePresence>
          {showNewKeyForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-6 border-primary/20 bg-primary/5 backdrop-blur-xl">
                <h3 className="text-lg font-semibold mb-4">Générer une nouvelle clé</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input 
                    placeholder="Nom de la clé (ex: Production App)" 
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="flex-1 bg-background/50"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleCreateKey}>Générer</Button>
                    <Button variant="ghost" onClick={() => setShowNewKeyForm(false)}>Annuler</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keys List */}
        <div className="grid grid-cols-1 gap-4">
          {apiKeys.map((key, idx) => (
            <motion.div
              key={key.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{key.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Créée le {key.created}</span>
                      <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Vue {key.lastUsed}</span>
                    </div>
                  </div>

                  <div className="flex-1 max-w-xl">
                    <div className="relative group/key">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Key className="w-4 h-4 text-muted-foreground/50" />
                      </div>
                      <code className="block w-full pl-10 pr-24 py-2.5 bg-muted/50 rounded-lg text-sm font-mono border border-border/50 truncate">
                        {visibleKeys[key.id] ? key.key : '•'.repeat(32)}
                      </code>
                      <div className="absolute inset-y-1 right-1 flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => toggleKeyVisibility(key.id)}
                        >
                          {visibleKeys[key.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => handleCopy(key.id, key.key)}
                        >
                          {copiedId === key.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right min-w-[100px]">
                      <div className="text-xs text-muted-foreground mb-1">Utilisation</div>
                      <div className="font-bold tabular-nums">
                        {key.usage.toLocaleString()} <span className="text-muted-foreground font-normal">/ {key.limit / 1000}k</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteKey(key.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Usage Progress Bar */}
                <div className="mt-6 h-1 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(key.usage / key.limit) * 100}%` }}
                    className="h-full bg-primary"
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <Card className="p-6 bg-background/40 backdrop-blur-md border-border/50">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          {icon}
        </div>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
      </div>
    </Card>
  );
}
