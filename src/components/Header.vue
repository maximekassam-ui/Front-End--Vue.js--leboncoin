<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BtnPublishOffer from './BtnPublishOffer.vue'
import { inject, ref } from 'vue'

const GlobalStore = inject('GlobalStore')

const route = useRoute()
const router = useRouter()

const search = ref('')

const handleResearch = () => {
  console.log(search.value, route.query)

  const queries = { ...route.query }

  if (search.value) {
    queries.title = search.value
  } else {
    delete queries.title
  }

  queries.page = 1

  router.push({ name: 'home', query: queries })
}

const reInitialise = (event) => {
  if (event.target.value === '') {
    const queries = { ...route.query }
    delete queries.title

    router.push({ name: 'home', query: queries })
  }
}
</script>

<template>
  <header>
    <div id="research" class="container">
      <RouterLink :to="{ name: 'home' }"> <img src="../assets/img/logo.svg" alt="" /> </RouterLink>

      <section>
        <BtnPublishOffer id="hiddenBtn" />

        <form @submit.prevent="handleResearch" id="hidden650">
          <input
            type="text"
            v-model="search"
            id="search"
            placeholder="Rechercher sur leboncoin"
            @input="reInitialise"
          />
          <button><font-awesome-icon :icon="['fas', 'search']" class="glasse" /></button>
        </form>
      </section>

      <div id="userProfil" v-if="GlobalStore.userInfos.value.username">
        <div id="profil">
          <RouterLink :to="{ name: 'profile' }">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>{{ GlobalStore.userInfos.value.username }}</p>
          </RouterLink>
        </div>

        <font-awesome-icon
          :icon="['fas', 'sign-out-alt']"
          @click="GlobalStore.disconnectUser"
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

    <form @submit.prevent="handleResearch" id="show650">
      <input
        type="text"
        v-model="search"
        id="search"
        placeholder="Rechercher sur leboncoin"
        @input="reInitialise"
      />
      <button><font-awesome-icon :icon="['fas', 'search']" class="glasse" /></button>
    </form>

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

section > form {
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
  height: 25px;
}

input::-webkit-input-placeholder {
  color: grey;
  font-size: 15px;
  font-weight: 500;
}
input::-moz-placeholder {
  color: grey;
}

input:focus {
  outline: none;
}

#search + button {
  background-color: #ec5b1200;
  border: none;
}

.glasse {
  background-color: #ec5a12;
  font-size: 10px;
  height: 27px;
  width: 27px;
  padding: 6px;
  border-radius: 3px;
  border: none;
  cursor: pointer;
}
#show650 {
  display: none;
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

#profil a {
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

/* --------- Media Query ---------- */

@media (max-width: 1090px) {
  header .container:last-child {
    padding: 0;
  }
  nav {
    height: fit-content;
  }
}

@media (max-width: 970px) {
  #hiddenBtn {
    display: none;
  }
  #navigation {
    overflow: scroll hidden;
    justify-content: flex-start;
    gap: 13px;
    scrollbar-width: none;
  }
  #navigation p {
    flex-shrink: 0;
  }
}

@media (max-width: 650px) {
  #hidden650 {
    display: none;
  }
  #show650 {
    background-color: #f4f9fd;
    width: 100%;
    display: flex;
    padding: 5px;
    border-radius: 10px;
    margin-bottom: 20px;
    align-items: center;
  }
  #show650 input {
    flex: 1;
  }
  header {
    height: max-content;
  }
}
</style>
