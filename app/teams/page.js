'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Users, Lock, Instagram, Plus, Search, ArrowRight, ShieldCheck, Gem } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { AnimateIn } from '@/components/animate-in';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export default function TeamsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [createName, setCreateName] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createInstagram, setCreateInstagram] = useState('');
  
  const [joinPassword, setJoinPassword] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      // Dans un vrai environnement, on récupère de la BDD.
      // Si la table n'existe pas encore, on met des fausses données.
      const { data, error } = await supabase.from('teams').select('id, name, instagram_url, created_at').limit(20);
      
      if (error) {
        // Fallback mockup if table doesn't exist
        setTeams([]);
      } else {
        setTeams(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Vous devez être connecté.');
    if (!createName || !createPassword || !createInstagram) {
      return toast.error('Tous les champs sont obligatoires.');
    }
    if (!createInstagram.includes('instagram.com/')) {
      return toast.error('Le lien Instagram doit être valide.');
    }

    try {
      const id = createName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36);
      const { error } = await supabase.from('teams').insert({
        id,
        name: createName,
        password: createPassword, // Note: en prod, hasher le mot de passe !
        instagram_url: createInstagram,
        owner_id: user.id,
        vault_balance: 0
      });

      if (error) throw error;

      // Ajouter le owner comme membre
      await supabase.from('team_members').insert({
        team_id: id,
        user_id: user.id,
        role: 'owner'
      });

      toast.success('Team créée avec succès !');
      router.push(`/teams/${id}`);
    } catch (err) {
      toast.error('La base de données n\'est pas encore configurée. ' + err.message);
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Vous devez être connecté.');
    if (!selectedTeam || !joinPassword) return toast.error('Mot de passe requis.');

    try {
      // Vérifier le mot de passe
      const { data, error } = await supabase
        .from('teams')
        .select('password')
        .eq('id', selectedTeam.id)
        .single();

      if (error || data?.password !== joinPassword) {
        return toast.error('Mot de passe incorrect.');
      }

      // Rejoindre
      await supabase.from('team_members').insert({
        team_id: selectedTeam.id,
        user_id: user.id,
        role: 'member'
      });

      // Bonus au coffre de la team pour une nouvelle inscription (+0.50)
      // Logic backend/RPC idéale, ici simulée
      toast.success('Bienvenue dans la team !');
      router.push(`/teams/${selectedTeam.id}`);
    } catch (err) {
      toast.error('Erreur lors de la connexion à la team.');
    }
  };

  const filteredTeams = teams.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <PageShell title="Équipes & Affiliation" maxWidth="max-w-[1200px]">
      <div className="space-y-8">
        <AnimateIn variant="fadeUp">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 gap-2 bg-primary/10 text-primary border-primary/20">
                <Users className="h-3.5 w-3.5" />
                Teams & Coffre
              </Badge>
              <h1 className="text-3xl font-black tracking-tight lg:text-4xl">Rejoins une Team ou crée la tienne</h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Invite tes amis, discutez en direct, et gagnez de l'argent ensemble. Chaque nouveau membre et abonnement remplit le coffre de l'équipe !
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="rounded-xl shadow-lg gap-2 shrink-0">
                  <Plus className="w-4 h-4" />
                  Créer ma Team
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Créer une nouvelle Team</DialogTitle>
                  <DialogDescription>
                    Deviens le leader. Ton lien Instagram est obligatoire pour que les membres te trouvent.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTeam} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de la Team</Label>
                    <Input id="name" value={createName} onChange={(e) => setCreateName(e.target.value)} placeholder="Ex: Les Devs Fous" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Lien Instagram (Obligatoire)</Label>
                    <div className="relative">
                      <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="instagram" type="url" value={createInstagram} onChange={(e) => setCreateInstagram(e.target.value)} placeholder="https://instagram.com/ton_compte" className="pl-9" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe secret</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="password" type="password" value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} placeholder="••••••••" className="pl-9" required />
                    </div>
                    <p className="text-[10px] text-muted-foreground">À donner à tes invités pour qu'ils puissent rejoindre.</p>
                  </div>
                  <Button type="submit" className="w-full mt-4">Créer et accéder au coffre</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </AnimateIn>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une team..." 
            className="h-12 pl-11 rounded-xl bg-card border-border/50 text-base shadow-sm"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeams.map((team) => (
            <Card key={team.id} className="p-5 flex flex-col h-full bg-card/80 border-border/50 hover:border-primary/50 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {team.name.substring(0, 2).toUpperCase()}
                </div>
                <Badge variant="secondary" className="gap-1 bg-muted/50">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Privée
                </Badge>
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-1">{team.name}</h3>
              <a href={team.instagram_url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-6">
                <Instagram className="w-3 h-3" />
                Contacter l'Owner
              </a>
              
              <div className="mt-auto flex gap-2">
                <Dialog open={isJoinOpen && selectedTeam?.id === team.id} onOpenChange={(val) => { setIsJoinOpen(val); if(val) setSelectedTeam(team); }}>
                  <DialogTrigger asChild>
                    <Button variant="default" className="flex-1 w-full gap-2">
                      <Lock className="w-4 h-4" />
                      Rejoindre
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Rejoindre {team.name}</DialogTitle>
                      <DialogDescription>
                        Cette team est protégée. Demande le mot de passe au créateur sur Instagram.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleJoinTeam} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="join-pwd">Mot de passe de la team</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="join-pwd" type="password" value={joinPassword} onChange={(e) => setJoinPassword(e.target.value)} placeholder="••••••••" className="pl-9" required />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">Valider et Rejoindre</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
