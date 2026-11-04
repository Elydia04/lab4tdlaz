# TDLAZ — React To-Do List

A fully functional to-do list website built with React, Tailwind CSS, Zustand,
Axios, and React Router DOM.

## Features

- Add, complete, and delete tasks
- A separate **To-Do List** page for simple tasks that are not tied to any group
- The dashboard shows one combined list of your to-dos and group tasks, where you can tick them off or delete them
- Group tasks show a group badge on the dashboard; standalone to-dos do not
- Move a standalone to-do into a group with the folder button on each to-do
- Clear completed to-dos, or clear the whole to-do list (with confirmation)
- Tasks can be marked **Done** or **Not Done**
- Task groups / categories (School Activities, Personal Tasks, Projects, Daily Tasks)
- Dashboard with total, completed, and pending task counts
- User guide page with step-by-step instructions
- Users page and Developers page powered by the
  [DummyJSON API](https://dummyjson.com/)
- Loading indicators and error handling for API requests
- Responsive layout with a mobile navigation menu
- Tasks, to-dos, and groups are saved to `localStorage`, so they survive a refresh

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
| `/tasks` | To-Do List (no groups) |
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

The Zustand store uses the `persist` middleware and saves `groups`, `tasks`, and
`todos` under the `tdlaz-store` key in `localStorage`. Refreshing the page keeps the
data. Clearing this site's browser storage restores the demo content, and the
seed data is defined in `src/store/useTodoStore.js`.

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
