// Example project for developing the base layer. Real client projects look the same,
// but use `extends: ['github:<user>/nuxt-base']` instead of '..'.
// `PLAYGROUND_STUDIO=1` additionally enables the optional Studio layer (see the `*:studio` scripts).
export default defineNuxtConfig({
  extends: process.env.PLAYGROUND_STUDIO ? ['..', '../studio'] : ['..'],

  site: {
    url: 'https://example.com',
    name: 'Beispiel GmbH'
  }
})
