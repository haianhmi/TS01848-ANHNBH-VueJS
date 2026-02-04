<template>
  <div class="container mt-5">
    <Navbar />
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow">
          <div class="card-header text-white text-center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <h2 class="mb-0"><i class="bi bi-box-arrow-in-right me-2"></i>Đăng Nhập</h2>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label fw-bold">
                  <i class="bi bi-envelope me-2"></i>Email
                </label>
                <input v-model="loginData.email" type="email" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">
                  <i class="bi bi-lock me-2"></i>Mật khẩu
                </label>
                <input v-model="loginData.password" type="password" class="form-control" required>
              </div>

              <div v-if="loginError" class="alert alert-danger">
                <i class="bi bi-exclamation-circle me-2"></i>{{ loginError }}
              </div>

              <button type="submit" class="btn btn-gradient w-100">
                <i class="bi bi-box-arrow-in-right me-2"></i>Đăng Nhập
              </button>

              <div class="text-center mt-3">
                <span>Chưa có tài khoản? </span>
                <router-link to="/register" class="text-decoration-none fw-bold" style="color: #667eea;">
                  Đăng ký ngay
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
import { useRouter, useRoute } from 'vue-router'
import Navbar from './Navbar.vue'

const router = useRouter()
const route = useRoute()

const emit = defineEmits(['login'])

const loginData = reactive({
  email: '',
  password: ''
})

const loginError = ref('')

const handleLogin = () => {
  loginError.value = ''

  if (!loginData.email || !loginData.password) {
    loginError.value = 'Vui lòng nhập đầy đủ thông tin'
    return
  }

  const success = emit('login', loginData.email, loginData.password)

  if (!success) {
    loginError.value = 'Email hoặc mật khẩu không chính xác'
  } else {
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  }
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
