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
      id="productPicture"
      :src="articleList.attributes.pictures.data[0].attributes.url"
      alt="photo article"
    />
    <h3>{{ articleInfo.title }}</h3>
    <p id="price">{{ articleInfo.price }} €</p>
    <div id="date">
      <span>{{ newDate }}</span>
      <font-awesome-icon :icon="['far', 'heart']" />
    </div>
  </div>
</template>

<style scoped>
#card {
  width: 190px;
  height: 450px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

#productPicture {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

#avatar {
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

#user {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
}

h2 {
  font-weight: bold;
  font-size: 18px;
}

h3 {
  font-size: 18px;
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
  align-items: center;
  color: grey;
}

#date svg {
  font-size: 22px;
}
</style>
