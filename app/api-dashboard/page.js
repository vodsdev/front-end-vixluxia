'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Eye, EyeOff, Trash2, Plus, TrendingUp, Zap, AlertCircle } from 'lucide-react';

/**
 * API Dashboard - Avec visualisation 3D de l'utilisation
 */
export default function APIDashboard() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Production Key',
      key: 'vx_live_abc123def456ghi789jkl',
      created: '2024-01-15',
      usage: 8542,
      limit: 10000,
      status: 'active',
      lastUsed: '2 minutes ago',
    },
    {
      id: 2,
      name: 'Development Key',
      key: 'vx_test_xyz789uvw456rst123',
      created: '2024-01-10',
      usage: 2341,
      limit: 10000,
      status: 'active',
      lastUsed: '1 hour ago',
    },
  ]);

  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [visibleKeys, setVisibleKeys] = useState({});

  const toggleKeyVisibility = (id) => {
    setVisibleKeys(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;

    const newKey = {
      id: apiKeys.length + 1,
      name: newKeyName,
      key: `vx_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0],
      usage: 0,
      limit: 10000,
      status: 'active',
      lastUsed: 'Never',
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setShowNewKeyForm(false);
  };

  const handleDeleteKey = (id) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const totalUsage = apiKeys.reduce((sum, key) => sum + key.usage, 0);
  const totalLimit = apiKeys.reduce((sum, key) => sum + key.limit, 0);
  const usagePercentage = (totalUsage / totalLimit) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">API Dashboard</h1>
          <p className="text-slate-400">Gérez vos clés API et suivez votre utilisation en temps réel</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Requêtes Totales"
            value={totalUsage.toLocaleString()}
            icon={<Zap className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            title="Limite Mensuelle"
            value={totalLimit.toLocaleString()}
            icon={<TrendingUp className="w-6 h-6" />}
            color="purple"
          />
          <StatCard
            title="Utilisation"
            value={`${usagePercentage.toFixed(1)}%`}
            icon={<AlertCircle className="w-6 h-6" />}
            color={usagePercentage > 80 ? 'red' : 'green'}
          />
        </div>

        {/* 3D Usage Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 mb-8 backdrop-blur-sm"
        >
          <h2 className="text-xl font-bold mb-6">Visualisation 3D de l'Utilisation</h2>
          <div className="h-64 bg-slate-800/30 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* 3D Bar Chart Animation */}
            <div className="flex items-end justify-center gap-4 h-full w-full p-8">
              {apiKeys.map((key, idx) => {
                const height = (key.usage / key.limit) * 100;
                return (
                  <motion.div
                    key={key.id}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: idx * 0.2, duration: 0.8 }}
                    className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg shadow-lg hover:from-blue-500 hover:to-blue-300 transition-all cursor-pointer relative group"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      <p className="text-sm font-medium">{key.name}</p>
                      <p className="text-xs text-slate-400">{key.usage}/{key.limit}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Usage Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Utilisation Globale</h3>
            <span className="text-sm text-slate-400">{totalUsage.toLocaleString()} / {totalLimit.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${usagePercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                usagePercentage > 80 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                usagePercentage > 50 ? 'bg-gradient-to-r from-yellow-600 to-yellow-400' :
                'bg-gradient-to-r from-green-600 to-green-400'
              }`}
            />
          </div>
        </motion.div>

        {/* API Keys Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Vos Clés API</h2>
            <button
              onClick={() => setShowNewKeyForm(!showNewKeyForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nouvelle Clé
            </button>
          </div>

          {/* New Key Form */}
          {showNewKeyForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6 backdrop-blur-sm"
            >
              <div className="flex gap-4">
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="Nom de la clé (ex: Production, Staging...)"
                  className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCreateKey}
                  className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors font-medium"
                >
                  Créer
                </button>
                <button
                  onClick={() => setShowNewKeyForm(false)}
                  className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Annuler
                </button>
              </div>
            </motion.div>
          )}

          {/* Keys List */}
          <div className="space-y-4">
            {apiKeys.map((key, idx) => (
              <motion.div
                key={key.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{key.name}</h3>
                    <p className="text-sm text-slate-400">Créée le {key.created}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    key.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {key.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>

                {/* Key Display */}
                <div className="bg-slate-800/30 rounded-lg p-4 mb-4 flex items-center justify-between">
                  <code className="text-sm text-slate-300 font-mono">
                    {visibleKeys[key.id] ? key.key : '•'.repeat(key.key.length)}
                  </code>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleKeyVisibility(key.id)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      {visibleKeys[key.id] ? (
                        <EyeOff className="w-4 h-4 text-slate-400" />
                      ) : (
                        <Eye className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(key.key)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Utilisation</p>
                    <p className="text-lg font-semibold">{key.usage.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Limite</p>
                    <p className="text-lg font-semibold">{key.limit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Dernière utilisation</p>
                    <p className="text-lg font-semibold">{key.lastUsed}</p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteKey(key.id)}
                  className="w-full py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Supprimer
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Composant Stat Card
 */
function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'from-blue-600/20 to-blue-500/10 border-blue-500/20 text-blue-400',
    purple: 'from-purple-600/20 to-purple-500/10 border-purple-500/20 text-purple-400',
    green: 'from-green-600/20 to-green-500/10 border-green-500/20 text-green-400',
    red: 'from-red-600/20 to-red-500/10 border-red-500/20 text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <div className={colorClasses[color].split(' ')[3]}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  );
}
