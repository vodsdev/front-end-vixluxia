'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Sparkles, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { signInWithGitHub, signInWithGoogle, signInWithDiscord, signInWithEmail, signUpWithEmail } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AuthPage() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const fn = mode === 'signin' ? signInWithEmail : signUpWithEmail;
      const { error } = await fn(email, password);
      if (error) throw error;
      if (mode === 'signup') {
        setSuccess('Vérifie ta boîte mail pour confirmer ton compte !');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHub = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signInWithGitHub();
    if (error) { setError(error.message); setLoading(false); }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signInWithGoogle();
    if (error) { setError(error.message); setLoading(false); }
  };

  const handleDiscord = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signInWithDiscord();
    if (error) { setError(error.message); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - Brand */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden bg-neutral-950">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px]" />
        </div>
        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-violet-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-pulse">VixLuxia</span>
          </a>

          {/* Center content */}
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open-source component registry
            </div>
            <h1 className="text-5xl font-black leading-tight">
              Build beautiful<br />
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                interfaces
              </span>
              <br />faster.
            </h1>
            <p className="text-white/60 text-lg max-w-sm">
              500+ production-ready React components. Copy, paste, ship.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 text-white">
            {[['500+', 'Components'], ['50k+', 'Developers'], ['4.9★', 'Rating']].map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl font-black">{n}</p>
                <p className="text-white/50 text-sm">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Auth form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 max-w-xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-orange-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-pulse">VixLuxia</span>
          </div>

          <h2 className="text-2xl font-bold mb-1">
            {mode === 'signin' ? 'Bon retour 👋' : 'Créer un compte'}
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            {mode === 'signin'
              ? 'Connecte-toi pour accéder à tes composants.'
              : 'Rejoins la communauté VixLuxia.'}
          </p>

          {/* Social buttons */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={handleGitHub}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border bg-muted/30 hover:bg-muted/60 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>
            <button
              onClick={handleGoogle}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border bg-muted/30 hover:bg-muted/60 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button
              onClick={handleDiscord}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border bg-muted/30 hover:bg-muted/60 transition-colors text-sm font-medium disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 127.14 96.36">
                <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.08 0A72.37 72.37 0 0 0 45.67 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.73 56.6 5.49 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.1 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 55.32 0c.87.71 1.76 1.39 2.68 2a68.4 68.4 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c7.64-25.24 1.84-48.4-13.87-72.16zM42.56 65.3c-5.36 0-9.79-4.9-9.79-10.93s4.34-10.94 9.79-10.94c5.49 0 9.87 4.94 9.79 10.94 0 6.03-4.34 10.93-9.79 10.93zm42 0c-5.36 0-9.79-4.9-9.79-10.93s4.34-10.94 9.79-10.94c5.49 0 9.87 4.94 9.79 10.94 0 6.03-4.34 10.93-9.79 10.93z"/>
              </svg>
              Discord
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">ou continuer avec</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="toi@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                {mode === 'signin' && (
                  <a href="#" className="text-xs text-primary hover:underline">Mot de passe oublié ?</a>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 rounded-xl pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            {success && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 rounded-lg"
              >
                {success}
              </motion.p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl font-medium gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {mode === 'signin' ? 'Se connecter' : 'Créer le compte'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle mode */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === 'signin' ? "Pas encore de compte ? " : "Déjà un compte ? "}
            <button
              onClick={() => { setMode(m => m === 'signin' ? 'signup' : 'signin'); setError(null); setSuccess(null); }}
              className="text-primary font-medium hover:underline"
            >
              {mode === 'signin' ? "S'inscrire gratuitement" : 'Se connecter'}
            </button>
          </p>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            En continuant, tu acceptes nos{' '}
            <a href="#" className="underline underline-offset-2">CGU</a>
            {' '}et notre{' '}
            <a href="#" className="underline underline-offset-2">Politique de confidentialité</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
