import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'

const isAuthenticated = ref(false)
const currentUser = ref(null)

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Profile from '../components/Profile.vue'
import Dashboard from '../components/Dashboard.vue'
import BlogPost from '../components/BlogPost.vue'
import NotFound from '../components/NotFound.vue'
import ProfileInfo from '../components/profile/Info.vue'
import ProfileSettings from '../components/profile/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'Trang chủ - Blog' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: 'Đăng nhập', requiresGuest: true }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { title: 'Đăng ký', requiresGuest: true }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: { title: 'Thông tin cá nhân', requiresAuth: true },
    children: [
      {
        path: '',
        name: 'profile-info',
        component: ProfileInfo,
        meta: { title: 'Thông tin cá nhân' }
      },
      {
        path: 'settings',
        name: 'profile-settings',
        component: ProfileSettings,
        meta: { title: 'Cài đặt tài khoản' }
      }
    ]
  },
  {
    path: '/me',
    redirect: '/profile',
    alias: '/profile'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { title: 'Bảng điều khiển', requiresAuth: true }
  },
  {
    path: '/blog/:id',
    name: 'blog-post',
    component: BlogPost,
    meta: { title: 'Bài viết' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: { title: 'Không tìm thấy trang' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Blog'
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  
  if (to.meta.requiresGuest && isAuthenticated.value) {
    next({ name: 'home' })
    return
  }
  
  next()
})

export const useAuth = () => {
  const login = (userData) => {
    isAuthenticated.value = true
    currentUser.value = userData
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentUser', JSON.stringify(userData))
  }
  
  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
  }
  
  const init = () => {
    const auth = localStorage.getItem('isAuthenticated')
    const user = localStorage.getItem('currentUser')
    if (auth === 'true' && user) {
      isAuthenticated.value = true
      currentUser.value = JSON.parse(user)
    }
  }
  
  return {
    isAuthenticated,
    currentUser,
    login,
    logout,
    init
  }
}

export default router
