import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'

const app = createApp(App)

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faPlusSquare,
  faUser,
  faHeart,
  faClock,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-regular-svg-icons'
import {
  faSearch,
  faSignOutAlt,
  faCircle,
  faMapMarkerAlt,
  faCheckDouble,
  faAngleRight,
  faAngleLeft,
  faArrowRight,
  faCamera,
  faCheck,
  faArrowLeft,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faPlusSquare,
  faSearch,
  faUser,
  faSignOutAlt,
  faCircle,
  faHeart,
  faMapMarkerAlt,
  faCheckDouble,
  faClock,
  faAngleRight,
  faAngleLeft,
  faArrowRight,
  faEyeSlash,
  faEye,
  faCamera,
  faCheck,
  faArrowLeft,
  faTrash,
)

app.use(router)

const userInfos = ref($cookies.get('jwtCookie') || '')
const changeUserInfos = (username, jwt, id) => {
  userInfos.value = {
    username: username,
    jwt: jwt,
    id: id,
  }
}

const disconnectUser = () => {
  userInfos.value = {}
  $cookies.remove('jwtCookie')
  router.push({ name: 'home' })
}

app.provide('GlobalStore', {
  userInfos: userInfos,
  changeUserInfos: changeUserInfos,
  disconnectUser: disconnectUser,
})

app.use(VueCookies)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
