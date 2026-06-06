-- SQL Scripts pour créer les tables manquantes sur Supabase

-- 1. Table "components" (Pour que les utilisateurs publient leurs composants)
CREATE TABLE IF NOT EXISTS public.components (
  id text PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  tagline text,
  category text,
  prompt text,
  code text NOT NULL,
  preview text,
  tags text[],
  status text DEFAULT 'published',
  premium boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Components are viewable by everyone" 
  ON public.components FOR SELECT 
  USING (
    premium = false
    or (
      premium = true
      and auth.uid() is not null
      and exists (
        select 1 from public.profiles
        where id = auth.uid() and subscription_status = 'active'
      )
    )
  );

CREATE POLICY "Users can insert their own components" 
  ON public.components FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own components" 
  ON public.components FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own components" 
  ON public.components FOR DELETE 
  USING (auth.uid() = user_id);


-- 2. Table "reviews" (Pour les avis en temps réel)
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone" 
  ON public.reviews FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own reviews" 
  ON public.reviews FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Activer le Realtime pour la table reviews
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;


-- 3. Table "ai_generations" (Historique IA)
CREATE TABLE IF NOT EXISTS public.ai_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt text NOT NULL,
  mode text,
  model text,
  output text,
  usage jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.ai_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own generations" 
  ON public.ai_generations FOR SELECT 
  USING (auth.uid() = user_id);

-- L'insertion est faite côté serveur via le service_role, pas besoin de politique INSERT pour le public.
