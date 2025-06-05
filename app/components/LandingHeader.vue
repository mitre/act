<template>
  <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 backdrop-blur">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="flex-shrink-0"
        >
          <ACTLogo class="w-auto h-8 lg:h-10" />
        </NuxtLink>

        <!-- Dark mode toggle -->
        <UColorModeButton />
      </div>
    </div>
  </header>
</template>
