<!-- App.vue -->
<script setup lang="ts">
import { ref } from 'vue'
const theme = ref('dark')
</script>
<template>
  <Layout :theme="theme" />
</template>

<!-- Layout.vue - just passing through -->
<script setup lang="ts">
defineProps<{ theme: string }>()
</script>
<template>
  <Sidebar :theme="theme" />
  <Main :theme="theme" />
</template>
