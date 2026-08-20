<script setup></script>

<template>
  <footer>
    <div>
      <p class="container">
        Made by
        <a href="https://github.com/maximekassam-ui">Kassam Maxime</a>
        with
        <a href="https://vuejs.org/">Vue.js</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  height: var(--footer-height);
  background-color: #f4f9fd;
}

div {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

a {
  color: black;
  text-decoration: none;
  font-weight: bold;
}
</style>
