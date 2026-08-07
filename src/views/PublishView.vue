<script setup>
import { ref, inject, computed } from 'vue'
import axios from 'axios'
import LoginView from './LoginView.vue'

import { useRouter } from 'vue-router'
import { errorMessages } from 'vue/compiler-sfc'

const title = ref('')
const description = ref('')
const price = ref(null)
const pictures = ref(null)
const isPublishing = ref(false)
const errorMessage = ref('')

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const selectPictures = (event) => {
  errorMessage.value = ''
  const numOfFiles = event.target.files.length

  if (numOfFiles <= 10) {
    pictures.value = event.target.files
  } else {
    errorMessage.value = '10 photos maximum '
  }
}

const handleSubmit = async () => {
  if (title.value && description.value && price.value && pictures.value) {
    isPublishing.value = true

    const formData = new FormData()

    for (const key in pictures.value) {
      if (Object.hasOwnProperty.call(pictures.value, key)) {
        formData.append('files.pictures', pictures.value[key])
      }
    }

    const stringifiedInfos = JSON.stringify({
      title: title.value,
      description: description.value,
      price: price.value,
      owner: GlobalStore.userInfos.value.id,
    })

    //   console.log(stringifiedInfos)

    formData.append('data', stringifiedInfos)

    try {
      const { data } = await axios.post(
        'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers',
        formData,
        {
          headers: {
            Authorization: `Bearer ${GlobalStore.userInfos.value.jwt}`,
            'Content-type': 'multipart/form-data',
          },
        },
      )
      console.log('response', data.data.id)
      router.push({ name: 'offer', params: { id: data.data.id } })
      alert('Annonce publiée')
    } catch (error) {
      console.log(error)
    }
    isPublishing.value = false
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs'
  }
}

const urlsListPreview = computed(() => {
  const tab = []

  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      tab.push(URL.createObjectURL(pictures.value[key]))
    }
  }
  return tab
})
</script>

<template>
  <main>
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <h1>Déposer une annonce</h1>

        <div class="titleDiv">
          <label for="title">Titre de l'annonce</label>
          <input type="text" name="title" id="title" v-model="title" @input="errorMessage = ''" />
          <p>Vous n'avez pas besoin de mentionner « Achat » ou « Vente » ici.</p>
        </div>

        <div class="textareaDiv">
          <label for="description">Description de l'annonce</label>
          <textarea
            name="description"
            id="description"
            v-model="description"
            cols="30"
            rows="10"
            @input="errorMessage = ''"
          ></textarea>
          <p>
            Nous vous rappelons que la vente de contrefaçons est interdite. Nous vous invitons à
            ajouter tout élément permettant de prouver l’authenticité de votre article: numéro de
            série, facture, certificat, inscription de la marque sur l’article, emballage etc.
            Indiquez dans le texte de l’annonce si vous proposez un droit de rétractation à
            l’acheteur. En l’absence de toute mention, l’acheteur n’en bénéficiera pas et ne pourra
            pas demander le remboursement ou l’échange du bien ou service proposé
          </p>
        </div>

        <div class="priceDiv">
          <label for="price">Votre prix de vente</label>
          <div>
            <input
              type="number"
              name="price"
              id="price"
              v-model="price"
              @input="errorMessage = ''"
            />
            <span>€</span>
          </div>
        </div>

        <div class="picturesDiv">
          <label for="pictures"
            >Ajoutez des photos
            <div id="fileDiv">
              <input type="file" name="pictures" id="pictures" multiple @input="selectPictures" />
              <font-awesome-icon :icon="['fas', 'camera']" />
              <p>Sélectionnez jusqu'à 10 photos</p>
            </div></label
          >
        </div>
        <div v-if="pictures">
          <img v-for="url in urlsListPreview" :src="url" alt="Photos de l'article" />
        </div>
        <p v-if="isPublishing">Envoi en cours...</p>
        <button v-else>Déposer mon annonce</button>
        <div v-if="errorMessage">
          <p>{{ errorMessage }}</p>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #f4f9fe;
  padding: 40px;
}

main > div {
  height: 960px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
}

form {
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  height: 100%;
}
h1 {
  font-size: 22px;
  font-weight: bold;
}
.titleDiv,
.textareaDiv {
  display: flex;
  flex-direction: column;
  width: 770px;
}

.titleDiv input {
  height: 46px;
  border: solid 1px #627c93;
  border-radius: 10px;
  margin-bottom: 10px;
}

label {
  margin-bottom: 12px;
}

input + p,
textarea + p {
  font-size: 12px;
  color: #627c93;
  line-height: 14px;
}
textarea {
  border: solid 1px #627c93;
  height: 212px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.priceDiv,
.picturesDiv {
  display: flex;
  flex-direction: column;
}

.priceDiv div {
  height: 42px;
  width: 230px;
  border: solid 1px #627c93;
  border-radius: 10px;
  display: flex;
  gap: 15px;
  align-items: center;
}
.priceDiv div input {
  border: none;
  border-right: solid 1px #627c93;
  width: 185px;
  height: 40px;
  border-radius: 10px 0 0 10px;
}

#pictures {
  display: none;
}
.picturesDiv label {
  width: 1010px;
  height: 180px;
}
#fileDiv {
  height: 150px;
  width: 150px;
  border: solid 1px #627c93;
  border-radius: 10px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
}
#fileDiv p {
  font-size: 16px;
  color: #094171;
  text-align: center;
}
svg {
  font-size: 40px;
  color: #094171;
}
button {
  background-color: #ec5a12;
  color: #fff;
  width: 180px;
  height: 35px;
  padding: 10px 10px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  align-self: flex-end;
}

/* ----------- focus input outline + hide arrow */
input:focus,
textarea:focus {
  outline: none;
  padding: 10px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
