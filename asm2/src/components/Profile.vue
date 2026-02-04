<template>
  <div v-if="user" class="container">
    <Navbar />
    
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Trang chủ</router-link>
        </li>
        <li class="breadcrumb-item active">Trang cá nhân</li>
      </ol>
    </nav>

    <div class="row justify-content-center">
      <div class="col-md-8 text-center mb-4">
        <div class="card text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <div class="card-body">
            <img :src="user.avatar" class="rounded-circle mb-3" alt="Avatar"
              style="width: 150px; height: 150px; object-fit: cover; border: 4px solid white;">
            <h4>{{ user.name }}</h4>
            <p><i class="bi bi-envelope me-2"></i>{{ user.email }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-body">
            <ul class="nav nav-tabs">
              <li class="nav-item">
                <router-link 
                  :to="{ name: 'profile-info' }" 
                  class="nav-link"
                  :class="{ active: $route.name === 'profile-info' }">
                  <i class="bi bi-info-circle me-1"></i>Thông tin
                </router-link>
              </li>
              <li class="nav-item">
                <router-link 
                  :to="{ name: 'profile-settings' }" 
                  class="nav-link"
                  :class="{ active: $route.name === 'profile-settings' }">
                  <i class="bi bi-gear me-1"></i>Cài đặt
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <router-view :user="user" />

        <div class="card mt-4">
          <div class="card-header text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <i class="bi bi-bar-chart me-2"></i>Thống kê hoạt động
          </div>
          <div class="card-body">
            <div class="row text-center">
              <div class="col-md-4 mb-3">
                <div class="p-3 bg-light rounded">
                  <i class="bi bi-book fs-1 text-primary"></i>
                  <h5 class="mt-2" style="color: #667eea;">12</h5>
                  <small>Bài viết đã đăng</small>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="p-3 bg-light rounded">
                  <i class="bi bi-chat-left-text fs-1 text-primary"></i>
                  <h5 class="mt-2" style="color: #667eea;">45</h5>
                  <small>Bình luận</small>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="p-3 bg-light rounded">
                  <i class="bi bi-calendar-check fs-1 text-primary"></i>
                  <h5 class="mt-2" style="color: #667eea;">01/01/2024</h5>
                  <small>Ngày tham gia</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-4">
          <div class="card-header text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <i class="bi bi-person-badge me-2"></i>Giới thiệu
          </div>
          <div class="card-body">
            <p>{{ user.bio || 'Chào mừng bạn đến với trang blog của tôi!' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container mt-5">
    <Navbar />
    <div class="text-center py-5">
      <div class="alert alert-warning">
        <h4><i class="bi bi-exclamation-triangle me-2"></i>Vui lòng đăng nhập!</h4>
        <p>Bạn cần đăng nhập để xem trang cá nhân.</p>
        <router-link to="/login" class="btn btn-gradient">
          <i class="bi bi-box-arrow-in-right me-2"></i>Đăng nhập ngay
        </router-link>
      </div>
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
  if (!isAuthenticated.value) {
    router.push('/login')
  }
})
</script>

<style scoped>
.nav-tabs .nav-link.active {
  color: #667eea;
  border-bottom: 3px solid #667eea;
}

.btn-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

.btn-gradient:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  color: white;
}
</style>
