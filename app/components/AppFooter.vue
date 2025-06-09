<script setup lang="ts">
// Simplified footer for coming soon page with privacy links
const showCookiePreferences = () => {
  if (typeof window !== 'undefined' && window.Osano?.cm) {
    window.Osano.cm.showDrawer('osano-cm-dom-info-dialog-open')
  }
}
</script>

<template>
  <USeparator class="h-px" />
  <UFooter>
    <template #default>
      <div class="space-y-4">
        <p class="text-center text-(--ui-text-muted) text-sm">
          Copyright © 1997-2025, The MITRE Corporation. All rights reserved. <br>
          ACT and MITRE ACT are trademarks of The MITRE Corporation.
        </p>
        <div class="flex items-center justify-center gap-4 text-sm">
          <ULink
            to="/docs/privacy-policy"
            class="text-(--ui-text-muted) hover:text-(--ui-text)"
          >
            Privacy Policy
          </ULink>
          <span class="text-(--ui-text-muted)">•</span>
          <ULink
            href="javascript:void(0)"
            class="text-(--ui-text-muted) hover:text-(--ui-text)"
            @click="showCookiePreferences"
          >
            Manage Cookies
          </ULink>
        </div>
      </div>
    </template>
  </UFooter>
</template>
