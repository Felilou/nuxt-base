// Optional layer for clients who edit content themselves via Nuxt Studio.
// Use it together with the base layer: `extends: ['github:Felilou/nuxt-base#v0.1.0', 'github:Felilou/nuxt-base/studio#v0.1.0']`.
//
// Studio's login needs a server route, so sites using this layer must be built with `nuxt build`
// (not `generate`) and hosted with SSR/serverless support. Pages are still prerendered to static HTML.
export default defineNuxtConfig({
  modules: ['nuxt-studio'],

  studio: {
    i18n: {
      defaultLocale: 'de'
    },
    git: {
      commit: {
        messagePrefix: 'content:'
      }
    }
    // `repository` (owner/repo/branch) is auto-detected on Netlify, Vercel and GitHub Actions;
    // set it in the client project for other hosts.
  },

  nitro: {
    // Hybrid rendering: every page reachable from `/` becomes static HTML at build time,
    // only Studio's auth routes run on the server.
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  }
})
