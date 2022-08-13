import Vue from 'vue'
import VueRouter from 'vue-router'
import ZScoreView from '../views/ZScoreView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ZScore',
    component: ZScoreView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
