<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from './router'

const router = useRouter()
const route = useRoute()
const { isAuthenticated, currentUser, login: authLogin, logout: authLogout, init: authInit } = useAuth()

// Danh sách bài viết
const books = reactive([
  {
    id: 1,
    title: 'Đắc Nhân Tâm',
    description: 'Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử.',
    image: '/src/assets/images/dacnhantam.jpg',
    author: 'Admin',
    comments: []
  },
  {
    id: 2,
    title: 'Nhà Giả Kim',
    description: 'Một câu chuyện triết lý sâu sắc về hành trình theo đuổi ước mơ.',
    image: '/src/assets/images/nhagiakim.jpg',
    author: 'Admin',
    comments: []
  }
])

// Danh sách người dùng
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

onMounted(() => {
  authInit()
})

const handleLogin = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password)
  if (user) {
    authLogin(user)
    const redirect = route.query.redirect || '/'
    router.push(redirect)
    return true
  }
  return false
}

const handleRegister = (userData) => {
  const newUser = {
    id: users.length + 1,
    ...userData,
    avatar: 'https://via.placeholder.com/150/f093fb/ffffff?text=' + userData.name.charAt(0),
    bio: 'Chào mừng bạn đến với trang blog của tôi!'
  }
  users.push(newUser)
  authLogin(newUser)
  router.push('/')
  return newUser
}

const addBook = (bookData) => {
  const newBook = {
    id: books.length + 1,
    ...bookData,
    comments: []
  }
  books.push(newBook)
}

const deleteBook = (bookId) => {
  const index = books.findIndex(book => book.id === bookId)
  if (index !== -1) {
    books.splice(index, 1)
  }
}

const addComment = (bookId, comment) => {
  const book = books.find(b => b.id === bookId)
  if (book) {
    const newComment = {
      id: book.comments.length + 1,
      username: currentUser.value ? currentUser.value.name : 'Khách',
      ...comment
    }
    book.comments.push(newComment)
  }
}

const deleteComment = (bookId, commentId) => {
  const book = books.find(b => b.id === bookId)
  if (book) {
    const index = book.comments.findIndex(c => c.id === commentId)
    if (index !== -1) {
      book.comments.splice(index, 1)
    }
  }
}

const handleLogout = () => {
  authLogout()
  router.push('/login')
}
</script>

<template>
  <div id="app">
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

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>
