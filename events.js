// Events management
let currentFilter = "all";
let selectedEventId = null;

// Initialize events on page load
document.addEventListener("DOMContentLoaded", function () {
  renderEvents();
});

function renderEvents() {
  const eventsGrid = document.getElementById("eventsGrid");
  const filteredEvents =
    currentFilter === "all"
      ? mockEvents
      : mockEvents.filter((event) => event.category === currentFilter);

  eventsGrid.innerHTML = filteredEvents
    .map(
      (event) => `
        <div class="event-card" data-category="${event.category}">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
                ${
                  event.urgent
                    ? '<span class="event-urgent">Khẩn cấp</span>'
                    : ""
                }
                <span class="event-category ${categoryClasses[event.category]}">
                    ${categoryNames[event.category]}
                </span>
            </div>
            
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <p class="event-description">${event.description}</p>
                
                <div class="event-details">
                    <div class="event-detail">
                        <i class="fas fa-calendar"></i>
                        <span>${event.date}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-clock"></i>
                        <span>${event.time}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-detail">
                        <i class="fas fa-users"></i>
                        <span>${event.participants}/${
        event.maxParticipants
      } người</span>
                    </div>
                </div>

                <div class="event-footer">
                    <div class="event-organization">
                        bởi ${event.organization}
                    </div>
                    <button class="view-event-btn" onclick="showEventDetails('${
                      event.id
                    }')">
                        Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function filterEvents(category) {
  currentFilter = category;

  // Update filter buttons
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  renderEvents();
}

function showEventDetails(eventId) {
  selectedEventId = eventId;
  const event = mockEvents.find((e) => e.id === eventId);

  if (!event) return;

  const eventDetailsContent = document.getElementById("eventDetailsContent");
  const isRegistered = false; // This would come from user data

  eventDetailsContent.innerHTML = `
        <div class="event-details-header">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
                ${
                  event.urgent
                    ? '<span class="event-urgent">Khẩn cấp</span>'
                    : ""
                }
                <div class="event-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            
            <div class="event-info">
                <div class="event-header-content">
                    <h1>${event.title}</h1>
                    <p class="event-org">bởi ${event.organization}</p>
                    <p class="event-desc">${event.description}</p>
                </div>

                <div class="event-details-grid">
                    <div class="event-details-left">
                        <div class="event-detail">
                            <i class="fas fa-calendar"></i>
                            <span>${event.date}</span>
                        </div>
                        <div class="event-detail">
                            <i class="fas fa-clock"></i>
                            <span>${event.time}</span>
                        </div>
                        <div class="event-detail">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${event.location}</span>
                        </div>
                        <div class="event-detail">
                            <i class="fas fa-users"></i>
                            <span>${event.participants}/${
    event.maxParticipants
  } người</span>
                        </div>
                    </div>
                    
                    <div class="event-details-right">
                        ${
                          currentUser
                            ? `
                            <button class="btn btn-primary btn-full" onclick="toggleRegistration()">
                                ${
                                  isRegistered
                                    ? "Hủy đăng ký"
                                    : "Đăng ký tham gia"
                                }
                            </button>
                            ${
                              isRegistered
                                ? `
                                <button class="btn btn-secondary btn-full" onclick="showQRModal()">
                                    <i class="fas fa-qrcode"></i>
                                    <span>Mã QR check-in</span>
                                </button>
                            `
                                : ""
                            }
                        `
                            : `
                            <button class="btn btn-primary btn-full" onclick="showLoginModal()">
                                Đăng nhập để đăng ký
                            </button>
                        `
                        }
                    </div>
                </div>

                <div class="progress-section">
                    <div class="progress-header">
                        <span>Tiến độ đăng ký</span>
                        <span>${event.participants}/${
    event.maxParticipants
  } người</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${
                          (event.participants / event.maxParticipants) * 100
                        }%"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="event-sections">
            <div class="event-section">
                <h2>Yêu cầu tham gia</h2>
                <ul class="requirements-list">
                    ${event.requirements
                      .map(
                        (req) => `
                        <li>
                            <span class="bullet">•</span>
                            <span>${req}</span>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
            </div>

            <div class="event-section">
                <h2>Quyền lợi</h2>
                <ul class="benefits-list">
                    ${event.benefits
                      .map(
                        (benefit) => `
                        <li>
                            <span class="bullet">•</span>
                            <span>${benefit}</span>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
            </div>
        </div>

        <div class="event-section">
            <h2>Lịch trình</h2>
            <div class="agenda-list">
                ${event.agenda
                  .map(
                    (item) => `
                    <div class="agenda-item">
                        <div class="agenda-time">${item.time}</div>
                        <div class="agenda-activity">${item.activity}</div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </div>

        <div class="event-section">
            <div class="reviews-header">
                <h2>Đánh giá</h2>
                ${
                  currentUser && isRegistered
                    ? `
                    <button class="btn btn-primary" onclick="showReviewForm()">
                        Viết đánh giá
                    </button>
                `
                    : ""
                }
            </div>
            
            <div class="reviews-list">
                ${
                  event.reviews.length > 0
                    ? event.reviews
                        .map(
                          (review) => `
                    <div class="review-item">
                        <div class="review-header">
                            <div class="review-author">
                                <h3>${review.author}</h3>
                                <div class="review-rating">
                                    ${Array.from(
                                      { length: 5 },
                                      (_, i) => `
                                        <i class="fas fa-star ${
                                          i < review.rating ? "active" : ""
                                        }"></i>
                                    `
                                    ).join("")}
                                </div>
                            </div>
                            <span class="review-date">${review.date}</span>
                        </div>
                        <p class="review-comment">${review.comment}</p>
                    </div>
                `
                        )
                        .join("")
                    : '<p class="no-reviews">Chưa có đánh giá nào.</p>'
                }
            </div>
        </div>
    `;

  showPage("eventDetailsPage");
}

function toggleRegistration() {
  // This would handle registration logic
  alert("Chức năng đăng ký sẽ được triển khai trong phiên bản tiếp theo");
}

function showQRModal() {
  const modal = document.getElementById("qrModal");
  modal.classList.add("active");
}

function hideQRModal() {
  const modal = document.getElementById("qrModal");
  modal.classList.remove("active");
}

function showReviewForm() {
  // This would show a review form
  alert("Chức năng đánh giá sẽ được triển khai trong phiên bản tiếp theo");
}
