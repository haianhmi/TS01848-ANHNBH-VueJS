<!-- =====================================================
  Dashboard.vue — Bảng điều khiển
  Hiển thị thống kê và các hành động nhanh
  Yêu cầu: đã đăng nhập (được guard ở router)
===================================================== -->
<template>
  <div class="container">
    <Navbar />

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Trang chủ</router-link></li>
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>

    <div class="card shadow-sm">
      <div class="card-header card-header-gradient">
        <h4 class="mb-0"><i class="bi bi-grid me-2"></i>Bảng Điều Khiển</h4>
      </div>
      <div class="card-body">
        <!-- Thống kê nhanh -->
        <div class="row mb-4">
          <div class="col-md-4 mb-3">
            <div class="card text-white card-header-gradient text-center">
              <div class="card-body">
                <i class="bi bi-book fs-1"></i>
                <h5 class="mt-2">Bài viết</h5>
                <h2>12</h2>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card text-white card-header-gradient text-center">
              <div class="card-body">
                <i class="bi bi-chat-left-text fs-1"></i>
                <h5 class="mt-2">Bình luận</h5>
                <h2>45</h2>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card text-white card-header-gradient text-center">
              <div class="card-body">
                <i class="bi bi-calendar-check fs-1"></i>
                <h5 class="mt-2">Tham gia</h5>
                <h2 class="fs-5">01/01/2024</h2>
              </div>
            </div>
          </div>
        </div>

        <!-- Hành động nhanh -->
        <div class="card">
          <div class="card-header card-header-gradient">
            <h6 class="mb-0">Hành Động Nhanh</h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 mb-2">
                <router-link to="/" class="btn btn-gradient w-100">
                  <i class="bi bi-house-door me-2"></i>Trang chủ
                </router-link>
              </div>
              <div class="col-md-4 mb-2">
                <router-link to="/profile" class="btn btn-gradient w-100">
                  <i class="bi bi-person-circle me-2"></i>Trang cá nhân
                </router-link>
              </div>
              <div class="col-md-4 mb-2">
                <router-link to="/profile/settings" class="btn btn-gradient w-100">
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
import Navbar from './Navbar.vue'
// Guard requiresAuth đã được xử lý ở router/index.js
// Component này chỉ cần render UI
</script>