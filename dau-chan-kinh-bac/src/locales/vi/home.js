/**
 * @file locales/vi/home.js
 * @description Câu chữ trang chủ: hero, chữ gõ luân phiên, vạch ngăn, nhãn
 * dải danh mục, khối lịch trình gợi ý.
 */

export const home = {
  /** Hero chính */
  hero: {
    titleLine1: 'Dấu Chân',
    /** Các cụm chữ gõ luân phiên ở dòng 2 tiêu đề */
    typewriter: ['Kinh Bắc', 'Bắc Ninh', 'Quan Họ'],
    motto: 'Khám phá – Trải nghiệm – Lưu dấu',
    description:
      'Vùng đất của Quan họ, của làng nghề truyền thống và những con người mến khách. Hãy bắt đầu hành trình khám phá Kinh Bắc ngay hôm nay!',
    cta: 'Bắt đầu khám phá →',
    heroImageAlt: 'Dấu chân Kinh Bắc',
    singersImageAlt: 'Liền anh liền chị Quan họ Kinh Bắc',
  },

  /** Vạch ngăn trên dải danh mục */
  divider: { lead: 'Mỗi vùng đất là một', highlight: 'câu chuyện' },

  /** Nhãn dải danh mục – khoá khớp data/home.js → homeCategories[].id */
  categories: {
    destinations: 'Điểm đến',
    cuisine: 'Ẩm thực',
    culture: 'Văn hóa',
    crafts: 'Làng nghề',
    stays: 'Lưu trú',
    transport: 'Phương tiện',
    itinerary: 'Lịch trình',
  },

  /** Khối lịch trình gợi ý */
  itinerary: {
    title: 'Lịch trình gợi ý cho bạn',
    viewAll: 'Xem tất cả →',
    detail: 'Chi tiết →',
  },
};
