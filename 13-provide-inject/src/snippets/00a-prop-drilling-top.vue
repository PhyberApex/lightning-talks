<!-- App.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const theme = ref('dark')
</script>

<script setup lang="ts">
defineProps<{ theme: string }>()
</script>

<!-- Layout.vue - just passing through -->
<template>
  <Layout :theme="theme" />
</template>

<template>
  <Sidebar :theme="theme" />
  <Main :theme="theme" />
</template>
