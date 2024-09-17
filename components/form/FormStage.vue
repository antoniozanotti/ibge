<template>
  <div class="space-y-4 bg-gray-100 rounded p-2">
    <h2 class="bg-gray-200 text-primary-500 p-2 rounded">
      {{ label }}
    </h2>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
}

const props = defineProps<Props>();
</script>
