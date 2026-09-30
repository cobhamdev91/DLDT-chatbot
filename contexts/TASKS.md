# DANH SÁCH NHIỆM VỤ & TIẾN ĐỘ DỰ ÁN (PROJECT TASKS)
**Dự án**: Dấu Chân Kinh Bắc – Cổng Thông Tin & Khám Phá Du Lịch Bắc Ninh  
**Công nghệ**: Next.js 16 (App Router), React 19, Vanilla CSS, Lucide Icons  
**Cập nhật lần cuối**: 2026-10-01  

---

## 1. Mục Tiêu & Yêu Cầu Thiết Kế Cốt Lõi (Core Requirements)
- [x] **Typography & Font**: Chỉ Title Web mới dùng font Dancing Script. Toàn bộ nội dung dùng Inter (font-size cân đối, line-height 1.6). Headings dùng Playfair Display.
- [x] **Header**: Đồng bộ màu transparent với background hero khi ở đỉnh trang. Khi cuộn trang (scroll > 25px) tự động chuyển sticky + shrink header (chiều cao giảm còn 56px, nền kem kem mờ `#FDF8F2`, chữ tối màu). Bỏ badge redstamp "Bắc Ninh" ở logo header.
- [x] **Hero Sections**: 
  - Trang chủ: Độ cao 90vh trên desktop, đường cong SVG uốn lượn ở bottom.
  - Trang con (Điểm đến, Ẩm thực, Văn hóa, Làng nghề, Lưu trú, Phương tiện): Độ cao 60–70vh, Cutout text parallax, đường sóng SVG uốn lượn dưới đáy.
- [x] **Breadcrumb**: Thay thế hoàn toàn back-link bằng Breadcrumb component clickable, đặt ngay dưới hero section.
- [x] **Scroll Drawing Watermark**: Đường nét vẽ chuyển động theo cuộn trang ("Dấu Chân Kinh Bắc", họa tiết hoa sen & dấu chân cổ truyền) chạy ngầm xuyên suốt trang.
- [x] **Tập trung hóa chuỗi i18n/Text**: Toàn bộ chuỗi nội dung quan trọng tập trung trong `src/data/content.js`.

---

## 2. Nhiệm Vụ Từng Phân Hệ (Detailed Module Tasks)

### 2.1. Phân Hệ Phương Tiện (`/phuong-tien`)
- [x] **Bộ Ước Tính & So Sánh Lộ Trình (Estimator)**:
  - Tự động tính toán lại khoảng cách (km), thời gian và chi phí cho cả 4 phương tiện (Ô tô/Taxi, Buýt, Xe máy, Tàu hỏa) khi thay đổi Điểm Xuất Phát hoặc Điểm Đến.
  - Hiển thị lộ trình cụ thể (waypoint/route path) từng phương tiện ở chân thẻ.
  - Có badge/hiệu ứng thông báo đồng bộ kết quả tức thì.
- [x] **Bộ Lọc Nhu Cầu**:
  - Tự động áp dụng (auto-apply), không cần nút tìm kiếm.
  - Border-radius vừa phải (12px), khoảng cách (gap) với hàng thẻ thông thoáng (24-28px).
- [x] **Kiến Trúc Thẻ Phương Tiện (Card Architecture)**:
  - Header: Icon bên trái, Badge loại hình bên phải (Tiết kiệm, Linh hoạt, Phổ biến, Tiện lợi, Sinh thái, An nhàn).
  - Tên phương tiện (H3): Sans-serif Inter đậm, dứt khoát (18–20px).
  - Giá tiền (Price Tag): Nổi bật dưới tên, tương phản cao theo chuẩn WCAG.
  - Mô tả ngắn: Giới hạn 2 dòng text với `text-overflow: ellipsis`.
  - Highlights: Dạng bullet list ngắn gọn với icon checkmark ✓ màu xanh ngọc/lục bảo (`#059669`), bỏ ô vuông xanh lớn.
  - Footer: Tách biệt rõ giữa Tag phân loại và Nút Ghost CTA ("Xem chi tiết & lời khuyên →").
- [x] **Popover "Xem chi tiết & lời khuyên"**:
  - Desktop: Popover dạng Drawer trượt từ bên phải (Right-side panel, 440px), có nút đóng, ESC listener, backdrop blur.
  - Mobile (`<= 640px`): Dạng Popup Menu / Bottom-Sheet trượt từ dưới lên, bo tròn góc trên, thanh kéo handle bar.
- [x] **Lộ Trình Du Lịch Mẫu (Itinerary Timeline)**:
  - Giao diện Timeline kết hợp hiệu ứng Todo List.
  - Người dùng có thể bấm trực tiếp để đánh dấu chặng đã hoàn thành hoặc đang lên kế hoạch.
  - Hiệu ứng đổi màu xanh lục và huy hiệu "✓ Đã hoàn thành".
- [x] **Cẩm Nang An Toàn Bento Grid**:
  - Bố cục Bento box: Hero card (Ô to nổi bật trải dài 2 cột, gradient sang trọng) + các Medium cards xung quanh gọn gàng.

### 2.2. Phân Hệ Lưu Trú (`/luu-tru`)
- [x] **Thanh Booking & Filter**:
  - Bo tròn 12px hiện đại (thay vì 24px quá tròn).
  - Lưới 4 cột đều nhau, loại bỏ cột thừa.
  - Bộ lọc Khu vực (TP. Bắc Ninh, TP. Từ Sơn, Tiên Du, Yên Phong) và Hạng sao (5 sao, 4 sao, 2-3 sao, Homestay) kết nối dữ liệu thật.
  - Auto-apply ngay khi chọn, không cần nút tìm kiếm.
  - Xử lý vị trí không bị SVG wave của hero che khuất.
- [x] **Kiến Trúc Thẻ Lưu Trú & Footer**:
  - Giảm bớt mật độ nội dung trong thẻ (chuyển chi tiết vào trang chi tiết).
  - Format lại chân thẻ: Giá từ hiển thị trang trọng, nút "Xem phòng →" gọn gàng, không bị chen chúc hay chật chội.
- [x] **Bổ sung Ảnh Hero thực tế cho từng Cơ Sở Lưu Trú**:
  - Tạo và lưu trữ ảnh thực tế cho các khách sạn lớn (Grand Phoenix, Vinpearl, Mandala, Senna Wellness, Senvibe...) trong `/public/images/`.
  - Cập nhật trường `heroImage` và `image` trong `src/data/accommodations.js`.

### 2.3. Phân Hệ Thẻ Flip Card (Điểm Đến, Ẩm Thực, Văn Hóa, Làng Nghề)
- [x] **Định dạng Image Text Blocks / Flip Card**:
  - Mặt trước: Full ảnh với tiêu đề nằm trong ảnh ở đáy, ẩn phụ đề rườm rà. Không để nút chuyển hướng ở mặt trước.
  - Tương tác hover: Hover lật thẻ mượt mà sang mặt sau. Tự động chuyển trang sau delay hoặc click vào mặt sau.
  - Mặt sau: Nền sáng màu kem nhạt `#FFFBF5` để dễ trình chiếu trên slide thuyết trình.
- [x] **Đồng bộ Thẻ Làng Nghề (`/lang-nghe`)**: Chuyển đổi toàn bộ sang FlipCard chuẩn.
- [x] **Độ tương phản chữ mặt sau Flip Card**: Khắc phục các đoạn text màu trắng/vàng nhạt trên nền kem, đổi sang màu nâu đậm `#55443B` và đỏ gạch `#C83228` dễ đọc.

### 2.4. Phân Hệ Trang Chủ & Slideshow Lộ Trình
- [x] **Slideshow Lộ Trình**:
  - Cố định hiển thị chuẩn 3 thẻ trên desktop.
  - Thẻ hiển thị đầy đủ thông tin: ảnh, thời gian, điểm đến, ẩm thực, phương tiện.

### 2.5. Tinh Chỉnh Giao Diện & Sửa Lỗi (Current Turn)
- [x] **Footer Spacing**: Bổ sung `margin-top: 80px` (desktop) và `48px` (mobile) cho `.footer` trong `Footer.module.css` để nội dung trang không bị dính vào nền xanh footer.
- [x] **Sửa Lỗi CSS Chatbot Popup**:
  - Tích hợp và import `chatbot-popup.css` vào Next.js bundle (`src/app/layout.js`) và lưu tại `/public/chatbot-popup.css`.
  - Định vị cố định Floating Action Button (`fixed; bottom: 32px; right: 32px; z-index: 9998`).
  - Tooltip chào mừng (`.chatbot-greeting`) nổi bật trên FAB với speech bubble tail, shadow sang trọng và nút đóng `×`.
- [x] **Header Utility Actions (Icon Group About Us)**:
  - Loại bỏ 3 icon cũ (Search, Heart, User).
  - Thay bằng icon Group (`Users` từ `lucide-react`) với liên kết chuẩn bị cho trang Về Chúng Tôi (`/ve-chung-toi`).
- [x] **Loại Bỏ Khối Quick Widgets Trang Chủ**:
  - Gỡ bỏ hoàn toàn section `quick-widgets-wrapper` (Thời tiết, Bản đồ, Đơn vị hành chính, Di chuyển) theo đúng tài liệu đặc tả dự án.
  - Tối ưu luồng hiển thị trang chủ: Hero uốn lượn -> Lotus Divider -> Danh mục khám phá sắc màu Kinh Bắc.
- [x] **Trang Về Chúng Tôi (`/ve-chung-toi`)**: Khởi tạo trang Về Chúng Tôi trang trọng, giới thiệu sứ mệnh dự án Dấu Chân Kinh Bắc.
