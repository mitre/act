<script setup lang="ts">
// const route = useRoute() // Commented out - may use later for active state

const items = [{
  label: 'Docs',
  to: '/docs'
}, {
  label: 'Blog',
  to: '/blog'
}
// Commented out - may use later
// , {
//   label: 'Pricing',
//   to: '/pricing'
// }
]

// Access theme state using useState
// const themeState = useState('nuxt-ui-theme') // Commented out - may use later
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <ACTLogo class="w-auto h-8 lg:h-10 shrink-0" />
      </NuxtLink>
      <!-- <TemplateMenu /> -->
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <UColorModeButton class="hidden sm:inline-flex" />
      <ThemePicker class="hidden sm:inline-flex" />

      <!-- Sign in/Sign up buttons - commented out for now -->
      <!-- <UButton icon="i-lucide-log-in" color="neutral" variant="ghost" to="/login" class="lg:hidden" />
      <UButton label="Sign in" color="neutral" variant="ghost" to="/login" class="hidden lg:inline-flex" />
      <UButton label="Sign up" color="neutral" trailing-icon="i-lucide-arrow-right" class="hidden lg:inline-flex" to="/signup" /> -->
    </template>

    <template #body>
      <div class="flex items-center justify-end gap-2 mb-4">
        <UColorModeButton size="sm" />
        <ThemePicker />
      </div>

      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <!-- Mobile sign in/sign up buttons - commented out for now -->
      <!-- <USeparator class="my-6" />
      <UButton label="Sign in" color="neutral" variant="subtle" to="/login" block class="mb-3" />
      <UButton label="Sign up" color="neutral" to="/signup" block /> -->
    </template>
  </UHeader>
</template>
