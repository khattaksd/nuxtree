`<template>
  <form @submit.prevent="$emit('submit')" class="space-y-4">
    <UFormGroup label="Username">
      <UInput v-model="modelValue.username" />
    </UFormGroup>
    <UFormGroup label="Display Name">
      <UInput v-model="modelValue.display_name" />
    </UFormGroup>
    <UFormGroup label="Bio">
      <UTextarea v-model="modelValue.bio" />
    </UFormGroup>
    <UButton type="submit" color="primary">
      Save Profile
    </UButton>
  </form>
</template>

<script setup lang="ts">
interface ProfileData {
  username: string
  display_name: string
  bio?: string
}

defineProps<{
  modelValue: ProfileData
}>()

defineEmits<{
  (e: 'submit'): void
  (e: 'update:modelValue', value: ProfileData): void
}>()</script>`