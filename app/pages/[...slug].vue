<script setup lang="ts">
// Renders every page from the project's `content/` folder (collection "pages", see content.config.ts).
const route = useRoute()

const { data: page } = await useAsyncData(`page-${route.path}`, () =>
  queryCollection('pages').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Seite nicht gefunden', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description
})
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>
