<script setup>
import { RouterLink } from 'vue-router'

import { onMounted, ref, watchEffect } from 'vue'
import axios from 'axios'

import OfferCard from '@/components/OfferCard.vue'
import TimeToSell from '@/components/TimeToSell.vue'
import FilterPart from '@/components/FilterPart.vue'
import Pagination from '@/components/Pagination.vue'

const props = defineProps(['sort', 'pricemin', 'pricemax', 'title', 'page'])

const articleList = ref([])
const numOfPages = ref()

onMounted(() => {
  watchEffect(async () => {
    try {
      let priceFilters = ''

      if (props.pricemin) {
        priceFilters += `&filters[price][$gte]=${props.pricemin}`
      }
      if (props.pricemax) {
        priceFilters += `&filters[price][$lte]=${props.pricemax}`
      }

      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers?populate[0]=pictures&populate[1]=owner.avatar&sort=${props.sort}${priceFilters}&filters[title][$containsi]=${props.title}&pagination[page]=${props.page}&pagination[pageSize]=10`,
      )

      // console.log(data.meta.pagination)

      articleList.value = data.data
      numOfPages.value = data.meta.pagination.pageCount
    } catch (error) {
      console.log(error)
    }
  })
})
</script>

<template>
  <main>
    <p class="container" v-if="articleList.length === 0">Chargement en cours ...</p>
    <div v-else class="container">
      <FilterPart
        :sort="sort"
        :pricemin="pricemin"
        :pricemax="pricemax"
        :page="page"
        :title="title"
      />
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
      <Pagination
        :sort="sort"
        :pricemin="pricemin"
        :pricemax="pricemax"
        :page="page"
        :title="title"
        :numOfPages="numOfPages"
      />
    </div>
  </main>
</template>

<style scoped>
h2 {
  font-size: 24px;
  text-align: center;
  padding: 0 0 25px;
  font-weight: bold;
}

.offers {
  display: flex;
  flex-wrap: wrap;
  gap: 40px 15px;
}

/* ---------- ROUTERLINK -------------- */
a {
  width: calc((100% - 60px) / 5);
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* ------------ Media Query ----------------- */
@media (max-width: 1050px) {
  h2 {
    font-size: 20px;
  }
  a {
    height: 400px;
    width: calc((100% - 45px) / 4);
  }
}

@media (max-width: 880px) {
  a {
    height: 450px;
    width: calc((100% - 30px) / 3);
  }
}

@media (max-width: 650px) {
  h2 {
    font-size: 14px;
  }
  a {
    width: calc((100% - 15px) / 2);
  }
}
</style>
