<!-- =====================================================
  Home.vue — Trang chủ
  Hiển thị: form đăng bài (nếu đã đăng nhập) + danh sách bài viết
  KHÔNG có bình luận ở trang này → vào chi tiết mới bình luận được
===================================================== -->
<template>
  <div class="container">
    <Navbar />

    <!-- Form đăng bài: chỉ hiện khi đã đăng nhập -->
    <div v-if="isAuthenticated" class="card mb-4 shadow-sm">
      <div class="card-header card-header-gradient">
        <h5 class="mb-0"><i class="bi bi-plus-circle me-2"></i>Đăng bài viết mới</h5>
      </div>
      <div class="card-body">
        <input v-model="newBook.title" type="text" class="form-control mb-2" placeholder="Tiêu đề bài viết">
        <textarea v-model="newBook.description" class="form-control mb-2" rows="3"
          placeholder="Nội dung / mô tả bài viết..."></textarea>
        <input type="file" @change="handleImageSelect" class="form-control mb-3" accept="image/*">
        <button @click="shareBook" class="btn btn-gradient">
          <i class="bi bi-upload me-2"></i>Đăng bài
        </button>
      </div>
    </div>

    <!-- Danh sách bài viết -->
    <div v-for="book in books" :key="book.id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <!-- Header: tiêu đề + nút xóa (chỉ tác giả mới thấy) -->
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h5 class="card-title mb-0">{{ book.title }}</h5>
          <button
            v-if="isAuthenticated && currentUser?.name === book.author"
            @click="deleteBook(book.id)"
            class="btn btn-sm btn-outline-danger"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>

        <!-- Nội dung: ảnh + mô tả + meta -->
        <div class="d-flex align-items-start gap-3">
          <img :src="book.image" class="book-cover rounded" :alt="book.title">
          <div class="flex-grow-1">
            <p class="card-text mb-2">{{ book.description }}</p>
            <p class="text-muted small mb-3">
              <i class="bi bi-person-circle me-1"></i>{{ book.author }}
              <span class="ms-3">
                <i class="bi bi-chat-left-text me-1"></i>{{ book.comments.length }} bình luận
              </span>
            </p>
            <!-- Link vào trang chi tiết để đọc & bình luận -->
            <router-link :to="`/blog/${book.id}`" class="btn btn-sm btn-gradient">
              <i class="bi bi-eye me-1"></i>Xem chi tiết & Bình luận
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Trạng thái rỗng -->
    <div v-if="books.length === 0" class="text-center py-5 text-muted">
      <i class="bi bi-book display-1"></i>
      <h4 class="mt-3">Chưa có bài viết nào</h4>
      <p>Hãy là người đầu tiên chia sẻ!</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Navbar from './Navbar.vue'
import { useAuth } from '../router'

// Nhận books từ App.vue qua props
const props = defineProps({ books: Array })

// Emit sự kiện lên App.vue để thêm/xóa bài
const emit = defineEmits(['add-book', 'delete-book'])

const { isAuthenticated, currentUser } = useAuth()

// State form đăng bài mới
const newBook = reactive({ title: '', description: '', image: '' })

/** Đọc file ảnh được chọn → chuyển sang base64 để preview/lưu */
const handleImageSelect = (e) => {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { newBook.image = ev.target.result }
  reader.readAsDataURL(file)
}

/** Đăng bài: validate rồi emit lên App.vue */
const shareBook = () => {
  if (!newBook.title.trim() || !newBook.description.trim()) {
    alert('Vui lòng nhập đầy đủ tiêu đề và nội dung!')
    return
  }
  emit('add-book', {
    title: newBook.title.trim(),
    description: newBook.description.trim(),
    author: currentUser.value.name,
    image: newBook.image || '/src/assets/images/loopy.jpg'
  })
  // Reset form
  Object.assign(newBook, { title: '', description: '', image: '' })
}

/** Xóa bài: chỉ tác giả mới được xóa (kiểm tra ở template) */
const deleteBook = (bookId) => {
  if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
    emit('delete-book', bookId)
  }
}
</script>