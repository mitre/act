<script setup lang="ts">
// Temporary header for coming soon page - no navigation items
const items: any[] = []
</script>

<template>
  <UHeader :ui="{ button: { base: 'hidden' } }">
    <template #left>
      <NuxtLink to="/">
        <ACTLogo class="w-auto h-8 lg:h-10 shrink-0" />
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>