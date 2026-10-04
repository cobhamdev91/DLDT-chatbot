/**
 * @file locales/vi/crafts.js
 * @description Câu chữ module "Làng nghề": hero, tìm kiếm, trang chi tiết.
 */

export const crafts = {
  /** Metadata trang danh sách */
  meta: {
    title: 'Làng nghề truyền thống Bắc Ninh – Dấu chân Kinh Bắc',
    description:
      'Vùng đất trăm nghề với những đôi bàn tay tài hoa lưu truyền kỹ nghệ ngàn năm: từ tranh điệp Đông Hồ, gốm men da lươn Phù Lãng đến đúc đồng Đại Bái và thủ phủ gỗ Đồng Kỵ.',
  },

  /** Hero đầu trang */
  hero: {
    badge: 'Tinh Hoa Bách Nghệ',
    title: 'Làng Nghề Truyền Thống Bắc Ninh',
    description:
      'Vùng đất trăm nghề với những đôi bàn tay tài hoa lưu truyền kỹ nghệ ngàn năm: từ tranh điệp Đông Hồ, gốm men da lươn Phù Lãng đến đúc đồng Đại Bái và thủ phủ gỗ Đồng Kỵ.',
    imageAlt: 'Làng nghề truyền thống Bắc Ninh',
    cutoutText: 'Làng Nghề',
  },

  breadcrumb: 'Làng nghề',

  /** Tìm kiếm & danh sách */
  list: {
    searchPlaceholder: 'Tìm làng nghề (Đông Hồ, Phù Lãng, Đại Bái, Đồng Kỵ, Xuân Lai...)',
    /** @param {string} query @returns {string} */
    noResults: (query) => `Không tìm thấy làng nghề nào phù hợp với "${query}".`,
    reset: 'Xem tất cả làng nghề',
  },

  /** Trang chi tiết */
  detail: {
    notFoundTitle: 'Làng nghề không tồn tại',
    /** @param {string} name @returns {string} */
    metaTitle: (name) => `${name} – Làng Nghề Bắc Ninh | Dấu chân Kinh Bắc`,
    /** @param {string} name @returns {string} */
    metaDescription: (name) =>
      `Khám phá ${name}, lịch sử truyền thống, trải nghiệm tự tay làm nghề và gợi ý quà lưu niệm đặc sắc.`,
    headings: {
      history: 'Lịch sử hình thành & Giá trị văn hóa',
      highlights: 'Điểm đặc trưng nổi bật',
      experiences: 'Trải nghiệm thực tế nên thử',
      gifts: 'Gợi ý quà lưu niệm mang về',
    },
    tipsHeading: 'Lưu ý khi ghé thăm',
    sidebarTitle: 'Thông Tin Làng Nghề',
    sidebar: {
      name: 'Tên làng:',
      category: 'Ngành nghề:',
      location: 'Vị trí:',
      duration: 'Thời gian tham quan:',
    },
    ctas: {
      transport: 'Xem chỉ đường & phương tiện',
      cuisine: 'Đặc sản Bắc Ninh nên thử',
    },
    relatedTitle: 'Các Làng Nghề Truyền Thống Khác',
    relatedCta: 'Tìm hiểu →',
  },
};
