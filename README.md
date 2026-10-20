# React + Vite

## Admin visit statistics

Apply `supabase/migrations/20261020_add_site_visits.sql` in the project's Supabase SQL editor, then deploy the app. The admin sidebar includes Visits at `/admin/visits`, with 7, 30, and 90 day reports using Bangladesh dates. No historical data is backfilled.

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
