import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/TimeView.vue'),
    },
    {
      path: '/confettiView',
      name: 'confettiView',
      component: () => import('../views/ConfettiView.vue'),
    },
    {
      path: '/timeView',
      name: 'timeView',
      component: () => import('../views/TimeView.vue'),
    },
    {
      path: '/weatherView',
      name: 'weatherView',
      component: () => import('../views/WeatherView.vue'),
    },
  ],
})

export default router
