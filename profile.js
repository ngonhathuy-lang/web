// Profile management
let isEditingProfile = false;

function showProfile() {
  if (!currentUser) {
    showLoginModal();
    return;
  }

  renderProfile();
  showPage("profilePage");
}

function renderProfile() {
  const profileContent = document.getElementById("profileContent");

  const achievements = [
    {
      name: "Chăm chỉ",
      description: "Tham gia 10+ sự kiện",
      icon: "🏆",
      earned: true,
    },
    {
      name: "Bảo vệ môi trường",
      description: "Tham gia 5+ sự kiện môi trường",
      icon: "🌱",
      earned: true,
    },
    {
      name: "Người dẫn đầu",
      description: "Tổ chức 3+ sự kiện",
      icon: "👑",
      earned: true,
    },
    {
      name: "Tình nguyện viên xuất sắc",
      description: "Đánh giá 5 sao",
      icon: "⭐",
      earned: false,
    },
    {
      name: "Cống hiến 100 giờ",
      description: "Hoàn thành 100 giờ tình nguyện",
      icon: "💫",
      earned: false,
    },
    {
      name: "Mentor tình nguyện",
      description: "Hướng dẫn 10+ tình nguyện viên mới",
      icon: "🎓",
      earned: false,
    },
  ];

  const volunteerHistory = [
    {
      id: "1",
      title: "Dọn dẹp bãi biển Nha Trang",
      date: "2024-01-15",
      hours: 4,
      organization: "Green Earth Foundation",
      certificate: true,
      rating: 5,
    },
    {
      id: "2",
      title: "Hỗ trợ trẻ em học tiếng Anh",
      date: "2024-01-10",
      hours: 3,
      organization: "Education For All",
      certificate: true,
      rating: 5,
    },
    {
      id: "3",
      title: "Phát cơm từ thiện",
      date: "2024-01-08",
      hours: 2,
      organization: "Loving Hearts Charity",
      certificate: true,
      rating: 4,
    },
  ];

  profileContent.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar-section">
                <div class="profile-avatar">
                    <img src="${currentUser.avatar}" alt="${currentUser.name}">
                    <button class="avatar-edit-btn">
                        <i class="fas fa-camera"></i>
                    </button>
                </div>
            </div>
            
            <div class="profile-info">
                <div class="profile-name-section">
                    <h1>${currentUser.name}</h1>
                    <button class="edit-profile-btn" onclick="toggleEditProfile()">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
                
                <div class="profile-details">
                    <div class="profile-detail">
                        <i class="fas fa-envelope"></i>
                        <span>${currentUser.email}</span>
                    </div>
                    <div class="profile-detail">
                        <i class="fas fa-calendar"></i>
                        <span>Tham gia từ ${currentUser.joinedDate}</span>
                    </div>
                    <div class="profile-detail">
                        <i class="fas fa-star"></i>
                        <span>Đánh giá: ${currentUser.rating || 0}/5</span>
                    </div>
                </div>
            </div>
        </div>

        ${isEditingProfile ? renderEditForm() : ""}

        <div class="profile-stats">
            <div class="profile-stat">
                <div class="profile-stat-icon green">
                    <i class="fas fa-clock"></i>
                </div>
                <h3>${currentUser.volunteerHours || 0}</h3>
                <p>Giờ tình nguyện</p>
            </div>
            
            <div class="profile-stat">
                <div class="profile-stat-icon blue">
                    <i class="fas fa-calendar"></i>
                </div>
                <h3>${currentUser.eventsAttended || 0}</h3>
                <p>Sự kiện tham gia</p>
            </div>
            
            <div class="profile-stat">
                <div class="profile-stat-icon purple">
                    <i class="fas fa-award"></i>
                </div>
                <h3>${currentUser.badges?.length || 0}</h3>
                <p>Huy hiệu</p>
            </div>
        </div>

        <div class="profile-section">
            <h2>Thành tích</h2>
            <div class="achievements-grid">
                ${achievements
                  .map(
                    (achievement) => `
                    <div class="achievement-item ${
                      achievement.earned ? "earned" : "not-earned"
                    }">
                        <div class="achievement-icon">${achievement.icon}</div>
                        <h3>${achievement.name}</h3>
                        <p>${achievement.description}</p>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>

        ${
          currentUser.role === "volunteer"
            ? `
            <div class="profile-section">
                <h2>Lịch sử tình nguyện</h2>
                <div class="volunteer-history">
                    ${volunteerHistory
                      .map(
                        (activity) => `
                        <div class="history-item">
                            <div class="history-header">
                                <div class="history-info">
                                    <h3>${activity.title}</h3>
                                    <p class="history-org">${
                                      activity.organization
                                    }</p>
                                    <div class="history-details">
                                        <span>${activity.date}</span>
                                        <span>${activity.hours} giờ</span>
                                        <div class="history-rating">
                                            ${Array.from(
                                              { length: 5 },
                                              (_, i) => `
                                                <i class="fas fa-star ${
                                                  i < activity.rating
                                                    ? "active"
                                                    : ""
                                                }"></i>
                                            `
                                            ).join("")}
                                            <span>${activity.rating}/5</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="history-actions">
                                    ${
                                      activity.certificate
                                        ? `
                                        <button class="btn btn-secondary btn-small">
                                            <i class="fas fa-download"></i>
                                            <span>Chứng nhận</span>
                                        </button>
                                    `
                                        : ""
                                    }
                                </div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `
            : ""
        }
    `;
}

function renderEditForm() {
  return `
        <div class="edit-profile-form">
            <h3>Chỉnh sửa thông tin</h3>
            <form onsubmit="saveProfile(event)">
                <div class="form-grid">
                    <div class="form-group">
                        <label>Họ và tên</label>
                        <input type="text" id="editName" value="${currentUser.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="editEmail" value="${currentUser.email}" required>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="toggleEditProfile()">
                        Hủy
                    </button>
                    <button type="submit" class="btn btn-primary">
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
    `;
}

function toggleEditProfile() {
  isEditingProfile = !isEditingProfile;
  renderProfile();
}

function saveProfile(event) {
  event.preventDefault();

  const name = document.getElementById("editName").value;
  const email = document.getElementById("editEmail").value;

  updateUser({ name, email });
  isEditingProfile = false;
  renderProfile();

  alert("Thông tin đã được cập nhật thành công!");
}
