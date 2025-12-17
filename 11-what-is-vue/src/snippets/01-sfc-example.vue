<template>
  <div class="greeting">
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref<string>('Hello, Vue!')
</script>

<style scoped>
.greeting {
  color: #42b883;
  font-size: 2rem;
}
</style>

