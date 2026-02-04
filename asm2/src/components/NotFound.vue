<template>
  <div class="container">
    <Navbar />
    <div class="row justify-content-center align-items-center" style="min-height: 70vh;">
      <div class="col-md-6 text-center">
        <h1 class="display-1 fw-bold gradient-text">404</h1>
        <h2 class="mb-4">Trang Không Tìm Thấy</h2>
        <p class="lead mb-4 text-muted">
          Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div class="d-flex justify-content-center gap-3">
          <router-link to="/" class="btn btn-gradient">
            <i class="bi bi-house-door me-2"></i>Trang Chủ
          </router-link>
          <button @click="goBack" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-2"></i>Quay Lại
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
