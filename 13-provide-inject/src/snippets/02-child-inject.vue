<!-- Navigation.vue - finally uses it! -->
<script setup lang="ts">
import { inject, type Ref } from 'vue'

const theme = inject<Ref<string>>('theme')
</script>

<template>
  <nav :class="theme">{{ theme }}</nav>
</template>


