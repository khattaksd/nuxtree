`<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Admin Dashboard</h1>
    
    <div class="bg-white rounded-lg shadow p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4">Profile Settings</h2>
      <form @submit.prevent="saveProfile" class="space-y-4">
        <UFormGroup label="Username">
          <UInput v-model="profileData.username" />
        </UFormGroup>
        <UFormGroup label="Display Name">
          <UInput v-model="profileData.display_name" />
        </UFormGroup>
        <UFormGroup label="Bio">
          <UTextarea v-model="profileData.bio" />
        </UFormGroup>
        <UButton type="submit" color="primary">
          Save Profile
        </UButton>
      </form>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Social Links</h2>
      <div class="space-y-4">
        <div
          v-for="link in links"
          :key="link.id"
          class="flex items-center gap-4 p-4 bg-gray-50 rounded-md"
        >
          <div class="flex-1">
            <UInput
              v-model="link.title"
              class="mb-2"
              placeholder="Link Title"
              @blur="updateLink(link)"
            />
            <UInput
              v-model="link.url"
              placeholder="URL"
              @blur="updateLink(link)"
            />
          </div>
          <UButton
            color="red"
            variant="soft"
            icon="i-heroicons-trash"
            @click="deleteLink(link.id)"
          />
        </div>
      </div>
      <UButton
        class="mt-4"
        color="primary"
        @click="addNewLink"
      >
        Add New Link
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const { getProfile, updateProfile } = useProfile()
const { getLinks, createLink, updateLink: updateLinkFn, deleteLink: deleteLinkFn } = useLinks()

const profileData = ref({
  username: '',
  display_name: '',
  bio: ''
})

const links = ref([])

onMounted(async () => {
  if (!user.value) return navigateTo('/login')
  
  const profile = await getProfile(user.value.id)
  if (profile) {
    profileData.value = profile
    links.value = await getLinks(profile.id)
  }
})

const saveProfile = async () => {
  try {
    await updateProfile(profileData.value)
    useToast().add({
      title: 'Success',
      description: 'Profile updated successfully'
    })
  } catch (error) {
    useToast().add({
      title: 'Error',
      description: error.message,
      color: 'red'
    })
  }
}

const addNewLink = async () => {
  try {
    await createLink({
      title: 'New Link',
      url: '',
      platform: 'custom'
    })
    links.value = await getLinks(user.value.id)
  } catch (error) {
    useToast().add({
      title: 'Error',
      description: error.message,
      color: 'red'
    })
  }
}

const updateLink = async (link) => {
  try {
    await updateLinkFn(link.id, {
      title: link.title,
      url: link.url,
      platform: link.platform
    })
  } catch (error) {
    useToast().add({
      title: 'Error',
      description: error.message,
      color: 'red'
    })
  }
}

const deleteLink = async (id) => {
  try {
    await deleteLinkFn(id)
    links.value = links.value.filter(link => link.id !== id)
  } catch (error) {
    useToast().add({
      title: 'Error',
      description: error.message,
      color: 'red'
    })
  }
}
</script>`