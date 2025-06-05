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
    <div class="absolute rounded-full dark:bg-blue-500/20 blur-[200px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-40 -z-10" />

    <!-- ACT Logo - Bigger to match larger text -->
    <NuxtImg
      src="/images/logos/mitre-act-arrow-logo.svg"
      alt="MITRE ACT Logo"
      class="h-24 sm:h-32 md:h-40 lg:h-48 mx-auto mb-4 sm:mb-6"
    />

    <!-- Title optimized for mobile and desktop -->
    <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
      MITRE ACT Site Coming Soon
    </h1>

    <!-- Description with better mobile sizing -->
    <p class="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
      We're working hard to bring you the official MITRE ACT (Adversarial Capability and Testing) website. Check back soon for comprehensive assessment resources and documentation.
    </p>
  </div>
</template>
