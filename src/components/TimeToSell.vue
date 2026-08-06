<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div id="mainBand">
    <img src="../assets/img/onde-corail.svg" alt="onde corail" />
    <div>
      <p>C'est le moment de vendre</p>
      <RouterLink :to="{ name: 'publish' }">
        <BtnPublishOffer />
      </RouterLink>
    </div>
    <img src="../assets/img/feuille-bleue.svg" alt="" />
  </div>
</template>

<style scoped>
#mainBand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fee9dd;
  border-radius: 15px;
  margin-bottom: 50px;
}

div > div {
  display: flex;
  align-items: center;
  gap: 20px;
}

img {
  border-radius: 15px;
}
p {
  font-size: 20px;
  font-weight: bold;
}
</style>
