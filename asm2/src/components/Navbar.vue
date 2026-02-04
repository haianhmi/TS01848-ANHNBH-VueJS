<template>
  <nav class="navbar navbar-expand-lg navbar-dark mb-4" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold">
        <i class="bi bi-book me-2"></i>MyBlog
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Trang chủ</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>
        </ul>

        <ul class="navbar-nav">
          <template v-if="isAuthenticated">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" 
                 data-bs-toggle="dropdown">
                {{ currentUser.name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link to="/profile" class="dropdown-item">Trang cá nhân</router-link>
                </li>
                <li>
                  <router-link to="/profile/settings" class="dropdown-item">Cài đặt</router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button @click="logout" class="dropdown-item">Đăng xuất</button>
                </li>
              </ul>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Đăng nhập</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Đăng ký</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../router'

const router = useRouter()
const { isAuthenticated, currentUser, logout: authLogout } = useAuth()

const logout = () => {
  authLogout()
  router.push('/login')
}
</script>
