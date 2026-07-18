<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps({ id: String })

const offerInfos = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=owner.avatar&populate[1]=pictures`,
    )

    offerInfos.value = data.data.attributes

    console.log(offerInfos.value.owner.data.attributes.avatar)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <p v-if="offerInfos === null">Charggement en cours ...</p>
  <section v-else class="container">
    <div id="offerDiv">
      <img
        :src="offerInfos.pictures.data[0].attributes.url"
        alt="photo principal de l'article"
        id="article"
      />
      <h1>{{ offerInfos.title }}</h1>
      <p>{{ offerInfos.price }} €</p>
      <span>{{ offerInfos.publishedAt }}</span>
      <div id="description">
        <h3>Description</h3>
        <p>{{ offerInfos.description }}</p>
      </div>
      <div id="location">
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
        <p>Agnon-Coutainville (50230)</p>
      </div>
    </div>
    <div id="userDiv">
      <div>
        <img
          v-if="offerInfos.owner.data.attributes.avatar.data !== null"
          :src="offerInfos.owner.data.attributes.avatar.data.attributes.url"
          alt="photo de profil"
        />
        <h2>{{ offerInfos.owner.data.attributes.username }}</h2>
      </div>
      <div v-if="offerInfos.owner.data.attributes.confirmed === true" id="identity">
        <font-awesome-icon :icon="['fas', 'check-double']" />
        <p>Pièce d'iddentité vérifiée</p>
      </div>
      <div id="timeResponse">
        <font-awesome-icon :icon="['far', 'clock']" />
        <p>Répond généralement en 1 heure</p>
      </div>

      <div id="button">
        <button style="background-color: #ec5a12">Acheter</button>
        <button style="background: #094171">Message</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ------------- LEFT PART -------------- */

#article {
  width: 480px;
  height: 330px;
  object-fit: cover;
}

section {
  padding-top: 40px;
  display: flex;
  gap: 50px;
  height: calc(100vh - 195px);
}

#offerDiv {
  width: 65%;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
}

#offerDiv img {
  align-self: center;
  margin-bottom: 30px;
}

h1 {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
}

h1 + p {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 20px;
}

span {
  color: grey;
  margin-bottom: 50px;
}

#description {
  border-top: solid 1px grey;
  padding: 20px 0 40px 0;
}

h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

#location {
  display: flex;
  border-top: solid 1px grey;
  padding: 15px 0;
  gap: 10px;
}

/* ----------- RIGHT PART ----------- */

#userDiv {
  width: 40%;
  height: 380px;
  box-shadow: 0 0 2px black;
  padding: 30px;
}

#userDiv img {
  width: 70px;
  border-radius: 50%;
}

#userDiv div:first-child {
  display: flex;
  gap: 20px;
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 20px;
}

#identity {
  background-color: #fee9dd;
  display: flex;
  padding: 5px 10px;
  gap: 10px;
  color: #8c3e16;
  width: fit-content;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 20px;
}

#timeResponse {
  display: flex;
  gap: 10px;
  margin-bottom: 60px;
}

#button {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

button {
  height: 50px;
  border-radius: 15px;
  border: none;
  font-size: 18px;
  color: white;
}
</style>
