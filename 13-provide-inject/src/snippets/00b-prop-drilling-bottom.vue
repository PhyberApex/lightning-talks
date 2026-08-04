<!-- Sidebar.vue - still just passing -->
<script setup lang="ts">
defineProps<{ theme: string }>()
</script>

<script setup lang="ts">
const { theme } = defineProps<{ theme: string }>()
</script>

<!-- Navigation.vue - finally uses it! -->
<template>
  <Navigation :theme="theme" />
</template>

<template>
  <nav :class="theme">{{ theme }}</nav>
</template>
