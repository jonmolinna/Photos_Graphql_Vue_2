import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import RegisterView from '@/views/register/RegisterView.vue'
import LoginView from '@/views/login/LoginView.vue'
import HomeLayout from '@/views/home/HomeLayout.vue'
import AuthService from '@/services/AuthService'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeLayout,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      requireAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// GUARD
router.beforeEach((to, from, next) => {
  const authService = new AuthService()

  const needAuth = to.meta?.requireAuth
  const isAuthenticated = authService.isAuthenticated()

  console.log('AQUI--- > ', to.name)

  if (needAuth && !isAuthenticated) next({ name: 'login' })
  else if (!needAuth && isAuthenticated && (to.name === 'login' || to.name === 'register'))
    next({ name: 'home' })
  else next()
})

export default router
