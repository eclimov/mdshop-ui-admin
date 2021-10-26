import Home from '@/views/Home'
import Invoices from '@/views/Invoices'
import VueRouter from 'vue-router'
import Companies from '@/views/Companies'
import Banks from '@/views/Banks'
import Login from '@/views/Login'
import Bank from '@/views/Bank'
import Company from '@/views/Company'

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
    path: '/companies/:id',
    name: 'company',
    component: Company,
    props: true
  },
  {
    path: '/banks',
    name: 'banks',
    component: Banks
  },
  {
    path: '/banks/:id',
    name: 'bank',
    component: Bank,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
