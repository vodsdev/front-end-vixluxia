import { createClient } from '@/utils/supabase/client';

export const supabase = createClient();

// ─── Auth helpers ──────────────────────────────────────────────────────────

export async function signInWithGitHub() {
  return supabase.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
}

export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  });
}

export async function signInWithDiscord() {
  return supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: { 
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: { prompt: 'consent' }
    },
  });
}

export async function signInWithEmail(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email, password) {
  return supabase.auth.signUp({ email, password });
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// ─── Database helpers ──────────────────────────────────────────────────────

// Components/Bookmarks
export async function getComponents(filters = {}) {
  let query = supabase.from('components').select('*');
  if (filters.category) query = query.eq('category', filters.category);
  if (filters.userId) query = query.eq('user_id', filters.userId);
  if (filters.search) query = query.ilike('name', `%${filters.search}%`);
  query = query.order('created_at', { ascending: false });
  return query;
}

export async function getComponentById(id) {
  return supabase.from('components').select('*').eq('id', id).single();
}

export async function createComponent(data) {
  return supabase.from('components').insert(data).select().single();
}

export async function updateComponent(id, data) {
  return supabase.from('components').update(data).eq('id', id).select().single();
}

export async function deleteComponent(id) {
  return supabase.from('components').delete().eq('id', id);
}

// Likes / bookmarks
export async function likeComponent(componentId, userId) {
  return supabase.from('likes').insert({ component_id: componentId, user_id: userId });
}

export async function unlikeComponent(componentId, userId) {
  return supabase.from('likes').delete()
    .eq('component_id', componentId)
    .eq('user_id', userId);
}

export async function getLikeCount(componentId) {
  const { count } = await supabase.from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('component_id', componentId);
  return count || 0;
}

// User profile
export async function getUserProfile(userId) {
  return supabase.from('profiles').select('*').eq('id', userId).single();
}

export async function upsertUserProfile(profile) {
  return supabase.from('profiles').upsert(profile, { onConflict: 'id' });
}
