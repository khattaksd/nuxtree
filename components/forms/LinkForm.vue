`<template>
  <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-md">
    <div class="flex-1">
      <UInput
        v-model="title"
        class="mb-2"
        placeholder="Link Title"
        @blur="emitUpdate"
      />
      <UInput
        v-model="url"
        placeholder="URL"
        @blur="emitUpdate"
      />
    </div>
    <UButton
      color="red"
      variant="soft"
      icon="i-heroicons-trash"
      @click="$emit('delete')"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  initialTitle: string
  initialUrl: string
}>()

const emit = defineEmits<{
  (e: 'update', data: { title: string; url: string }): void
  (e: 'delete'): void
}>()

const title = ref(props.initialTitle)
const url = ref(props.initialUrl)

const emitUpdate = () => {
  emit('update', { title: title.value, url: url.value })
}</script>`