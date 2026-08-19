<script setup>
const props = defineProps({
  articleList: Object,
})

const articleInfo = props.articleList.attributes
const ownerInfo = articleInfo.owner.data.attributes

let publishedDate = articleInfo.publishedAt
let newDate = publishedDate.slice(0, 10)
newDate = newDate.replaceAll('-', '/')
newDate = newDate.split('/').reverse().join()
newDate = newDate.replaceAll(',', '/')

let price = articleInfo.price
price = price.toString()
if (price.length > 4) {
  price = Number(price).toLocaleString('fr-FR')
}
</script>

<template>
  <div id="card">
    <div id="user">
      <img
        v-if="ownerInfo.avatar.data"
        :src="ownerInfo.avatar.data.attributes.url"
        alt="photo de profil"
        id="avatar"
      />
      <h2>{{ ownerInfo.username }}</h2>
    </div>

    <img
      v-if="articleList.attributes.pictures.data"
      id="productPicture"
      :src="articleList.attributes.pictures.data[0].attributes.url"
      alt="photo article"
    />

    <h3>{{ articleInfo.title }}</h3>
    <p id="price">{{ price }} €</p>
    <div id="date">
      <span>{{ newDate }}</span>
      <font-awesome-icon :icon="['far', 'heart']" />
    </div>
  </div>
</template>

<style scoped>
#card {
  height: 100%;

  display: flex;
  flex-direction: column;
  position: relative;
  /* border: solid red 1px; */
}

#productPicture {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  margin: 7px 0 5px;
}

#avatar {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  object-fit: cover;
}

#user {
  height: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
}

h2 {
  font-weight: bold;
  font-size: 14px;
  margin-top: 5px;
}

h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

#price {
  font-weight: bold;
}

#date {
  width: 100%;
  position: absolute;
  bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  color: grey;
  font-size: 12px;
}

#date svg {
  font-size: 16px;
}

/* --------- Media Query -------- */

@media (max-width: 1050px) {
  #productPicture {
    height: 300px;
  }
}
</style>
