# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **Nuxt layer** (not an app): a shared base for client websites, consumed via `extends` in each client project's `nuxt.config.ts`. `.playground/` is an example consumer used for development. See README.md for client-project usage.

## Commands

All commands target `.playground/`:
- `npm run dev`: dev server
- `npm run build`: SSR build into `.playground/.output/`. Start it with `node .playground/.output/server/index.mjs` (set the port with `PORT`).
- `npm run generate`: static build into `.playground/.output/public/`

- `npm run dev:studio` / `npm run build:studio`: the same with the optional `studio/` layer (sets `PLAYGROUND_STUDIO=1`). The scripts use cmd `set` syntax and only work on Windows.

There is no linter or test setup. Verify changes by building both `build` and `generate` and requesting `/`, a content page, `/health.json` and `/sitemap.xml`.

## Architecture & gotchas

- **Paths in `nuxt.config.ts`** must be resolved relative to the layer file (`fileURLToPath(new URL(..., import.meta.url))`). Otherwise they resolve inside the consuming project.
- **Content:** `content.config.ts` lives in each project, not in the layer, because collection sources resolve against the content dir of the layer that defines them. The layer's `app/pages/[...slug].vue` queries the `pages` collection, so every project must define it. Pages are built from Nuxt UI components in MDC syntax (`::u-page-hero`).
- **Content DB** is `:memory:` using the native `node:sqlite` connector. A file DB fails on read-only serverless filesystems and on Windows paths with spaces (the path gets URL-encoded). Content is restored from the build dump on startup.
- **`/health.json`** (`server/routes/health.json.ts`) is prerendered, so it works on static hosts too. It is the contract with the separate, central monitoring tool. Keep its fields backwards-compatible. `baseVersion` comes from this repo's `package.json`, so bump the version on releases.
- **Site config** (`site.url`, `site.name`) comes from `@nuxtjs/seo` (nuxt-site-config). Use `useSiteConfig()` in the app and `getSiteConfig(event)` on the server.
- **OG images are disabled.** They need a renderer and `@nuxt/fonts` >= 1, but `@nuxt/ui` still ships 0.x.
- **`studio/`** is a second, optional layer (Nuxt Studio CMS). Its OAuth routes (`/_studio` → `/__nuxt_studio/auth/<provider>`) need a server, so projects using it must use `nuxt build`. Pages stay static through hybrid prerendering (`crawlLinks` from `/`). Its `nuxt.config.ts` must not use `fileURLToPath`-relative paths into the base layer.
- No database by design. App-like features (DB, auth) belong in separate optional layers.
