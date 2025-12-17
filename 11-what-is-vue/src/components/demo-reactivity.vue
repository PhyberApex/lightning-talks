<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(0)

function increment(): void {
  count.value++
}

function decrement(): void {
  count.value--
}
</script>

<template>
  <button @click="increment">Increase</button> <br />
  <button @click="decrement">Decrease</button> <br />
  Count: {{ count }}
</template>