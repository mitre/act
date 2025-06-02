<script setup lang="ts">
import { onMounted } from 'vue'

const showCookiePreferences = () => {
  if (typeof window !== 'undefined' && window.Osano?.cm) {
    window.Osano.cm.showDrawer('osano-cm-dom-info-dialog-open')
  }
}

onMounted(() => {
  // Add click handler for Manage Cookies link after component mounts
  const manageCookiesLink = document.querySelector('a[href="javascript:void(0)"]')
  if (manageCookiesLink) {
    manageCookiesLink.addEventListener('click', (e) => {
      e.preventDefault()
      showCookiePreferences()
    })
  }
})

const columns = [{
  label: 'Resources',
  children: [
    {
      label: 'Docs',
      to: '/docs'
    },
    {
      label: 'Artifacts',
      to: '/docs/artifacts'
    },
    {
      label: 'Blog',
      to: '/blog'
    }
  ]
},
{
  label: 'Company',
  children: [{
    label: 'MITRE Corporation',
    to: 'https://www.mitre.org/',
    target: '_blank'
  },
  {
    label: 'Cyber Solutions Innovation Center',
    to: 'https://www.mitre.org/our-impact/mitre-labs/cyber-solutions-innovation-center',
    target: '_blank'
  },
  {
    label: 'Privacy Policy',
    to: '/docs/privacy-policy'
  },
  {
    label: 'Manage Cookies',
    to: 'javascript:void(0)',
    onClick: showCookiePreferences
  }
  ]
}]

// Newsletter form code - commented out for now
// const toast = useToast()
// const email = ref('')
// const loading = ref(false)
//
// function onSubmit() {
//   loading.value = true
//
//   toast.add({
//     title: 'Subscribed!',
//     description: 'You\'ve been subscribed to our newsletter.'
//   })
// }
</script>

<template>
  <USeparator
    icon="i-simple-icons-nuxtdotjs"
    class="h-px"
  />
  <UFooter :ui="{ top: 'border-b border-[var(--ui-border)]' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns" />
      </UContainer>
    </template>

    <template #default>
      <p class="text-center text-(--ui-text-muted) text-sm">
        Copyright © 1997-2025, The MITRE Corporation. All rights reserved. <br>
        MITRE is a registered trademark of The MITRE Corporation. Material on this site may be copied and distributed with permission only.
      </p>
    </template>

    <template #right>
      <UColorModeButton />

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
