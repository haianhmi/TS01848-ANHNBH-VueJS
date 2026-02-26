<!-- =====================================================
  NotFound.vue — Trang 404
  Hiển thị khi URL không khớp bất kỳ route nào
  Route: /:pathMatch(.*)*
===================================================== -->
<template>
  <div class="container">
    <Navbar />
    <div class="row justify-content-center align-items-center" style="min-height: 70vh;">
      <div class="col-md-6 text-center">
        <h1 class="display-1 fw-bold gradient-text">404</h1>
        <h2 class="mb-3">Trang Không Tìm Thấy</h2>
        <p class="lead text-muted mb-4">
          Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div class="d-flex justify-content-center gap-3">
          <router-link to="/" class="btn btn-gradient">
            <i class="bi bi-house-door me-2"></i>Trang Chủ
          </router-link>
          <button @click="router.go(-1)" class="btn btn-outline-secondary">
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
</script>