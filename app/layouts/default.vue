<script setup lang="ts">
const site = useSiteConfig()
const { navigation, footerLinks } = useAppConfig()
</script>

<template>
  <UHeader :title="site.name">
    <UNavigationMenu :items="navigation" />

    <template #body>
      <UNavigationMenu :items="navigation" orientation="vertical" />
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <UFooter>
    <template #left>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} {{ site.name }}
      </p>
    </template>

    <template #right>
      <UNavigationMenu :items="footerLinks" variant="link" />
    </template>
  </UFooter>
</template>
