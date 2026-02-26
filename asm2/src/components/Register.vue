<!-- =====================================================
  Register.vue — Trang đăng ký tài khoản mới
  Emit @register lên App.vue để tạo user và tự động đăng nhập
===================================================== -->
<template>
  <div class="container mt-5">
    <Navbar />
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow">
          <div class="card-header card-header-gradient text-center">
            <h2 class="mb-0"><i class="bi bi-person-plus me-2"></i>Đăng Ký</h2>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label fw-bold"><i class="bi bi-person me-2"></i>Họ và tên</label>
                <input v-model="form.name" type="text" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold"><i class="bi bi-envelope me-2"></i>Email</label>
                <input v-model="form.email" type="email" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold"><i class="bi bi-lock me-2"></i>Mật khẩu</label>
                <input v-model="form.password" type="password" class="form-control" minlength="6" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold"><i class="bi bi-lock-fill me-2"></i>Xác nhận mật khẩu</label>
                <input v-model="form.confirmPassword" type="password" class="form-control" required>
              </div>

              <!-- Thông báo lỗi / thành công -->
              <div v-if="error" class="alert alert-danger py-2">
                <i class="bi bi-exclamation-circle me-2"></i>{{ error }}
              </div>
              <div v-if="success" class="alert alert-success py-2">
                <i class="bi bi-check-circle me-2"></i>{{ success }}
              </div>

              <button type="submit" class="btn btn-gradient w-100 py-2">
                <i class="bi bi-person-plus me-2"></i>Tạo tài khoản
              </button>

              <p class="text-center mt-3 mb-0">
                Đã có tài khoản?
                <router-link to="/login" class="fw-bold" style="color: #667eea;">Đăng nhập</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Navbar from './Navbar.vue'

const emit = defineEmits(['register'])

const form = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const error = ref('')
const success = ref('')

const handleRegister = () => {
  error.value = ''
  success.value = ''

  // Validate
  if (form.password !== form.confirmPassword) {
    error.value = 'Mật khẩu xác nhận không khớp!'
    return
  }
  if (form.password.length < 6) {
    error.value = 'Mật khẩu phải có ít nhất 6 ký tự!'
    return
  }

  // Emit lên App.vue để tạo user mới và đăng nhập tự động
  emit('register', {
    name: form.name,
    email: form.email,
    password: form.password
  })

  success.value = 'Đăng ký thành công! Đang chuyển trang...'
}
</script>