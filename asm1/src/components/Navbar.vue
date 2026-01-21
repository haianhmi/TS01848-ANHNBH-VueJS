<template>
  <nav class="navbar navbar-expand-lg navbar-dark shadow" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#" @click.prevent="$emit('nav-to', 'home')">
        📚 Chia Sẻ Sách
      </a>
      <div class="navbar-nav ms-auto">
        <a class="nav-link" href="#" @click.prevent="$emit('nav-to', 'home')">Trang chủ</a>
        <a class="nav-link" href="#" @click.prevent="$emit('nav-to', 'login')">Đăng nhập</a>
        <a class="nav-link" href="#" @click.prevent="$emit('nav-to', 'register')">Đăng ký</a>
        <a class="nav-link" href="#" @click.prevent="$emit('nav-to', 'profile')">Trang cá nhân</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineEmits(['nav-to'])
</script>