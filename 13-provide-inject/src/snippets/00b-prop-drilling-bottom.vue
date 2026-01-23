<!-- Sidebar.vue - still just passing -->
<script setup lang="ts">
defineProps<{ theme: string }>()
</script>
<template>
  <Navigation :theme="theme" />
</template>

<!-- Navigation.vue - finally uses it! -->
<script setup lang="ts">
const { theme } = defineProps<{ theme: string }>()
</script>
<template>
  <nav :class="theme">{{ theme }}</nav>
</template>
