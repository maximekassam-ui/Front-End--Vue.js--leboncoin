<script setup>
import { ref, onMounted, computed, onBeforeMount, inject } from 'vue'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'vue-router'

const props = defineProps({ id: String })
const stripePromise = loadStripe(
  'pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP',
)
const GlobalStore = inject('GlobalStore')
const router = useRouter()

const articleInfos = ref(null)
const isLoading = ref(true)
const isPickUp = ref(0)
const protection = 0.99
const errorMessage = ref('')
const isProcessing = ref(false)

// --------------- Form ----------------

const firstname = ref('')
const lastname = ref('')
const phoneNum = ref('')

// ------------------- Card ---------------
const cardElement = ref(null)
const confirmedPayment = ref(false)

onBeforeMount(async () => {
  const stripe = await stripePromise

  const elements = stripe.elements()

  cardElement.value = elements.create('card')

  cardElement.value.mount('#card-element')
})

// ----------------------------------------
onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate=*`,
    )

    // console.log(data.data)
    articleInfos.value = data.data
    console.log(articleInfos.value.attributes.pictures.data[0].attributes.url)
    isLoading.value = false
  } catch (error) {
    console.log(error)
  }
})

const amount = computed(() => {
  let total = 0
  console.log(Number(isPickUp.value))

  total = articleInfos.value.attributes.price + parseFloat(isPickUp.value) + protection
  return total
})

const handlePayment = async () => {
  if (firstname.value && lastname.value) {
    try {
      isProcessing.value = true

      const stripe = await stripePromise

      const { token } = await stripe.createToken(cardElement.value)

      const stripeToken = token.id

      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/buy',
        {
          token: stripeToken,
          amount: amount.value,
          title: articleInfos.value.attributes.title,
        },
        { headers: { Authorization: `Bearer ${GlobalStore.userInfos.value.jwt}` } },
      )

      if (data.status === 'succeeded') {
        confirmedPayment.value = true
        alert(
          `Paiement de ${amount.value} € validé pour l'achat du produit ${articleInfos.value.attributes.title} par ${lastname.value} ${firstname.value}`,
        )
        router.replace({ name: 'home' })
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    errorMessage.value = 'Votre nom et prénom sont obligatoires'
  }
  isProcessing.value = false
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Finalisez votre paiement</h1>
      <div>
        <section id="buyerInfos">
          <form>
            <div>
              <h2>Informations personnelles</h2>
              <p>Une pièce d'identité vous sera demandée pour récupérer votre colis.</p>
            </div>

            <div id="inputs">
              <label for="firstname">Prénom</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                v-model="firstname"
                placeholder="Prénom"
                @input="errorMessage = ''"
              />

              <label for="lastname">Nom</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                v-model="lastname"
                placeholder="Nom"
                @input="errorMessage = ''"
              />

              <label for="phoneNum">Téléphone</label>
              <input
                type="number"
                name="phoneNum"
                id="phoneNum"
                v-model="phoneNum"
                placeholder="Téléphone"
              />
            </div>

            <p>Recevoir un SMS pour l’arrivée de votre colis ou votre code de locker</p>
          </form>

          <p>
            Vous ne serez débité que lorsque le vendeur aura confirmé la disponibilité de la
            commande.
          </p>

          <div id="divCard">
            <h2>Coordonnées bancaires</h2>
            <p v-if="confirmedPayment">Commande effectuée</p>
            <div v-else>
              <div id="card-element"></div>

              <div id="submitDiv">
                <button @click="handlePayment" :disabled="isProcessing">Payer</button>

                <span v-if="errorMessage">{{ errorMessage }}</span>
              </div>
            </div>

            <div>
              <p>
                Paiement sécurisé Votre banque peut vous demander d’autoriser le paiement pour
                compléter votre achat.
              </p>
              <p>
                Vous êtes sur un serveur de paiement sécurisé par les normes ssl (https) et pcidss
                de nos partenaires bancaires. Vos données sont encryptées pour plus de sécurité.
              </p>
            </div>
          </div>
        </section>
        <p id="isLoading" v-if="isLoading">Chargement en cours...</p>
        <section id="productRecap" v-else>
          <div id="articleDiv">
            <div id="imgAndTitle">
              <img
                :src="articleInfos.attributes.pictures.data[0].attributes.url"
                alt="photo du produit"
              />
              <h3>{{ articleInfos.attributes.title }}</h3>
            </div>
            <p class="price">{{ articleInfos.attributes.price }} €</p>
          </div>
          <div id="pickUpPart">
            <h3>Mode de remise</h3>

            <div class="radioDiv">
              <input
                type="radio"
                name="pickUpInperson"
                id="pickUpInPerson"
                v-model="isPickUp"
                value="0"
              />
              <label for="pickUpInPerson"
                >Remise en main propre
                <p>Payez en ligne et récupérez votre achat en main</p>
                <p>propre lors de votre rendez-vous avec le vendeur</p>
              </label>
            </div>

            <div id="shippingDiv">
              <div class="radioDiv">
                <input
                  type="radio"
                  name="shipping"
                  id="shipping"
                  v-model="isPickUp"
                  value="15.60"
                />
                <label for="shipping">
                  Colissimo
                  <p>à votre domicile sous 2-3 jours</p>
                </label>
              </div>
              <p id="shippingPrice" class="price">15,60 €</p>
            </div>

            <div id="protection">
              <h3>Protection leboncoin</h3>
              <p class="price">0,99 €</p>
            </div>

            <div class="iconDiv">
              <font-awesome-icon :icon="['fas', 'check']" />
              <p>Votre argent est sécurisé et versé au bon moment</p>
            </div>
            <div class="iconDiv">
              <font-awesome-icon :icon="['fas', 'check']" />
              <p>Notre service client dédié vous accompagne</p>
            </div>
          </div>
          <div id="total">
            <h2>Total</h2>
            <p class="price">{{ amount }}</p>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
  display: block;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
}

h1 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}
h1 + div {
  height: 100%;
  width: 100%;
  /* border: blue solid 2px; */
  display: flex;
  justify-content: space-between;
}

#buyerInfos {
  /* border: red solid 2px; */
  height: 100%;
  width: 670px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
form {
  height: 405px;
  box-shadow: 0 0 10px var(--med-grey);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
}
h2 {
  font-size: 18px;
  font-weight: 700;
}
p {
  font-size: 12px;
}

/* ----------- Form Part ------------ */
#inputs {
  display: flex;
  flex-direction: column;
}
input {
  height: 45px;
  border-radius: 15px;
  border: solid 1px var(--med-grey);
  padding-left: 15px;
  font-size: 16px;
}
input:focus {
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

label {
  font-size: 18px;
  margin-top: 30px;
  margin-bottom: 10px;
}
div + p {
  margin: 5px 0;
}
/* ------------Card Part ----------------- */
#divCard {
  box-shadow: 0 0 10px var(--med-grey);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  flex: 1;
}
#card-element {
  min-height: 45px;
  border: solid 1px var(--med-grey);
  border-radius: 15px;
  padding: 15px;
  margin: 20px 0;
}
button {
  background-color: var(--orange-button);
  border: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 15px;
  margin-bottom: 20px;
  cursor: pointer;
}
button:disabled {
  opacity: 0.5;
  cursor: auto;
}
div > p {
  font-size: 12px;
  margin: 5px 0;
}
#submitDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#submitDiv span {
  color: var(--orange-button);
  font-size: 16px;
}

/* ----------- Product Part ------------- */
#isLoading {
  font-size: 18px;
  font-weight: bold;
}

#productRecap {
  box-shadow: 0 0 5px var(--med-grey);
  width: 355px;
  height: min-content;
  border-radius: 10px;
}
#articleDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}
#imgAndTitle {
  display: flex;
  gap: 10px;
  align-items: center;
}

img {
  height: 80px;
  width: 80px;
  object-fit: cover;
  border-radius: 5px;
}
/* ------------- Shipping Part ---------- */
h3 {
  font-size: 16px;
  font-weight: 700;
}
.price {
  color: var(--brown);
  font-weight: 700;
  font-size: 16px;
}
#pickUpPart {
  margin: 20px 0;
  border-top: solid 1px var(--med-grey);
  border-bottom: solid 1px var(--med-grey);
  padding: 15px;
}
.radioDiv {
  display: flex;
  align-items: center;
  gap: 10px;
}
.radioDiv label {
  font-size: 16px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 5px;
}

.radioDiv p {
  color: grey;
  margin: 5px 0;
}

#shippingDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* ------------- Protection Part ----------- */

#protection {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.iconDiv {
  display: flex;
  gap: 10px;
  align-items: baseline;
}
svg {
  color: green;
}
.iconDiv p {
  font-size: 16px;
}
/* -------------- Total ------------ */
#total {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
