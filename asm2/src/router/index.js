// =====================================================
// router/index.js
// Chứa: cấu hình routes, navigation guards, useAuth()
// =====================================================

import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'

// ----- Auth State (module-level singleton) -----
// Dùng ref ở module scope để dữ liệu chia sẻ toàn app
const isAuthenticated = ref(false)
const currentUser = ref(null)

// ----- Dark Mode State -----
// Lưu trạng thái theme, mặc định là 'light'
const theme = ref(localStorage.getItem('theme') || 'light')

// Import các component trang
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Profile from '../components/Profile.vue'
import Dashboard from '../components/Dashboard.vue'
import BlogPost from '../components/BlogPost.vue'
import NotFound from '../components/NotFound.vue'
import ProfileInfo from '../components/profile/Info.vue'
import ProfileSettings from '../components/profile/Settings.vue'

// ----- Định nghĩa routes -----
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'Trang chủ - MyBlog' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: 'Đăng nhập', requiresGuest: true } // chỉ vào được khi chưa đăng nhập
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
    meta: { title: 'Trang cá nhân', requiresAuth: true }, // cần đăng nhập
    children: [
      { path: '', name: 'profile-info', component: ProfileInfo },
      { path: 'settings', name: 'profile-settings', component: ProfileSettings }
    ]
  },
  {
    path: '/me',
    redirect: '/profile' // alias nhanh
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard', requiresAuth: true }
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
    meta: { title: '404 - Không tìm thấy' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ----- Navigation Guard -----
// Chạy trước mỗi lần chuyển trang
router.beforeEach((to, from, next) => {
  // Cập nhật tiêu đề tab trình duyệt
  document.title = to.meta.title || 'MyBlog'

  // Trang yêu cầu đăng nhập mà chưa đăng nhập → về login
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  // Trang chỉ dành cho khách (login/register) mà đã đăng nhập → về home
  if (to.meta.requiresGuest && isAuthenticated.value) {
    return next({ name: 'home' })
  }

  next()
})

// =====================================================
// useAuth() — Composable dùng chung toàn app
// =====================================================
export const useAuth = () => {
  /** Đăng nhập: lưu user vào state */
  const login = (userData) => {
    isAuthenticated.value = true
    currentUser.value = userData
  }

  /** Đăng xuất: xóa state */
  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
  }

  return { isAuthenticated, currentUser, login, logout }
}

// =====================================================
// useTheme() — Composable quản lý Dark/Light mode
// =====================================================
export const useTheme = () => {
  /** Áp dụng theme lên <html> và lưu vào localStorage */
  const applyTheme = (value) => {
    theme.value = value
    document.documentElement.setAttribute('data-theme', value)
    localStorage.setItem('theme', value)
  }

  /** Toggle giữa light ↔ dark */
  const toggleTheme = () => {
    applyTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme, applyTheme }
}

export default router