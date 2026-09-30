# DANH SÁCH BỌ & VẤN ĐỀ ĐÃ NÊU (BUGS & ISSUES LOG)
**Tài liệu theo dõi**: Lịch sử phản hồi người dùng & các ảnh chụp thực tế (Screenshots 1 – 4)

---

## 1. Phân Tích Các Vấn Đề Từ Ảnh Chụp Màn Hình

### Issue 1 (Ảnh 1 - Thẻ Lưu Trú & Chân Thẻ Bị Chen Chúc)
- **Mô tả người dùng**: "ảnh 1: card footer cần được format tốt hơn để hiển thị nội dung k bị cảm giác chật, chen chúc"
- **Nguyên nhân gốc rễ**: Chuỗi giá tiền dài (ví dụ: `3.200.000 – 6.500.000 VNĐ/đêm`) và nút CTA `Đặt phòng ngay →` bị xếp chung một dòng chật hẹp hoặc chồng đè không gian với padding quá lớn, gây cảm giác ngột ngạt và vỡ layout.
- **Giải pháp xử lý**:
  - Tách bạch cấu trúc: Cột bên trái hiển thị nhãn phụ `GIÁ TỪ` (0.6875rem) cùng con số chính cô đọng (`3.200.000đ/đêm`, màu nâu hổ phách/đỏ gạch).
  - Cột bên phải là nút CTA `Xem phòng →` có padding thanh thoát (7px 14px), bo tròn 6px, tự động co giãn.
  - Phân cách bằng `border-top: 1px solid rgba(107, 58, 42, 0.08)`.

### Issue 2 (Ảnh 2 - Nội Dung Filter Bị Đường Cong SVG Che Khuất)
- **Mô tả người dùng**: "ảnh 2: nội dung của filter đang bị svg path của hero che khuất"
- **Nguyên nhân gốc rễ**: Khối filter booking bar được đặt margin âm (`marginTop: '-30px'`) để tạo hiệu ứng nổi lên hero banner, nhưng SVG path của `ParallaxHero` có chiều cao 120px và z-index đè lên trên khiến người dùng không thể đọc nhãn hoặc click vào các trường chọn ngày.
- **Giải pháp xử lý**:
  - Bỏ hoàn toàn margin âm, thiết lập `marginTop: '0'`, `paddingTop: '28px'`.
  - Bổ sung `position: 'relative'`, `zIndex: 10` cho section filter để luôn nổi lên trên mọi lớp trang trí.
  - Chèn thanh Breadcrumb ngay phía dưới hero, tạo khoảng đệm tự nhiên và hợp lý.

### Issue 3 (Ảnh 3 - Estimator Không Đổi Dữ Liệu Khi Lọc)
- **Mô tả người dùng**: "ảnh 3: cảm giác filter ko hoạt động, nội dung k thay đổi, hoặc có thể tài liệu ko mô tả"
- **Nguyên nhân gốc rễ**: Khi thay đổi `origin` (Hà Nội, Mỹ Đình, Long Biên, Nội Bài) hoặc `destination`, hàm chỉ lấy giá trị cứng từ một đối tượng cố định, các giá trị giá tiền, thời gian và hướng tuyến không hề thay đổi.
- **Giải pháp xử lý**:
  - Xây dựng ma trận tính toán lộ trình động đa chiều `calculateRoute(origin, destination)`.
  - Mọi thao tác chọn điểm xuất phát (Hà Nội, Mỹ Đình, Long Biên, Nội Bài, Giáp Bát) hoặc điểm đến (TP. Bắc Ninh, Đền Đô, Phật Tích, Đông Hồ, Bút Tháp, Phù Lãng) lập tức tính toán:
    - Khoảng cách (km), thời gian di chuyển chuẩn xác.
    - Cung đường di chuyển chi tiết cho từng loại xe (ví dụ: Nội Bài thì đi theo QL18, Long Biên thì đi qua Cầu Chương Dương hoặc Tuyến buýt 54...).
    - Thêm badge nhấp nháy `✓ Đã đồng bộ kết quả` tạo phản hồi thị giác trực quan tức thì.

### Issue 4 (Ảnh 4 - Bố Cục Thẻ Quá Dày, Filter Quá Tròn, Thiếu Popover)
- **Mô tả người dùng**: "ảnh 4: vấn đề về bố cục, kích thước thẻ, gap filter với thẻ, rounded filter quá tròn, card chứa quá nhiều nội dung, trong khi có thể xem chi tiết khi nhấn nút 'xem chi tiết và lời khuyên'"
- **Nguyên nhân gốc rễ**: 
  - Khung filter bo tròn tới 24px trông cồng kềnh như viên thuốc phóng đại.
  - Khoảng cách giữa filter và hàng thẻ quá dính.
  - Thẻ phương tiện chứa các khối chữ nhật màu xanh lá to chiếm hết diện tích, văn bản mô tả quá dài làm thẻ bị méo mó chiều cao.
  - Khi bấm xem chi tiết chưa có popover bên phải màn hình.
- **Giải pháp xử lý**:
  - Giảm `borderRadius` của khung filter xuống 12px hiện đại, tăng khoảng cách đáy (margin-bottom: 24-28px).
  - Tối ưu Card Architecture:
    1. Header: Icon bên trái, Badge nhãn bên phải.
    2. H3 Tên: Font Inter đậm dứt khoát 18-20px.
    3. Price Tag: Khung viền mờ chữ đỏ WCAG ngay dưới tên.
    4. Mô tả ngắn: Giới hạn đúng 2 dòng với `text-overflow: ellipsis`.
    5. Highlights: Chuyển sang dạng Bullet checkmark ✓ xanh ngọc (`#059669`).
    6. Footer: Tag phân loại + Nút Ghost CTA "Xem chi tiết & lời khuyên →".
  - Tích hợp Popover Drawer trượt từ bên phải (desktop) và dạng Bottom-Sheet popup menu trượt từ dưới lên (mobile).

---

## 2. Vấn Đề Về Dữ Liệu Hình Ảnh (Image Data Issue)
- **Mô tả người dùng**: "trong file json data nên bổ sung url ảnh cho hero của trang, ví dụ trang: luu-tru/grand-phoenix-hotel thì sẽ cần background về grand phoenix hotel. như vậy sẽ thực tế hơn. ảnh đều lưu chung ở /public"
- **Nguyên nhân gốc rễ**: Hiện tại các trang chi tiết cơ sở lưu trú và điểm đến đang dùng chung ảnh đại diện hoặc fallback về `/images/hero_kinh_bac.jpg` / `/images/den_do_temple.jpg`, không có hình ảnh thực tế của từng khách sạn như Grand Phoenix Hotel, Mandala Hotel, Vinpearl Hotel, v.v.
- **Giải pháp xử lý**:
  - Tạo các hình ảnh chuyên biệt và chân thực chất lượng cao cho từng cơ sở và lưu trong `/public/images/`.

### Issue 5 (Popover Bị Header Che Khuất Đầu Thẻ & Nút Đóng)
- **Mô tả người dùng**: "popover bị header che nội dung, có thể fix bằng cách đẩy content trong popover xuống"
- **Nguyên nhân gốc rễ**: Thanh header của website cố định ở mép trên màn hình (`position: fixed; top: 0; height: 56px–72px`). Khối Popover bên phải màn hình bắt đầu từ `top: 0`, phần `.popover-header` chỉ có `padding: 18px` khiến tiêu đề phương tiện, icon và nút đóng `X` bị chìm ngay dưới thanh header của website, không thể nhìn thấy hoặc bấm nút `X`.
- **Giải pháp xử lý**:
  - Tăng `padding-top` của `.popover-header` lên **84px** trên Desktop (`padding: 84px 24px 18px 24px;`).
  - Toàn bộ nội dung Popover (Icon, Tên phương tiện, Phân loại, Nút đóng `X` tròn tiện lợi) được đẩy xuống bên dưới thanh header trang web một cách thông thoáng và dễ bấm.
  - Trên Mobile (`max-width: 640px`), Popover là dạng Bottom Sheet trượt từ mép dưới lên nên tự động chuyển về `padding: 16px 20px 14px 20px;`.

### Issue 6 (Ảnh 1 - Chatbot Popup Bị Lỗi CSS, Hiển Thị Text Trần Ở Đáy Trang)
- **Mô tả người dùng**: "sửa css cho popup chatbot đang bị lỗi css (ảnh 1)"
- **Nguyên nhân gốc rễ**: File `chatbot-popup.css` mới chỉ tồn tại ở thư mục gốc workspace mà chưa được đưa vào thư mục `public/` hay import vào `layout.js` của Next.js. Trình duyệt tải `/chatbot-popup.css` trả về lỗi 404, làm cho widget chatbot (lời chào mừng và nút bấm) bị hiển thị như các phần tử block/inline văn bản trần không có định vị `position: fixed`, rơi xuống góc dưới bên trái phía dưới chân trang.
- **Giải pháp xử lý**:
  - Đưa toàn bộ mã CSS chuẩn vào `src/app/chatbot-popup.css` và `public/chatbot-popup.css`.
  - Import trực tiếp `import './chatbot-popup.css'` trong `src/app/layout.js` để Next.js tự động nén và đóng gói vào CSS bundle của ứng dụng.
  - Định vị fixed góc dưới bên phải (`bottom: 32px; right: 32px`), hiệu ứng mở mượt mà, bong bóng chào mừng có speech bubble tail hướng xuống nút.

### Issue 7 (Ảnh 1 - Nội Dung Main Dính Sát Vào Nền Xanh Footer)
- **Mô tả người dùng**: "component footer cần có margin top để nội dung của main k dính vào footer."
- **Nguyên nhân gốc rễ**: Thẻ `.footer` chỉ có padding nội tại (`padding: 60px 0 0`) mà thiếu `margin-top`. Khi trang web kết thúc, nội dung cuối cùng (như Bento Grid an toàn trên trang phương tiện) tiếp xúc trực tiếp mép trên của footer màu xanh đậm `#1B3322`.
- **Giải pháp xử lý**:
  - Bổ sung `margin-top: 80px` trên màn hình máy tính và `margin-top: 48px` trên thiết bị di động trong `Footer.module.css`.

### Issue 8 (Ảnh 2 & 3 - Icon Header & Cụm Quick Widgets Ngoài Tài Liệu)
- **Mô tả người dùng**: 
  - "ảnh 2: bỏ 3 icon, thay bằng icon group để sau này làm trang about us"
  - "ảnh 3: trong file tài liệu làm web k đề cập đến các thông số này, loại bỏ"
- **Nguyên nhân gốc rễ**: Nhóm 3 icon góc phải header (Search, Heart, User) chưa đúng mục đích; khối 4 widget (thời tiết, bản đồ, đơn vị hành chính, di chuyển) không có trong yêu cầu tài liệu dự án gốc.
- **Giải pháp xử lý**:
  - Thay thế 3 icon trên header bằng icon nhóm `Users` từ `lucide-react`, gắn liên kết `/ve-chung-toi`.
  - Khởi tạo trang Về Chúng Tôi (`/ve-chung-toi`) trang nhã, đúng phong cách Kinh Bắc.
  - Loại bỏ hoàn toàn khối `quick-widgets-wrapper` khỏi trang chủ `src/app/page.js`.
