<!-- =====================================================
  profile/Info.vue — Tab "Thông tin" trong trang Profile
  Là route con: /profile (index child)
  Nhận prop :user từ Profile.vue qua <router-view :user="user">
===================================================== -->
<template>
  <div class="card shadow-sm">
    <div class="card-header card-header-gradient">
      <h5 class="mb-0"><i class="bi bi-info-circle me-2"></i>Thông Tin Cơ Bản</h5>
    </div>
    <div class="card-body">
      <!-- Dùng table-like layout với Bootstrap grid -->
      <dl class="row mb-0">
        <dt class="col-sm-4 text-secondary"><i class="bi bi-person me-1"></i>Họ và tên</dt>
        <dd class="col-sm-8">{{ user?.name }}</dd>

        <dt class="col-sm-4 text-secondary"><i class="bi bi-envelope me-1"></i>Email</dt>
        <dd class="col-sm-8">{{ user?.email }}</dd>

        <dt class="col-sm-4 text-secondary"><i class="bi bi-shield-check me-1"></i>Vai trò</dt>
        <dd class="col-sm-8">
          <span class="badge badge-gradient">Thành viên</span>
        </dd>

        <dt class="col-sm-4 text-secondary"><i class="bi bi-calendar-event me-1"></i>Ngày tham gia</dt>
        <dd class="col-sm-8 mb-0">01/01/2024</dd>
      </dl>
    </div>
  </div>
</template>

<script setup>
// Nhận user từ Profile.vue (component cha) qua router-view prop
defineProps({ user: Object })
</script>