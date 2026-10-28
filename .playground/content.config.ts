import { defineCollection, defineContentConfig } from '@nuxt/content'

// Lives in each project (not the layer) so the collection reads that project's `content/` folder.
export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '**/*.md'
    })
  }
})
