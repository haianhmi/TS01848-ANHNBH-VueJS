<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Cột bên trái: Ảnh đại diện -->
      <div class="col-md-4 text-center mb-4">
        <div class="card shadow-sm border-0 p-3" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white;">
          <img 
            src="../assets/images/oioioi.jpg" 
            class="rounded-circle img-thumbnail mx-auto mb-3" 
            alt="Avatar"
            style="width: 150px; height: 150px; object-fit: cover; border: 4px solid white;"
          >
          <h4 class="fw-bold">Nguyễn Bá Hải Anh</h4>
          <p class="opacity-75">Thành viên từ: 01/2024</p>
        </div>
      </div>

      <!-- Cột bên phải: Thông tin & Giới thiệu -->
      <div class="col-md-8">
        <!-- Phần Thông tin cơ bản -->
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-header text-white fw-bold" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px 15px 0 0 !important;">
            Thông tin cá nhân
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <div class="col-sm-4 fw-bold text-secondary">Họ và tên:</div>
              <div class="col-sm-8 text-dark">Nguyễn Bá Hải Anh</div>
            </div>
            <hr class="text-light">
            <div class="row mb-3">
              <div class="col-sm-4 fw-bold text-secondary">Email:</div>
              <div class="col-sm-8 text-dark">anhnbhts01848@gmail.com</div>
            </div>
            <hr class="text-light">
            <div class="row mb-3">
              <div class="col-sm-4 fw-bold text-secondary">Mật khẩu:</div>
              <div class="col-sm-8 text-dark">********</div>
            </div>
          </div>
        </div>

        <!-- Phần Bài viết giới thiệu -->
        <div class="card shadow-sm border-0">
          <div class="card-header text-white fw-bold" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 15px 15px 0 0 !important;">
            Bài giới thiệu bản thân
          </div>
          <div class="card-body">
            <h5 class="card-title fw-bold" style="color: #667eea;">Chào mừng bạn đến với trang sách của mình!</h5>
            <p class="card-text text-justify lh-lg">
              Xin chào, mình tên là <strong>Nguyễn Bá Hải Anh</strong>. Hiện tại mình đang là sinh viên ngành Phát triển phần mềm. 
              Mình có niềm đam mê mãnh liệt với lập trình Web, đặc biệt là các công nghệ như Vue.js và Bootstrap.
            </p>
            <p class="card-text text-justify lh-lg">
              Trang web này là nơi mình chia sẻ những cuốn sách yêu thích, những bài review và kết nối với những người bạn 
              cùng đam mê đọc sách. Rất vui được làm quen với mọi người!
            </p>
            <div class="mt-3">
              <span class="badge me-2" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-size: 0.9rem;">#Hobby: Coding</span>
              <span class="badge me-2" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); font-size: 0.9rem;">#Hobby: Listening Stories</span>
              <span class="badge me-2" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); font-size: 0.9rem;">#Hobby: Travel</span>
              <span class="badge" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); font-size: 0.9rem;">#Hobby: Reading Novels</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-justify {
  text-align: justify;
}
.card {
  border-radius: 15px; 
}
.card-header {
  border-radius: 15px 15px 0 0 !important;
}
</style>