import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    // component: Login
    component: () => import('@/views/login')
  },
  {
    path: '/',
    // component: Login
    component: () => import('@/views/layout'),
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'my',
        component: () => import('@/views/My')
      },
      {
        path: 'qa',
        component: () => import('@/views/QA')
      }
    ]
  },
  {
    path: '/search',
    // component: Login
    component: () => import('@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
