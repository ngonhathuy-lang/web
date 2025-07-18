// Dashboard management
function showDashboard() {
  if (!currentUser) {
    showLoginModal();
    return;
  }

  const dashboardTitle = document.getElementById("dashboardTitle");
  const dashboardSubtitle = document.getElementById("dashboardSubtitle");

  if (currentUser.role === "volunteer") {
    dashboardTitle.textContent = `Chào mừng trở lại, ${currentUser.name}!`;
    dashboardSubtitle.textContent = `Cảm ơn bạn đã đóng góp ${
      currentUser.volunteerHours || 0
    } giờ tình nguyện`;
    renderVolunteerDashboard();
  } else if (currentUser.role === "organization") {
    dashboardTitle.textContent = `Chào mừng, ${
      currentUser.organizationName || currentUser.name
    }!`;
    dashboardSubtitle.textContent =
      "Quản lý các sự kiện tình nguyện và theo dõi hoạt động tổ chức";
    renderOrganizationDashboard();
  }

  showPage("dashboardPage");
}

function renderVolunteerDashboard() {
  const dashboardStats = document.getElementById("dashboardStats");
  const dashboardContent = document.getElementById("dashboardContent");

  // Render stats
  dashboardStats.innerHTML = `
        <div class="dashboard-stat">
            <div class="dashboard-stat-header">
                <div class="dashboard-stat-icon green">
                    <i class="fas fa-clock"></i>
                </div>
                <span class="dashboard-stat-change">+5 giờ</span>
            </div>
            <h3>${currentUser.volunteerHours || 0}</h3>
            <p>Tổng giờ tình nguyện</p>
        </div>
        
        <div class="dashboard-stat">
            <div class="dashboard-stat-header">
                <div class="dashboard-stat-icon blue">
                    <i class="fas fa-calendar"></i>
                </div>
                <span class="dashboard-stat-change">+2 sự kiện</span>
            </div>
            <h3>${currentUser.eventsAttended || 0}</h3>
            <p>Sự kiện đã tham gia</p>
        </div>
        
        <div class="dashboard-stat">
            <div class="dashboard-stat-header">
                <div class="dashboard-stat-icon purple">
                    <i class="fas fa-award"></i>
                </div>
                <span class="dashboard-stat-change">+1 huy hiệu</span>
            </div>
            <h3>${currentUser.badges?.length || 0}</h3>
            <p>Huy hiệu đạt được</p>
        </div>
        
        <div class="dashboard-stat">
            <div class="dashboard-stat-header">
                <div class="dashboard-stat-icon orange">
                    <i class="fas fa-trending-up"></i>
                </div>
                <span class="dashboard-stat-change">⭐ ${
                  currentUser.rating || 0
                }</span>
            </div>
            <h3>#${Math.floor(Math.random() * 100) + 1}</h3>
            <p>Xếp hạng tình nguyện</p>
        </div>
    `;

  // Render content
  dashboardContent.innerHTML = `
        <div class="dashboard-section">
            <h2>Sự kiện sắp tới</h2>
            <div class="upcoming-events">
                <div class="event-item">
                    <div class="event-item-header">
                        <h3>Dọn dẹp bãi biển Nha Trang</h3>
                        <span class="event-status confirmed">Đã xác nhận</span>
                    </div>
                    <div class="event-item-details">
                        <div class="event-detail">
                            <i class="fas fa-calendar"></i>
                            <span>2024-01-20</span>
                        </div>
                        <div class="event-detail">
                            <i class="fas fa-clock"></i>
                            <span>07:00 - 11:00</span>
                        </div>
                        <div class="event-detail">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Bãi biển Nha Trang</span>
                        </div>
                    </div>
                </div>
                
                <div class="event-item">
                    <div class="event-item-header">
                        <h3>Phát cơm từ thiện</h3>
                        <span class="event-status pending">Chờ xác nhận</span>
                    </div>
                    <div class="event-item-details">
                        <div class="event-detail">
                            <i class="fas fa-calendar"></i>
                            <span>2024-01-25</span>
                        </div>
                        <div class="event-detail">
                            <i class="fas fa-clock"></i>
                            <span>17:00 - 20:00</span>
                        </div>
                        <div class="event-detail">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Công viên Tao Đàn</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-section">
            <h2>Hoạt động gần đây</h2>
            <div class="recent-activities">
                <div class="activity-item">
                    <div class="activity-header">
                        <h3>Trồng cây xanh tại công viên</h3>
                        <span class="activity-hours">4 giờ</span>
                    </div>
                    <div class="activity-details">
                        <p>2024-01-10</p>
                        <p>Tổ chức: Green City Initiative</p>
                    </div>
                </div>
                
                <div class="activity-item">
                    <div class="activity-header">
                        <h3>Hỗ trợ trẻ em học tiếng Anh</h3>
                        <span class="activity-hours">3 giờ</span>
                    </div>
                    <div class="activity-details">
                        <p>2024-01-08</p>
                        <p>Tổ chức: Education For All</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderOrganizationDashboard() {
  const dashboardStats = document.getElementById("dashboardStats");
  const dashboardContent = document.getElementById("dashboardContent");

  // Render stats
  dashboardStats.innerHTML = `
        <div class="dashboard-stat">
            <div class="dashboard-stat-header">
                <div class="dashboard-stat-icon green">
                    <i class="fas fa-calendar"></i>
                </div>
                <span class="dashboard-stat-change">+3</span>
            </div>
            <h3>15</h3>
            <p>Sự kiện đã tổ chức</p>
        </div>
        
        <div class="dashboard-stat">
            <div class="dashboard-stat-header">
                <div class="dashboard-stat-icon blue">
                    <i class="fas fa-users"></i>
                </div>
                <span class="dashboard-stat-change">+45</span>
            </div>
            <h3>450</h3>
            <p>Tổng lượt tham gia</p>
        </div>
        
        <div class="dashboard-stat">
            <div class="dashboard-stat-header">
                <div class="dashboard-stat-icon orange">
                    <i class="fas fa-star"></i>
                </div>
                <span class="dashboard-stat-change">+0.2</span>
            </div>
            <h3>${currentUser.rating || 0}</h3>
            <p>Đánh giá trung bình</p>
        </div>
        
        <div class="dashboard-stat">
            <div class="dashboard-stat-header">
                <div class="dashboard-stat-icon purple">
                    <i class="fas fa-trending-up"></i>
                </div>
                <span class="dashboard-stat-change">+12</span>
            </div>
            <h3>89</h3>
            <p>Tình nguyện viên thường xuyên</p>
        </div>
    `;

  // Render content
  dashboardContent.innerHTML = `
        <div class="dashboard-section">
            <div class="section-header-with-action">
                <h2>Sự kiện của tôi</h2>
                <button class="btn btn-primary" onclick="showCreateEvent()">
                    Tạo sự kiện mới
                </button>
            </div>
            <div class="my-events">
                <div class="event-item">
                    <div class="event-item-header">
                        <h3>Dọn dẹp bãi biển Nha Trang</h3>
                        <span class="event-status active">Đang hoạt động</span>
                    </div>
                    <div class="event-item-stats">
                        <div class="event-stat">
                            <i class="fas fa-calendar"></i>
                            <span>2024-01-20</span>
                        </div>
                        <div class="event-stat">
                            <i class="fas fa-users"></i>
                            <span>45/100</span>
                        </div>
                        <div class="event-stat">
                            <i class="fas fa-eye"></i>
                            <span>324 lượt xem</span>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 45%"></div>
                    </div>
                </div>
                
                <div class="event-item">
                    <div class="event-item-header">
                        <h3>Trồng cây xanh tại công viên</h3>
                        <span class="event-status active">Đang hoạt động</span>
                    </div>
                    <div class="event-item-stats">
                        <div class="event-stat">
                            <i class="fas fa-calendar"></i>
                            <span>2024-01-22</span>
                        </div>
                        <div class="event-stat">
                            <i class="fas fa-users"></i>
                            <span>65/120</span>
                        </div>
                        <div class="event-stat">
                            <i class="fas fa-eye"></i>
                            <span>256 lượt xem</span>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 54%"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-section">
            <h2>Đánh giá gần đây</h2>
            <div class="recent-reviews">
                <div class="review-item">
                    <div class="review-header">
                        <div class="review-author">
                            <h3>Nguyễn Văn An</h3>
                            <p>Dọn dẹp bãi biển Nha Trang</p>
                        </div>
                        <div class="review-rating">
                            <i class="fas fa-star active"></i>
                            <i class="fas fa-star active"></i>
                            <i class="fas fa-star active"></i>
                            <i class="fas fa-star active"></i>
                            <i class="fas fa-star active"></i>
                        </div>
                    </div>
                    <p class="review-comment">Tổ chức rất tốt, sự kiện ý nghĩa!</p>
                    <p class="review-date">2024-01-15</p>
                </div>
                
                <div class="review-item">
                    <div class="review-header">
                        <div class="review-author">
                            <h3>Trần Thị Bình</h3>
                            <p>Trồng cây xanh tại công viên</p>
                        </div>
                        <div class="review-rating">
                            <i class="fas fa-star active"></i>
                            <i class="fas fa-star active"></i>
                            <i class="fas fa-star active"></i>
                            <i class="fas fa-star active"></i>
                            <i class="fas fa-star"></i>
                        </div>
                    </div>
                    <p class="review-comment">Hoạt động bổ ích, cần cải thiện thời gian.</p>
                    <p class="review-date">2024-01-12</p>
                </div>
            </div>
        </div>
    `;
}
