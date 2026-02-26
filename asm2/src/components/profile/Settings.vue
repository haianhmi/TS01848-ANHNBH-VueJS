<!-- =====================================================
  profile/Settings.vue — Tab "Cài đặt" trong trang Profile
  Là route con: /profile/settings
  Nhận prop :user từ Profile.vue
===================================================== -->
<template>
  <div class="card shadow-sm">
    <div class="card-header card-header-gradient">
      <h5 class="mb-0"><i class="bi bi-gear me-2"></i>Cài Đặt Tài Khoản</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="updateSettings">
        <!-- Thông tin cá nhân -->
        <h6 class="fw-bold mb-3" style="color: #667eea;">
          <i class="bi bi-person-lines-fill me-2"></i>Thông tin cá nhân
        </h6>
        <div class="row mb-4">
          <div class="col-md-6 mb-3">
            <label class="form-label">Họ và tên</label>
            <input v-model="form.name" type="text" class="form-control" :placeholder="user?.name">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Email</label>
            <input v-model="form.email" type="email" class="form-control" :placeholder="user?.email">
          </div>
        </div>

        <!-- Bảo mật -->
        <h6 class="fw-bold mb-3" style="color: #667eea;">
          <i class="bi bi-shield-lock me-2"></i>Đổi mật khẩu
        </h6>
        <div class="row mb-4">
          <div class="col-md-6 mb-3">
            <label class="form-label">Mật khẩu hiện tại</label>
            <input v-model="form.currentPassword" type="password" class="form-control" placeholder="••••••••">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Mật khẩu mới</label>
            <input v-model="form.newPassword" type="password" class="form-control" placeholder="••••••••">
          </div>
        </div>

        <!-- Thông báo -->
        <div v-if="message" :class="['alert', 'py-2', message.type === 'success' ? 'alert-success' : 'alert-danger']">
          <i :class="['me-2', message.type === 'success' ? 'bi bi-check-circle' : 'bi bi-exclamation-circle']"></i>
          {{ message.text }}
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-gradient">
            <i class="bi bi-check-circle me-2"></i>Lưu thay đổi
          </button>
          <button type="button" @click="resetForm" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-clockwise me-2"></i>Đặt lại
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

defineProps({ user: Object })

const form = reactive({ name: '', email: '', currentPassword: '', newPassword: '' })
const message = ref(null)

const updateSettings = () => {
  if (form.newPassword && form.newPassword.length < 6) {
    message.value = { type: 'error', text: 'Mật khẩu mới phải có ít nhất 6 ký tự!' }
    return
  }
  // TODO: gọi API cập nhật thực tế ở đây
  message.value = { type: 'success', text: 'Cài đặt đã được cập nhật thành công!' }
  setTimeout(() => { message.value = null; resetForm() }, 3000)
}

const resetForm = () => Object.assign(form, { name: '', email: '', currentPassword: '', newPassword: '' })
</script>