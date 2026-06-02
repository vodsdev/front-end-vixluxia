# VixLuxia — Smart Bookmarks, Soft UI Edition

An AI-flavored bookmarking & knowledge management tool with a soft, Apple/Linear-inspired aesthetic.

## Features

- 🪄 **Smart capture**: paste any URL → real metadata enrichment (OG tags, GitHub stars/forks, YouTube thumbnails)
- 🎴 **Polymorphic cards**: each link type renders differently (GitHub widget, YouTube/Figma embed, article with reading time)
- 🗂️ **Three views**: Masonry Grid, dense List, Kanban with drag & drop between Inbox / Reading / Done
- 🏷️ **Workspaces & tags** with live counters and filters
- ⌨️ **Command Palette** (`⌘K`) with fuzzy search & quick actions
- 🌙 **Soft Black** dark mode with subtle pastel gradients
- 🎨 Built with Tailwind, Framer Motion (spring physics), Lucide icons, cmdk

## Stack

- Next.js 14 (App Router) + React 18
- Tailwind CSS + shadcn primitives + Framer Motion
- MongoDB (UUIDs only — no ObjectId leakage)
- cmdk for command palette

## Run locally

```bash
cp .env.example .env   # adjust MONGO_URL/DB_NAME
yarn install
yarn dev               # http://localhost:3000
```

A local MongoDB instance must be running (or point `MONGO_URL` to Atlas).

## API

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/bookmarks/enrich` | Preview metadata for a URL |
| GET | `/api/bookmarks?workspaceId=&tag=&q=` | List bookmarks (filters) |
| POST | `/api/bookmarks` | Create bookmark (auto-enrich if no `enriched` provided) |
| PATCH | `/api/bookmarks/:id` | Update title/description/tags/status/priority |
| DELETE | `/api/bookmarks/:id` | Remove bookmark |
| GET | `/api/workspaces` | List workspaces (seeded on first call) |
| POST | `/api/workspaces` | Create workspace |
| GET | `/api/tags` | Distinct tags with usage counts |

## Keyboard shortcuts

- `⌘K` / `Ctrl+K` → open command palette
- `⌘N` / `Ctrl+N` → capture a new link
- `Esc` → close any modal

## Notes

- Auth (Supabase) is **not** included in this MVP — single workspace mode by default.
- Metadata enrichment uses public OG tags + GitHub's unauthenticated API. No external API keys required.
