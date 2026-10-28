import pkg from '../../package.json'

// Read by the (future) central monitoring tool. Prerendered at build time (see nuxt.config.ts),
// so it describes the deployed build; liveness/latency/SSL are measured by the tool itself.
export default defineEventHandler((event) => {
  const site = getSiteConfig(event)
  return {
    status: 'ok',
    site: { name: site.name, url: site.url },
    baseVersion: pkg.version,
    builtAt: new Date().toISOString()
  }
})
