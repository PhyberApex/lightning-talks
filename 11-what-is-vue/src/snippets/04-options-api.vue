<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubled(): number {
      return this.count * 2
    }
  },
  methods: {
    increment(): void {
      this.count++
    }
  }
})
</script>

<template>
  <button @click="increment">{{ count }} ({{ doubled }})</button>
</template>

