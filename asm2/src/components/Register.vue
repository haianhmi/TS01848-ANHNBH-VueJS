<template>
  <div class="container mt-5">
    <Navbar />
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow">
          <div class="card-header text-white text-center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <h2 class="mb-0"><i class="bi bi-person-plus me-2"></i>Đăng Ký</h2>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label fw-bold">
                  <i class="bi bi-person me-2"></i>Họ và tên
                </label>
                <input v-model="registerData.name" type="text" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">
                  <i class="bi bi-envelope me-2"></i>Email
                </label>
                <input v-model="registerData.email" type="email" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">
                  <i class="bi bi-lock me-2"></i>Mật khẩu
                </label>
                <input v-model="registerData.password" type="password" class="form-control" required minlength="6">
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">
                  <i class="bi bi-lock-fill me-2"></i>Xác nhận mật khẩu
                </label>
                <input v-model="registerData.confirmPassword" type="password" class="form-control" required>
              </div>

              <div v-if="registerError" class="alert alert-danger">
                <i class="bi bi-exclamation-circle me-2"></i>{{ registerError }}
              </div>

              <div v-if="registerSuccess" class="alert alert-success">
                <i class="bi bi-check-circle me-2"></i>{{ registerSuccess }}
              </div>

              <button type="submit" class="btn btn-gradient w-100">
                <i class="bi bi-person-plus me-2"></i>Tạo tài khoản
              </button>

              <div class="text-center mt-3">
                <span>Đã có tài khoản? </span>
                <router-link to="/login" class="text-decoration-none fw-bold" style="color: #667eea;">
                  Đăng nhập
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './Navbar.vue'

const router = useRouter()

const emit = defineEmits(['register'])

const registerData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const registerError = ref('')
const registerSuccess = ref('')

const handleRegister = () => {
  registerError.value = ''
  registerSuccess.value = ''

  if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
    registerError.value = 'Vui lòng nhập đầy đủ thông tin'
    return
  }

  if (registerData.password !== registerData.confirmPassword) {
    registerError.value = 'Mật khẩu xác nhận không khớp'
    return
  }

  if (registerData.password.length < 6) {
    registerError.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    return
  }

  const userData = {
    name: registerData.name,
    email: registerData.email,
    password: registerData.password
  }

  emit('register', userData)

  registerSuccess.value = 'Đăng ký thành công! Đang chuyển đến trang chủ...'

  registerData.name = ''
  registerData.email = ''
  registerData.password = ''
  registerData.confirmPassword = ''

  setTimeout(() => {
    router.push('/')
  }, 2000)
}
</script>

<style scoped>
.btn-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px;
}

.btn-gradient:hover {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  color: white;
}
</style>
