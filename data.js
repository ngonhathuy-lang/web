// Mock data for the application
const mockEvents = [
  {
    id: "1",
    title: "Dọn dẹp bãi biển Nha Trang",
    description:
      "Tham gia cùng chúng tôi để bảo vệ môi trường biển và tạo ra một bãi biển sạch đẹp.",
    organization: "Green Earth Foundation",
    date: "2024-01-20",
    time: "07:00 - 11:00",
    location: "Bãi biển Nha Trang, Khánh Hòa",
    participants: 45,
    maxParticipants: 100,
    category: "environment",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
    urgent: true,
    requirements: [
      "Mang theo găng tay và khẩu trang",
      "Mặc quần áo thoải mái, phù hợp hoạt động ngoài trời",
      "Mang theo nước uống cá nhân",
      "Có tinh thần trách nhiệm cao",
    ],
    benefits: [
      "Giấy chứng nhận tình nguyện",
      "Áo kỷ niệm và dụng cụ hỗ trợ",
      "Bữa sáng miễn phí",
      "Gặp gỡ những người bạn mới",
    ],
    agenda: [
      { time: "07:00", activity: "Tập trung tại điểm hẹn" },
      { time: "07:30", activity: "Phổ biến quy tắc an toàn" },
      { time: "08:00", activity: "Bắt đầu hoạt động dọn dẹp" },
      { time: "10:00", activity: "Nghỉ giải lao" },
      { time: "10:30", activity: "Tiếp tục dọn dẹp và phân loại" },
      { time: "11:00", activity: "Tổng kết và kết thúc" },
    ],
    reviews: [
      {
        id: "1",
        author: "Nguyễn Văn An",
        rating: 5,
        comment: "Sự kiện rất ý nghĩa và được tổ chức chuyên nghiệp!",
        date: "2024-01-15",
      },
    ],
  },
  {
    id: "2",
    title: "Hỗ trợ trẻ em vùng cao học tiếng Anh",
    description:
      "Chương trình giáo dục miễn phí cho trẻ em tại các vùng núi cao.",
    organization: "Education For All",
    date: "2024-01-25",
    time: "14:00 - 17:00",
    location: "Trường Tiểu học Sapa, Lào Cai",
    participants: 12,
    maxParticipants: 20,
    category: "education",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    urgent: false,
    requirements: [
      "Có kinh nghiệm dạy học",
      "Kiên nhẫn với trẻ em",
      "Mang theo tài liệu giảng dạy",
    ],
    benefits: [
      "Giấy chứng nhận tình nguyện",
      "Kinh nghiệm giảng dạy",
      "Bữa trưa miễn phí",
    ],
    agenda: [
      { time: "14:00", activity: "Gặp gỡ và làm quen" },
      { time: "14:30", activity: "Bắt đầu lớp học" },
      { time: "16:00", activity: "Nghỉ giải lao" },
      { time: "16:15", activity: "Tiếp tục học tập" },
      { time: "17:00", activity: "Kết thúc và tổng kết" },
    ],
    reviews: [],
  },
  {
    id: "3",
    title: "Phát cơm từ thiện cho người nghèo",
    description:
      "Chuẩn bị và phát cơm miễn phí cho người vô gia cư và hoàn cảnh khó khăn.",
    organization: "Loving Hearts Charity",
    date: "2024-01-18",
    time: "17:00 - 20:00",
    location: "Công viên Tao Đàn, TP.HCM",
    participants: 78,
    maxParticipants: 80,
    category: "charity",
    image: "https://images.pexels.com/photos/6995242/pexels-photo-6995242.jpeg",
    urgent: false,
    requirements: [
      "Có tinh thần phục vụ",
      "Mang theo khẩu trang và găng tay",
      "Sẵn sàng làm việc nhóm",
    ],
    benefits: [
      "Giấy chứng nhận tình nguyện",
      "Bữa ăn miễn phí",
      "Kinh nghiệm làm từ thiện",
    ],
    agenda: [
      { time: "17:00", activity: "Chuẩn bị thực phẩm" },
      { time: "18:00", activity: "Bắt đầu phát cơm" },
      { time: "19:30", activity: "Dọn dẹp" },
      { time: "20:00", activity: "Kết thúc" },
    ],
    reviews: [],
  },
  {
    id: "4",
    title: "Trồng cây xanh tại công viên",
    description:
      "Hoạt động trồng cây và chăm sóc không gian xanh trong thành phố.",
    organization: "Green City Initiative",
    date: "2024-01-22",
    time: "06:00 - 10:00",
    location: "Công viên Tao Đàn, TP.HCM",
    participants: 65,
    maxParticipants: 120,
    category: "environment",
    image: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
    urgent: false,
    requirements: [
      "Mang theo dụng cụ làm vườn",
      "Mặc quần áo cũ",
      "Sẵn sàng làm việc ngoài trời",
    ],
    benefits: [
      "Giấy chứng nhận tình nguyện",
      "Kiến thức về trồng cây",
      "Bữa sáng miễn phí",
    ],
    agenda: [
      { time: "06:00", activity: "Tập trung và chuẩn bị" },
      { time: "06:30", activity: "Bắt đầu trồng cây" },
      { time: "08:30", activity: "Nghỉ giải lao" },
      { time: "09:00", activity: "Tiếp tục trồng cây" },
      { time: "10:00", activity: "Kết thúc và tổng kết" },
    ],
    reviews: [],
  },
  {
    id: "5",
    title: "Chăm sóc người cao tuổi",
    description:
      "Thăm hỏi, trò chuyện và hỗ trợ sinh hoạt cho người cao tuổi tại viện dưỡng lão.",
    organization: "Community Care Network",
    date: "2024-01-28",
    time: "09:00 - 12:00",
    location: "Viện Dưỡng lão Bình Thạnh, TP.HCM",
    participants: 25,
    maxParticipants: 40,
    category: "community",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    urgent: false,
    requirements: [
      "Có tính cách vui vẻ, hòa đồng",
      "Kiên nhẫn với người cao tuổi",
      "Có thể giao tiếp tốt",
    ],
    benefits: [
      "Giấy chứng nhận tình nguyện",
      "Kinh nghiệm chăm sóc",
      "Bữa trưa miễn phí",
    ],
    agenda: [
      { time: "09:00", activity: "Gặp gỡ và làm quen" },
      { time: "09:30", activity: "Trò chuyện với người cao tuổi" },
      { time: "11:00", activity: "Hỗ trợ sinh hoạt" },
      { time: "12:00", activity: "Kết thúc" },
    ],
    reviews: [],
  },
  {
    id: "6",
    title: "Giáo dục kỹ năng số cho nông dân",
    description: "Hướng dẫn sử dụng smartphone và internet để bán hàng online.",
    organization: "Digital Rural Development",
    date: "2024-01-30",
    time: "13:00 - 16:00",
    location: "Trung tâm Văn hóa Đồng Tháp",
    participants: 8,
    maxParticipants: 25,
    category: "education",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    urgent: false,
    requirements: [
      "Có kiến thức về công nghệ",
      "Kiên nhẫn trong giảng dạy",
      "Mang theo laptop/tablet",
    ],
    benefits: [
      "Giấy chứng nhận tình nguyện",
      "Kinh nghiệm giảng dạy",
      "Bữa trưa miễn phí",
    ],
    agenda: [
      { time: "13:00", activity: "Giới thiệu khóa học" },
      { time: "13:30", activity: "Hướng dẫn sử dụng smartphone" },
      { time: "15:00", activity: "Nghỉ giải lao" },
      { time: "15:15", activity: "Hướng dẫn bán hàng online" },
      { time: "16:00", activity: "Kết thúc và trao đổi" },
    ],
    reviews: [],
  },
];

const categoryNames = {
  charity: "Từ thiện",
  environment: "Môi trường",
  education: "Giáo dục",
  community: "Cộng đồng",
};

const categoryClasses = {
  charity: "category-charity",
  environment: "category-environment",
  education: "category-education",
  community: "category-community",
};
