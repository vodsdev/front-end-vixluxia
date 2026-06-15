'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Settings, LogOut, KeyRound, User as UserIcon, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { CommandMenu } from '@/components/layout/command-menu';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser, signOut, getUserProfile } from '@/lib/supabase';

export function AppHeader({ title, children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        if (currentUser) {
          const { data } = await getUserProfile(currentUser.id);
          setProfile(data);
        }
      } catch (err) {
        console.error('Error loading user:', err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setProfile(null);
    router.refresh();
  };

  return (
    <header className="h-14 flex items-center justify-between px-6 sticky top-0 bg-transparent backdrop-blur-xl z-50 border-b border-border/40">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <h2 className="font-semibold text-sm">{title}</h2>
        {children}
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setCommandPaletteOpen(true)}>
          <Search className="h-4 w-4" />
        </Button>
        <CommandMenu open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
        <ThemeToggle />
        {!loading && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || user.user_metadata?.avatar_url} alt={profile?.full_name || profile?.username || user.user_metadata?.full_name || 'Avatar'} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {(profile?.full_name || profile?.username || user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <Link href="/profile" className="flex flex-col space-y-1 cursor-pointer hover:underline">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">{profile?.full_name || profile?.username || user.user_metadata?.full_name || 'My Account'}</p>
                    {profile?.current_streak > 0 && (
                      <span className="flex items-center text-xs font-medium text-orange-500">
                        🔥 {profile.current_streak}
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/api-dashboard" className="cursor-pointer">
                  <KeyRound className="mr-2 h-4 w-4" />
                  <span>API Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-500 focus:text-red-500 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          !loading && (
            <Button variant="ghost" size="sm" className="text-xs font-medium hidden sm:inline-flex" asChild>
              <Link href="/auth">Log in</Link>
            </Button>
          )
        )}
        
        <Button size="sm" className="text-xs font-medium rounded-full px-4 shadow-sm" asChild>
          <Link href="/publish">Publish</Link>
        </Button>
      </div>
    </header>
  );
}
