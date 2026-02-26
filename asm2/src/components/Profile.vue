<!-- =====================================================
  Profile.vue — Trang cá nhân
  Chứa: avatar, tabs điều hướng (Thông tin / Cài đặt),
         router-view lồng nhau để render Info.vue / Settings.vue
  Route lồng: /profile → Info.vue | /profile/settings → Settings.vue
===================================================== -->
<template>
  <!-- Đã đăng nhập: hiển thị profile -->
  <div v-if="isAuthenticated && user" class="container">
    <Navbar />

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Trang chủ</router-link></li>
        <li class="breadcrumb-item active">Trang cá nhân</li>
      </ol>
    </nav>

    <div class="row justify-content-center">
      <!-- Avatar card -->
      <div class="col-md-8 mb-4">
        <div class="card text-white card-header-gradient text-center">
          <div class="card-body py-4">
            <img :src="user.avatar" class="avatar-lg rounded-circle mb-3" :alt="user.name">
            <h4>{{ user.name }}</h4>
            <p class="mb-0"><i class="bi bi-envelope me-2"></i>{{ user.email }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <!-- Tabs điều hướng → dùng named routes để active tự động -->
        <div class="card mb-3">
          <div class="card-body pb-0">
            <ul class="nav nav-tabs border-0">
              <li class="nav-item">
                <router-link :to="{ name: 'profile-info' }" class="nav-link"
                  :class="{ active: $route.name === 'profile-info' }">
                  <i class="bi bi-info-circle me-1"></i>Thông tin
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'profile-settings' }" class="nav-link"
                  :class="{ active: $route.name === 'profile-settings' }">
                  <i class="bi bi-gear me-1"></i>Cài đặt
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!--
          router-view lồng: render Info.vue hoặc Settings.vue
          tùy thuộc vào route con hiện tại
        -->
        <router-view :user="user" />

        <!-- Thống kê hoạt động (static placeholder) -->
        <div class="card mt-4">
          <div class="card-header card-header-gradient">
            <i class="bi bi-bar-chart me-2"></i>Thống kê hoạt động
          </div>
          <div class="card-body">
            <div class="row text-center">
              <div class="col-4">
                <div class="p-3 bg-light rounded">
                  <i class="bi bi-book fs-2 text-primary"></i>
                  <h5 class="mt-1" style="color:#667eea">12</h5>
                  <small class="text-muted">Bài viết</small>
                </div>
              </div>
              <div class="col-4">
                <div class="p-3 bg-light rounded">
                  <i class="bi bi-chat-left-text fs-2 text-primary"></i>
                  <h5 class="mt-1" style="color:#667eea">45</h5>
                  <small class="text-muted">Bình luận</small>
                </div>
              </div>
              <div class="col-4">
                <div class="p-3 bg-light rounded">
                  <i class="bi bi-calendar-check fs-2 text-primary"></i>
                  <h5 class="mt-1 fs-6" style="color:#667eea">01/01/2024</h5>
                  <small class="text-muted">Ngày tham gia</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Giới thiệu -->
        <div class="card mt-4">
          <div class="card-header card-header-gradient">
            <i class="bi bi-person-badge me-2"></i>Giới thiệu
          </div>
          <div class="card-body">
            <p class="mb-0">{{ user.bio || 'Chưa có thông tin giới thiệu.' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Chưa đăng nhập -->
  <div v-else class="container mt-5">
    <Navbar />
    <div class="alert alert-warning text-center py-4">
      <h5><i class="bi bi-exclamation-triangle me-2"></i>Vui lòng đăng nhập!</h5>
      <router-link to="/login" class="btn btn-gradient mt-2">
        <i class="bi bi-box-arrow-in-right me-2"></i>Đăng nhập ngay
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'
import { useAuth } from '../router'

const router = useRouter()
const { currentUser: user, isAuthenticated } = useAuth()

onMounted(() => {
  if (!isAuthenticated.value) router.push('/login')
})
</script>