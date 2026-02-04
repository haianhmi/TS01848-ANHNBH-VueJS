<template>
  <div class="container">
    <Navbar />
    
    <!-- Form đăng bài (chỉ hiển thị khi đã đăng nhập) -->
    <div v-if="isAuthenticated" class="card mb-4 shadow">
      <div class="card-header text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <h5 class="mb-0"><i class="bi bi-plus-circle me-2"></i>Đăng bài viết mới</h5>
      </div>
      <div class="card-body">
        <input v-model="newBook.title" type="text" class="form-control mb-2" placeholder="Tiêu đề bài viết">
        <textarea v-model="newBook.description" class="form-control mb-2" rows="3"
          placeholder="Nội dung bài viết..."></textarea>
        <input type="file" @change="handleImageSelect" class="form-control mb-2" accept="image/*">
        <button @click="shareBook" class="btn btn-gradient">
          <i class="bi bi-upload me-2"></i>Đăng bài
        </button>
      </div>
    </div>

    <!-- Danh sách bài viết -->
    <div v-for="book in books" :key="book.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <div class="d-flex justify-content-between mb-2">
          <h5 class="card-title mb-0">{{ book.title }}</h5>
          <div v-if="isAuthenticated && currentUser && currentUser.name === book.author">
            <button @click="deleteBook(book.id)" class="btn btn-sm btn-danger">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <div class="d-flex align-items-start mb-3">
          <img :src="book.image" class="rounded me-3" style="width: 100px; height: 140px; object-fit: cover;"
            :alt="book.title">
          <div class="flex-grow-1">
            <p class="card-text">{{ book.description }}</p>
            <p class="text-muted small mb-2">
              <i class="bi bi-person-circle me-1"></i>{{ book.author }}
            </p>
            <router-link :to="`/blog/${book.id}`" class="btn btn-sm btn-gradient">
              <i class="bi bi-eye me-1"></i>Xem chi tiết
            </router-link>
          </div>
        </div>

        <hr>
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-chat-left-text me-2" style="color: #667eea;"></i>
          <strong>Bình luận ({{ book.comments.length }})</strong>
        </div>

        <!-- Danh sách bình luận -->
        <div v-for="comment in book.comments.slice(-2)" :key="comment.id" class="mb-2 p-2 bg-light rounded">
          <small class="fw-bold" style="color: #667eea;">
            <i class="bi bi-person-circle me-1"></i>{{ comment.username }}
          </small>
          <p class="mb-0 small">{{ comment.content }}</p>
          <small class="text-muted">{{ comment.timestamp }}</small>
        </div>

        <div v-if="book.comments.length > 2" class="text-center">
          <router-link :to="`/blog/${book.id}`" class="btn btn-link btn-sm" style="color: #667eea;">
            Xem thêm {{ book.comments.length - 2 }} bình luận...
          </router-link>
        </div>

        <!-- Form bình luận -->
        <div v-if="isAuthenticated" class="mt-3">
          <div class="input-group">
            <input v-model="newComments[book.id]" type="text" class="form-control" 
              placeholder="Viết bình luận..." @keyup.enter="addComment(book.id)">
            <button @click="addComment(book.id)" class="btn btn-gradient">
              <i class="bi bi-send"></i>
            </button>
          </div>
        </div>
        <div v-else class="mt-3 text-center">
          <small class="text-muted">
            <router-link to="/login" style="color: #667eea;">Đăng nhập</router-link> để bình luận
          </small>
        </div>
      </div>
    </div>

    <div v-if="books.length === 0" class="text-center py-5">
      <i class="bi bi-book display-1 text-muted"></i>
      <h4 class="text-muted mt-3">Chưa có bài viết nào</h4>
      <p class="text-muted">Hãy là người đầu tiên chia sẻ!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Navbar from './Navbar.vue'
import { useAuth } from '../router'

const { isAuthenticated, currentUser } = useAuth()

const props = defineProps({
  books: Array
})

const emit = defineEmits(['add-book', 'delete-book', 'add-comment'])

const newBook = reactive({
  title: '',
  description: '',
  image: ''
})

const newComments = ref({})

const handleImageSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      newBook.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const shareBook = () => {
  if (!newBook.title.trim() || !newBook.description.trim()) {
    alert('Vui lòng nhập đầy đủ thông tin!')
    return
  }

  const bookData = {
    title: newBook.title,
    description: newBook.description,
    author: currentUser.value.name,
    image: newBook.image || '/src/assets/images/loopy.jpg'
  }

  emit('add-book', bookData)
  newBook.title = ''
  newBook.description = ''
  newBook.image = ''
}

const deleteBook = (bookId) => {
  if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
    emit('delete-book', bookId)
  }
}

const addComment = (bookId) => {
  const content = newComments.value[bookId]
  if (content && content.trim()) {
    const comment = {
      content: content.trim(),
      timestamp: new Date().toLocaleString('vi-VN')
    }
    emit('add-comment', bookId, comment)
    newComments.value[bookId] = ''
  }
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
