<script setup lang="ts">
// Available colors for selection
type UIColor = 'primary' | 'secondary' | 'neutral' | 'error' | 'warning' | 'success' | 'info'
const colors: string[] = ['blue', 'green', 'red', 'purple', 'orange']

// Get app config
const appConfig = useAppConfig()

// Current primary color
const primaryColor = ref(appConfig.ui?.colors?.primary || 'blue')

// Function to update primary color
function updateColor(color: string) {
  primaryColor.value = color
  
  if (process.client) {
    document.documentElement.style.setProperty('--color-primary', color)
  }
}

// Reset to default color
function resetColor() {
  const defaultColor = appConfig.ui?.colors?.primary || 'blue'
  primaryColor.value = defaultColor
  
  if (process.client) {
    document.documentElement.style.removeProperty('--color-primary')
  }
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
              :color="color as any"
              size="xs"
              variant="solid"
              class="w-6 h-6 p-0"
              :class="{ 'ring-2 ring-offset-2': color === primaryColor }"
              @click="updateColor(color)"
            />
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