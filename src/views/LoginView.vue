<script setup>
import { RouterLink } from 'vue-router'
import { ref, inject } from 'vue'
import axios from 'axios'
import { errorMessages } from 'vue/compiler-sfc'
import { useRouter, useRoute } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const passwordHidden = ref(false)

const isSubmitting = ref(false)

const GlobalStore = inject('GlobalStore')
const router = useRouter()
const route = useRoute()

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

      GlobalStore.changeUserInfos(data.user.username, data.jwt, data.user.id)

      $cookies.set('jwtCookie', { jwt: data.jwt, username: data.user.username, id: data.user.id })

      router.push({ path: route.query.redirect || '/' })
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
        <section>
          <label for="email">Email <sup>*</sup></label
          ><input type="email" v-model="email" id="email" @input="clearErrorMessage" />
        </section>

        <section id="passwordSection">
          <label for="password">Mot de passe <sup>*</sup></label>
          <div id="passwordInput">
            <input
              :type="!passwordHidden ? 'password' : 'text'"
              v-model="password"
              id="password"
              @input="clearErrorMessage"
            />
            <div class="eye" v-if="!passwordHidden" @click="passwordHidden = !passwordHidden">
              <font-awesome-icon :icon="['far', 'eye-slash']" />
            </div>
            <div class="eye" v-else @click="passwordHidden = !passwordHidden">
              <font-awesome-icon :icon="['far', 'eye']" @click="revealPassword" />
            </div>
          </div>
        </section>

        <button>
          <p v-if="!isSubmitting">
            Se connecter <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </p>
          <p v-else id="connectionMsg">Connexion en cours...</p>
        </button>

        <p id="errorMessage" v-if="errorMessage">{{ errorMessage }}</p>

        <div id="create">
          <p id="join">Envie de nous rejoindre ?</p>
          <RouterLink :to="{ name: 'signup' }"> Créer un compte </RouterLink>
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
  margin: 0 0 40px;
}

section {
  display: flex;
  flex-direction: column;
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
  max-width: 420px;
  height: 45px;
  padding: 12px;
  border-radius: 14px;
  border: solid 1px grey;
}
input:focus {
  outline: none;
}

#email {
  margin: 0 0 50px;
}

#passwordSection {
  margin: 0 0 50px;
}
#password {
  width: 380px;
  border-radius: 14px 0 0 14px;
}
#passwordInput {
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
#connectionMsg {
  text-align: center;
}

button {
  max-width: 420px;
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

#create {
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
}

#create a {
  font-weight: bold;
  cursor: pointer;
}

/* ----------v-if / v-else ------------ */
#errorMessage {
  text-align: center;
  font-size: 16px;
  color: #ec5a12;
  margin-bottom: 20px;
}

/* --------- Media Query ---------- */

@media (max-width: 450px) {
  form {
    width: 300px;
  }
  #create {
    display: inline-grid;
  }
  button {
    width: 100%;
  }
}
</style>
