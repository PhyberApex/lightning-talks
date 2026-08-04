<!-- App.vue -->
<script setup lang="ts">
import { provide, ref } from 'vue'

const theme = ref('dark')
provide('theme', theme)
</script>

<template>
  <Layout /> <!-- No :theme prop needed! -->
</template>
