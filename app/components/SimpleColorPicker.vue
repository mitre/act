<script setup lang="ts">
/**
 * Simple color picker using vanilla DOM for proper positioning
 */
const appConfig = useAppConfig()

// Primary color options
const colors = [
  { name: 'blue', label: 'Blue' },
  { name: 'green', label: 'Green' },
  { name: 'red', label: 'Red' },
  { name: 'purple', label: 'Purple' },
  { name: 'orange', label: 'Orange' }
]

// Current primary color
const primaryColor = computed({
  get() {
    return appConfig.ui.colors.primary || 'blue'
  },
  set(color) {
    appConfig.ui.colors.primary = color
    if (process.client) {
      localStorage.setItem('nuxt-ui-primary', color)
    }
  }
})

// Reference to menu
const menuRef = ref(null)
// Reference to button
const buttonRef = ref(null)

// Toggle menu visibility
function toggleMenu() {
  if (menuRef.value) {
    menuRef.value.classList.toggle('hidden')
  }
}

// Hide menu
function hideMenu() {
  if (menuRef.value) {
    menuRef.value.classList.add('hidden')
  }
}

// Set color and hide menu
function setColor(color) {
  primaryColor.value = color
  hideMenu()
}

// Handle clicks outside menu
function onClickOutside(event) {
  if (buttonRef.value && !buttonRef.value.contains(event.target) &&
      menuRef.value && !menuRef.value.contains(event.target)) {
    hideMenu()
  }
}

// Add click listener when component is mounted
onMounted(() => {
  if (process.client) {
    document.addEventListener('click', onClickOutside)
  }
})

// Remove listener when component is unmounted
onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', onClickOutside)
  }
})
</script>

<template>
  <div class="inline-block relative">
    <!-- Color picker button -->
    <button 
      ref="buttonRef"
      type="button" 
      class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      aria-label="Change theme color"
      @click.stop="toggleMenu"
    >
      <UIcon name="i-lucide-palette" />
    </button>
    
    <!-- Color menu -->
    <div 
      ref="menuRef" 
      class="hidden absolute z-50 right-0 mt-2 w-40 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 p-3"
    >
      <p class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</p>
      <div class="space-y-1">
        <UButton
          v-for="color in colors"
          :key="color.name"
          :color="color.name"
          :variant="color.name === primaryColor ? 'solid' : 'ghost'"
          size="xs"
          class="w-full flex justify-between items-center"
          @click="setColor(color.name)"
        >
          <span>{{ color.label }}</span>
          <div class="w-3 h-3 rounded-full" :class="`bg-${color.name}-500`"></div>
        </UButton>
      </div>
    </div>
  </div>
</template>