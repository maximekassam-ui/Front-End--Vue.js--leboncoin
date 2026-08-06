<script setup>
import { ref, inject, computed } from 'vue'
import axios from 'axios'
import LoginView from './LoginView.vue'

import { useRouter } from 'vue-router'

const title = ref('')
const description = ref('')
const price = ref(null)
const pictures = ref(null)
const isPublishing = ref(false)

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const handleSubmit = async () => {
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
    <div>
      <form @submit.prevent="handleSubmit">
        <h1>Déposer une annonce</h1>

        <div>
          <label for="title">Titre de l'annonce</label>
          <input type="text" name="title" id="title" v-model="title" />
          <p>Vous n'avez pas besoin de mentionner « Achat » ou « Vente » ici.</p>
        </div>

        <div>
          <label for="description">Description de l'annonce</label>
          <textarea
            name="description"
            id="description"
            v-model="description"
            cols="30"
            rows="10"
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

        <div>
          <label for="price">Votre prix de vente</label>
          <div><input type="number" name="price" id="price" v-model="price" /> <span>€</span></div>
        </div>

        <div>
          <label for="pictures">Ajoutez des photos</label>
          <input
            type="file"
            name="pictures"
            id="pictures"
            multiple
            @input="(event) => (pictures = event.target.files)"
          />
        </div>
        <div v-if="pictures">
          <img v-for="url in urlsListPreview" :src="url" alt="Photos de l'article" />
        </div>
        <p v-if="isPublishing">Envoi en cours...</p>
        <button v-else>Déposer mon annonce</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
