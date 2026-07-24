<script setup>
import { RouterLink } from 'vue-router'
import { ref, inject } from 'vue'
import axios from 'axios'
import { errorMessages } from 'vue/compiler-sfc'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const isSubmitting = ref(false)

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const handleSubmit = async () => {
  isSubmitting.value = true
  // console.log('>>>>>>', { identifier: email.value, password: password.value })
  if (email.value && password.value) {
    try {
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local',
        { identifier: email.value, password: password.value },
      )
      console.log(data)

      GlobalStore.changeUserInfos(data.user.username, data.jwt)

      router.push({ name: 'home' })
    } catch (error) {
      console.log(error)

      errorMessage.value = 'Un problème est survenu, veuillez essayer à nouveau'
    }
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs'
  }

  isSubmitting.value = false
}

const clearErrorMessage = () => {
  errorMessage.value = ''
}
</script>

<template>
  <main>
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <h1>Bonjour !</h1>
        <h2>Connectez-vous pour découvrir toutes nos fonctionnalités.</h2>
        <label for="email">Email <sup>*</sup></label
        ><input type="email" v-model="email" id="email" />
        <label for="password">Mot de passe <sup>*</sup></label
        ><input type="password" v-model="password" id="password" @input="clearErrorMessage" />
        <button v-if="!isSubmitting">Se connecter</button>
        <p v-else>Connexion en cours...</p>
        <p v-if="errorMessage">{{ errorMessage }}</p>

        <div>
          <p>Envie de nous rejoindre ?</p>
          <RouterLink :to="{ name: 'signup' }"> Créer un compte </RouterLink>
        </div>
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
