<template>
  <p v-if="isVisible">Now you see me!</p>
  <ul><li v-for="item in items" :key="item.id">{{ item.name }}</li></ul>
  <img :src="imageUrl" :alt="imageAlt" />
  <button @click="handleClick">Click me</button>
  <input v-model="searchQuery" placeholder="Search..." />
</template>

