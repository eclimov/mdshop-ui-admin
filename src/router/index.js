import Home from '@/views/Home'
import Invoices from '@/views/Invoices'
import { createRouter, createWebHistory } from 'vue-router'
import Companies from '@/views/Companies'
import Banks from '@/views/Banks'
import Users from '@/views/Users'
import Login from '@/views/Login'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/invoices',
    name: 'invoices',
    component: Invoices
  },
  {
    path: '/companies',
    name: 'companies',
    component: Companies
  },
  {
    path: '/banks',
    name: 'banks',
    component: Banks
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes // short for `routes: routes`
})

export default router
