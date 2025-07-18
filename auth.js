// Authentication system
let currentUser = null;
let isLoginMode = true;
let selectedRole = "volunteer";

// Initialize auth on page load
document.addEventListener("DOMContentLoaded", function () {
  // Check for stored user data
  const storedUser = localStorage.getItem("volunteerHubUser");
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
    updateAuthUI();
  }

  // Setup auth form
  setupAuthForm();
});

function setupAuthForm() {
  const authForm = document.getElementById("authForm");
  authForm.addEventListener("submit", handleAuthSubmit);
}

function showLoginModal() {
  const modal = document.getElementById("loginModal");
  modal.classList.add("active");
  resetAuthForm();
}

function hideLoginModal() {
  const modal = document.getElementById("loginModal");
  modal.classList.remove("active");
}

function selectRole(role) {
  selectedRole = role;

  // Update role buttons
  document.querySelectorAll(".role-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.closest(".role-btn").classList.add("active");

  // Update name label
  const nameLabel = document.getElementById("nameLabel");
  if (role === "organization") {
    nameLabel.textContent = "Tên tổ chức";
    document.getElementById("name").placeholder = "Tên tổ chức của bạn";
  } else {
    nameLabel.textContent = "Họ và tên";
    document.getElementById("name").placeholder = "Nhập họ và tên";
  }
}

function switchAuthMode() {
  isLoginMode = !isLoginMode;
  updateAuthModal();
}

function updateAuthModal() {
  const modalTitle = document.getElementById("modalTitle");
  const nameGroup = document.getElementById("nameGroup");
  const submitBtn = document.getElementById("submitBtn");
  const switchModeBtn = document.getElementById("switchModeBtn");

  if (isLoginMode) {
    modalTitle.textContent = "Đăng nhập";
    nameGroup.style.display = "none";
    submitBtn.textContent = "Đăng nhập";
    switchModeBtn.textContent = "Chưa có tài khoản? Đăng ký ngay";
  } else {
    modalTitle.textContent = "Đăng ký";
    nameGroup.style.display = "block";
    submitBtn.textContent = "Đăng ký";
    switchModeBtn.textContent = "Đã có tài khoản? Đăng nhập";
  }
}

function resetAuthForm() {
  document.getElementById("authForm").reset();
  isLoginMode = true;
  selectedRole = "volunteer";
  updateAuthModal();

  // Reset role selection
  document.querySelectorAll(".role-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector(".role-btn").classList.add("active");
}

async function handleAuthSubmit(e) {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Đang xử lý...";
  submitBtn.disabled = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  try {
    if (isLoginMode) {
      await login(email, password, selectedRole);
    } else {
      await register(email, password, name, selectedRole);
    }

    hideLoginModal();
    updateAuthUI();

    // Show appropriate page based on user role
    if (currentUser.role === "volunteer") {
      showDashboard();
    } else if (currentUser.role === "organization") {
      showDashboard();
    }
  } catch (error) {
    alert("Đã có lỗi xảy ra: " + error.message);
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
}

async function login(email, password, role) {
  // Mock user data based on role
  const mockUser = {
    id: Date.now().toString(),
    email,
    name: role === "organization" ? "Green Earth Foundation" : "Nguyễn Văn An",
    role,
    joinedDate: "2024-01-15",
    avatar:
      role === "organization"
        ? "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"
        : "https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg",
    ...(role === "volunteer" && {
      volunteerHours: 45,
      badges: ["Chăm chỉ", "Bảo vệ môi trường", "Người dẫn đầu"],
      eventsAttended: 12,
      rating: 4.8,
    }),
    ...(role === "organization" && {
      organizationName: "Green Earth Foundation",
      verified: true,
      rating: 4.9,
    }),
  };

  currentUser = mockUser;
  localStorage.setItem("volunteerHubUser", JSON.stringify(mockUser));
}

async function register(email, password, name, role) {
  const mockUser = {
    id: Date.now().toString(),
    email,
    name: role === "organization" ? name : name,
    role,
    joinedDate: new Date().toISOString().split("T")[0],
    avatar:
      role === "organization"
        ? "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"
        : "https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg",
    ...(role === "volunteer" && {
      volunteerHours: 0,
      badges: [],
      eventsAttended: 0,
      rating: 0,
    }),
    ...(role === "organization" && {
      organizationName: name,
      verified: false,
      rating: 0,
    }),
  };

  currentUser = mockUser;
  localStorage.setItem("volunteerHubUser", JSON.stringify(mockUser));
}

function logout() {
  currentUser = null;
  localStorage.removeItem("volunteerHubUser");
  updateAuthUI();
  showHome();
}

function updateAuthUI() {
  const loginBtn = document.getElementById("loginBtn");
  const userInfo = document.getElementById("userInfo");
  const dashboardBtn = document.getElementById("dashboardBtn");
  const profileBtn = document.getElementById("profileBtn");
  const createEventBtn = document.getElementById("createEventBtn");

  if (currentUser) {
    loginBtn.style.display = "none";
    userInfo.style.display = "flex";
    dashboardBtn.style.display = "flex";
    profileBtn.style.display = "flex";

    // Update user info
    document.getElementById("userAvatar").src = currentUser.avatar;
    document.getElementById("userName").textContent = currentUser.name;
    document.getElementById("userRole").textContent = currentUser.role;

    // Show create event button for organizations
    if (currentUser.role === "organization") {
      createEventBtn.style.display = "flex";
    } else {
      createEventBtn.style.display = "none";
    }
  } else {
    loginBtn.style.display = "block";
    userInfo.style.display = "none";
    dashboardBtn.style.display = "none";
    profileBtn.style.display = "none";
    createEventBtn.style.display = "none";
  }
}

function updateUser(updates) {
  if (currentUser) {
    currentUser = { ...currentUser, ...updates };
    localStorage.setItem("volunteerHubUser", JSON.stringify(currentUser));
    updateAuthUI();
  }
}
