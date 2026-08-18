<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

import BtnPublishOffer from '@/components/BtnPublishOffer.vue'

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
      <div v-if="isLoading" id="isLoading">Chargement en cours...</div>
      <div v-else>
        <div id="userDiv">
          <img v-if="userInfos.avatar" :src="userInfos.avatar" alt="photo de profil" />
          <div v-else id="firstLetter">{{ userInfos.username[0].toUpperCase() }}</div>
          <div id="usernameDiv">
            <h1>{{ userInfos.username }}</h1>
            <p>{{ userInfos.email }}</p>
          </div>
        </div>
        <div v-if="userInfos.offers.length > 0">
          <h4>{{ offersNum }}</h4>
          <div id="offers">
            <div v-for="offer in userInfos.offers" :key="offer.id">
              <img id="offerPicture" :src="offer.pictures[0].url" alt="photo de l'article" />
              <h2>{{ offer.title }}</h2>

              <span>{{ offer.price }} €</span>
              <font-awesome-icon :icon="['fas', 'trash']" @click="deleteOffer(offer.id)" />
            </div>
          </div>
        </div>
        <div v-else class="noOffer">
          <p>Vous n'avez aucune annonce en ligne</p>
          <btn-publish-offer />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
}

#isLoading {
  margin: 0 auto;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
#userDiv {
  border: solid 1px #627c93;
  border-radius: 20px;
  margin-top: 37px;
  padding: 15px;
  display: flex;
  gap: 20px;
}
#userDiv img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
#firstLetter {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #627c93;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 28px;
  font-weight: bold;
}
#usernameDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
}
h1 {
  font-size: 24px;
  font-weight: bold;
}
h4 {
  margin: 30px 0 50px 0;
  font-size: 18px;
  font-weight: bold;
}
#offers {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 10px;
}

#offers > div {
  box-shadow: 0 0 5px 3px #e6eaee;
  width: 100%;
  display: flex;
  height: 150px;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
}
#offerPicture {
  width: 120px;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 7px;
}
#offers h2 {
  flex: 2;
  font-size: 22px;
  font-weight: bold;
}
#offers span {
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  color: var(--brown);
}
svg {
  color: var(--orange-button);
}
.noOffer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.noOffer p {
  font-size: 16px;
}
</style>
