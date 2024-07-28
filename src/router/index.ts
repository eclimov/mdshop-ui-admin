import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Banks from '@/views/Banks.vue'
import Bank from '@/views/Bank.vue'
import Companies from '@/views/Companies.vue'
import Company from '@/views/Company.vue'
import Invoices from '@/views/Invoices.vue'
import Invoice from '@/views/Invoice.vue'
import Users from '@/views/Users.vue'
import User from '@/views/User.vue'
import CreateInvoice from '@/views/CreateInvoice.vue'
import { useUser } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: Invoices,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/invoices/:id',
      name: 'invoice',
      component: Invoice,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/companies/:id',
      name: 'company',
      component: Company,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/companies/:buyerCompanyId/create-invoice',
      name: 'create-invoice',
      component: CreateInvoice,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/banks',
      name: 'banks',
      component: Banks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/banks/:id',
      name: 'bank',
      component: Bank,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users/:id',
      name: 'user',
      component: User,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

// https://medium.com/@tahnyybelguith/authentication-and-authorization-implementation-with-vue-js-6afcbb821c85
router.beforeEach((to, from, next) => {
  const userStore = useUser()

  if (to.meta.requiresAuth && !userStore.email) {
    // The route is protected and user is not authenticated, redirect to login
    next({ name: 'login' })
  } else {
    // Allow access
    next();
  }
});

export default router
