<script setup>
import { RouterLink } from 'vue-router'
import BtnPublishOffer from './BtnPublishOffer.vue'
import { inject } from 'vue'

const GlobalStore = inject('GlobalStore')
console.log(GlobalStore.userInfos.value)

let isConnected = false
</script>

<template>
  <header>
    <div id="research" class="container">
      <RouterLink :to="{ name: 'home' }"> <img src="../assets/img/logo.svg" alt="" /> </RouterLink>

      <section>
        <BtnPublishOffer />

        <div>
          <input type="text" name="search" id="search" placeholder="Rechercher sur leboncoin" />
          <font-awesome-icon :icon="['fas', 'search']" />
        </div>
      </section>
      <div id="userProfil" v-if="GlobalStore.userInfos.value.username">
        <div id="profil">
          <font-awesome-icon :icon="['far', 'user']" />
          <p>{{ GlobalStore.userInfos.value.username }}</p>
        </div>

        <font-awesome-icon
          :icon="['fas', 'sign-out-alt']"
          @click="GlobalStore.deconnectUser"
          id="logout"
        />
      </div>

      <RouterLink :to="{ name: 'login' }" v-else
        ><div id="connection">
          <font-awesome-icon :icon="['far', 'user']" />
          <p>Se connecter</p>
        </div></RouterLink
      >
    </div>
    <nav id="navigation" class="container">
      <p>Immobilier</p>
      <font-awesome-icon :icon="['fas', 'circle']" />
      <p>Véhicules</p>
      <font-awesome-icon :icon="['fas', 'circle']" />
      <p>Locations de vacances</p>
      <font-awesome-icon :icon="['fas', 'circle']" />
      <p>Emploi</p>
      <font-awesome-icon :icon="['fas', 'circle']" />
      <p>Mode</p>
      <font-awesome-icon :icon="['fas', 'circle']" />
      <p>Maison & Jardin</p>
      <font-awesome-icon :icon="['fas', 'circle']" />
      <p>Famille</p>
      <font-awesome-icon :icon="['fas', 'circle']" />
      <p>Électronique</p>
      <font-awesome-icon :icon="['fas', 'circle']" />
      <p>Loisir</p>
      <font-awesome-icon :icon="['fas', 'circle']" />
      <p>Autres</p>
    </nav>
  </header>
</template>

<style scoped>
header {
  border-bottom: solid 1px rgb(48, 48, 89);
  height: var(--header-height);
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 5;
}

#research {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

img {
  width: 140px;
}

/* ----------------PARTIE CENTRALE --------------- */

section {
  display: flex;
  align-items: center;
  gap: 30px;
}

section > div {
  background-color: #f4f9fd;
  width: 280px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 40px;
}

#search {
  width: 200px;
  background-color: #f4f9fd;
  border: none;
}

input::-webkit-input-placeholder {
  color: black;
  font-size: 15px;
  font-weight: 500;
}
input::-moz-placeholder {
  color: black;
}

input:focus {
  outline: none;
}

#search + svg {
  background-color: #ec5a12;
  font-size: 10px;
  height: 27px;
  width: 27px;
  padding: 6px;
  border-radius: 3px;
}

/* --------------PARTIE CONNEXION ---------------- */

#connection {
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

#connection svg {
  font-size: 20px;
  margin-top: 5px;
}

#connection p {
  font-size: 13px;
}

#profil {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
#profil p {
  font-size: 14px;
}
#userProfil {
  display: flex;
  align-items: center;
  gap: 20px;
}
#logout {
  color: grey;
  font-size: 14px;
}
/* ------------------- PARTIE NAVIGATION-------------------- */

nav {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#navigation p {
  font-size: 14px;
}

#navigation svg {
  font-size: 2px;
}
</style>
