<template>
  <div class="container">
    <Navbar />
    
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">Trang chủ</router-link>
        </li>
        <li class="breadcrumb-item active">Bảng điều khiển</li>
      </ol>
    </nav>

    <div class="card">
      <div class="card-header text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <h4 class="mb-0">Bảng Điều Khiển</h4>
      </div>
      <div class="card-body">
        <!-- Thống kê nhanh -->
        <div class="row mb-4">
          <div class="col-md-4 mb-3">
            <div class="card text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              <div class="card-body text-center">
                <i class="bi bi-book fs-1"></i>
                <h5 class="mt-2">Số Bài Viết</h5>
                <h2>{{ userBooksCount }}</h2>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              <div class="card-body text-center">
                <i class="bi bi-chat-left-text fs-1"></i>
                <h5 class="mt-2">Số Bình Luận</h5>
                <h2>{{ userCommentsCount }}</h2>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              <div class="card-body text-center">
                <i class="bi bi-calendar-check fs-1"></i>
                <h5 class="mt-2">Ngày Tham Gia</h5>
                <h2 class="fs-5">{{ joinDate }}</h2>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Chi tiết thống kê -->
        <div class="card">
          <div class="card-header text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <h5 class="mb-0">Thống Kê Hoạt Động</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between">
                <span><i class="bi bi-book me-2"></i>Bài viết đã đăng</span>
                <span class="badge text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">{{ userBooksCount }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span><i class="bi bi-chat-left-text me-2"></i>Bình luận đã gửi</span>
                <span class="badge text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">{{ userCommentsCount }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span><i class="bi bi-calendar-event me-2"></i>Ngày tham gia</span>
                <span class="badge text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">{{ joinDate }}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Hành động nhanh -->
        <div class="card mt-4">
          <div class="card-header text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <h5 class="mb-0">Hành Động Nhanh</h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 mb-2">
                <router-link to="/" class="btn w-100 btn-gradient">
                  <i class="bi bi-house-door me-2"></i>Trang chủ
                </router-link>
              </div>
              <div class="col-md-4 mb-2">
                <router-link to="/profile" class="btn w-100 btn-gradient">
                  <i class="bi bi-person-circle me-2"></i>Trang cá nhân
                </router-link>
              </div>
              <div class="col-md-4 mb-2">
                <router-link to="/profile/settings" class="btn w-100 btn-gradient">
                  <i class="bi bi-gear me-2"></i>Cài đặt
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'
import { useAuth } from '../router'

const router = useRouter()
const { isAuthenticated } = useAuth()

onMounted(() => {
  if (!isAuthenticated.value) {
    router.push('/login?redirect=/dashboard')
  }
})

const userBooksCount = ref(12)
const userCommentsCount = ref(45)
const joinDate = ref('01/01/2024')
</script>

<style scoped>
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
