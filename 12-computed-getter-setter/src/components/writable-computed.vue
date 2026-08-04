<script setup lang="ts">
import { computed, ref } from 'vue'

const firstName = ref<string>('John')
const lastName = ref<string>('Doe')

const fullName = computed<string>({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (newValue: string) => {
    const [first, ...rest] = newValue.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  },
})
</script>

<template>
  First: <input v-model="firstName"><br>
  Last: <input v-model="lastName"><br>
  Full: <input v-model="fullName">
</template>
