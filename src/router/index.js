import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Auth.vue'
import Grid from '../views/Grid'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Home
  },
  {
    path: '/grid',
    name: 'Grid',
    component: Grid
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
