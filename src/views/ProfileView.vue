<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const userInfos = ref(null)
const isLoading = ref(true)

const GlobalStore = inject('GlobalStore')
// console.log(GlobalStore.userInfos.value.jwt)
const router = useRouter()

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/users/me?populate[0]=offers&populate[1]=offers.pictures&populate[2]=avatar',
      { headers: { Authorization: `Bearer ${GlobalStore.userInfos.value.jwt}` } },
    )

    console.log(data)

    userInfos.value = data
    isLoading.value = false
  } catch (error) {
    console.log(error)
  }
})

const offersNum = computed(() => {
  if (userInfos.value.offers.length === 1) {
    return `${userInfos.value.offers.length} annonce`
  } else {
    return `${userInfos.value.offers.length} annonces`
  }
})

const deleteOffer = async (id) => {
  try {
    const { data } = await axios.delete(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${id}`,
      { headers: { Authorization: `Bearer ${GlobalStore.userInfos.value.jwt}` } },
    )
    console.log(data)

    router.go()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <div class="container">
      <div v-if="isLoading">Chargement en cours...</div>
      <div v-else>
        <div id="userDiv">
          <img v-if="userInfos.avatar" :src="userInfos.avatar" alt="photo de profil" />
          <div v-else>{{ userInfos.username[0].toUpperCase() }}</div>
          <div>
            <h1>{{ userInfos.username }}</h1>
            <p>{{ userInfos.email }}</p>
          </div>
        </div>
        <div v-if="userInfos.offers">
          <h4>{{ offersNum }}</h4>
          <div id="offers">
            <div v-for="offer in userInfos.offers" :key="offer.id">
              <img id="offerPicture" :src="offer.pictures[0].url" alt="photo de l'article" />
              <h2>{{ offer.title }}</h2>
              <span>{{ offer.price }}</span>
              <font-awesome-icon :icon="['fas', 'trash']" @click="deleteOffer(offer.id)" />
            </div>
          </div>
        </div>
        <p v-else>Aucune annonce pour le moment</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
}
#offers > div {
  border: red solid 2px;
  width: 100%;
  display: flex;
}
#offerPicture {
  width: 100px;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>
