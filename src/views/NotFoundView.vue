<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="container">
      <RouterLink :to="{ name: 'home' }">Retour à l'accueil</RouterLink>
    </div>
  </main>
</template>

<style scoped></style>
