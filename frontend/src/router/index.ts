import { createRouter, createWebHistory } from 'vue-router'
import VotePage from '@/views/votePage.vue'
import Home from '@/views/Home.vue'
import { getVotingSystemContract, setupWeb3 } from '@/utils/web3'
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

router.beforeEach(async (to, from, next) => {
  try {
    if (!getVotingSystemContract()) {
      await setupWeb3()
    }
    next()
  } catch (error) {
    console.error('Error setting up web3', error)
    next({ name: 'Home' })
  }
})

export default router
