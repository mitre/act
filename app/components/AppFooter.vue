<script setup lang="ts">
// Temporary simplified footer for coming soon page
</script>

<template>
  <USeparator class="h-px" />
  <UFooter>
    <template #default>
      <p class="text-center text-(--ui-text-muted) text-sm">
        Copyright © 1997-2025, The MITRE Corporation. All rights reserved. <br>
        MITRE is a registered trademark of The MITRE Corporation.
      </p>
    </template>

    <template #right>
      <UButton
        to="https://github.com/mitre/act"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>