import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'
import HomeView from '../views/HomeView.vue'

import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => {
        return {
          title: route.query.title || '',
          pricemin: Number(route.query.pricemin) || '',
          pricemax: Number(route.query.pricemax) || '',
          sort: route.query.sort || '',
          page: parseInt(route.query.page) || 1,
        }
      },
    },
    {
      path: '/offer/:id',
      name: 'offer',
      component: () => import('../views/OfferView.vue'),
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/PublishView.vue'),
      meta: {
        requireAuth: true,
      },
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})

router.beforeEach((to, from) => {
  const GlobalStore = inject('GlobalStore')

  if (to.meta.requireAuth && !GlobalStore.userInfos.value) {
    return { name: 'login', query: { redirect: to.name } }
  }
})

export default router
