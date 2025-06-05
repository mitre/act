<template>
  <div class="flex flex-col h-screen">
    <LandingHeader />

    <main class="flex-1 flex items-center justify-center">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
