<!-- =====================================================
  App.vue — Component gốc
  Vai trò: quản lý state toàn cục (books, users),
           xử lý login/register/logout,
           truyền data xuống các trang qua <router-view>
===================================================== -->
<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth, useTheme } from './router'

const router = useRouter()
const route = useRoute()
const { login: authLogin, logout: authLogout, currentUser } = useAuth()
const { applyTheme } = useTheme()

// ----- Dữ liệu bài viết (state toàn cục) -----
// Truyền xuống các trang con qua prop :books
const books = reactive([
  {
    id: 1,
    title: 'Đắc Nhân Tâm',
    description: 'Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử với mọi người.',
    image: '/src/assets/images/dacnhantam.jpg',
    author: 'Admin',
    comments: [
      {
        id: 1,
        username: 'Mai Quốc Tam',
        content: 'Cuốn sách tuyệt vời! Mình đã đọc đi đọc lại nhiều lần và lần nào cũng rút ra được bài học mới.',
        timestamp: '15/01/2024 09:30'
      },
      {
        id: 2,
        username: 'Nguyễn Tấn Hoàng Nguyên',
        content: 'Đắc Nhân Tâm thực sự thay đổi cách mình nhìn nhận các mối quan hệ xung quanh. Highly recommend!',
        timestamp: '18/01/2024 14:15'
      }
    ]
  },
  {
    id: 2,
    title: 'Nhà Giả Kim',
    description: 'Câu chuyện triết lý sâu sắc về hành trình theo đuổi ước mơ của chàng trai trẻ.',
    image: '/src/assets/images/nhagiakim.jpg',
    author: 'Admin',
    comments: [
      {
        id: 1,
        username: 'Nguyễn Tấn Hoàng Nguyên',
        content: 'Nhà Giả Kim là cuốn sách truyền cảm hứng nhất mình từng đọc. Câu chuyện của Santiago khiến mình tin vào việc theo đuổi ước mơ của bản thân.',
        timestamp: '20/01/2024 08:00'
      },
      {
        id: 2,
        username: 'Mai Quốc Tam',
        content: 'Triết lý trong sách rất sâu sắc, đặc biệt là phần nói về "Linh hồn Thế Giới". Đọc xong thấy cuộc sống có ý nghĩa hơn nhiều.',
        timestamp: '22/01/2024 20:45'
      }
    ]
  }
])

// ----- Danh sách người dùng (giả lập database) -----
const users = reactive([
  {
    id: 1,
    name: 'Nguyễn Bá Hải Anh',
    email: 'anhnbhts01848@gmail.com',
    password: '123456',
    avatar: '/src/assets/images/oioioi.jpg',
    bio: 'Xin chào, mình là Nguyễn Bá Hải Anh. Mình đam mê lập trình Web.'
  },
  {
    id: 2,
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123',
    avatar: '/src/assets/images/oioioivang.jpg',
    bio: 'Quản trị viên hệ thống.'
  }
])

// ----- Khởi tạo khi app mount -----
onMounted(() => {
  // Áp dụng theme đã lưu (localStorage) lên <html>
  applyTheme(localStorage.getItem('theme') || 'light')
})

// ----- Xử lý Đăng nhập -----
// Được gọi từ Login.vue qua @login emit → App → authLogin
const handleLogin = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password)
  if (user) {
    authLogin(user)
    // Chuyển về trang trước đó hoặc trang chủ
    router.push(route.query.redirect || '/')
    return true
  }
  return false // trả false để Login.vue hiện thông báo lỗi
}

// ----- Xử lý Đăng ký -----
// Tạo user mới, thêm vào danh sách, tự động đăng nhập
const handleRegister = (userData) => {
  const newUser = {
    id: users.length + 1,
    ...userData,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=667eea&color=fff`,
    bio: 'Chào mừng bạn đến với MyBlog!'
  }
  users.push(newUser)
  authLogin(newUser)
  router.push('/')
}

// ----- Xử lý Đăng xuất -----
const handleLogout = () => {
  authLogout()
  router.push('/login')
}

// ----- CRUD Bài viết -----
const addBook = (bookData) => {
  books.push({ id: books.length + 1, ...bookData, comments: [] })
}

const deleteBook = (bookId) => {
  const idx = books.findIndex(b => b.id === bookId)
  if (idx !== -1) books.splice(idx, 1)
}

// ----- CRUD Bình luận -----
// Bình luận được thêm từ BlogPost.vue (trang chi tiết)
const addComment = (bookId, comment) => {
  const book = books.find(b => b.id === bookId)
  if (book) {
    book.comments.push({
      id: book.comments.length + 1,
      username: currentUser.value?.name || 'Khách',
      ...comment
    })
  }
}

const deleteComment = (bookId, commentId) => {
  const book = books.find(b => b.id === bookId)
  if (book) {
    const idx = book.comments.findIndex(c => c.id === commentId)
    if (idx !== -1) book.comments.splice(idx, 1)
  }
}
</script>

<template>
  <div id="app">
    <!--
      router-view: render component tương ứng với route hiện tại.
      Truyền books và các handler xuống tất cả trang con qua v-bind + v-on.
      Trang con nhận qua defineProps() và defineEmits().
    -->
    <router-view
      :books="books"
      @add-book="addBook"
      @delete-book="deleteBook"
      @add-comment="addComment"
      @delete-comment="deleteComment"
      @login="handleLogin"
      @register="handleRegister"
      @logout="handleLogout"
    />
  </div>
</template>