# Ten Sparrows Frontend

This repository contains the Ten Sparrows website and admin CMS frontend. It is built with Next.js, React, TypeScript, Tailwind CSS v4, TanStack Query, and Zustand.

The app has two main surfaces:

- A public marketing site for pages like `/`, `/about`, `/what-we-do`, `/why-ten-sparrows`, and `/contact`
- An admin experience under `/admin` for managing pages, sections, media, settings, headers, footers, and users

## What A New Developer Should Know First

- This repo is the frontend only
- The admin UI and CMS-driven public pages expect a separate backend API to be running
- By default, the frontend talks to `http://localhost:5001/api`
- If the API is down, the marketing pages that are hard-coded will still render, but admin features and CMS-backed routes will not work correctly

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query for server state
- Zustand for client-side stores and auth state
- Axios for API calls
- Radix UI primitives plus project UI components in `src/components/ui`

## Prerequisites

Before starting, make sure you have:

- Node.js 20 or newer
- npm
- Access to the Ten Sparrows backend API repo or a running local API instance

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file:

```bash
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` starts the local Next.js dev server
- `npm run build` creates a production build
- `npm run start` serves the production build locally
- `npm run lint` runs ESLint

## Running With The Backend

This frontend expects the backend API to provide:

- Public page, header, footer, navigation, and site settings endpoints
- Authentication endpoints for admin login
- CRUD endpoints for pages, sections, media, headers, footers, settings, and users

The API client is configured in `src/lib/api/client.ts`.

Important behavior:

- `NEXT_PUBLIC_API_URL` controls the API base URL
- Auth uses a bearer token stored in local storage under `tsw_auth_token`
- Auth-related persisted Zustand state uses the `tsw-auth` storage key
- Requests are sent with `withCredentials: true`

## Project Structure

```text
src/
  app/
    page.tsx                 Home page
    about/                   Static About page
    contact/                 Static Contact page
    what-we-do/              Static What We Do page
    why-ten-sparrows/        Static Why Ten Sparrows page
    admin/                   Admin CMS routes
    (public)/[...slug]/      CMS-driven public pages by slug
  components/
    layout/                  Shared site chrome like header and footer
    sections/                Reusable public site sections
    admin/                   Admin layout, builder, and forms
    blocks/                  CMS block rendering and registry
    ui/                      Shared UI primitives/components
  lib/
    api/                     API clients
    hooks/                   Data and auth hooks
    stores/                  Zustand stores
    types/                   Shared TypeScript types
public/
  images/                    Static image assets
```

## How Content Is Rendered

There are two content models in this app:

### 1. Static page routes

Some pages are implemented directly as Next.js routes and components, for example:

- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/what-we-do/page.tsx`
- `src/app/why-ten-sparrows/page.tsx`

These are the best place to start if you are changing the main marketing pages.

### 2. CMS-driven routes

The dynamic route at `src/app/(public)/[...slug]/page.tsx` fetches page data from the backend and renders sections through the block renderer.

That flow looks like:

1. Route slug is resolved
2. `publicApi.getPageBySlug(slug)` fetches the published page
3. Each section is rendered through `SectionRenderer`
4. `ComponentRegistry` maps stored section/component names to actual React components

If you are adding a new CMS-manageable section, the main files to check are:

- `src/components/blocks/ComponentRegistry.tsx`
- `src/components/blocks/BlockRenderer.tsx`
- The section component itself, usually in `src/components/sections` or a route folder
- Admin builder UI files in `src/components/admin/builder`

## Admin Area

The admin UI lives under `/admin`.

Common routes include:

- `/admin/login`
- `/admin/pages`
- `/admin/pages/new`
- `/admin/pages/[id]`
- `/admin/pages/[id]/builder`
- `/admin/sections`
- `/admin/header`
- `/admin/footer`
- `/admin/media`
- `/admin/settings`
- `/admin/users`

Useful notes:

- Login state is managed in `src/lib/stores/auth.ts`
- API auth calls are in `src/lib/api/auth.ts`
- Admin forms and builder components live under `src/components/admin`

## Where To Start Based On The Task

- Updating site-wide layout or navigation: check `src/components/layout`
- Updating homepage or marketing sections: check `src/app` and `src/components/sections`
- Updating CMS rendering behavior: check `src/components/blocks`
- Updating admin workflows: check `src/app/admin`, `src/components/admin`, and `src/lib/hooks`
- Updating API integration: check `src/lib/api`
- Updating shared types: check `src/lib/types`

## Linting And Verification

Run:

```bash
npm run lint
```

At the moment, this repo does not expose a dedicated test script in `package.json`, so linting is the main built-in verification step.

## Deployment

This repo includes an Azure Static Web Apps workflow:

- `azure-static-web-apps-ambitious-island-0e18a8b0f.yml`

If you are changing build or deploy behavior, start there along with `next.config.ts`.

## Troubleshooting

### The admin login page loads, but sign-in fails

Check that:

- The backend API is running
- `NEXT_PUBLIC_API_URL` points to the correct backend
- The backend allows requests from the frontend origin

### CMS pages return not found

Check that:

- The backend is running
- The requested slug exists in the CMS
- The page is published

### Data looks stale or auth behaves oddly

This app stores auth in local storage. Clearing browser storage for:

- `tsw_auth_token`
- `tsw-auth`

can help reset local state during development.

## Notes For Contributors

- Keep new API access in `src/lib/api` instead of scattering `axios` calls throughout components
- Reuse shared UI components from `src/components/ui` where possible
- Add new CMS-rendered blocks through the registry so they are available to the builder
- When changing auth or admin behavior, test both fresh login and refresh/hydration behavior
