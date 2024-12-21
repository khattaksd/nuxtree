`<template>
  <div class="container mx-auto px-4 py-8 max-w-lg">
    <div v-if="profile" class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-2">
        {{ profile.display_name || profile.username }}
      </h1>
      <p v-if="profile.bio" class="text-gray-600">
        {{ profile.bio }}
      </p>
    </div>

    <div v-if="links" class="space-y-4">
      <a
        v-for="link in links"
        :key="link.id"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="block w-full p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center"
      >
        {{ link.title }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProfile } = useProfile()
const { getLinks } = useLinks()

const profile = ref(null)
const links = ref(null)

onMounted(async () => {
  try {
    profile.value = await getProfile(route.params.username as string)
    if (profile.value) {
      links.value = await getLinks(profile.value.id)
    }
  } catch (error) {
    console.error(error)
    navigateTo('/404')
  }
})
</script>`