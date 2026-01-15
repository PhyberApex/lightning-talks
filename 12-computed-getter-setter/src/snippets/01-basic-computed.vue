<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref<string>('John')
const lastName = ref<string>('Doe')

const fullName = computed<string>(
  () => `${firstName.value} ${lastName.value}`
)
</script>

<template>
  <p>Full name: {{ fullName }}</p>
</template>


