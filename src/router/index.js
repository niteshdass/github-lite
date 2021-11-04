import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/User/Profile'
import Repositories from '../views/User/Partial/Repositories'
import Followers from '../views/User/Partial/Followers'
import Following from '../views/User/Partial/Following'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile/:login',
    name: 'Profile',
    component: Profile,
    props: true
  },
  {
    path: '/profile/:login/repos',
    name: 'Repositories',
    component: Repositories,
    props: true
  },
  {
    path: '/profile/:login/followers',
    name: 'Followers',
    component: Followers,
    props: true
  },
  {
    path: '/profile/:login/following',
    name: 'Following',
    component: Following,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
