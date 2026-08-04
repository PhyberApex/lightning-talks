<!-- Navigation.vue - finally uses it! -->
<script setup lang="ts">
import type { Ref } from 'vue'
import { inject } from 'vue'

const theme = inject<Ref<string>>('theme')
</script>

<template>
  <nav :class="theme">
    {{ theme }}
  </nav>
</template>
