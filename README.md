# React + Vite

## Batch student summaries

Apply `supabase/migrations/20261020_add_batches.sql` to create the admin-only batches and enrollment assignments. Then apply `supabase/migrations/20261020_automate_crash_course_batches.sql` for automatic 15-day course batches. Batch 14 is anchored to 21 October 2026 at 10 PM Bangladesh time, and Batch 15 starts on 29 October. Existing students are not backfilled or moved.

`course_batch_schedules` supplies the public course countdown and database automation with the same schedule: the 6th, 13th, 21st and 29th at 10 PM, Asia/Dhaka. Invalid calendar dates are skipped. A registration window starts when the previous batch starts, inclusive, and ends when its own batch starts, exclusive. New `duolingo-15-days-crash-course` enrollments are assigned once by database receipt time, independently of submitted dates or later approval. Other courses stay manual. Admins can still override assignments using the Batch selector.

A database cron job checks every minute, creates the currently open and next numbered batch, and updates statuses. An enrollment insert also synchronizes the schedule, so assignments work exactly at the cutoff and recover after downtime. Classes become completed after 15 days. Internal automation functions are private; only the non-sensitive countdown configuration is publicly readable. Numbered batch names from Batch 14 onward are reserved for automation; use descriptive names for other manual batches. Changes to the automatic course schedule should be made through a migration and must preserve the numbering anchor.

The Overview shows per-batch summaries. Batches at `/admin/batches` lists rosters, contacts, registration dates (Bangladesh time), course fees, recorded payments, balances and approval status. Create further batches and change their status there. Students and financial totals count approved, non-trashed enrollments only; pending records are shown separately. Missing fees are labeled unknown and excluded from due totals. Each enrollment can belong to one batch. Removing an assignment leaves the enrollment intact; trashed enrollments disappear from the roster and return if restored.

Run `node --test scripts/batch-summary.test.mjs scripts/batch-schedule.test.mjs` to check financial totals, distinct-student counts, schedule cutoffs, month/year boundaries, and leap years.

## Admin visit statistics

Apply `supabase/migrations/20261020_add_site_visits.sql`, followed by `supabase/migrations/20261020_add_short_visit_ranges.sql`, in the project's Supabase SQL editor, then deploy the app. The admin sidebar includes Visits at `/admin/visits`, with 1, 3, 7, 30, and 90 day reports using Bangladesh calendar dates, including today. The 1-day filter covers today since midnight. No historical data is backfilled.

Public page loads and route changes record page views; admin users, admin routes, authentication callbacks, and student account routes are excluded. Unique visitors use a random browser ID in local storage. Source attribution uses `utm_source` or the external referrer hostname, retained for the browser session. No email, IP address, query string, or full referrer URL is stored. Device categories are browser estimates. Tracking failures never block navigation.

The database allows public inserts only for the four tracking fields. Reports are aggregated server-side through `get_visit_stats` and restricted to the existing admin email (`duomatebd@gmail.com`); update that check if admin permissions change. Browser-submitted analytics are approximate and can include bots or fabricated events. Raw visits have no automatic retention cleanup; configure retention in Supabase to suit your needs.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
