<!-- =====================================================
  Navbar.vue — Thanh điều hướng
  Hiển thị: menu, trạng thái đăng nhập, dark/light toggle
===================================================== -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark mb-4">
    <div class="container">
      <!-- Logo / Brand -->
      <router-link to="/" class="navbar-brand fw-bold">
        <i class="bi bi-book me-2"></i>MyBlog
      </router-link>

      <!-- Nút collapse trên mobile -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- Menu trái -->
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="bi bi-house-door me-1"></i>Trang chủ
            </router-link>
          </li>
          <!-- Dashboard chỉ hiện khi đã đăng nhập -->
          <li class="nav-item" v-if="isAuthenticated">
            <router-link to="/dashboard" class="nav-link">
              <i class="bi bi-grid me-1"></i>Dashboard
            </router-link>
          </li>
        </ul>

        <!-- Menu phải -->
        <ul class="navbar-nav align-items-center gap-2">
          <!-- Nút chuyển Dark / Light mode -->
          <li class="nav-item">
            <button class="btn-theme-toggle" @click="toggleTheme" :title="theme === 'dark' ? 'Chuyển sang Light' : 'Chuyển sang Dark'">
              <i :class="theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
              {{ theme === 'dark' ? 'Light' : 'Dark' }}
            </button>
          </li>

          <!-- Đã đăng nhập: hiện tên + dropdown -->
          <template v-if="isAuthenticated">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle d-flex align-items-center gap-1"
                 href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                <i class="bi bi-person-circle"></i>
                {{ currentUser.name }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link to="/profile" class="dropdown-item">
                    <i class="bi bi-person me-2"></i>Trang cá nhân
                  </router-link>
                </li>
                <li>
                  <router-link to="/profile/settings" class="dropdown-item">
                    <i class="bi bi-gear me-2"></i>Cài đặt
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <!-- Đăng xuất: gọi authLogout từ composable rồi về /login -->
                  <button @click="logout" class="dropdown-item text-danger">
                    <i class="bi bi-box-arrow-right me-2"></i>Đăng xuất
                  </button>
                </li>
              </ul>
            </li>
          </template>

          <!-- Chưa đăng nhập: hiện link Login / Register -->
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
import { useAuth, useTheme } from '../router'

const router = useRouter()
const { isAuthenticated, currentUser, logout: authLogout } = useAuth()
const { theme, toggleTheme } = useTheme()

const logout = () => {
  authLogout()
  router.push('/login')
}
</script>