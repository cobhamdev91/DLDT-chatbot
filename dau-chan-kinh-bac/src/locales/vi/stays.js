/**
 * @file locales/vi/stays.js
 * @description Câu chữ module "Lưu trú": hero, thanh đặt phòng, danh sách,
 * banner tổng đài, trang chi tiết.
 */

export const stays = {
  /** Metadata trang danh sách */
  meta: {
    title: 'Lưu trú & Nghỉ dưỡng Bắc Ninh – Dấu chân Kinh Bắc',
    description:
      'Từ khách sạn 5 sao sang trọng tầm nhìn bao trọn thành phố đến những homestay mộc mạc nép mình bên chân núi và câu hát Quan họ.',
  },

  /** Hero đầu trang */
  hero: {
    badge: 'Nghỉ Dưỡng Thượng Lưu & Mộc Mạc',
    title: 'Lưu Trú & Nghỉ Dưỡng Bắc Ninh',
    description:
      'Từ khách sạn 5 sao sang trọng tầm nhìn bao trọn thành phố đến những homestay mộc mạc nép mình bên chân núi và câu hát Quan họ.',
    imageAlt: 'Lưu trú & Nghỉ dưỡng Bắc Ninh',
    cutoutText: 'Lưu Trú',
  },

  breadcrumb: 'Lưu trú',

  /** Thanh đặt phòng nhanh */
  booking: {
    checkIn: 'Ngày nhận phòng',
    checkOut: 'Ngày trả phòng',
    area: 'Khu vực',
    rating: 'Hạng phòng',
    /** Nhãn khu vực – khoá khớp STAY_AREAS trong logic */
    areas: {
      all: 'Toàn tỉnh Bắc Ninh',
      bacNinh: 'TP. Bắc Ninh',
      tuSon: 'TP. Từ Sơn',
      tienDu: 'Huyện Tiên Du',
      yenPhong: 'Huyện Yên Phong',
    },
    /** Nhãn hạng phòng – khoá khớp STAY_RATINGS trong logic */
    ratings: {
      all: 'Tất cả hạng sao',
      five: '5 Sao đẳng cấp',
      four: '4 Sao cao cấp',
      three: '2–3 Sao tiện ích',
      homestay: 'Homestay trải nghiệm',
    },
  },

  /** Danh sách */
  list: {
    divider: { lead: 'Không Gian Nghỉ Dưỡng', highlight: 'Chọn Lọc' },
    countPrefix: 'Hiển thị',
    countSuffix: 'cơ sở lưu trú phù hợp',
    priceFrom: 'Giá từ',
    /** @param {string} amount @returns {string} */
    currency: (amount) => `${amount}đ`,
    /** @param {number} stars @param {string} type @returns {string} */
    cardBadge: (stars, type) => `${stars} ⭐ ${type}`,
  },

  /** Banner tổng đài */
  hotline: {
    eyebrow: 'HỖ TRỢ 24/7',
    title: 'Tổng Đài Hỗ Trợ Đặt Phòng & Báo Giá Trực Tiếp',
  },

  /** Trang chi tiết */
  detail: {
    notFoundTitle: 'Nơi lưu trú không tồn tại',
    /** @param {string} name @returns {string} */
    metaTitle: (name) => `${name} – Khách Sạn & Nghỉ Dưỡng Bắc Ninh | Dấu chân Kinh Bắc`,
    /** @param {string} name @returns {string} */
    metaDescription: (name) =>
      `Thông tin chi tiết về ${name}, tiện ích phòng, trải nghiệm và giá tham khảo tại Bắc Ninh.`,
    /** @param {number} stars @param {string} type @returns {string} */
    heroBadge: (stars, type) => `${stars} Sao • ${type}`,
    headings: {
      story: 'Không gian & Cảm hứng lưu trú',
      amenities: 'Tiện ích & Dịch vụ nổi bật',
      experience: 'Trải nghiệm gợi ý cho kỳ nghỉ',
      suitableFor: 'Phù hợp nhất với',
    },
    itineraryHeading: 'Lộ trình khám phá kết nối thuận tiện',
    sidebarTitle: 'Thông Tin Đặt Phòng',
    sidebar: {
      address: 'Địa chỉ:',
      price: 'Giá tham khảo:',
      phone: 'Hotline:',
      scale: 'Quy mô:',
    },
    ctas: {
      call: 'Gọi điện đặt phòng ngay',
      transport: 'Xem chỉ đường di chuyển',
    },
    note: '* Lưu ý: Giá phòng có thể thay đổi vào dịp cuối tuần hoặc lễ Tết. Vui lòng liên hệ trực tiếp lễ tân khách sạn để nhận ưu đãi.',
    relatedTitle: 'Điểm Lưu Trú Khác Tại Bắc Ninh',
    relatedCta: 'Chi tiết →',
  },
};
