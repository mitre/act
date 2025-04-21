<script setup lang="ts">
/**
 * Theme switcher component using UDropdown
 */
const colorMode = useColorMode()
const appConfig = useAppConfig()

// Get color mode label
const colorModeLabel = computed(() => {
  switch (colorMode.preference) {
    case 'light':
      return 'Light'
    case 'dark':
      return 'Dark'
    default:
      return 'System'
  }
})

// Get color mode icon
const colorModeIcon = computed(() => {
  switch (colorMode.preference) {
    case 'light':
      return 'i-lucide-sun'
    case 'dark':
      return 'i-lucide-moon'
    default:
      return 'i-lucide-computer'
  }
})

// Available primary colors
const primaryColors = ['blue', 'green', 'red', 'purple', 'orange']

// Current primary color
const primaryColor = computed({
  get() {
    return appConfig.ui.colors.primary || 'blue'
  },
  set(color) {
    appConfig.ui.colors.primary = color
  }
})

// Color mode dropdown items
const items = computed(() => {
  return [
    [
      {
        label: 'Theme',
        slot: 'theme',
        disabled: true
      }
    ],
    [
      {
        label: 'Light Mode',
        icon: 'i-lucide-sun',
        click: () => { colorMode.preference = 'light' }
      },
      {
        label: 'Dark Mode',
        icon: 'i-lucide-moon',
        click: () => { colorMode.preference = 'dark' }
      },
      {
        label: 'System',
        icon: 'i-lucide-computer',
        click: () => { colorMode.preference = 'system' }
      }
    ]
  ]
})
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-end' }">
    <UButton
      color="gray"
      variant="ghost"
      :icon="colorModeIcon"
      :label="colorModeLabel"
      class="hidden md:inline-flex"
    />
    <UButton
      color="gray"
      variant="ghost"
      :icon="colorModeIcon"
      class="md:hidden"
    />
    
    <template #theme>
      <div class="p-3">
        <p class="text-sm font-medium mb-2">Primary Color</p>
        <div class="flex gap-1">
          <UButton
            v-for="color in primaryColors"
            :key="color"
            :color="color"
            variant="solid" 
            class="w-8 h-8 p-0 rounded-md"
            :class="{ 'ring-2 ring-offset-2': color === primaryColor }"
            @click="primaryColor = color"
          />
        </div>
      </div>
    </template>
  </UDropdown>
</template>