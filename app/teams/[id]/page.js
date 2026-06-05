'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Users, Lock, Send, MessageSquare, Gem, ArrowUpRight, Settings, Loader2 } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TeamDashboardPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  
  const [team, setTeam] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Dans un cas réel, vérifier l'accès (si l'user est bien membre).
    // Et fetcher les détails de la team.
    if (!id) return;
    
    // Mock Data pour la démonstration
    setTeam({
      id,
      name: 'Les Devs Fous',
      vault_balance: 45.50,
      members_count: 12,
      owner_id: user?.id, // Mocking current user as owner
    });
    
    setMessages([
      { id: 1, user_id: 'user1', name: 'bry Vods', content: 'Bienvenue dans la team les gars !', created_at: new Date(Date.now() - 3600000).toISOString() },
      { id: 2, user_id: 'user2', name: 'Alex', content: 'Salut ! Prêt à faire monter le coffre !', created_at: new Date(Date.now() - 3000000).toISOString() },
    ]);
    
    setIsOwner(true); // Mock
  }, [id, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    
    // En prod : supabase.from('team_messages').insert(...)
    const msg = {
      id: Date.now(),
      user_id: user.id,
      name: user.user_metadata?.full_name || 'Moi',
      content: newMessage,
      created_at: new Date().toISOString()
    };
    
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const distributeVault = () => {
    if (team.vault_balance === 0) return toast.error('Le coffre est vide.');
    toast.success(`Distribution de ${team.vault_balance}€ lancée ! Les membres ayant renseigné leur RIB recevront leur part.`);
    setTeam({ ...team, vault_balance: 0 });
  };

  if (!team) return <PageShell title="Chargement..."><div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin" /></div></PageShell>;

  return (
    <PageShell title={`Team: ${team.name}`} maxWidth="max-w-[1400px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 h-[calc(100vh-140px)]">
        
        {/* Chat Area */}
        <Card className="flex flex-col border-border/50 bg-card/80 shadow-sm overflow-hidden h-full">
          <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="font-bold">Chat d'équipe</h2>
            <Badge variant="outline" className="ml-auto">{team.members_count} membres</Badge>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isMe = msg.user_id === user?.id;
              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-muted-foreground mb-1 ml-1">{msg.name}</span>
                  <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${isMe ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-background border-t border-border/50">
            <form onSubmit={handleSendMessage} className="relative flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Envoyer un message à l'équipe..."
                className="pr-12 bg-muted/50 rounded-full"
              />
              <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full" disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Sidebar: Vault & Settings */}
        <div className="space-y-6 flex flex-col h-full overflow-y-auto">
          {/* Coffre */}
          <Card className="p-6 border-border/50 bg-gradient-to-br from-card to-muted/50 shadow-sm relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-2 text-primary font-bold">
              <Gem className="w-5 h-5" />
              Coffre de la Team
            </div>
            <h3 className="text-4xl font-black mb-1">{team.vault_balance.toFixed(2)} €</h3>
            <p className="text-xs text-muted-foreground mb-6">
              +0.50€ par invité, +3.00€ par abonnement premium.
            </p>
            
            {isOwner ? (
              <Button onClick={distributeVault} className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                <ArrowUpRight className="w-4 h-4" />
                Distribuer aux membres
              </Button>
            ) : (
              <Button variant="outline" className="w-full" disabled>
                Seul le Owner peut distribuer
              </Button>
            )}
            <p className="text-[10px] text-center mt-3 text-muted-foreground">
              Les fonds sont envoyés vers le RIB enregistré dans vos paramètres.
            </p>
          </Card>

          {/* Info & Settings */}
          <Card className="p-5 border-border/50 shadow-sm flex-1">
            <Tabs defaultValue="members" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="members">Membres</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
              </TabsList>
              
              <TabsContent value="members" className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 text-sm">
                  <span className="font-medium">bry Vods</span>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Owner</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 text-sm">
                  <span className="font-medium">Alex</span>
                  <Badge variant="outline">Membre</Badge>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                {isOwner ? (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Changer le mot de passe</Label>
                      <Input type="password" placeholder="Nouveau mot de passe" className="h-9 text-xs" />
                      <Button size="sm" variant="secondary" className="w-full text-xs">Mettre à jour</Button>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground text-center py-4">Seul le propriétaire peut modifier les paramètres.</p>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>

      </div>
    </PageShell>
  );
}
