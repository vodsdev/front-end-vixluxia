import { redirect } from 'next/navigation';
import { getServerSubscription } from '@/lib/server/subscription';

export default async function ProfileRedirect() {
  const access = await getServerSubscription();
  
  if (!access.user) {
    redirect('/auth');
  }

  // Redirige vers la page publique du créateur correspondant à l'utilisateur
  redirect(`/creator/${access.user.id}`);
}
