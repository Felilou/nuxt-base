import { fileURLToPath } from 'node:url'

// Base layer for client websites. Projects consume it via `extends` in their nuxt.config.ts.
// Paths must be resolved relative to this file, otherwise they'd point into the consuming project.
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/content', '@nuxt/image', '@nuxtjs/seo'],

  css: [fileURLToPath(new URL('./app/assets/css/main.css', import.meta.url))],

  // Defaults only; every project sets at least `site.url` and `site.name`.
  site: {
    defaultLocale: 'de'
  },

  // Needs a renderer (`npx nuxt-og-image enable takumi`) and @nuxt/fonts >= 1, which @nuxt/ui doesn't ship yet
  ogImage: {
    enabled: false
  },

  content: {
    // Content is restored from the build dump on startup, so no file is needed. This also avoids
    // read-only filesystems on serverless hosts and a path-encoding bug with spaces in the path.
    database: {
      type: 'sqlite',
      filename: ':memory:'
    },
    experimental: {
      // Node's built-in SQLite instead of the native better-sqlite3 build
      sqliteConnector: 'native'
    }
  },

  nitro: {
    // Static file so the health check works on every host, including fully static deploys
    prerender: {
      routes: ['/health.json']
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
