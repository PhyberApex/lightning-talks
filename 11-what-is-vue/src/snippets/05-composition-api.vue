<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref<number>(0)

const doubled = computed<number>(() => count.value * 2)

function increment(): void {
  count.value++
}
</script>

<template>
  <button @click="increment">{{ count }} ({{ doubled }})</button>
</template>

