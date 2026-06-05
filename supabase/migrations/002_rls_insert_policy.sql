-- Add policy to allow authenticated users to insert their own components
create policy "Users can insert components" on public.components for insert with check (auth.uid() = user_id);
create policy "Users can update own components" on public.components for update using (auth.uid() = user_id);
create policy "Users can delete own components" on public.components for delete using (auth.uid() = user_id);
