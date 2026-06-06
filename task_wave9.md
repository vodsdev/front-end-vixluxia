# Wave 9 Tasks

- [x] Update `app/component/[id]/page.js` to hide `<CodeBlock>` content and display an `Unlock Pro to View Source` banner if `component.is_premium` is true and the user does not have a Pro or Enterprise subscription.
- [x] Create `supabase/migrations/004_monetization.sql` with `ALTER TABLE components ADD COLUMN is_premium boolean DEFAULT false, ADD COLUMN downloads_count integer DEFAULT 0;`
- [x] Create `app/dashboard/analytics/page.js` using `recharts` (LineChart for views over time, Cards for total metrics). Fetch from `/api/creator/analytics`.
- [x] Create `app/api/creator/analytics/route.js`. Fetch user's components, calculate totals, and mock 30-day views series.
- [x] Update `app/component/[id]/page.js` to add a "Download ZIP" button next to "Copy Code" using the `jszip` library.
