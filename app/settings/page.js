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
import { Bell, Lock, User, Palette, Shield, LogOut, Save } from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentSession, signOut } from '@/lib/supabase';

const SETTINGS_TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'security', label: 'Security', icon: Lock },
];

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: '',
    bio: 'UI/UX Designer & Developer',
    website: 'https://example.com',
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
    async function loadSession() {
      const session = await getCurrentSession();
      if (session?.user) {
        setFormData(prev => ({ ...prev, email: session.user.email, name: session.user.user_metadata?.full_name || 'My Account' }));
      }
    }
    loadSession();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

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
                  {/* Tabs List */}
                  <TabsList className="grid w-full grid-cols-5 mb-8">
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
                      <h3 className="text-lg font-bold mb-4">Profile Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                          <textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full mt-1.5 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            rows="3"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                          <Input
                            id="website"
                            type="url"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="mt-1.5"
                          />
                        </div>
                      </div>
                      <Button className="mt-6 gap-2" onClick={handleSave}>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                    </Card>
                  </TabsContent>

                  {/* Appearance Tab */}
                  <TabsContent value="appearance" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold mb-4">Theme Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">Dark Mode</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Toggle between light and dark theme</p>
                          </div>
                          <ThemeToggle />
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  {/* Notifications Tab */}
                  <TabsContent value="notifications" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                            <div>
                              <p className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {key === 'newComponents' && 'Get notified when new components are published'}
                                {key === 'weeklyDigest' && 'Receive a weekly digest of popular components'}
                                {key === 'comments' && 'Get notified when someone comments on your components'}
                                {key === 'likes' && 'Get notified when someone likes your components'}
                                {key === 'emails' && 'Receive email notifications'}
                              </p>
                            </div>
                            <Switch
                              checked={value}
                              onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })}
                            />
                          </div>
                        ))}
                      </div>
                      <Button className="mt-6 gap-2" onClick={handleSave}>
                        <Save className="w-4 h-4" />
                        Save Preferences
                      </Button>
                    </Card>
                  </TabsContent>

                  {/* Privacy Tab */}
                  <TabsContent value="privacy" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold mb-4">Privacy Settings</h3>
                      <div className="space-y-4">
                        {Object.entries(privacy).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                            <div>
                              <p className="font-medium text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {key === 'profilePublic' && 'Make your profile visible to everyone'}
                                {key === 'showEmail' && 'Show your email address on your profile'}
                                {key === 'allowMessages' && 'Allow other users to send you messages'}
                              </p>
                            </div>
                            <Switch
                              checked={value}
                              onCheckedChange={(checked) => setPrivacy({ ...privacy, [key]: checked })}
                            />
                          </div>
                        ))}
                      </div>
                      <Button className="mt-6 gap-2" onClick={handleSave}>
                        <Save className="w-4 h-4" />
                        Save Privacy Settings
                      </Button>
                    </Card>
                  </TabsContent>

                  {/* Security Tab */}
                  <TabsContent value="security" className="space-y-6">
                    <Card className="p-6">
                      <h3 className="text-lg font-bold mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="password" className="text-sm font-medium">Change Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter new password"
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm new password"
                            className="mt-1.5"
                          />
                        </div>
                        <div className="pt-4 border-t border-border/50">
                          <p className="font-medium text-sm mb-3">Active Sessions</p>
                          <p className="text-xs text-muted-foreground mb-3">You have 2 active sessions</p>
                          <Button variant="outline" size="sm">Sign Out All Sessions</Button>
                        </div>
                      </div>
                      <Button className="mt-6 gap-2" onClick={handleSave}>
                        <Save className="w-4 h-4" />
                        Update Security
                      </Button>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="p-6 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30">
                      <h3 className="text-lg font-bold mb-4 text-red-600 dark:text-red-400">Danger Zone</h3>
                      <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                        These actions cannot be undone. Please be careful.
                      </p>
                      <div className="flex gap-4">
                        <Button variant="destructive" className="gap-2" onClick={handleSignOut}>
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </Button>
                        <Button variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-100 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950">
                          Delete Account
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
