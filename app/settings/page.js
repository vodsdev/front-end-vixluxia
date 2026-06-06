'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { Bell, Lock, User, Palette, Shield, LogOut, Save, Loader2, CreditCard, Settings, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentSession, signOut, getUserProfile, upsertUserProfile, supabase } from '@/lib/supabase';
import { AnimateIn } from '@/components/animate-in';
import { Badge } from '@/components/ui/badge';

const SETTINGS_TABS = [
  { id: 'profile', label: 'Profil', icon: User, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { id: 'payments', label: 'Paiements', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'appearance', label: 'Apparence', icon: Palette, color: 'text-sky-500', bg: 'bg-sky-500/10' },
  { id: 'notifications', label: 'Notifications', icon: Bell, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 'privacy', label: 'Vie Privée', icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { id: 'security', label: 'Sécurité', icon: Lock, color: 'text-red-500', bg: 'bg-red-500/10' },
];

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [formData, setFormData] = useState({ name: '', email: '', bio: '', website: '', instagram: '', tiktok: '', rib: '' });
  const [notifications, setNotifications] = useState({ newComponents: true, weeklyDigest: true, comments: true, likes: false, emails: true });
  const [privacy, setPrivacy] = useState({ profilePublic: true, showEmail: false, allowMessages: true });

  useEffect(() => {
    async function loadData() {
      const currentSession = await getCurrentSession();
      if (currentSession?.user) {
        setSession(currentSession);
        setFormData(prev => ({ ...prev, email: currentSession.user.email }));
        
        const { data: profile } = await getUserProfile(currentSession.user.id);
        if (profile) {
          setFormData(prev => ({
            ...prev,
            name: profile.name || currentSession.user.user_metadata?.full_name || '',
            bio: profile.bio || '',
            website: profile.website || '',
            instagram: profile.instagram || '',
            tiktok: profile.tiktok || '',
            rib: profile.rib || '',
          }));
        } else {
          setFormData(prev => ({ ...prev, name: currentSession.user.user_metadata?.full_name || '' }));
        }
      } else {
        router.push('/auth');
      }
    }
    loadData();
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleSaveProfile = async () => {
    if (!session?.user) return;
    setLoading(true);
    try {
      const { error } = await upsertUserProfile({
        id: session.user.id,
        name: formData.name,
        bio: formData.bio,
        website: formData.website,
        instagram: formData.instagram,
        tiktok: formData.tiktok,
        rib: formData.rib,
        updated_at: new Date().toISOString()
      });
      await supabase.auth.updateUser({ data: { full_name: formData.name } });
      if (error) throw error;
      toast.success('Profil mis à jour !');
      router.refresh();
    } catch (error) {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      toast.error('Le mot de passe doit faire au moins 6 caractères.');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success('Mot de passe mis à jour !');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error.message || 'Erreur lors du changement de mot de passe');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGeneric = () => toast.success('Préférences enregistrées !');

  if (!session) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title="Paramètres" />
          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-12 max-w-5xl mx-auto w-full">
              <AnimateIn variant="fadeUp">
                <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-card p-8 shadow-2xl backdrop-blur-xl mb-10">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-orange-400/10 rounded-full blur-[80px] pointer-events-none" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <Badge variant="outline" className="mb-4 gap-2 px-3 py-1.5 rounded-full bg-zinc-500/10 text-zinc-400 border-none font-bold text-xs">
                        <Settings className="h-4 w-4" /> Configuration du compte
                      </Badge>
                      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Paramètres VixLuxia</h1>
                      <p className="text-muted-foreground text-sm">Gérez votre profil, vos paiements et vos préférences personnelles.</p>
                    </div>
                  </div>
                </section>
              </AnimateIn>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col md:flex-row gap-8">
                <TabsList className="flex flex-col h-auto w-full md:w-64 shrink-0 bg-transparent gap-2 p-0">
                  {SETTINGS_TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger key={tab.id} value={tab.id} className="w-full justify-start items-center gap-3 px-4 py-3 rounded-2xl data-[state=active]:bg-card data-[state=active]:shadow-xl data-[state=active]:border border-transparent data-[state=active]:border-border/50 hover:bg-muted/50 transition-all">
                        <div className={`w-8 h-8 rounded-xl ${tab.bg} flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${tab.color}`} />
                        </div>
                        <span className="font-bold">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <div className="flex-1 min-w-0">
                  {/* Profile Tab */}
                  <TabsContent value="profile" className="m-0 focus-visible:ring-0">
                    <AnimateIn variant="fadeUp">
                      <Card className="p-8 rounded-3xl border-border/50 shadow-xl bg-card/60 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center"><User className="w-5 h-5 text-violet-500" /></div>
                          <h3 className="text-2xl font-bold">Profil Public</h3>
                        </div>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="text-muted-foreground font-medium">Nom complet</Label>
                              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 rounded-xl bg-background/50 border-border/50" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-muted-foreground font-medium">Adresse Email (lecture seule)</Label>
                              <Input type="email" value={formData.email} disabled className="h-12 rounded-xl bg-muted/30 border-transparent opacity-60" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-muted-foreground font-medium">Biographie</Label>
                            <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="w-full h-32 px-4 py-3 rounded-xl border border-border/50 bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" placeholder="Décris-toi en quelques mots..." />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-muted-foreground font-medium">Site Web (Portfolio)</Label>
                            <Input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://" className="h-12 rounded-xl bg-background/50 border-border/50" />
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label className="text-muted-foreground font-medium">Instagram</Label>
                              <Input type="url" value={formData.instagram || ''} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} placeholder="https://instagram.com/..." className="h-12 rounded-xl bg-background/50 border-border/50" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-muted-foreground font-medium">TikTok</Label>
                              <Input type="url" value={formData.tiktok || ''} onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })} placeholder="https://tiktok.com/@..." className="h-12 rounded-xl bg-background/50 border-border/50" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-border/50 flex justify-end">
                          <Button className="h-12 px-8 rounded-xl bg-primary text-primary-foreground font-bold shadow-lg" onClick={handleSaveProfile} disabled={loading}>
                            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />} Sauvegarder
                          </Button>
                        </div>
                      </Card>
                    </AnimateIn>
                  </TabsContent>

                  {/* Payments Tab */}
                  <TabsContent value="payments" className="m-0 focus-visible:ring-0">
                    <AnimateIn variant="fadeUp">
                      <Card className="p-8 rounded-3xl border-border/50 shadow-xl bg-card/60 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-400/10 rounded-full blur-[60px] pointer-events-none" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center"><CreditCard className="w-5 h-5 text-emerald-500" /></div>
                            <h3 className="text-2xl font-bold">Coordonnées Bancaires</h3>
                          </div>
                          <p className="text-muted-foreground mb-8 max-w-xl">
                            Renseignez votre RIB/IBAN. Ces informations nous permettront de vous verser automatiquement les revenus de vos affiliations et les gains du coffre de vos Teams VixLuxia.
                          </p>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-muted-foreground font-medium">IBAN / RIB</Label>
                              <Input value={formData.rib} onChange={(e) => setFormData({ ...formData, rib: e.target.value })} placeholder="FR76 1234 5678 9101 1121 3141 516" className="h-14 rounded-2xl bg-background/80 font-mono text-lg border-emerald-500/30 focus-visible:ring-emerald-500/30" />
                            </div>
                          </div>
                          <div className="mt-8 pt-8 border-t border-border/50 flex justify-end">
                            <Button className="h-12 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20" onClick={handleSaveProfile} disabled={loading}>
                              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />} Enregistrer l'IBAN
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </AnimateIn>
                  </TabsContent>

                  {/* Appearance Tab */}
                  <TabsContent value="appearance" className="m-0 focus-visible:ring-0">
                    <AnimateIn variant="fadeUp">
                      <Card className="p-8 rounded-3xl border-border/50 shadow-xl bg-card/60 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center"><Palette className="w-5 h-5 text-sky-500" /></div>
                          <h3 className="text-2xl font-bold">Apparence</h3>
                        </div>
                        <div className="flex items-center justify-between p-6 rounded-2xl bg-background/50 border border-border/50">
                          <div>
                            <p className="font-bold">Thème Global</p>
                            <p className="text-sm text-muted-foreground mt-1">Personnalisez l'apparence de VixLuxia.</p>
                          </div>
                          <ThemeToggle />
                        </div>
                      </Card>
                    </AnimateIn>
                  </TabsContent>

                  {/* Notifications Tab */}
                  <TabsContent value="notifications" className="m-0 focus-visible:ring-0">
                    <AnimateIn variant="fadeUp">
                      <Card className="p-8 rounded-3xl border-border/50 shadow-xl bg-card/60 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center"><Bell className="w-5 h-5 text-amber-500" /></div>
                          <h3 className="text-2xl font-bold">Notifications</h3>
                        </div>
                        <div className="space-y-4">
                          {Object.entries(notifications).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-background/30 hover:bg-background/50 transition-colors border border-transparent hover:border-border/50">
                              <p className="font-semibold text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                              <Switch checked={value} onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })} />
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-border/50 flex justify-end">
                          <Button className="h-12 px-8 rounded-xl font-bold" onClick={handleSaveGeneric}><Save className="w-5 h-5 mr-2" /> Appliquer</Button>
                        </div>
                      </Card>
                    </AnimateIn>
                  </TabsContent>

                  {/* Privacy Tab */}
                  <TabsContent value="privacy" className="m-0 focus-visible:ring-0">
                    <AnimateIn variant="fadeUp">
                      <Card className="p-8 rounded-3xl border-border/50 shadow-xl bg-card/60 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center"><Shield className="w-5 h-5 text-indigo-500" /></div>
                          <h3 className="text-2xl font-bold">Vie Privée</h3>
                        </div>
                        <div className="space-y-4">
                          {Object.entries(privacy).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-background/30 hover:bg-background/50 transition-colors border border-transparent hover:border-border/50">
                              <p className="font-semibold text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                              <Switch checked={value} onCheckedChange={(checked) => setPrivacy({ ...privacy, [key]: checked })} />
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-border/50 flex justify-end">
                          <Button className="h-12 px-8 rounded-xl font-bold" onClick={handleSaveGeneric}><Save className="w-5 h-5 mr-2" /> Appliquer</Button>
                        </div>
                      </Card>
                    </AnimateIn>
                  </TabsContent>

                  {/* Security Tab */}
                  <TabsContent value="security" className="m-0 focus-visible:ring-0">
                    <AnimateIn variant="fadeUp">
                      <div className="space-y-6">
                        <Card className="p-8 rounded-3xl border-border/50 shadow-xl bg-card/60 backdrop-blur-sm">
                          <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><Lock className="w-5 h-5 text-red-500" /></div>
                            <h3 className="text-2xl font-bold">Sécurité du compte</h3>
                          </div>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label className="text-muted-foreground font-medium">Nouveau mot de passe</Label>
                              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-xl bg-background/50 border-border/50" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-muted-foreground font-medium">Confirmer le mot de passe</Label>
                              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-12 rounded-xl bg-background/50 border-border/50" />
                            </div>
                            <div className="pt-6 mt-6 border-t border-border/50 flex justify-between items-center">
                              <Button variant="outline" className="rounded-xl h-12 px-6" onClick={handleSignOut}>Forcer la déconnexion globale</Button>
                              <Button className="h-12 px-8 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold" onClick={handleSavePassword} disabled={loading || !password}>
                                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />} Mettre à jour
                              </Button>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-8 rounded-3xl border-red-500/30 bg-red-500/5 shadow-xl backdrop-blur-sm">
                          <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6 text-red-500" />
                            <h3 className="text-xl font-bold text-red-500">Zone de Danger</h3>
                          </div>
                          <p className="text-sm text-red-500/80 mb-6 font-medium">Ces actions sont permanentes et irréversibles. Soyez prudent.</p>
                          <div className="flex gap-4">
                            <Button variant="destructive" className="h-12 rounded-xl gap-2 font-bold shadow-lg shadow-red-500/20" onClick={handleSignOut}>
                              <LogOut className="w-5 h-5" /> Se déconnecter
                            </Button>
                            <Button variant="outline" className="h-12 rounded-xl border-red-500/30 text-red-500 hover:bg-red-500/10 font-bold">
                              Supprimer mon compte définitivement
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </AnimateIn>
                  </TabsContent>
                </div>
              </Tabs>
              
              <div className="mt-12"><AppFooter /></div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
