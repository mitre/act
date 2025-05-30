<script setup lang="ts">
// Available colors for selection
// type UIColor = 'primary' | 'secondary' | 'neutral' | 'error' | 'warning' | 'success' | 'info' // Unused - may need later
const colors: string[] = ['blue', 'green', 'red', 'purple', 'orange']

// Get app config
const appConfig = useAppConfig()

// Current primary color
const primaryColor = computed({
  get() {
    return appConfig.ui?.colors?.primary || 'blue'
  },
  set(color: string) {
    appConfig.ui.colors.primary = color
    if (import.meta.client) {
      window.localStorage.setItem('nuxt-ui-primary', color)
    }
  }
})

// Function to update primary color
function updateColor(color: string) {
  primaryColor.value = color
}

// Reset to default color
function resetColor() {
  primaryColor.value = 'blue'
}
</script>

<template>
  <div class="flex items-center gap-2">
    <!-- Color mode select -->
    <UColorModeSelect />

    <!-- Color selector dropdown -->
    <UDropdownMenu>
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-palette"
      />

      <template #items>
        <UDropdownMenuGroup>
          <UDropdownMenuLabel>Theme Colors</UDropdownMenuLabel>

          <div class="flex flex-wrap gap-2 p-2">
            <UButton
              v-for="color in colors"
              :key="color"
              color="neutral"
              size="xs"
              variant="solid"
              class="w-6 h-6 p-0 overflow-hidden"
              :class="{ 'ring-2 ring-offset-2': color === primaryColor }"
              @click="updateColor(color)"
            >
              <span
                class="w-full h-full block"
                :style="{
                  backgroundColor: `var(--color-${color}-500)`
                }"
              />
            </UButton>
          </div>

          <UDropdownMenuItem @click="resetColor">
            <template #leading>
              <UIcon name="i-lucide-undo-2" />
            </template>
            Reset Color
          </UDropdownMenuItem>
        </UDropdownMenuGroup>
      </template>
    </UDropdownMenu>
  </div>
</template>
