<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <UContainer v-if="!isRedirecting">
    <UPage>
      <UPageError :error="error" />
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const router = useRouter()
const isRedirecting = ref(false)

// Handle trailing slash 404 errors from GitHub Pages
onMounted(() => {
  if (props.error?.statusCode === 404) {
    const path = window.location.pathname

    // Check if this is a trailing slash issue
    if (path.endsWith('/') && path !== '/') {
      // Remove trailing slash
      const newPath = path.slice(0, -1)

      // Check if a route exists for the path without trailing slash
      const routes = router.getRoutes()
      const routeExists = routes.some(route => route.path === newPath)

      if (routeExists) {
        isRedirecting.value = true
        // Use replace to avoid adding to browser history
        router.replace(newPath)
      }
    }
  }
})

// Set page metadata
useSeoMeta({
  title: props.error?.statusCode === 404 ? 'Page Not Found' : 'Error',
  description: props.error?.statusMessage || 'An error occurred'
})
</script>
