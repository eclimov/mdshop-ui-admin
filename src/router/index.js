import Home from '@/views/Home'
import Invoices from '@/views/Invoices'
import VueRouter from 'vue-router'
import Companies from '@/views/Companies'
import Banks from '@/views/Banks'
import Login from '@/views/Login'
import Bank from '@/views/Bank'
import Company from '@/views/Company'
import store from '@/plugins/store'
import Users from '@/views/Users'
import User from '@/views/User'
import CreateInvoice from '@/views/CreateInvoice'

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
    path: '/companies/:buyerCompanyId/create-invoice',
    name: 'create-invoice',
    component: CreateInvoice,
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
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/users/:id',
    name: 'user',
    component: User,
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!store.getters['user/email']
  if (!['home', 'login'].includes(to.name) && !isAuthenticated) next({ name: 'login' })
  if (['login'].includes(to.name) && isAuthenticated) next({ name: 'home' })
  else next()
})

export default router
