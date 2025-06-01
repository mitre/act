<script setup lang="ts">
const showCookiePreferences = () => {
  if (typeof window !== 'undefined' && window.Osano?.cm) {
    window.Osano.cm.showDrawer('osano-cm-dom-info-dialog-open')
  }
}

const columns = [{
  label: 'Resources',
  children: [
    //  {
    //    label: 'Help center'
    //  },
    {
      label: 'Docs',
      to: '/docs/getting-started',
      target: '_top'
    },
    {
      label: 'Artifacts',
      to: '/docs/artifacts',
      target: '_top'
    }
    //  {
    //    label: 'Roadmap'
    //  },
    // {
    //    label: 'Changelog'
    //  }
  ]
},
// {
//  label: 'Features',
//  children: [
//  {
//    label: 'Affiliates'
//  }, {
//    label: 'Portal'
//  }, {
//    label: 'Jobs'
//  },
//  {
//    label: 'Sponsors'
//  }]
// },
{
  label: 'Company',
  children: [{
    label: 'About',
    to: 'https://www.mitre.org/',
    target: '_blank'
  },
  //  {
  //    label: 'Careers'
  //  },
  {
    label: 'Blog',
    to: '/blog',
    target: '_top'
  },
  {
    label: 'Cyber Solutions Innovation Center',
    to: 'https://www.mitre.org/our-impact/mitre-labs/cyber-solutions-innovation-center',
    target: '_blank'
  }
  // Commented out - may use later
  // , {
  //   label: 'Pricing'
  // }
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
        <UFooterColumns :columns="columns">
          <!-- Newsletter form - commented out for now -->
          <!-- <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                label="Subscribe to our newsletter"
                size="lg"
              >
                <UInput
                  v-model="email"
                  type="email"
                  class="w-full"
                  placeholder="Enter your email"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      size="xs"
                      color="neutral"
                      label="Subscribe"
                    />
                  </template>
                </UInput>
              </UFormField>
            </form>
          </template> -->
        </UFooterColumns>
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
        icon="i-heroicons-shield-check"
        aria-label="Cookie Preferences"
        color="neutral"
        variant="ghost"
        @click="showCookiePreferences"
      />

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
