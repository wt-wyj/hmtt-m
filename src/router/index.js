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
  }
]

const router = new VueRouter({
  routes
})

export default router
