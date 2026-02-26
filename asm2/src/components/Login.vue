<!-- =====================================================
  Login.vue — Trang đăng nhập
  Emit @login lên App.vue để xác thực
===================================================== -->
<template>
  <div class="container mt-5">
    <Navbar />
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow">
          <div class="card-header card-header-gradient text-center">
            <h2 class="mb-0"><i class="bi bi-box-arrow-in-right me-2"></i>Đăng Nhập</h2>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label fw-bold"><i class="bi bi-envelope me-2"></i>Email</label>
                <input v-model="email" type="email" class="form-control" placeholder="email@example.com" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold"><i class="bi bi-lock me-2"></i>Mật khẩu</label>
                <input v-model="password" type="password" class="form-control" placeholder="••••••••" required>
              </div>

              <!-- Thông báo lỗi -->
              <div v-if="error" class="alert alert-danger py-2">
                <i class="bi bi-exclamation-circle me-2"></i>{{ error }}
              </div>

              <button type="submit" class="btn btn-gradient w-100 py-2">
                <i class="bi bi-box-arrow-in-right me-2"></i>Đăng Nhập
              </button>

              <p class="text-center mt-3 mb-0">
                Chưa có tài khoản?
                <router-link to="/register" class="fw-bold" style="color: #667eea;">Đăng ký ngay</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './Navbar.vue'

const emit = defineEmits(['login'])

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  error.value = ''
  // Emit lên App.vue, App.vue trả về true/false
  // Lưu ý: Vue emit không trả về giá trị trực tiếp như gọi hàm,
  // nên App.vue xử lý redirect nội bộ khi login thành công
  const success = emit('login', email.value, password.value)
  // Nếu App không redirect → hiện lỗi sau một tick
  setTimeout(() => {
    // Kiểm tra nếu vẫn ở trang login (tức là login thất bại)
    if (window.location.pathname === '/login') {
      error.value = 'Email hoặc mật khẩu không chính xác!'
    }
  }, 100)
}
</script>