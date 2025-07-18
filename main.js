// Main application logic
let currentPage = "homePage";

// Initialize application
document.addEventListener("DOMContentLoaded", function () {
  showHome();
  setupEventListeners();
});

function setupEventListeners() {
  // Close modals when clicking outside
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      hideLoginModal();
      hideQRModal();
    }
  });

  // Handle escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      hideLoginModal();
      hideQRModal();
    }
  });
}

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  document.getElementById(pageId).classList.add("active");
  currentPage = pageId;

  // Scroll to top
  window.scrollTo(0, 0);
}

function showHome() {
  showPage("homePage");
}

function showCreateEvent() {
  if (!currentUser || currentUser.role !== "organization") {
    alert("Chỉ tổ chức mới có thể tạo sự kiện");
    return;
  }

  renderCreateEventForm();
  showPage("createEventPage");
}

function renderCreateEventForm() {
  const createEventForm = document.getElementById("createEventForm");

  createEventForm.innerHTML = `
        <div class="form-section">
            <h2>Thông tin cơ bản</h2>
            <div class="form-grid">
                <div class="form-group">
                    <label for="eventTitle">Tiêu đề sự kiện *</label>
                    <input type="text" id="eventTitle" name="title" placeholder="Nhập tiêu đề sự kiện" required>
                </div>
                <div class="form-group">
                    <label for="eventCategory">Danh mục *</label>
                    <select id="eventCategory" name="category" required>
                        <option value="charity">Từ thiện</option>
                        <option value="environment">Môi trường</option>
                        <option value="education">Giáo dục</option>
                        <option value="community">Cộng đồng</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="eventDescription">Mô tả chi tiết *</label>
                <textarea id="eventDescription" name="description" placeholder="Mô tả chi tiết về sự kiện" rows="4" required></textarea>
            </div>
        </div>

        <div class="form-section">
            <h2>Thời gian và địa điểm</h2>
            <div class="form-grid">
                <div class="form-group">
                    <label for="eventDate">Ngày tổ chức *</label>
                    <div class="input-group">
                        <i class="fas fa-calendar"></i>
                        <input type="date" id="eventDate" name="date" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="eventStartTime">Thời gian bắt đầu *</label>
                    <div class="input-group">
                        <i class="fas fa-clock"></i>
                        <input type="time" id="eventStartTime" name="startTime" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="eventEndTime">Thời gian kết thúc *</label>
                    <div class="input-group">
                        <i class="fas fa-clock"></i>
                        <input type="time" id="eventEndTime" name="endTime" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="maxParticipants">Số lượng tham gia tối đa *</label>
                    <div class="input-group">
                        <i class="fas fa-users"></i>
                        <input type="number" id="maxParticipants" name="maxParticipants" placeholder="0" min="1" required>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="eventLocation">Địa điểm *</label>
                <div class="input-group">
                    <i class="fas fa-map-marker-alt"></i>
                    <input type="text" id="eventLocation" name="location" placeholder="Địa chỉ chi tiết" required>
                </div>
            </div>
        </div>

        <div class="form-section">
            <h2>Yêu cầu tham gia</h2>
            <div id="requirementsContainer">
                <div class="form-group">
                    <input type="text" name="requirements[]" placeholder="Nhập yêu cầu">
                </div>
            </div>
            <button type="button" class="btn btn-secondary" onclick="addRequirement()">
                + Thêm yêu cầu
            </button>
        </div>

        <div class="form-section">
            <h2>Quyền lợi</h2>
            <div id="benefitsContainer">
                <div class="form-group">
                    <input type="text" name="benefits[]" placeholder="Nhập quyền lợi">
                </div>
            </div>
            <button type="button" class="btn btn-secondary" onclick="addBenefit()">
                + Thêm quyền lợi
            </button>
        </div>

        <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="showHome()">
                Hủy
            </button>
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-save"></i>
                <span>Tạo sự kiện</span>
            </button>
        </div>
    `;

  // Add form submit handler
  createEventForm.addEventListener("submit", handleCreateEvent);
}

function addRequirement() {
  const container = document.getElementById("requirementsContainer");
  const newRequirement = document.createElement("div");
  newRequirement.className = "form-group";
  newRequirement.innerHTML =
    '<input type="text" name="requirements[]" placeholder="Nhập yêu cầu">';
  container.appendChild(newRequirement);
}

function addBenefit() {
  const container = document.getElementById("benefitsContainer");
  const newBenefit = document.createElement("div");
  newBenefit.className = "form-group";
  newBenefit.innerHTML =
    '<input type="text" name="benefits[]" placeholder="Nhập quyền lợi">';
  container.appendChild(newBenefit);
}

async function handleCreateEvent(e) {
  e.preventDefault();

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> <span>Đang tạo...</span>';
  submitBtn.disabled = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  alert("Sự kiện đã được tạo thành công!");
  showHome();

  submitBtn.innerHTML = originalText;
  submitBtn.disabled = false;
}

// Add CSS for additional styles
const additionalStyles = `
    .event-details-header {
        background: white;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        margin-bottom: 2rem;
    }

    .event-details-header .event-image {
        position: relative;
        height: 16rem;
    }

    .event-details-header .event-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .event-actions {
        position: absolute;
        top: 1rem;
        right: 1rem;
        display: flex;
        gap: 0.5rem;
    }

    .event-info {
        padding: 2rem;
    }

    .event-header-content h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.5rem;
    }

    .event-org {
        font-size: 1.125rem;
        color: #6b7280;
        margin-bottom: 1rem;
    }

    .event-desc {
        color: #4b5563;
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .event-details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .event-details-left {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .progress-section {
        margin-top: 2rem;
    }

    .progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        color: #6b7280;
    }

    .progress-bar {
        width: 100%;
        height: 0.75rem;
        background: #e5e7eb;
        border-radius: 9999px;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: #10b981;
        transition: width 0.3s ease;
    }

    .event-sections {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .event-section {
        background: white;
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }

    .event-section h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1rem;
    }

    .requirements-list,
    .benefits-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .requirements-list li,
    .benefits-list li {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
    }

    .bullet {
        color: #10b981;
        font-weight: bold;
        margin-top: 0.125rem;
    }

    .agenda-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .agenda-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem;
        background: #f9fafb;
        border-radius: 0.5rem;
    }

    .agenda-time {
        background: #10b981;
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 500;
        min-width: fit-content;
    }

    .agenda-activity {
        color: #4b5563;
    }

    .reviews-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .reviews-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .review-item {
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
    }

    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
    }

    .review-author h3 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.25rem;
    }

    .review-rating {
        display: flex;
        gap: 0.125rem;
    }

    .review-rating .fa-star {
        color: #d1d5db;
        font-size: 0.875rem;
    }

    .review-rating .fa-star.active {
        color: #fbbf24;
    }

    .review-comment {
        color: #4b5563;
        margin-bottom: 0.5rem;
    }

    .review-date {
        font-size: 0.75rem;
        color: #9ca3af;
    }

    .no-reviews {
        text-align: center;
        color: #9ca3af;
        font-style: italic;
    }

    .btn-small {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }

    .section-header-with-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .event-item {
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
    }

    .event-item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .event-item-header h3 {
        font-weight: 600;
        color: #1f2937;
    }

    .event-status {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .event-status.confirmed {
        background: #dcfce7;
        color: #166534;
    }

    .event-status.pending {
        background: #fef3c7;
        color: #92400e;
    }

    .event-status.active {
        background: #dcfce7;
        color: #166534;
    }

    .event-item-stats {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        color: #6b7280;
    }

    .event-stat {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .event-item-details {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.875rem;
        color: #6b7280;
    }

    .activity-item {
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
    }

    .activity-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .activity-header h3 {
        font-weight: 600;
        color: #1f2937;
    }

    .activity-hours {
        background: #dbeafe;
        color: #1e40af;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .activity-details {
        font-size: 0.875rem;
        color: #6b7280;
    }

    .profile-header {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        margin-bottom: 2rem;
        display: flex;
        gap: 2rem;
        align-items: center;
    }

    .profile-avatar {
        position: relative;
    }

    .profile-avatar img {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid #10b981;
    }

    .avatar-edit-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        background: #10b981;
        color: white;
        border: none;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .profile-name-section {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .profile-name-section h1 {
        font-size: 2rem;
        font-weight: 700;
        color: #1f2937;
    }

    .edit-profile-btn {
        background: transparent;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.375rem;
        transition: color 0.3s ease;
    }

    .edit-profile-btn:hover {
        color: #10b981;
    }

    .profile-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .profile-detail {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #6b7280;
    }

    .edit-profile-form {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 0.75rem;
        margin-bottom: 2rem;
    }

    .edit-profile-form h3 {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1rem;
    }

    .profile-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .profile-stat {
        background: white;
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        text-align: center;
    }

    .profile-stat-icon {
        width: 4rem;
        height: 4rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 1rem;
        font-size: 2rem;
        color: white;
    }

    .profile-stat h3 {
        font-size: 2rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 0.25rem;
    }

    .profile-stat p {
        color: #6b7280;
    }

    .profile-section {
        background: white;
        padding: 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        margin-bottom: 2rem;
    }

    .profile-section h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1.5rem;
    }

    .achievements-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }

    .achievement-item {
        padding: 1rem;
        border-radius: 0.5rem;
        text-align: center;
        border: 2px solid;
    }

    .achievement-item.earned {
        border-color: #10b981;
        background: #f0fdf4;
        color: #059669;
    }

    .achievement-item.not-earned {
        border-color: #e5e7eb;
        background: #f9fafb;
        color: #9ca3af;
    }

    .achievement-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }

    .achievement-item h3 {
        font-weight: 600;
        margin-bottom: 0.25rem;
    }

    .achievement-item p {
        font-size: 0.875rem;
    }

    .volunteer-history {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .history-item {
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
    }

    .history-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .history-info h3 {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 0.25rem;
    }

    .history-org {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
    }

    .history-details {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 0.875rem;
        color: #6b7280;
    }

    .history-rating {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .history-rating .fa-star {
        color: #d1d5db;
        font-size: 0.75rem;
    }

    .history-rating .fa-star.active {
        color: #fbbf24;
    }

    @media (max-width: 768px) {
        .event-details-grid {
            grid-template-columns: 1fr;
        }

        .event-sections {
            grid-template-columns: 1fr;
        }

        .profile-header {
            flex-direction: column;
            text-align: center;
        }

        .achievements-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }

        .history-header {
            flex-direction: column;
            gap: 1rem;
        }
    }
`;

// Add the additional styles to the page
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
