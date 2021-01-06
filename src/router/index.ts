import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/view',
    name: 'view',
    component: () => import('../views/view.vue')
  },
  {
    path: '/path',
    name: 'path',
    component: () => import('../views/path.vue')
  },
  {
    path: '/mp4',
    name: 'mp4',
    component: () => import('../views/mp4.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/message.vue')
  },
  {
    path: '/buddhist',
    name: 'buddhist',
    component: () => import('../views/buddhist.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/privacy.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/privacy.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
