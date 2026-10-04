/**
 * @file locales/vi/layout.js
 * @description Câu chữ của khung trang: metadata SEO mặc định, menu điều hướng,
 * header, footer và chatbot.
 */

export const layout = {
  /** Metadata mặc định (app/layout.js) */
  meta: {
    title: 'Dấu chân Kinh Bắc – Khám phá Du lịch Bắc Ninh',
    description:
      'Cẩm nang du lịch Kinh Bắc toàn diện – Điểm đến, Ẩm thực, Văn hóa Quan họ, Làng nghề truyền thống, Lưu trú và Phương tiện. Khám phá – Trải nghiệm – Lưu dấu.',
    keywords: 'du lịch Bắc Ninh, Kinh Bắc, Quan họ, Đền Đô, Chùa Dâu, ẩm thực Bắc Ninh, làng nghề Bắc Ninh',
  },

  /** Nhãn mục menu – khóa trùng với khóa trong ROUTES */
  nav: {
    home: 'Trang chủ',
    destinations: 'Khám phá',
    cuisine: 'Ẩm thực',
    culture: 'Văn hóa',
    stays: 'Lưu trú',
    transport: 'Phương tiện',
    crafts: 'Làng nghề',
    about: 'Về chúng tôi',
  },

  /** Header */
  header: {
    homeAriaLabel: 'Trang chủ Dấu Chân Kinh Bắc',
    menuAriaLabel: 'Menu',
  },

  /** Footer */
  footer: {
    desc: 'Cẩm nang du lịch điện tử về Bắc Ninh, giúp bạn khám phá vùng đất Kinh Bắc giàu truyền thống và hiếu khách.',
    quickLinksTitle: 'LIÊN KẾT NHANH',
    usefulInfoTitle: 'THÔNG TIN HỮU ÍCH',
    contactTitle: 'KẾT NỐI VỚI CHÚNG TÔI',
    /** Nhãn liên kết hữu ích – khóa trùng với data/navigation.js */
    usefulLinks: {
      guide: 'Cẩm nang du lịch',
      festivals: 'Sự kiện – Lễ hội',
      transportFaq: 'Hỏi đáp di chuyển',
      foodNews: 'Tin tức ẩm thực',
      partners: 'Liên hệ đối tác',
    },
    contact: {
      hotline: 'Hotline:',
      email: 'Email:',
      address: 'Địa chỉ:',
      addressValue: 'TP. Bắc Ninh, tỉnh Bắc Ninh',
    },
    copyright: '© 2025 Dấu Chân Kinh Bắc. All rights reserved.',
  },

  /** Chatbot nổi góc phải */
  chatbot: {
    botName: 'Kinh Bắc Assistant',
    greeting: {
      lead: 'Xin chào! 👋 Tôi là ',
      highlight: 'trợ lý AI Kinh Bắc',
      tail: '. Hãy hỏi tôi về điểm đến, ẩm thực hay lịch trình du lịch nhé!',
    },
    status: 'Đang hoạt động',
    refresh: 'Làm mới',
    close: 'Đóng',
    loading: 'Đang kết nối...',
    iframeTitle: 'Chatbot Kinh Bắc',
    fabOpen: 'Mở chatbot',
    fabClose: 'Đóng chatbot',
    unreadBadge: '1',
  },
};
