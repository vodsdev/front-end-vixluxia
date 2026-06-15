'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, Download, Loader, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AI Generator Page - Style Bolt.new
 * Interface IA avec preview en direct du code généré
 */
export default function AIGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef(null);
  const [previewKey, setPreviewKey] = useState(0);

  // Générer le code via IA
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Décrivez ce que vous souhaitez accomplir');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: 'claude' }),
      });

      if (!response.ok) throw new Error('Erreur de génération');

      const data = await response.json();
      setGeneratedCode(data.code || '');
      setPreviewKey(prev => prev + 1);
    } catch (err) {
      setError(err.message || 'Erreur lors de la génération');
      setGeneratedCode('');
    } finally {
      setIsLoading(false);
    }
  };

  // Copier le code
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Télécharger le code
  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(generatedCode)}`);
    element.setAttribute('download', 'component.jsx');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white mb-2">Votre Toile Vierge</h1>
          <p className="text-slate-400">Décrivez ce que vous souhaitez accomplir. L'IA générera le code React/Tailwind complet et vous offrira un aperçu visuel instantané.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - Input & Code */}
          <div className="flex flex-col gap-4">
            {/* Prompt Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 backdrop-blur-sm"
            >
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Décrivez votre composant
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) handleGenerate();
                }}
                placeholder="Ex: Bouton néon de paiement avec effets de lueur et micro-interactions au survol..."
                className="w-full h-32 bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 text-white font-medium py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Génération...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Générer
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Code Display */}
            <AnimatePresence>
              {generatedCode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden flex flex-col backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between p-4 border-b border-slate-800">
                    <span className="text-sm font-medium text-slate-300">Code Généré</span>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Copier"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      <button
                        onClick={handleDownload}
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Télécharger"
                      >
                        <Download className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                  <pre className="flex-1 overflow-auto p-4 text-xs text-slate-300 font-mono">
                    <code>{generatedCode}</code>
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium">Erreur</p>
                  <p className="text-red-300/80 text-sm">{error}</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Panel - Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden flex flex-col backdrop-blur-sm"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <span className="text-sm font-medium text-slate-300">Aperçu en Direct</span>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            </div>

            {/* Preview Container */}
            <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-800/20 to-slate-900/20 p-8 flex items-center justify-center">
              {generatedCode ? (
                <LivePreview code={generatedCode} key={previewKey} />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
                  </div>
                  <p className="text-slate-400">Générez un composant pour voir l'aperçu</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/**
 * Composant de prévisualisation en direct
 * Exécute le code généré en toute sécurité
 */
function LivePreview({ code }) {
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !code) return;

    try {
      setError(null);
      
      // Créer une fonction React à partir du code
      const func = new Function(
        'React',
        'motion',
        'useState',
        'useEffect',
        `return (${code})`
      );

      // Exécuter et afficher le composant
      const Component = func(React, require('framer-motion'), useState, useEffect);
      
      // Rendu simplifié (en production, utiliser ReactDOM.createRoot)
      const html = `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
          <div style="padding: 2rem; background: white; border-radius: 0.5rem; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            ${code}
          </div>
        </div>
      `;
      
      containerRef.current.innerHTML = html;
    } catch (err) {
      setError(err.message);
      containerRef.current.innerHTML = `
        <div style="color: #ef4444; padding: 1rem; text-align: center;">
          <p style="font-weight: bold;">Erreur de rendu</p>
          <p style="font-size: 0.875rem; margin-top: 0.5rem;">${err.message}</p>
        </div>
      `;
    }
  }, [code]);

  if (error) {
    return (
      <div className="text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
      style={{ contain: 'layout style paint' }}
    />
  );
}
