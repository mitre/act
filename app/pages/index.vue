<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

useSeoMeta({
  titleTemplate: '',
  title: 'MITRE ACT - Coming Soon',
  ogTitle: 'MITRE ACT - Coming Soon',
  description: 'MITRE ACT (Adversarial Capability and Testing) website is coming soon.',
  ogDescription: 'MITRE ACT (Adversarial Capability and Testing) website is coming soon.'
})
</script>

<template>
  <div class="text-center max-w-3xl mx-auto px-4">
    <!-- Background effects -->
    <div class="absolute rounded-full bg-blue-500/5 dark:bg-blue-500/20 blur-[200px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-40 -z-10" />

    <!-- ACT Logo - Reduced mobile sizes -->
    <NuxtImg
      src="/images/logos/mitre-act-arrow-logo.svg"
      alt="MITRE ACT Logo"
      class="h-20 sm:h-28 md:h-36 lg:h-48 mx-auto mb-3 sm:mb-5"
    />

    <!-- Title with smaller mobile sizes - using theme colors -->
    <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 text-(--ui-text)">
      MITRE ACT
    </h1>

    <!-- Description with smaller mobile text - using theme colors -->
    <p class="text-xs sm:text-sm md:text-base lg:text-xl text-(--ui-text-muted) max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
      MITRE Adaptive Capabilities Testing (ACT) site coming soon.
    </p>
  </div>
</template>
