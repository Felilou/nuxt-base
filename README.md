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

## Optional: Nuxt Studio (für Kunden, die selbst editieren)

1. `npm install nuxt-studio`
2. Zusätzlich den Studio-Layer einbinden:
   ```ts
   extends: ['github:<user>/nuxt-base', 'github:<user>/nuxt-base/studio']
   ```
3. Mit `nuxt build` bauen, **nicht** mit `generate`, und bei einem Hoster mit SSR- bzw. Serverless-Support deployen (Netlify, Vercel, ...). Die Seiten werden trotzdem als statisches HTML vorgerendert. Nur der Login läuft serverseitig.
4. Env-Variablen beim Hoster setzen (Login per Google, Kunde braucht kein GitHub-Konto):
   ```
   NUXT_STUDIO_AUTH_GOOGLE_CLIENT_ID=...
   NUXT_STUDIO_AUTH_GOOGLE_CLIENT_SECRET=...
   NUXT_STUDIO_AUTH_GOOGLE_MODERATORS=kunde@firma.at,du@deine-mail.at
   NUXT_STUDIO_GIT_GITHUB_TOKEN=...   # Fine-grained PAT: nur dieses Repo, Contents read/write
   ```
   Redirect-URI im Google OAuth Client: `https://<domain>/__nuxt_studio/auth/google`
5. Bearbeitet wird unter `https://<domain>/_studio`. „Veröffentlichen“ erzeugt einen Commit, und der Hoster baut neu.

Auf Netlify, Vercel und GitHub Actions wird das Repo automatisch erkannt. Bei anderen Hostern setzt du `studio.repository` (`owner`, `repo`, `branch`) im Projekt.

## Monitoring

Jede Seite liefert unter `/health.json` folgende Daten:
```json
{ "status": "ok", "site": { "name": "...", "url": "..." }, "baseVersion": "0.1.0", "builtAt": "..." }
```
Die Datei wird beim Build erzeugt und funktioniert daher bei jedem Hoster. `baseVersion` zeigt, welche Layer-Version deployed ist. Erreichbarkeit, Antwortzeit und SSL misst das Monitoring-Tool selbst.
