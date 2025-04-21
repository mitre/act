<script setup lang="ts">
import colors from 'tailwindcss/colors'
import { omit } from '#ui/utils'

const appConfig = useAppConfig()
const colorMode = useColorMode()

const neutralColors = ['slate', 'gray', 'zinc', 'neutral', 'stone']
const neutral = computed({
  get() {
    return appConfig.ui.colors.neutral || 'slate'
  },
  set(option) {
    appConfig.ui.colors.neutral = option
    window.localStorage.setItem('nuxt-ui-neutral', option)
  }
})

const colorsToOmit = ['inherit', 'current', 'transparent', 'black', 'white', ...neutralColors]
const primaryColors = Object.keys(omit(colors, colorsToOmit as any))
const primary = computed({
  get() {
    return appConfig.ui.colors.primary || 'blue'
  },
  set(option) {
    appConfig.ui.colors.primary = option
    window.localStorage.setItem('nuxt-ui-primary', option)
  }
})

const radiuses = ['none', 'sm', 'md', 'lg', 'xl', 'full']
interface UiConfig {
  radius?: string
  colors: {
    neutral?: string
    primary?: string
  }
}

const radius = computed({
  get() {
    return (appConfig.ui as UiConfig).radius || 'md'
  },
  set(option) {
    (appConfig.ui as UiConfig).radius = option
    window.localStorage.setItem('nuxt-ui-radius', option)
  }
})

const modes = [
  { label: 'light', icon: 'i-lucide-sun' },
  { label: 'dark', icon: 'i-lucide-moon' },
  { label: 'system', icon: 'i-lucide-computer' }
]
const mode = computed({
  get() {
    return colorMode.preference
  },
  set(option) {
    colorMode.preference = option
  }
})
</script>

<template>
  <UPopover :ui="{ content: 'w-72 px-6 py-4 flex flex-col gap-4' }">
    <template #default="{ open }">
      <UButton icon="i-lucide-swatch-book" color="neutral" :variant="open ? 'soft' : 'ghost'" square
        aria-label="Color picker" :ui="{ leadingIcon: 'text-(--ui-primary)' }" />
    </template>

    <template #content>
      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Primary
        </legend>
        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton v-for="color in primaryColors" :key="color" :label="color" :chip="color"
            :selected="primary === color" @click="primary = color" />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Neutral
        </legend>
        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton v-for="color in neutralColors" :key="color" :label="color"
            :chip="color === 'neutral' ? 'old-neutral' : color" :selected="neutral === color"
            @click="neutral = color" />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Radius
        </legend>
        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton v-for="r in radiuses" :key="r" :label="r" class="justify-center px-0"
            :selected="radius === r" @click="radius = r" />
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-[11px] leading-none font-semibold mb-2">
          Theme
        </legend>
        <div class="grid grid-cols-3 gap-1 -mx-2">
          <ThemePickerButton v-for="m in modes" :key="m.label" v-bind="m" :selected="mode === m.label"
            @click="mode = m.label" />
        </div>
      </fieldset>
    </template>
  </UPopover>
</template>
