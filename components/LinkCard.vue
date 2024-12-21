`<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="block w-full p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  url: string
}>()</script>`