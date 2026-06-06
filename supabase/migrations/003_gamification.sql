ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS badges text[] DEFAULT '{}', 
  ADD COLUMN IF NOT EXISTS current_streak integer DEFAULT 0, 
  ADD COLUMN IF NOT EXISTS last_login_at timestamptz, 
  ADD COLUMN IF NOT EXISTS referred_by uuid REFERENCES profiles(id);
