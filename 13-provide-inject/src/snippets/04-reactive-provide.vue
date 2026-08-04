<!-- App.vue -->
<script setup lang="ts">
import { provide, ref } from 'vue'
import { ThemeKey } from './injection-keys'

const theme = ref('dark')
provide(ThemeKey, theme)

function toggleTheme(): void {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button @click="toggleTheme">
    Theme: {{ theme }}
  </button>
  <Layout /> <!-- Navigation will see updates! -->
</template>
