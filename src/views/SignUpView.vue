<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, inject } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const GlobalStore = inject('GlobalStore')

const isSubmitting = ref(false)
const errorMessage = ref('')
const router = useRouter()

const handleSubmit = async () => {
  //   console.log('submit ====>', {
  //     username: username.value,
  //     email: email.value,
  //     password: password.value,
  //   })
  isSubmitting.value = true

  if (username.value && email.value && password.value) {
    try {
      const response = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register',
        {
          username: username.value,
          email: email.value,
          password: password.value,
        },
      )
      GlobalStore.changeUserInfos(response.data.user.username, response.data.jwt)

      console.log(response)
      console.log(GlobalStore.userInfos.value)

      //   router.push({ name: 'home' })
    } catch (error) {
      console.log(error.response.data.error)
      errorMessage.value = 'Une erreur est survenue, désolé !'
    }
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs'
  }
  isSubmitting.value = false
}

const clearErrorMessage = () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
}
</script>

<template>
  <main>
    <div class="container">
      <form @submit.prevent="handleSubmit" class="connexionCard">
        <h1>Bonjour !</h1>
        <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</p>
        <label for="name">Nom <sup>*</sup></label>
        <input type=" text" v-model="username" id="username" @input="clearErrorMessage" />
        <label for="email">Email <sup>*</sup></label>
        <input type="email" v-model="email" id="email" @input="clearErrorMessage" />
        <label for="password">Mot de passe <sup>*</sup></label>
        <input type="password" v-model="password" id="password" @input="clearErrorMessage" />
        <button>S'inscrire</button>
        <p v-if="isSubmitting">Inscription en cours...</p>
        <div v-else>
          <p>Vous avez déjà un compte ?</p>
          <RouterLink :to="{ name: 'login' }"> <span>Connectez-vous</span></RouterLink>
        </div>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  border: solid red 2px;
  height: calc(100vh - 195px);
}
</style>
