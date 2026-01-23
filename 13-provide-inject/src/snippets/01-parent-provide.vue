<script setup lang="ts">
import { provide } from 'vue'

// Provide a value to all descendants
provide('theme', 'dark')
</script>

<template>
  <div class="app">
    <DeepNestedChild />
  </div>
</template>


