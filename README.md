# TaskNest — React To-Do List

A fully functional to-do list website built with React, Tailwind CSS, Zustand,
Axios, and React Router DOM.

## Features

- Add, complete, and delete tasks
- Tasks can be marked **Done** or **Not Done**
- Task groups / categories (School Activities, Personal Tasks, Projects, Daily Tasks)
- Dashboard with total, completed, and pending task counts
- User guide page with step-by-step instructions
- Users page and Developers page powered by the
  [DummyJSON API](https://dummyjson.com/)
- Loading indicators and error handling for API requests
- Responsive layout with a mobile navigation menu
- Tasks and groups are saved to `localStorage`, so they survive a refresh

## Tech stack

| Tool | Purpose |
| --- | --- |
| React 19 | Components, state, and event handling |
| Tailwind CSS 4 | Styling and responsive layout |
| Zustand 5 | Global task and group state (`persist` middleware) |
| Axios | HTTP requests to DummyJSON |
| React Router DOM 7 | Multiple routes and navigation |

## Routes

| Route | Page |
| --- | --- |
| `/` (and `/home`) | Home / Dashboard |
| `/groups` | Task Groups / Categories |
| `/groups/:groupId` | Task list for a selected group |
| `/guide` | Instructions / User Guide |
| `/users` | User Information |
| `/developers` | Developers |

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

Other scripts:

```bash
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project structure

```
src/
  api/          Axios instance and DummyJSON request helpers
  components/   Shared UI (navbar, task item, cards, loaders...)
  data/         Team member data for the Developers page
  hooks/        Reusable data-fetching hooks
  lib/          Group accent styles and formatting helpers
  pages/        One component per route
  store/        Zustand store with localStorage persistence
```

## Data persistence

The Zustand store uses the `persist` middleware and saves `groups` and `tasks`
under the `tasknest-store` key in `localStorage`. Refreshing the page keeps the
data. Use **Reset sample data** on the dashboard to restore the demo content.

## Deploying with working page refreshes

Because the app uses `BrowserRouter`, the host must serve `index.html` for any
route. This repository already includes:

- `public/_redirects` for Netlify (`/* /index.html 200`)
- `vercel.json` for Vercel (SPA rewrite)

For another static host, configure the same "rewrite all paths to
`/index.html`" rule. GitHub Pages needs a `404.html` copy of `index.html`.

## Before submitting

Update the names and roles in `src/data/team.js` with your actual group
members' complete names.
