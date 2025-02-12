import { createRouter, createWebHistory } from 'vue-router'
import VotePage from '@/views/votePage.vue'
import Home from '@/views/Home.vue'
const routes = [
  {
    path: '',
    name: 'Home',
    component: Home,
  },
  {
    path: '/vote/:id',
    name: 'VotePage',
    component: VotePage,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
