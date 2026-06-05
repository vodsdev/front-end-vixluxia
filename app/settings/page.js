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
import { Bell, Lock, User, Palette, Shield, LogOut, Save, Loader2, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentSession, signOut, getUserProfile, upsertUserProfile, supabase } from '@/lib/supabase';

const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'payments', label: 'Paiements', icon: CreditCard },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'security', label: 'Security', icon: Lock },
];

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    website: '',
    instagram: '',
    tiktok: '',
    rib: '',
  });

  const [notifications, setNotifications] = useState({
    newComponents: true,
    weeklyDigest: true,
    comments: true,
    likes: false,
    emails: true,
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    allowMessages: true,
  });

  useEffect(() => {
    async function loadData() {
      const currentSession = await getCurrentSession();
      if (currentSession?.user) {
        setSession(currentSession);
        setFormData(prev => ({ ...prev, email: currentSession.user.email }));
        
        // Load profile from database
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
          setFormData(prev => ({
            ...prev,
            name: currentSession.user.user_metadata?.full_name || '',
          }));
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
      
      // Also update auth user metadata for the name
      await supabase.auth.updateUser({
        data: { full_name: formData.name }
      });

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
      const { error } = await supabase.auth.updateUser({
        password: password
      });
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

  const handleSaveGeneric = () => {
    toast.success('Préférences enregistrées !');
  };

  if (!session) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <main className="flex-1 flex flex-col min-w-0">
          <AppHeader title="Settings" />

          <div className="flex-1 overflow-auto">
            <div className="p-6 lg:p-8 max-w-4xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-6 mb-8">
                    {SETTINGS_TABS.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                          <Icon className="w-4 h-4 hidden sm:block" />
                          <span className="hidden sm:inline">{tab.label}</span>
                          <span className="sm:hidden text-xs">{tab.label.slice(0, 3)}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {/* Profile Tab */}
                  <TabsContent value="profile" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold mb-4">Informations du Profil</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium">Nom complet</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium">Adresse Email (lecture seule)</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            disabled
                            className="mt-1.5 opacity-60"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                          <textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full mt-1.5 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                            placeholder="Décris-toi en quelques mots..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="website" className="text-sm font-medium">Site Web ou Portfolio</Label>
                          <Input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://..."
                            className="mt-1.5"
                          />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <Label htmlFor="instagram" className="text-sm font-medium">Instagram</Label>
                            <Input
                              id="instagram"
                              type="url"
                              value={formData.instagram || ''}
                              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                              placeholder="https://instagram.com/..."
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="tiktok" className="text-sm font-medium">TikTok</Label>
                            <Input
                              id="tiktok"
                              type="url"
                              value={formData.tiktok || ''}
                              onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                              placeholder="https://tiktok.com/@..."
                              className="mt-1.5"
                            />
                          </div>
                        </div>
                      </div>
                      <Button className="mt-6 gap-2" onClick={handleSaveProfile} disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Sauvegarder le profil
                      </Button>
                    </Card>
                  </TabsContent>

                  {/* Payments Tab */}
                  <TabsContent value="payments" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold mb-4">Informations Bancaires (RIB)</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Ajoute ton RIB/IBAN pour recevoir automatiquement l'argent généré par tes affiliations et le coffre de ton équipe VixLuxia.
                      </p>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="rib" className="text-sm font-medium">IBAN / RIB</Label>
                          <Input
                            id="rib"
                            value={formData.rib}
                            onChange={(e) => setFormData({ ...formData, rib: e.target.value })}
                            placeholder="FR76 1234 5678 9101 1121 3141 516"
                            className="mt-1.5 font-mono"
                          />
                        </div>
                      </div>
                      <Button className="mt-6 gap-2" onClick={handleSaveProfile} disabled={loading}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Sauvegarder le RIB
                      </Button>
                    </Card>
                  </TabsContent>

                  {/* Appearance Tab */}
                  <TabsContent value="appearance" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold mb-4">Thème</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Mode Sombre</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Basculer entre le thème clair et sombre</p>
                          </div>
                          <ThemeToggle />
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Notifications Tab */}
                  <TabsContent value="notifications" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold mb-4">Préférences de Notification</h3>
                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                            <div>
                              <p className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                            </div>
                            <Switch
                              checked={value}
                              onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })}
                            />
                          </div>
                        ))}
                      </div>
                      <Button className="mt-6 gap-2" onClick={handleSaveGeneric}>
                        <Save className="w-4 h-4" />
                        Sauvegarder les préférences
                      </Button>
                    </Card>
                  </TabsContent>

                  {/* Privacy Tab */}
                  <TabsContent value="privacy" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold mb-4">Confidentialité</h3>
                      <div className="space-y-4">
                        {Object.entries(privacy).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                            <div>
                              <p className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                            </div>
                            <Switch
                              checked={value}
                              onCheckedChange={(checked) => setPrivacy({ ...privacy, [key]: checked })}
                            />
                          </div>
                        ))}
                      </div>
                      <Button className="mt-6 gap-2" onClick={handleSaveGeneric}>
                        <Save className="w-4 h-4" />
                        Sauvegarder la confidentialité
                      </Button>
                    </Card>
                  </TabsContent>

                  {/* Security Tab */}
                  <TabsContent value="security" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold mb-4">Sécurité</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="password" className="text-sm font-medium">Nouveau mot de passe</Label>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez le nouveau mot de passe"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirm-password" className="text-sm font-medium">Confirmer le mot de passe</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmez le nouveau mot de passe"
                            className="mt-1.5"
                          />
                        </div>
                        <div className="pt-4 border-t border-border/50">
                          <Button variant="outline" size="sm" onClick={handleSignOut}>Se déconnecter de tous les appareils</Button>
                        </div>
                      </div>
                      <Button className="mt-6 gap-2" onClick={handleSavePassword} disabled={loading || !password}>
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Mettre à jour la sécurité
                      </Button>
                    </Card>

                    <Card className="p-6 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
                      <h3 className="text-lg font-bold mb-4 text-red-600 dark:text-red-400">Zone de Danger</h3>
                      <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                        Ces actions sont irréversibles.
                      </p>
                      <div className="flex gap-4">
                        <Button variant="destructive" className="gap-2" onClick={handleSignOut}>
                          <LogOut className="w-4 h-4" />
                          Se déconnecter
                        </Button>
                        <Button variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-100 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950">
                          Supprimer le compte
                        </Button>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>

              <AppFooter />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
