# APIs Explorer

APIs Explorer is a web application developed for the **Advanced Topics in Web Development** course (*Tópicos Avanzados de Desarrollo Web*). After signing in with GitHub, users can explore country and movie information through two interactive dashboards.

## Features

- GitHub OAuth sign-in and sign-out through Supabase Auth.
- **Countries Explorer:** search countries by name, filter by region, and open a detail view with the flag, official name, region, population, currency, and government type.
- **Movies Explorer:** browse movies ordered by rating, search by title, navigate paginated results, and open a detail view with the poster, release year, rating, language, and overview.
- Responsive card grids and dashboard themes for the country and movie sections.

The dashboards read their records from Supabase. Movie posters are loaded from TMDB's image service.

## Technology

- React 19
- Vite 8
- Supabase JavaScript client
- ESLint

## Requirements

- Node.js and npm
- A Supabase project configured with GitHub as an OAuth provider
- Supabase tables populated with the country and movie data used by the dashboards

## Getting started

1. Install the project dependencies:

   ```sh
   npm install
   ```

2. Create a `.env.local` file in the project root and set the Supabase public project URL and publishable key:

   ```dotenv
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISH_KEY=your-supabase-publishable-key
   ```

   These are the only environment variables read by the browser application. Do not put Supabase service-role keys or other secrets in `VITE_` variables; Vite exposes those values to client-side code.

3. In the Supabase dashboard, enable GitHub under **Authentication → Providers** and configure the GitHub OAuth application and its callback URL in Supabase. Add the local application URL to Supabase's allowed redirect URLs.

4. Start the development server:

   ```sh
   npm run dev
   ```

   Open the local URL printed by Vite, then sign in with GitHub.

## Supabase data

The application expects two tables:

- `countries`: `id`, `common_name`, `official_name`, `flag_url`, `region`, `subregion`, `population`, `currency`, and `government_type`.
- `movies`: `id`, `title`, `original_title`, `poster_path`, `release_date`, `overview`, `original_language`, and `vote_average`.

The country and movie dashboards query these tables directly. Configure Supabase access policies so authenticated users can read the records. The optional `scripts/seed.js` utility is intended to load movie and country data; it requires server-side Supabase and external API credentials. Keep those credentials out of the browser environment.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Project structure

```text
src/
  components/
    CountriesDashboard.jsx
    CountryCard.jsx
    CountryModal.jsx
    Dashboard.jsx
    Login.jsx
    MovieCard.jsx
    MovieDashboard.jsx
    MovieModal.jsx
  App.jsx
  supabase.js
scripts/
  seed.js
  testApi.js
```

## Author

**Emiliano Rebolledo Navarrete**
