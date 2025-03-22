import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import AuthService from '@/services/AuthService'
import RegisterView from '@/views/register/RegisterView.vue'
import LoginView from '@/views/login/LoginView.vue'
import PostsView from '@/views/home/posts/PostsView.vue'
import UploadView from '@/views/home/upload/UploadView.vue'
import PostView from '@/views/home/post/PostView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '/',
        component: PostsView,
      },
      {
        path: '/p/:postId',
        component: PostView,
      },
      {
        path: '/upload',
        component: UploadView,
      },
    ],
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

  if (needAuth && !isAuthenticated) next({ name: 'login' })
  else if (!needAuth && isAuthenticated && (to.name === 'login' || to.name === 'register'))
    next({ name: 'home' })
  else next()
})

export default router
