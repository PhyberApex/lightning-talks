<script setup lang="ts">
import { inject } from 'vue'

// Inject the value (with optional default)
const theme = inject<string>('theme', 'light')
</script>

<template>
  <div :class="theme">
    Current theme: {{ theme }}
  </div>
</template>


