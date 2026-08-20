<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <div class="container">
      <div id="lostDiv">
        <h3>404</h3>
        <h2>Perdu dans les</h2>
        <h1>Rayons !</h1>
      </div>

      <p>Désolés, on a cherché dans tous les coins, on n'a pas trouvé la bonne page.</p>

      <RouterLink :to="{ name: 'home' }">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
        Retour à l'accueil</RouterLink
      >
    </div>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - (var(--header-height) + var(--footer-height)));
}
.container {
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-image: url('../assets/img/notfound-D8MXZORpLebonCoin.webp');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
}

h3 {
  font-size: 60px;
  color: var(--orange-button);
  margin-bottom: 10px;
  font-weight: bold;
}

h2 {
  font-size: 60px;
  font-weight: bold;
}
h1 {
  font-size: 80px;

  text-shadow: 0 0 5px var(--orange-button);
  color: white;
}

/* -------- Media Query ---------- */
@media (max-width: 960px) {
  .container {
    background-color: #fafafa;
  }
}
</style>
