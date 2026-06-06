# Wave 8 Tasks

- [x] Create `supabase/migrations/003_gamification.sql` to ALTER TABLE profiles ADD COLUMN badges text[] DEFAULT '{}', ADD COLUMN current_streak integer DEFAULT 0, ADD COLUMN last_login_at timestamptz, ADD COLUMN referred_by uuid REFERENCES profiles(id).
- [x] Create `app/api/user/streaks/route.js` to update the streak if last_login_at was yesterday.
- [x] Create Affiliate Dashboard at `app/affiliation/page.js` to fetch data from `/api/referrals/stats` and display cards for Clicks, Signups, and Revenue, and provide an input field with referral link and Copy button.
- [x] Create `app/api/referrals/stats/route.js` to count the number of users in the `profiles` table who have `referred_by` set to the current user's ID. Return `{ clicks: 0, signups: count, revenue: 0 }` as a basic mockup structure.
- [x] Create `app/activity/page.js` showing a global "Recent Activity Feed" of the platform. Fetch the latest components from Supabase `components` table, and display them in a vertical timeline format.
