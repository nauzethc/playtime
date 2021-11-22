import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./pages/Home.vue')
    }, {
      path: '/games/:id',
      name: 'game',
      component: () => import('./pages/Game.vue'),
      props: true
    }, {
      path: '/games',
      name: 'search',
      component: () => import('./pages/Search.vue')
    }
  ]
})

export default router
