<template>
  <div class="container">
    <Navbar />

    <div v-if="book">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">Trang chủ</router-link>
          </li>
          <li class="breadcrumb-item active">{{ book.title }}</li>
        </ol>
      </nav>

      <div class="card mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between mb-3">
            <div>
              <h2>{{ book.title }}</h2>
              <p class="text-muted">Tác giả: {{ book.author }}</p>
            </div>
            <div v-if="isAuthenticated && currentUser && currentUser.name === book.author">
              <button @click="deleteBook" class="btn btn-sm btn-danger">Xóa</button>
            </div>
          </div>

          <div class="text-center my-3">
            <img :src="book.image" class="img-fluid rounded" style="max-height: 400px;" :alt="book.title">
          </div>

          <div class="my-3">
            <h5>Giới Thiệu</h5>
            <p>{{ book.description }}</p>
          </div>

          <hr>

          <h5>Bình Luận ({{ book.comments.length }})</h5>

          <div v-for="comment in book.comments" :key="comment.id" class="card mb-2">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <strong>{{ comment.username }}</strong>
                <div v-if="isAuthenticated && currentUser && currentUser.name === comment.username">
                  <button @click="deleteComment(comment.id)" class="btn btn-sm btn-danger">Xóa</button>
                </div>
              </div>
              <p class="mb-0">{{ comment.content }}</p>
              <small class="text-muted">{{ comment.timestamp }}</small>
            </div>
          </div>

          <!---->
          <div v-if="isAuthenticated" class="mt-3">
            <h6>Thêm Bình Luận</h6>
            <div class="input-group">
              <input v-model="newComment" type="text" class="form-control" placeholder="Viết bình luận..."
                @keyup.enter="addComment">
              <button @click="addComment" class="btn btn-primary">Gửi</button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <div class="spinner-border" role="status"></div>
      <p class="mt-3">Đang tải bài viết...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './Navbar.vue'
import { useAuth } from '../router'

const route = useRoute()
const router = useRouter()
const { isAuthenticated, currentUser } = useAuth()

const props = defineProps({
  books: Array
})

const emit = defineEmits(['delete-book', 'add-comment', 'delete-comment'])

const book = ref(null)
const newComment = ref('')

const bookId = computed(() => parseInt(route.params.id))

onMounted(() => {
  if (props.books && props.books.length > 0) {
    const foundBook = props.books.find(b => b.id === bookId.value)
    if (foundBook) {
      book.value = foundBook
    } else {
      router.push('/')
    }
  }
})

const formatDate = (date) => {
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const addComment = () => {
  if (newComment.value.trim()) {
    const comment = {
      id: book.value.comments.length + 1,
      // Đã đăng nhập → dùng tên tài khoản | Chưa đăng nhập → hiện "Khách"
      username: currentUser.value ? currentUser.value.name : 'Khách',
      content: newComment.value.trim(),
      timestamp: formatDate(new Date())
    }
    emit('add-comment', book.value.id, comment)
    newComment.value = ''
  }
}

const deleteComment = (commentId) => {
  if (confirm('Bạn có chắc muốn xóa bình luận này?')) {
    emit('delete-comment', book.value.id, commentId)
  }
}

const deleteBook = () => {
  if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
    emit('delete-book', book.value.id)
    router.push('/')
  }
}
</script>