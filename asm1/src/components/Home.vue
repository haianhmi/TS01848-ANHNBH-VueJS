<template>
  <div class="container mt-4">
    <div class="card mb-5 shadow-sm border-0" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white;">
      <div class="card-body">
        <h5 class="fw-bold">📖 Chia sẻ sách mới</h5>
        <input type="text" class="form-control mb-2" placeholder="Tên sách">
        <textarea class="form-control mb-2" rows="2" placeholder="Giới thiệu về cuốn sách..."></textarea>
        <input type="file" class="form-control form-control-sm mb-2">
        <button class="btn btn-light btn-sm px-4 fw-bold" style="color: #f5576c;">Chia sẻ</button>
      </div>
    </div>

    <div class="card mb-4 shadow-sm border-0">
      <div class="card-body">
        <div class="d-flex justify-content-between mb-2">
          <h5 class="fw-bold" style="color: #667eea;">Đắc Nhân Tâm</h5>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-warning">Sửa</button>
            <button class="btn btn-sm btn-outline-danger ms-1">Xóa</button>
          </div>
        </div>

        <div class="d-flex align-items-start mb-3">
          <img src="../assets/images/dacnhantam.jpg" 
               class="rounded border shadow-sm me-3" 
               style="width: 120px; height: 170px; object-fit: cover;" 
               alt="Book Cover">
          
          <p class="card-text text-secondary mb-0">
            Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử. Đắc Nhân Tâm giúp bạn 
            hiểu rõ hơn về tâm lý con người và cách xây dựng mối quan hệ tốt đẹp.
          </p>
        </div>

        <hr>
        <p class="small fw-bold mb-2">Bình luận:</p>
        <div class="ms-3 mb-2 p-2 rounded border-start border-3" style="background-color: #f8f4ff; border-color: #667eea !important;">
          <small class="fw-bold" style="color: #667eea;">Mai Quốc Tam</small>
          <p class="mb-0 small">Cuốn sách rất hay, mình đã đọc 3 lần rồi!</p>
        </div>
      </div>
    </div>

    <div class="card mb-4 shadow-sm border-0">
      <div class="card-body">
        <div class="d-flex justify-content-between mb-2">
          <h5 class="fw-bold" style="color: #764ba2;">Nhà Giả Kim</h5>
          <div>
            <button class="btn btn-sm btn-outline-warning">Sửa</button>
            <button class="btn btn-sm btn-outline-danger ms-1">Xóa</button>
          </div>
        </div>

        <div class="d-flex align-items-start mb-3">
          <img src="../assets/images/nhagiakim.jpg" 
               class="rounded border shadow-sm me-3" 
               style="width: 120px; height: 170px; object-fit: cover;" 
               alt="Book Cover">
          <p class="card-text text-secondary">
            Một câu chuyện triết lý sâu sắc về hành trình theo đuổi ước mơ. 
            Nhà Giả Kim truyền cảm hứng cho hàng triệu người trên toàn thế giới.
          </p>
        </div>

        <hr>
        <div class="ms-3 mb-2 p-2 rounded border-start border-3" style="background-color: #fff5f8; border-color: #f5576c !important;">
          <small class="fw-bold" style="color: #f5576c;">Nguyễn Tấn Hoàng Nguyên</small>
          <p class="mb-0 small">Cuốn sách này thay đổi cuộc đời mình!</p>
        </div>
      </div>
    </div>

    <div class="card mb-4 shadow-sm border-0">
      <div class="card-body">
        <div class="d-flex justify-content-between mb-2">
          <h5 class="fw-bold" style="color: #f093fb;">Atomic Habits</h5>
          <div>
            <button class="btn btn-sm btn-outline-warning">Sửa</button>
            <button class="btn btn-sm btn-outline-danger ms-1">Xóa</button>
          </div>
        </div>

        <div class="d-flex align-items-start mb-3">
          <img src="../assets/images/atomichabits.jpg" 
               class="rounded border shadow-sm me-3" 
               style="width: 120px; height: 170px; object-fit: cover;" 
               alt="Book Cover">
          <p class="card-text text-secondary">
            Hướng dẫn chi tiết về cách xây dựng thói quen tốt và loại bỏ thói quen xấu. 
            Một cuốn sách must-read cho ai muốn thay đổi bản thân.
          </p>
        </div>

        <hr>
        <div class="ms-3 mb-2 p-2 rounded border-start border-3" style="background-color: #fff9f5; border-color: #ff9a56 !important;">
          <small class="fw-bold" style="color: #ff9a56;">Phạm Châu Lương Phú</small>
          <p class="mb-0 small">Áp dụng được nhiều thứ từ cuốn sách này!</p>
        </div>
      </div>
    </div>

  </div>
</template>