# TÀI LIỆU CHUYỂN GIAO & QUY CHUẨN THỰC THI (PROJECT HANDOFF)
**Dự án**: Dấu Chân Kinh Bắc (Bắc Ninh Tourism Hub)  
**Đường dẫn thư mục**: `DLDT-chatbot/dau-chan-kinh-bac`  

---

## 1. Kiến Trúc & Cấu Trúc Thư Mục (cập nhật 2026-10-04 – Clean Architecture)

> Chi tiết đầy đủ: [`contexts/2026-10-04/ARCHITECTURE.md`](./2026-10-04/ARCHITECTURE.md) · Danh sách nhiệm vụ: [`contexts/2026-10-04/TASKS.md`](./2026-10-04/TASKS.md)

```
dau-chan-kinh-bac/src/
├── app/                 # Route mỏng: chỉ metadata + generateStaticParams + render module
├── modules/<tên>/       # home, destinations, cuisine, culture, crafts, stays, transport, about, detail
│   ├── <Tên>Page.js     # Trang ghép section
│   ├── components/      # Component riêng của module
│   ├── logic/           # Hàm thuần (lọc, tính toán) – không phụ thuộc React
│   ├── effects/         # Hook hiệu ứng UI riêng module
│   ├── context/         # Context riêng module (nếu cần)
│   └── <tên>.css        # CSS riêng module
├── components/shared/   # Icon, Breadcrumb, FlipCard, ParallaxHero, SearchField, ... (mỗi cái 1 CSS)
├── components/layout/   # Header, Footer, ScrollIndicator, ScrollDrawingBg
├── contexts/            # Context toàn cục (ChatbotContext, ...)
├── effects/             # Hook UI dùng chung (timers, cssVariable, useEscapeKey, ...)
├── data/                # Dữ liệu nghiệp vụ – nguồn sự thật duy nhất (SSOT)
├── locales/vi/          # Toàn bộ chữ giao diện (JS module – import tĩnh, load nhanh)
└── styles/              # tokens, base, utilities, animations + index.css
```

### Quy tắc bắt buộc khi code tiếp
- KHÔNG `style={{}}`, KHÔNG `<style jsx>`; giá trị động truyền qua CSS variable (`useCssVariable`).
- KHÔNG chữ cứng trong JSX/thuộc tính – thêm vào `src/locales/vi/*.js`.
- Mỗi module/page/component có file CSS riêng; dùng child-combinator (`>`) khi cần khoanh vùng.
- JSDoc/comment tiếng Việt cho hàm, component, section, logic, effect, CSS.
- Icon: dùng `components/shared/Icon` (registry) – chỉ truyền `fill` khi thật sự cần.
- GIỮ `public/chatbot-popup.css` (script `DLDT-chatbot/chatbot-popup.js` còn dùng).

### Bug đã sửa trong đợt refactor
- Chi tiết điểm đến đọc sai field + đánh số bị nhảy; props hero trang Về chúng tôi sai; cutout text.
- Lightbox chết (ẩm thực, văn hoá) đã gỡ; `window.openChatbot` → `ChatbotContext`.
- `van-hoa/[slug]` → Server Component (SSG, metadata, notFound).
- Chuẩn hoá `telHref`; thêm metadata cho trang danh sách.
- Bộ đếm filter phương tiện tính động (trước hard-code); 2 listener ESC trùng → `useEscapeKey`.
- Icon bị tô đặc trong Client Component (`fill={undefined}`); sidebar chi tiết sticky lại.

### Trạng thái
- `npm run lint`: 0 lỗi / 0 cảnh báo · `npm run build`: thành công (71 trang).

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
