<template>
  <div class="card shadow-sm">
    <div class="card-header text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <h5 class="mb-0"><i class="bi bi-gear me-2"></i>Cài Đặt Tài Khoản</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="updateSettings">
        <div class="mb-4">
          <h6 class="fw-bold mb-3" style="color: #667eea;">
            <i class="bi bi-person-lines-fill me-2"></i>Thông tin cá nhân
          </h6>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Họ và tên</label>
              <input v-model="settings.name" type="text" class="form-control" :placeholder="user.name">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Email</label>
              <input v-model="settings.email" type="email" class="form-control" :placeholder="user.email">
            </div>
          </div>
        </div>

        <div class="mb-4">
          <h6 class="fw-bold mb-3" style="color: #667eea;">
            <i class="bi bi-shield-lock me-2"></i>Bảo mật
          </h6>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Mật khẩu hiện tại</label>
              <input v-model="settings.currentPassword" type="password" class="form-control" placeholder="••••••••">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Mật khẩu mới</label>
              <input v-model="settings.newPassword" type="password" class="form-control" placeholder="••••••••">
            </div>
          </div>
        </div>

        <div v-if="message" :class="['alert', message.type === 'success' ? 'alert-success' : 'alert-danger']">
          <i :class="message.type === 'success' ? 'bi bi-check-circle' : 'bi bi-exclamation-circle'" class="me-2"></i>
          {{ message.text }}
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-gradient">
            <i class="bi bi-check-circle me-2"></i>Lưu thay đổi
          </button>
          <button type="button" @click="resetForm" class="btn btn-secondary">
            <i class="bi bi-arrow-clockwise me-2"></i>Đặt lại
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAuth } from '../../router'

const { currentUser: user } = useAuth()

const settings = reactive({
  name: '',
  email: '',
  currentPassword: '',
  newPassword: ''
})

const message = ref(null)

const updateSettings = () => {
  if (settings.newPassword && settings.newPassword.length < 6) {
    message.value = {
      type: 'error',
      text: 'Mật khẩu mới phải có ít nhất 6 ký tự!'
    }
    return
  }

  message.value = {
    type: 'success',
    text: 'Cài đặt đã được cập nhật thành công!'
  }

  setTimeout(() => {
    message.value = null
    resetForm()
  }, 3000)
}

const resetForm = () => {
  settings.name = ''
  settings.email = ''
  settings.currentPassword = ''
  settings.newPassword = ''
}
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
