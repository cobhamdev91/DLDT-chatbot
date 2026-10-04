/**
 * @file routes.js
 * @description Nguồn sự thật duy nhất (SSOT) cho mọi đường dẫn nội bộ của site.
 * Component / module KHÔNG viết cứng chuỗi '/diem-den', '/am-thuc'... mà luôn
 * tham chiếu qua hằng số ROUTES để đổi URL chỉ cần sửa một nơi.
 */

/**
 * Bảng đường dẫn các trang chính.
 * @readonly
 * @enum {string}
 */
export const ROUTES = Object.freeze({
  /** Trang chủ */
  home: '/',
  /** Danh sách điểm đến */
  destinations: '/diem-den',
  /** Danh sách món ăn đặc sản */
  cuisine: '/am-thuc',
  /** Văn hóa Quan họ */
  culture: '/van-hoa',
  /** Cơ sở lưu trú */
  stays: '/luu-tru',
  /** Phương tiện di chuyển */
  transport: '/phuong-tien',
  /** Làng nghề truyền thống */
  crafts: '/lang-nghe',
  /** Giới thiệu dự án */
  about: '/ve-chung-toi',
});

/**
 * Anchor (neo cuộn) dùng trong trang.
 * @readonly
 * @enum {string}
 */
export const ANCHORS = Object.freeze({
  /** Khối "Lịch trình gợi ý" ở trang chủ */
  itinerary: 'lich-trinh',
  /** Khối danh bạ gọi nhanh ở trang Phương tiện */
  hotline: 'hotline-concierge',
});

/**
 * Ghép đường dẫn trang chi tiết từ đường dẫn danh sách + slug.
 * @param {string} base - Đường dẫn trang danh sách (vd: ROUTES.destinations).
 * @param {string} slug - Định danh thân thiện URL của bản ghi.
 * @returns {string} Đường dẫn chi tiết, vd: "/diem-den/den-do".
 */
export function detailPath(base, slug) {
  return `${base}/${slug}`;
}

/**
 * Tạo href neo cuộn trong trang.
 * @param {string} anchorId - Giá trị trong ANCHORS.
 * @returns {string} Chuỗi dạng "#id".
 */
export function anchorHref(anchorId) {
  return `#${anchorId}`;
}
