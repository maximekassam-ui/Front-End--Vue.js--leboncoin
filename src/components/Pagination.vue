<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps(['page', 'pricemin', 'pricemax', 'sort', 'title', 'numOfPages'])
console.log(props.page)

const handlePreviousPage = () => {
  const queries = { ...props }

  queries.page = queries.page - 1
  router.push({ name: 'home', query: queries })
}

const handleNextPage = () => {
  const queries = { ...props }

  queries.page = queries.page + 1

  router.push({ name: 'home', query: queries })
}

const changePage = (num) => {
  const queries = { ...props }

  delete queries.numOfPages

  queries.page = num
  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <section class="container">
    <font-awesome-icon :icon="['fas', 'angle-left']" v-if="page > 1" @click="handlePreviousPage" />
    <font-awesome-icon :icon="['fas', 'angle-left']" v-else class="noClick" />
    <div>
      <div v-for="num in numOfPages" @click="changePage(num)" :class="{ mainPage: page === num }">
        <p>
          {{ num }}
        </p>
      </div>
    </div>

    <font-awesome-icon
      :icon="['fas', 'angle-right']"
      v-if="page < numOfPages"
      @click="handleNextPage"
    />
    <font-awesome-icon :icon="['fas', 'angle-right']" v-else class="noClick" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0 40px 0;
}
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
div > div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  cursor: pointer;
}
p {
  font-size: 16px;
}
.mainPage {
  background-color: #152233;
  color: white;
}
svg {
  font-size: 20px;
  cursor: pointer;
}
.noClick {
  color: #e6eaee;
  cursor: default;
}

@media (max-width: 650px) {
  div > div {
    height: 35px;
    width: 35px;
  }
  p {
    font-size: 14px;
  }
}
</style>
