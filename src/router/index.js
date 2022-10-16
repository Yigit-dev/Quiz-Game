import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/finish-quiz/:username',
      name: 'finishQuiz',
      component: () => import("../views/FinishQuiz.vue")
    },
    {
      path: '/scoreboard/q=:username',
      name: 'scoreboard',
      component: () => import('../views/ScoreBoardView.vue')
    }
  ]
})

export default router
