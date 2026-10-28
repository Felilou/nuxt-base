# nuxt-base

Basis-Layer für Kunden-Websites: Nuxt UI, Nuxt Content (CMS), Nuxt SEO, Nuxt Image und ein Health-Endpunkt für das zentrale Monitoring.

## Neues Kundenprojekt

1. Nuxt-Projekt anlegen (`npm create nuxt@latest`) und diese Pakete installieren: `@nuxt/content`, `@nuxt/ui`, `@nuxtjs/seo` und `@nuxt/image`.
2. `nuxt.config.ts`:
   ```ts
   export default defineNuxtConfig({
     extends: ['github:<user>/nuxt-base'], // bzw. '../nuxt-base' lokal
     site: {
       url: 'https://kunde.at',
       name: 'Kunde GmbH'
     }
   })
   ```
3. `content.config.ts` aus `.playground/` übernehmen und Seiten als Markdown in `content/` anlegen.
4. Theme und Navigation in `app/app.config.ts` überschreiben (`ui.colors`, `navigation`, `footerLinks`).

Alles aus dem Layer (Komponenten, Layouts, Seiten) kann im Projekt durch eine Datei mit gleichem Pfad ersetzt werden.

## Build

- `nuxt build`: SSR, Start mit `node .output/server/index.mjs`. Läuft auch serverless (Vercel, Netlify, ...).
- `nuxt generate`: rein statisch, für jeden Static-Hoster.

## Monitoring

Jede Seite liefert unter `/health.json` folgende Daten:
```json
{ "status": "ok", "site": { "name": "...", "url": "..." }, "baseVersion": "0.1.0", "builtAt": "..." }
```
Die Datei wird beim Build erzeugt und funktioniert daher bei jedem Hoster. `baseVersion` zeigt, welche Layer-Version deployed ist. Erreichbarkeit, Antwortzeit und SSL misst das Monitoring-Tool selbst.
