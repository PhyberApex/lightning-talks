<script setup lang="ts">
import { provide, ref, type InjectionKey, type Ref } from 'vue'

export const CountKey: InjectionKey<Ref<number>> = Symbol('count')

const count = ref<number>(0)

// Provide a reactive ref - changes propagate!
provide(CountKey, count)

function increment(): void {
  count.value++
}
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
  <ChildComponent /> <!-- Will see count updates! -->
</template>


