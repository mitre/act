<script setup lang="ts">
const colorMode = useColorMode()

// Dark mode toggle
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value: boolean) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})
</script>

<template>
  <UDropdown
    :items="[
      [
        {
          label: 'Light Mode',
          icon: 'i-lucide-sun',
          click: () => isDark = false
        },
        {
          label: 'Dark Mode',
          icon: 'i-lucide-moon',
          click: () => isDark = true
        }
      ]
    ]"
  >
    <UButton
      color="primary"
      variant="ghost"
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      aria-label="Toggle dark mode"
    />
  </UDropdown>
</template>
