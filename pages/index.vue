`<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-8">
      Social Links Platform
    </h1>
    <div class="max-w-md mx-auto">
      <UButton
        v-if="user"
        to="/admin"
        block
        color="primary"
      >
        Go to Dashboard
      </UButton>
      <UButton
        v-else
        to="/login"
        block
        color="primary"
      >
        Get Started
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
</script>`