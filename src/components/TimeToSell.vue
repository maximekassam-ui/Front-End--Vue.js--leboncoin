<script setup>
import BtnPublishOffer from './BtnPublishOffer.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div id="mainBand">
    <img id="left" src="../assets/img/onde-corail.svg" alt="onde corail" />
    <div class="btnOffer">
      <p>C'est le moment de vendre</p>

      <BtnPublishOffer />
    </div>
    <img id="right" src="../assets/img/feuille-bleue.svg" alt="" />
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

.btnOffer {
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
/* ----------- Media Query --------- */

@media (max-width: 880px) {
  #mainBand {
    height: 100px;
  }
  .btnOffer {
    flex-direction: column;
    padding: 15px 0;
  }
  img {
    height: 100%;
    object-fit: cover;
    width: 29%;
  }
  #left {
    object-position: right;
  }
  #right {
    object-position: left;
  }
}

@media (max-width: 650px) {
  #mainBand {
    height: 90px;
    position: relative;
    justify-content: center;
  }
  img {
    width: 20%;
    position: absolute;
  }
  #left {
    object-position: right;
    bottom: 0;
    left: 0;
  }
  #right {
    object-position: left;
    top: 0;
    right: 0;
  }
  p {
    font-size: 16px;
  }
}
</style>
