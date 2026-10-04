/**
 * @file locales/vi/culture.js
 * @description Câu chữ module "Văn hóa": hero, số liệu nhanh, vạch ngăn,
 * thẻ trụ cột, thẻ nghe thử làn điệu, trang chi tiết chuyên đề.
 */

export const culture = {
  /** Metadata trang danh sách */
  meta: {
    title: 'Văn hóa & Dân ca Quan họ – Dấu chân Kinh Bắc',
    description:
      'Di sản văn hóa phi vật thể đại diện của nhân loại: Nơi những câu hát giao duyên mộc mạc hòa quyện cùng tấm lòng hiếu khách và chuẩn mực thanh tao đất cổ Kinh Bắc.',
  },

  /** Hero đầu trang */
  hero: {
    badge: 'Di Sản UNESCO Thế Giới',
    title: 'Văn Hóa & Dân Ca Quan Họ',
    description:
      'Di sản văn hóa phi vật thể đại diện của nhân loại: Nơi những câu hát giao duyên mộc mạc hòa quyện cùng tấm lòng hiếu khách và chuẩn mực thanh tao đất cổ Kinh Bắc.',
    imageAlt: 'Văn hóa & Dân ca Quan họ Bắc Ninh',
    cutoutText: 'Quan Họ',
  },

  breadcrumb: 'Văn hóa Quan họ',

  /** Câu chữ 4 ô số liệu nhanh – khoá khớp data/culture.js → cultureStats[].id */
  widgets: {
    heritage: {
      label: 'DI SẢN THẾ GIỚI',
      desc: 'UNESCO vinh danh Di sản văn hóa phi vật thể',
      sub: 'Đại diện của nhân loại',
    },
    villages: {
      label: 'LÀNG QUAN HỌ GỐC',
      unit: 'làng cổ',
      desc: 'Được bảo tồn nguyên vẹn làn điệu cổ truyền',
      sub: 'Tập trung ven bờ sông Cầu',
    },
    festivals: {
      label: 'LỄ HỘI TRUYỀN THỐNG',
      unit: 'lễ hội / năm',
      desc: 'Hội Lim, Hội Đền Đô, Hội Chùa Dâu rộn ràng',
      sub: 'Mùa xuân trẩy hội miền Quan họ',
    },
    landmark: {
      label: 'CÔNG TRÌNH BIỂU TƯỢNG',
      unit: 'Nhà hát Quan họ',
      desc: 'Kiến trúc nón quai thao độc bản',
      sub: 'Biểu diễn định kỳ cuối tuần',
    },
  },

  /** Vạch ngăn */
  dividers: {
    pillars: { lead: 'Di Sản Sống Cùng', highlight: 'Thời Gian' },
    songs: { lead: 'Thưởng Thức', highlight: 'Làn Điệu Cổ' },
  },

  /** Chân thẻ trụ cột */
  pillarFooter: 'Di sản văn hóa Kinh Bắc',

  /** Nút nghe thử */
  songs: {
    play: 'Nghe giai điệu cổ',
    playing: 'Đang phát thử...',
  },

  /** Trang chi tiết chuyên đề */
  detail: {
    notFoundTitle: 'Chuyên đề văn hóa không tồn tại',
    /** @param {string} title @returns {string} */
    metaTitle: (title) => `${title} – Văn hóa Kinh Bắc | Dấu chân Kinh Bắc`,
    headings: {
      intro: 'Giới thiệu',
      points: 'Nội dung chi tiết',
      experiences: 'Trải nghiệm gợi ý',
    },
    funFact:
      'Dân ca Quan họ Bắc Ninh được UNESCO vinh danh là Di sản văn hóa phi vật thể đại diện của nhân loại vào năm 2009, khẳng định giá trị văn hóa vượt thời gian của vùng đất Kinh Bắc.',
    sidebarTitle: 'Thông Tin Văn Hóa',
    sidebar: {
      topic: 'Chủ đề:',
      heritage: 'Di sản:',
      heritageValue: 'UNESCO 2009',
      region: 'Vùng:',
      regionValue: 'Bắc Ninh – Bắc Giang',
    },
    ctas: {
      destinations: 'Khám phá điểm đến',
      cuisine: 'Đặc sản Bắc Ninh nên thử',
    },
    relatedTitle: 'Khám Phá Thêm Văn Hóa Kinh Bắc',
    relatedCta: 'Tìm hiểu →',
  },
};
