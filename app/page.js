'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Code2, Users, Download } from 'lucide-react';

/**
 * Landing Page Enhanced - Ultra-fluide avec animations
 */
export default function LandingEnhanced() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">Vixluxia 3.0 is now live</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent"
          >
            Design exactly<br />what you imagine.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto"
          >
            Elevate your workflow with stunning, copy-paste React components. Built with Tailwind CSS, Radix UI, and Framer Motion for ultimate flexibility and performance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-500/50">
              Start Building
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-3 border border-slate-700 hover:border-slate-600 rounded-lg font-semibold transition-all hover:bg-slate-800/50">
              View on GitHub
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedStat number={500} label="Components" icon={<Code2 className="w-8 h-8" />} />
            <AnimatedStat number={50} label="Creators" icon={<Users className="w-8 h-8" />} />
            <AnimatedStat number={10000} label="Downloads" icon={<Download className="w-8 h-8" />} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-16 text-center"
          >
            Nouveaux espaces
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="API"
              description="Documentation claire pour brancher les endpoints VixLuxia."
              icon={<Zap className="w-6 h-6" />}
            />
            <FeatureCard
              title="Abonnement"
              description="Offres Free, Pro et Studio avec une structure prête pour Stripe."
              icon={<Code2 className="w-6 h-6" />}
            />
            <FeatureCard
              title="Affiliation"
              description="Lien d'invitation, commissions et suivi des conversions."
              icon={<Users className="w-6 h-6" />}
            />
            <FeatureCard
              title="IA premium"
              description="Assistant IA verrouillé pour les comptes payants."
              icon={<Zap className="w-6 h-6" />}
            />
            <FeatureCard
              title="Publish"
              description="Soumission de composants avec preview et sauvegarde locale."
              icon={<Code2 className="w-6 h-6" />}
            />
            <FeatureCard
              title="API Keys"
              description="Génération de clés pour consommer l'API publique."
              icon={<Download className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Prêt à transformer votre workflow ?</h2>
          <p className="text-xl text-slate-400 mb-8">Rejoignez des milliers de développeurs utilisant Vixluxia.</p>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-500/50 mx-auto">
            Commencer Maintenant
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>
    </div>
  );
}

/**
 * Composant Stat Animé avec Compteur
 */
function AnimatedStat({ number, label, icon }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = number / 50;
    const timer = setInterval(() => {
      start += increment;
      if (start >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 text-center hover:border-slate-700 transition-all hover:bg-slate-900/70"
    >
      <div className="text-blue-400 mb-4 flex justify-center">
        {icon}
      </div>
      <div className="text-5xl font-bold mb-2">{count.toLocaleString()}+</div>
      <p className="text-slate-400">{label}</p>
    </motion.div>
  );
}

/**
 * Composant Feature Card
 */
function FeatureCard({ title, description, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:bg-slate-900/70"
    >
      <div className="text-blue-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </motion.div>
  );
}
// Forced update Mon Jun 15 21:20:45 UTC 2026
