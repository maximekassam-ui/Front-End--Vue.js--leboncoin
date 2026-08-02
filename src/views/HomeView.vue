<script setup>
import { RouterLink } from 'vue-router'

import { onMounted, ref, watchEffect } from 'vue'
import axios from 'axios'

import OfferCard from '@/components/OfferCard.vue'
import TimeToSell from '@/components/TimeToSell.vue'
import FilterPart from '@/components/FilterPart.vue'

const props = defineProps(['sort', 'pricemin', 'pricemax'])

// ------------------
const url = `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar&sort=${props.sort}`
console.log(url)
// -----------------

const articleList = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar&sort=${props.sort}`,
    )

    // console.log(data.data)

    articleList.value = data.data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main>
    <p class="container" v-if="articleList.length === 0">Chargement en cours ...</p>
    <div v-else class="container">
      <FilterPart :sort="sort" :pricemin="pricemin" :pricemax="pricemax" />
      <div>
        <h2>Des millions de petites annonces et autant d'occasions de se faire plaisir !</h2>
      </div>

      <TimeToSell />
      <section class="offers">
        <RouterLink
          v-for="offer in articleList"
          :key="offer.id"
          :to="{ name: 'offer', params: { id: offer.id } }"
          ><OfferCard :articleList="offer"
        /></RouterLink>
      </section>
    </div>
  </main>
</template>

<style scoped>
h2 {
  font-size: 22px;
  text-align: center;
  padding: 25px;
}

.offers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* ---------- ROUTERLINK -------------- */
a {
  text-decoration: none;
  color: inherit;
}

/* -------------------------------------- */
</style>
