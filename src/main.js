import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

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
)

app.use(router)

const userInfos = ref({})
const changeUserInfos = (username, jwt) => {
  userInfos.value = {
    username: username,
    jwt: jwt,
  }
}

const deconnectUser = () => {
  userInfos.value = {}
  router.push({ name: 'home' })
}

app.provide('GlobalStore', {
  userInfos: userInfos,
  changeUserInfos: changeUserInfos,
  deconnectUser: deconnectUser,
})

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
