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
      <h1>Finalisez votre payement</h1>
      <div>
        <section id="buyerInfos">
          <form>
            <div>
              <h2>Informations personnelles</h2>
              <p>Une pièce d'identité vous sera demandée pour récupérer votre colis.</p>
            </div>

            <div>
              <label for="firstname">Prénom</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                v-model="firstname"
                placeholder="Prénom"
                @input="errorMessage = ''"
              />
            </div>

            <div>
              <label for="lastname">Nom</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                v-model="lastname"
                placeholder="Nom"
                @input="errorMessage = ''"
              />
            </div>

            <div>
              <label for="phoneNum">Téléphone</label>
              <input
                type="number"
                name="phoneNum"
                id="phoneNum"
                v-model="phoneNum"
                placeholder="Téléphone"
              />
              <p>Recevoir un SMS pour l’arrivée de votre colis ou votre code de locker</p>
            </div>
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
              <button @click="handlePayment" :disabled="isProcessing">Payer</button>

              <span v-if="errorMessage">{{ errorMessage }}</span>
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
        <p v-if="isLoading">Chargement en cours...</p>
        <section id="productRecap" v-else>
          <div id="articleDiv">
            <img
              :src="articleInfos.attributes.pictures.data[0].attributes.url"
              alt="photo du produit"
            />
            <h3>{{ articleInfos.attributes.title }}</h3>
            <p>{{ articleInfos.attributes.price }} €</p>
          </div>
          <div>
            <h3>Mode de remise</h3>

            <div>
              <input
                type="radio"
                name="pickUpInperson"
                id="pickUpInPerson"
                v-model="isPickUp"
                value="0"
              />
              <label for="pickUpInPerson"
                >Remise en main propre
                <span
                  >Payez en ligne et récupérez votre achat en main propre lors de votre rendez-vous
                  avec le vendeur</span
                >
              </label>
            </div>

            <div>
              <div>
                <input
                  type="radio"
                  name="shipping"
                  id="shipping"
                  v-model="isPickUp"
                  value="15.60"
                />
                <label for="shipping">
                  Colissimo
                  <span>à votre domicile sous 2-3 jours </span>
                </label>
              </div>
              <div id="shippingPrice" class="price">15,60 €</div>
            </div>

            <div id="protection">
              <h3>Protection leboncoin</h3>
              <div class="price">0,99 €</div>
            </div>

            <div>
              <font-awesome-icon :icon="['fas', 'check']" />
              <p>Votre argent est sécurisé et versé au bon moment</p>
            </div>
            <div>
              <font-awesome-icon :icon="['fas', 'check']" />
              <p>Notre service client dédié vous accompagne</p>
            </div>
          </div>
          <div>
            <h2>Total</h2>
            <div class="price">{{ amount }}</div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - var(--header-height));
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
h1 + div {
  height: 100%;
  border: blue solid 2px;
  display: flex;
  justify-content: space-between;
}

#buyerInfos {
  border: red solid 2px;
  height: 100%;
  width: 670px;
}
form {
  height: 405px;
  box-shadow: 0 0 10px grey;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
}
#productRecap {
  border: solid green 2px;
  width: 355px;
}

img {
  height: 100px;
  width: 100px;
  object-fit: cover;
}
</style>
