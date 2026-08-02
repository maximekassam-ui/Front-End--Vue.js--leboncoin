<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['sort', 'pricemin', 'pricemax'])

const router = useRouter()

const priceMin = ref(props.pricemin)
const priceMax = ref(props.pricemax)
const sort = ref(props.sort)

// ------------------------------
const submitFilters = () => {
  const queries = { ...props }

  if (priceMin.value) {
    queries.pricemin = priceMin.value
  } else {
    delete queries.pricemin
  }

  if (priceMax.value) {
    queries.pricemax = priceMax.value
  } else {
    delete queries.pricemax
  }

  if (sort.value) {
    queries.sort = sort.value
  } else {
    delete queries.sort
  }

  // penser a mettre la pagination à 1

  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <form @submit.prevent="submitFilters">
    <div>
      <p>Prix</p>
      <div>
        <div>
          <input
            type="number"
            name="priceMin"
            v-model="priceMin"
            id="priceMin"
            placeholder="Minimum"
            min="0"
          />
          <label for="priceMin">€</label>
        </div>
        <div>
          <input
            type="number"
            name="priceMax"
            v-model="priceMax"
            id="priceMax"
            placeholder="Maximum"
            :min="priceMin"
          />
          <label for="priceMax">€</label>
        </div>
      </div>
    </div>
    <div>
      <p>Tri</p>
      <div>
        <label>
          Prix croissants
          <input type="radio" value="price:asc" id="price:asc" v-model="sort"
        /></label>

        <label
          >Prix décroissants <input type="radio" value="price:desc" id="price:desc" v-model="sort"
        /></label>

        <label>Pas de tri <input type="radio" id="noSort" value="" v-model="sort" /></label>
      </div>
    </div>
    <button>Rechercher</button>
  </form>
</template>

<style scoped></style>
