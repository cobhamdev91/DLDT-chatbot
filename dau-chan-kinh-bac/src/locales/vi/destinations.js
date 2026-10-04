/**
 * @file locales/vi/destinations.js
 * @description Câu chữ module "Điểm đến": hero, bộ lọc danh sách, trang chi tiết.
 * Hàm tạo chuỗi (template) nhận tham số để không ghép chữ trong component.
 */

export const destinations = {
  /** Metadata trang danh sách */
  meta: {
    title: 'Điểm đến du lịch Bắc Ninh – Dấu chân Kinh Bắc',
    description:
      'Vùng đất địa linh nhân kiệt với 18 danh lam cổ kính, đền chùa ngàn năm tuổi và những thắng cảnh thiên nhiên sông núi hữu tình.',
  },

  /** Hero đầu trang danh sách */
  hero: {
    badge: '18 Điểm Hẹn Di Sản',
    title: 'Điểm Đến Du Lịch Bắc Ninh',
    description:
      'Vùng đất địa linh nhân kiệt với 18 danh lam cổ kính, đền chùa ngàn năm tuổi và những thắng cảnh thiên nhiên sông núi hữu tình.',
    imageAlt: 'Điểm đến du lịch Bắc Ninh',
    cutoutText: 'Điểm Đến',
  },

  /** Nhãn breadcrumb của module */
  breadcrumb: 'Điểm đến',

  /** Bộ lọc & danh sách */
  list: {
    allCategories: 'Tất cả',
    searchPlaceholder: 'Tìm kiếm điểm đến...',
    categoryLabel: 'Lọc theo loại hình',
    /** @param {number} count @returns {string} */
    count: (count) => `${count} điểm đến`,
    defaultDuration: '1–2 giờ',
    noResults: 'Không tìm thấy điểm đến nào phù hợp.',
    reset: 'Đặt lại bộ lọc',
  },

  /** Trang chi tiết */
  detail: {
    notFoundTitle: 'Điểm đến không tồn tại',
    /** @param {string} name @returns {string} */
    metaTitle: (name) => `${name} – Dấu chân Kinh Bắc`,
    /** @param {string} name @returns {string} */
    metaDescription: (name) =>
      `Khám phá ${name} tại Bắc Ninh với lịch sử, điểm tham quan và kinh nghiệm du lịch.`,
    headings: {
      history: 'Lịch sử hình thành',
      nameMeaning: 'Tên gọi & Ý nghĩa',
      highlights: 'Các điểm thú vị nổi bật',
      experience: 'Trải nghiệm nên thử',
    },
    saferHeading: 'Cẩm nang SAFER CHECK – Du lịch Văn minh & An toàn',
    sidebar: {
      location: 'Địa điểm:',
      category: 'Loại hình:',
      duration: 'Thời gian tham quan:',
      suitableFor: 'Phù hợp với:',
    },
    ctas: {
      transport: 'Xem hướng dẫn di chuyển',
      cuisine: 'Món ngon gần điểm này',
    },
    relatedTitle: 'Điểm Đến Lân Cận Có Thể Bạn Thích',
    relatedCta: 'Khám phá',
  },
};
