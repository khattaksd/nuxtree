`<template>
  <div class="text-center mb-8">
    <h1 class="text-3xl font-bold mb-2">
      {{ displayName }}
    </h1>
    <p v-if="bio" class="text-gray-600">
      {{ bio }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  displayName: string
  bio?: string
}>()</script>`