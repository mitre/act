<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})

const route = useRoute()

// Remove /docs prefix from the path since we're already in the docs collection
const contentPath = route.path.replace(/^\/docs/, '') || '/'
const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(contentPath).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', contentPath, {
    fields: ['description']
  })
})

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImageComponent('Saas')
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page?.title || ''"
      :description="page?.description || ''"
    />

    <UPageBody>
      <ContentRenderer
        v-if="page?.body"
        :value="page"
      />

      <USeparator v-if="surround?.length" />

      <UContentSurround
        v-if="surround?.length"
        :surround="surround || []"
      />
    </UPageBody>

    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc :links="page?.body?.toc?.links || []" />
    </template>
  </UPage>
</template>
