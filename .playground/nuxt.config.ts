// Example project for developing the base layer. Real client projects look the same,
// but use `extends: ['github:<user>/nuxt-base']` instead of '..'.
export default defineNuxtConfig({
  extends: ['..'],

  site: {
    url: 'https://example.com',
    name: 'Beispiel GmbH'
  }
})
