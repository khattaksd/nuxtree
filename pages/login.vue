`<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full px-4">
      <h1 class="text-3xl font-bold text-center mb-8">
        Sign In
      </h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <UFormGroup label="Email">
          <UInput
            v-model="email"
            type="email"
            autocomplete="email"
            required
          />
        </UFormGroup>
        <UFormGroup label="Password">
          <UInput
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          />
        </UFormGroup>
        <UButton
          type="submit"
          block
          color="primary"
          :loading="loading"
        >
          Sign In
        </UButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    
    if (error) throw error
    
    navigateTo('/admin')
  } catch (error) {
    useToast().add({
      title: 'Error',
      description: error.message,
      color: 'red'
    })
  } finally {
    loading.value = false
  }
}
</script>`