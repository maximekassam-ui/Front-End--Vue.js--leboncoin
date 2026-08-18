<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps(['sort', 'pricemin', 'pricemax', 'page', 'title'])

const router = useRouter()

const priceMin = ref(props.pricemin)
const priceMax = ref(props.pricemax)
const sort = ref(props.sort)
const page = ref(props.page)

// ------------------------------
const submitFilters = () => {
  const queries = { ...props }

  if (priceMin.value) {
    queries.pricemin = priceMin.value
    queries.page = 1
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

  queries.page = 1

  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <form @submit.prevent="submitFilters" class="container">
    <div>
      <p>Prix</p>
      <div>
        <div class="price">
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
        <div class="price">
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
      <div id="sort">
        <label
          ><span class="show"> Prix croissants </span>
          <font-awesome-icon class="hidden" :icon="['fas', 'sort-amount-up']"
        /></label>
        <input type="radio" value="price:asc" id="price:asc" v-model="sort" />

        <label>
          <span class="show">Prix décroissants </span
          ><font-awesome-icon class="hidden" :icon="['fas', 'sort-amount-up']"
        /></label>
        <input type="radio" value="price:desc" id="price:desc" v-model="sort" />

        <label>
          <span class="show">Pas de tri </span
          ><font-awesome-icon class="hidden" :icon="['fas', 'ban']"
        /></label>
        <input type="radio" id="noSort" value="" v-model="sort" />
      </div>
    </div>
    <button>Rechercher</button>
  </form>
</template>

<style scoped>
form {
  height: 110px;
  display: flex;
  align-items: center;
  padding-top: 20px;
  margin: 40px 0;
}
form > div {
  height: 74px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}
form > div > div {
  height: 46px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
}

/* Price Part -------------- */

div > p {
  font-size: 18px;
  font-weight: bold;
}

.price {
  border: solid #e6eaee 1px;
  width: 190px;
  border-radius: 15px;
}
.price > input {
  height: 40px;
  width: 150px;
  border: none;
  border-right: solid 1px #e6eaee;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 0 7px;
  font-size: 16px;
}
.price > label {
  font-size: 14px;
  text-align: center;
  margin-left: 10px;
}

#sort {
  gap: 2px;
}

label + input {
  margin-right: 13px;
}
.hidden {
  display: none;
}
button {
  background-color: #ec5a12;
  color: #fff;
  padding: 10px 10px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
}

/* -------- focus input outline + hide arrow ------- */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input:focus {
  outline: none;
  padding: 10px;
}
/* ----------- Media Query --------- */
@media (max-width: 1050px) {
  form {
    /* background-color: aqua; */
    flex-direction: column;
    align-items: center;
    gap: 40px;
    height: fit-content;
  }
  form > div {
    align-items: center;
  }
}
@media (max-width: 650px) {
  .form {
    background-color: pink;
  }
  .price {
    width: 135px;
  }
  .price > input {
    height: 35px;
    width: 100px;
    font-size: 14px;
  }
  .show {
    display: none;
  }
  .hidden {
    display: inline;
  }
  #sort {
    gap: 0px;
  }
  label + input {
    margin-right: 16px;
  }
}
</style>
