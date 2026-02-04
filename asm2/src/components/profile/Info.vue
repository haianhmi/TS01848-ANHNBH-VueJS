<template>
  <div class="card shadow-sm">
    <div class="card-header text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <h5 class="mb-0"><i class="bi bi-info-circle me-2"></i>Thông Tin Cơ Bản</h5>
    </div>
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-4 fw-bold text-secondary">
          <i class="bi bi-person me-2"></i>Họ và tên:
        </div>
        <div class="col-md-8">{{ user.name }}</div>
      </div>
      <hr>
      <div class="row mb-3">
        <div class="col-md-4 fw-bold text-secondary">
          <i class="bi bi-envelope me-2"></i>Email:
        </div>
        <div class="col-md-8">{{ user.email }}</div>
      </div>
      <hr>
      <div class="row mb-3">
        <div class="col-md-4 fw-bold text-secondary">
          <i class="bi bi-shield-check me-2"></i>Vai trò:
        </div>
        <div class="col-md-8">
          <span class="badge text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            Thành viên
          </span>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-md-4 fw-bold text-secondary">
          <i class="bi bi-calendar-event me-2"></i>Ngày tham gia:
        </div>
        <div class="col-md-8">01/01/2024</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../../router'

const { currentUser: user } = useAuth()
</script>
