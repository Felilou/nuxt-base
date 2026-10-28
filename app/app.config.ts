// Projects override any of these in their own app/app.config.ts (merged, not replaced).
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    }
  },
  navigation: [
    { label: 'Start', to: '/' }
  ] as { label: string, to: string }[],
  footerLinks: [
    { label: 'Impressum', to: '/impressum' },
    { label: 'Datenschutz', to: '/datenschutz' }
  ] as { label: string, to: string }[]
})
