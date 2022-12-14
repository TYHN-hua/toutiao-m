import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import ("@/views/login")  
  },
  {
    path: '/search',
    component: () => import ("@/views/Search")  
  },
  {
    path: '/user',
    component: () => import ("@/views/User")  
  },
  {
    path: '/detail',
    component: () => import ("@/views/Article")  
  },
  {
    path: '/',
    component: () => import ("@/views/layout"),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import ("@/views/Home"),
      },
      {
        path: '/video',
        component: () => import ("@/views/Video"),
      },
      {
        path: '/qa',
        component: () => import ("@/views/QA"),
      },
      {
        path: '/my',
        component: () => import ("@/views/My"),
      }
    ]  
  },
]

const router = new VueRouter({
  routes
})

export default router
