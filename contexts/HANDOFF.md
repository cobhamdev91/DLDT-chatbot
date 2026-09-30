# TÀI LIỆU CHUYỂN GIAO & QUY CHUẨN THỰC THI (PROJECT HANDOFF)
**Dự án**: Dấu Chân Kinh Bắc (Bắc Ninh Tourism Hub)  
**Đường dẫn thư mục**: `d:\EarnMoney\dau-chan-kinh-bac`  

---

## 1. Kiến Trúc & Cấu Trúc Thư Mục (Architecture & Structure)
```
dau-chan-kinh-bac/
├── contexts/                 # Bộ tài liệu kiểm soát nhiệm vụ, bug và handoff
│   ├── TASKS.md              # Toàn bộ danh mục nhiệm vụ & trạng thái
│   ├── BUGS_AND_ISSUES.md    # Phân tích nguyên nhân và giải pháp các bug
│   └── HANDOFF.md            # Tài liệu chuyển giao và quy chuẩn kỹ thuật
├── public/
│   ├── images/               # Toàn bộ hình ảnh thực tế của dự án (.jpg, .webp)
│   └── chatbot-popup.css     # Style cho chatbot widget
├── src/
│   ├── app/
│   │   ├── am-thuc/          # Trang danh sách & chi tiết [slug] Ẩm thực
│   │   ├── diem-den/         # Trang danh sách & chi tiết [slug] Điểm đến
│   │   ├── lang-nghe/        # Trang danh sách & chi tiết [slug] Làng nghề
│   │   ├── luu-tru/          # Trang danh sách & chi tiết [slug] Lưu trú
│   │   ├── phuong-tien/      # Trang Phương tiện di chuyển & Lộ trình
│   │   ├── van-hoa/          # Trang Văn hóa Quan họ & Lễ hội
│   │   ├── globals.css       # Design System tổng thể, token màu, flip card, responsive
│   │   ├── layout.js         # Root layout (Header, ScrollIndicator, ScrollDrawingBg, Footer, Chatbot)
│   │   └── page.js           # Trang chủ với Master Hero, Quick Widgets, Itinerary Slideshow
│   ├── components/
│   │   ├── AnimatedCounter.js    # Hiệu ứng số chạy mượt mà theo IntersectionObserver
│   │   ├── Breadcrumb.js         # Thanh điều hướng phân cấp (Server & Client compatible)
│   │   ├── FlipCard.js           # Thẻ 3D Flip Card (Text-image block, light cream back)
│   │   ├── Header.js             # Header sticky + shrink + transparent on hero
│   │   ├── ItinerarySlideshow.js # Hiển thị đúng 3 thẻ lộ trình tiêu chuẩn
│   │   ├── Lightbox.js           # Xem ảnh phóng to cho di sản & món ăn
│   │   ├── ParallaxHero.js       # Hero banner với hiệu ứng parallax và cutout text
│   │   ├── ScrollDrawingBg.js    # Nét vẽ SVG cuộn trang "Dấu Chân Kinh Bắc"
│   │   └── TypewriterText.js     # Chữ chạy máy đánh chữ cho tiêu đề
│   └── data/
│       ├── accommodations.js # Dữ liệu khách sạn, homestay, resort (có heroImage thực tế)
│       ├── content.js        # Tập trung toàn bộ chuỗi text UI, i18n
│       ├── craftVillages.js  # Dữ liệu 8 làng nghề truyền thống tiêu biểu
│       ├── destinations.js   # Dữ liệu 18 điểm đến di tích & danh thắng
│       ├── foods.js          # Dữ liệu 12 món ăn ẩm thực đặc sản
│       └── transport.js      # Dữ liệu 9 loại hình phương tiện, 3 lộ trình, 5 quy tắc an toàn
```

---

## 2. Quy Chuẩn Thiết Kế Bắt Buộc (Strict Design Rules)

1. **Font Chữ (Typography)**:
   - **Dancing Script**: DUY NHẤT dùng cho chữ nghệ thuật thư pháp ở title web hoặc logo điểm nhấn. KHÔNG ĐƯỢC dùng tràn lan trong nội dung.
   - **Inter**: Dùng cho toàn bộ nội dung (body, text, thẻ card, mô tả, nút bấm, thông số). Line-height chuẩn 1.6.
   - **Playfair Display**: Dùng cho các tiêu đề mục chính (Section Headings).

2. **Cơ Chế Thẻ Lật (Flip Card Architecture)**:
   - Mặt trước: Phải là Image Text Block (ảnh phủ tràn viền, tiêu đề nằm chìm bên trong ảnh ở góc dưới, ẩn phụ đề rườm rà). KHÔNG để nút bấm chuyển trang ở mặt trước.
   - Tương tác: Khi hover tự động lật sang mặt sau. Mặt sau có nút hoặc click vào thẻ sẽ điều hướng tới trang chi tiết.
   - Mặt sau: Nền màu kem sáng `#FFFBF5` để dễ đọc và chiếu slide. Màu chữ phải dùng `#3A2A1A` hoặc `#55443B`, giá tiền màu `#B8781B` hoặc `#C83228` để đạt độ tương phản chuẩn WCAG.

3. **Bộ Lọc & Tìm Kiếm (Auto-apply Filters)**:
   - Tất cả bộ lọc (dropdown, checkbox, radio button) PHẢI tự động kích hoạt ngay khi chọn (auto-apply), KHÔNG BAO GIỜ để nút bấm "Tìm kiếm" thừa thãi.
   - Bo góc của filter container giới hạn ở 10px – 12px, không dùng bo tròn 24-50px quá đà.

4. **Popover Chi Tiết Phương Tiện**:
   - Trên Desktop: Popover nằm ở bên phải màn hình (Right Drawer), trượt ra mượt mà, cố định chiều cao, scrollable nội dung.
   - Trên Mobile (`max-width: 640px`): Hiển thị dạng Popup Menu / Bottom Sheet từ mép dưới lên với thanh kéo handle bar.

5. **Hình Ảnh Thực Tế**:
   - Tất cả ảnh đều lưu trữ nội bộ tại `/public/images/`.
   - Mỗi cơ sở lưu trú và điểm đến phải có hình ảnh tương ứng chân thực, tránh lấy ảnh đền chùa gán cho khách sạn.
