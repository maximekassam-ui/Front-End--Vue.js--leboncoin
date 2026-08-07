<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, inject } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const GlobalStore = inject('GlobalStore')
const passwordHidden = ref(true)

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
      GlobalStore.changeUserInfos(
        response.data.user.username,
        response.data.jwt,
        response.data.user.id,
      )

      // console.log(response)
      // console.log(GlobalStore.userInfos.value)

      $cookies.set('jwtCookie', {
        jwt: GlobalStore.userInfos.value.jwt,
        username: GlobalStore.userInfos.value.username,
        id: GlobalStore.userInfos.value.id,
      })

      router.push({ name: 'home' })
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

const revealPassword = () => {
  passwordHidden.value = !passwordHidden.value
}
</script>

<template>
  <main>
    <div class="container">
      <form @submit.prevent="handleSubmit" class="connexionCard">
        <h1>Bonjour !</h1>
        <h2>Inscrivez-vous pour découvrir toutes nos fonctionnalités.</h2>
        <label for="name">Nom <sup>*</sup></label>
        <input type=" text" v-model="username" id="username" @input="clearErrorMessage" />
        <label for="email">Email <sup>*</sup></label>
        <input type="email" v-model="email" id="email" @input="clearErrorMessage" />

        <label for="password">Mot de passe <sup>*</sup></label>

        <div class="passwordInput" v-if="passwordHidden">
          <input type="password" v-model="password" id="password" @input="clearErrorMessage" />
          <div class="eye">
            <font-awesome-icon :icon="['far', 'eye-slash']" @click="revealPassword" />
          </div>
        </div>

        <div class="passwordInput" v-else>
          <input type="text" v-model="password" id="password" @input="clearErrorMessage" />
          <div class="eye">
            <font-awesome-icon :icon="['far', 'eye']" @click="revealPassword" />
          </div>
        </div>

        <button>
          <p id="isSubmitting" v-if="isSubmitting">Inscription en cours...</p>
          <p v-else>S'inscrire <font-awesome-icon :icon="['fas', 'arrow-right']" /></p>
        </button>
        <p id="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>

        <div id="login">
          <p>Vous avez déjà un compte ?</p>
          <RouterLink :to="{ name: 'login' }"> <span>Connectez-vous</span></RouterLink>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - (var(--header-height) + var(--footer-height)));
}

main > div {
  height: 100%;
  background-image: url('../assets/img/illustration.png');
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  box-shadow: 0 0 5px grey;
  height: 485px;
  width: 490px;
  border-radius: 20px;
  background-color: white;
  padding: 30px;
}
h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 0 0 15px;
}
h2 {
  font-size: 16px;
  margin: 0 0 30px;
}
label {
  font-size: 16px;
  margin: 0 0 7px;

  display: flex;
  gap: 3px;
}
sup {
  font-size: 14px;
  align-self: flex-start;
}
input {
  width: 420px;
  height: 45px;
  padding: 12px;
  border-radius: 14px;
  border: solid 1px grey;
  margin-bottom: 10px;
}
input:focus {
  outline: none;
}
#password {
  width: 380px;
  border-radius: 14px 0 0 14px;
}
.passwordInput {
  display: flex;
}
.eye {
  border: solid 1px grey;
  height: 45px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-left: none;
  border-radius: 0 14px 14px 0;
  color: grey;
}

button {
  width: 420px;
  height: 43px;
  background-color: #ec5a12;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
}
button svg {
  margin-left: 10px;
}
#login {
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  margin-top: 20px;
}
#login a {
  font-weight: bold;
  cursor: pointer;
}

/* --------------- v-if / v-else -------------- */

#errorMessage {
  text-align: center;
  font-size: 16px;
  color: #ec5a12;
  margin-bottom: 20px;
}
</style>
