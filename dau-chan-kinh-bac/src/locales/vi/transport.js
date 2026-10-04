/**
 * @file locales/vi/transport.js
 * @description Câu chữ module "Phương tiện" (/phuong-tien): hero, bộ ước tính
 * lộ trình, danh bạ gọi nhanh, thanh lọc, thẻ phương tiện, timeline, cẩm nang
 * an toàn và popover chi tiết. Hàm template nhận số liệu từ tầng logic.
 */

export const transport = {
  /** Metadata trang */
  meta: {
    title: 'Phương tiện di chuyển Bắc Ninh – Dấu chân Kinh Bắc',
    description:
      'Tra cứu lộ trình tối ưu từ Hà Nội, kết nối danh bạ taxi uy tín và lựa chọn phương tiện di chuyển thông minh cho chuyến đi Kinh Bắc.',
  },

  /** Hero đầu trang */
  hero: {
    badge: 'Chỉ 35–45 Phút Từ Thủ Đô',
    title: 'Phương Tiện Đến & Đi',
    description:
      'Tra cứu lộ trình tối ưu từ Hà Nội, kết nối danh bạ taxi uy tín và lựa chọn phương tiện di chuyển thông minh cho chuyến đi Kinh Bắc.',
    imageAlt: 'Phương tiện di chuyển Bắc Ninh',
    cutoutText: 'Di Chuyển',
  },

  breadcrumb: 'Phương tiện di chuyển',

  /** 1. Bộ ước tính lộ trình */
  estimator: {
    title: 'Ước Tính & So Sánh Lộ Trình Nhanh',
    /** @param {string} dist @param {string} time @returns {string} */
    summary: (dist, time) => `Khoảng cách: ~${dist} • Thời gian: ${time}`,
    originLabel: 'ĐIỂM XUẤT PHÁT (HÀ NỘI)',
    destinationLabel: 'ĐIỂM ĐẾN TẠI BẮC NINH',
    fareNote: 'Ước tính trọn chuyến',
    detailCta: 'Chi tiết',
    toggleAria: 'Xem thêm thông tin lộ trình',
    drawer: {
      experience: 'Trải nghiệm thực tế:',
      advice: 'Lời khuyên di chuyển:',
    },
    /** Đơn vị / định dạng số liệu */
    units: {
      /** @param {number} km @returns {string} */
      km: (km) => `${km} km`,
      /** @param {number} minutes @returns {string} */
      minutes: (minutes) => `${minutes} phút`,
      /** @param {number} min @param {number} max @returns {string} */
      minuteRange: (min, max) => `${min}–${max} phút`,
      /** @param {number} min @param {number} max @returns {string} */
      carFare: (min, max) => `${min}k – ${max}k / chuyến`,
      /** @param {string} fare @returns {string} */
      perTicket: (fare) => `${fare} / vé`,
      /** @param {string} amount - Số tiền đã định dạng vi-VN @returns {string} */
      petrol: (amount) => `~${amount}đ xăng`,
      busFareLong: '15.000 – 30.000đ',
      busFareShort: '10.000 – 20.000đ',
    },
    /**
     * 4 hàng phương tiện – khoá khớp ROUTE_MODES trong logic/route.js.
     * `describe` sinh câu mô tả từ cung đường tương ứng.
     */
    modes: {
      car: {
        name: 'Ô Tô / Taxi Cao Tốc',
        badge: 'Nhanh nhất',
        tag: 'Phù hợp gia đình & đoàn bạn',
        /** @param {string} way @returns {string} */
        describe: (way) => `Qua ${way}. Êm ái, mát mẻ và hoàn toàn riêng tư cho gia đình & đoàn bạn.`,
        advice:
          'Nên đi theo hướng Cầu Thanh Trì hoặc Cầu Chương Dương để nhập làn cao tốc QL1A Mới. Chuẩn bị sẵn tài khoản ETC không dừng.',
      },
      bus: {
        name: 'Xe Buýt Công Cộng',
        badge: 'Tiết kiệm nhất',
        tag: 'Tần suất 15–20 phút/chuyến',
        /** @param {string} way @returns {string} */
        describe: (way) => `${way}. Phương án siêu tiết kiệm, tần suất đều đặn và an toàn tuyệt đối.`,
        advice:
          'Bến xe Long Biên là điểm đầu tuyến buýt 54. Bạn có thể thanh toán vé lượt trực tiếp hoặc quẹt thẻ buýt VinBus nếu đi các tuyến trung chuyển.',
      },
      moto: {
        name: 'Xe Máy Sông Đuống',
        badge: 'Phượt tự do',
        tag: 'Đường đê xanh mát check-in',
        /** @param {string} way @returns {string} */
        describe: (way) => `Trải nghiệm qua ${way}. Tự do ngắm cảnh đồng lúa chín và check-in ven sông.`,
        advice:
          'Đoạn đường đê sông Đuống thoáng mát, ít xe tải lớn, phong cảnh hữu tình phù hợp dừng chân chụp ảnh đồng quê Kinh Bắc.',
      },
      train: {
        name: 'Tàu Hỏa Hoài Niệm',
        badge: 'Trải nghiệm xưa',
        tag: 'Vintage ngắm cảnh không tắc đường',
        /** @param {string} way @returns {string} */
        describe: (way) => `Chuyến tàu hoài niệm vintage qua ${way}. Không lo tắc đường, ngắm cảnh bình yên.`,
        advice:
          'Tàu khởi hành từ Ga Long Biên (Hà Nội) dừng tại Ga Từ Sơn và Ga Bắc Ninh. Chuyến đi êm ái, phù hợp trải nghiệm văn hóa hoài niệm.',
      },
    },
  },

  /** 2. Danh bạ gọi nhanh */
  concierge: {
    title: 'Gọi Nhanh Taxi & Dịch Vụ Đưa Đón Địa Phương (24/7)',
    subtitle: 'Danh bạ uy tín, phục vụ 24/7, giá niêm yết rõ ràng và tài xế bản địa thông thạo đường',
    verified: 'Hotline Đã Xác Thực',
    guideCta: 'Xem Hướng Dẫn',
  },

  /** 3. Thanh lọc nhu cầu – khoá khớp TRANSPORT_FILTERS trong logic */
  filter: {
    label: 'Chọn nhu cầu di chuyển:',
    modes: {
      all: 'Tất cả',
      'ngoai-tinh': 'Chặng Ngoại Tỉnh (HN → BN)',
      'noi-do': 'Di Chuyển Nội Đô & Làng Nghề',
      'gia-dinh': 'Gia Đình & Đoàn Đông',
    },
  },

  /** 4. Thẻ phương tiện */
  card: {
    cta: 'Xem chi tiết & lời khuyên →',
    /** Nhãn đặc tính – khoá khớp transportBadgeTones trong data */
    badges: {
      saving: 'Tiết kiệm',
      popular: 'Phổ biến',
      flexible: 'Linh hoạt',
      convenient: 'Tiện lợi',
      relaxed: 'An nhàn',
      eco: 'Sinh thái',
      free: 'Tự do',
      calm: 'Thư thái',
      nostalgic: 'Hoài niệm',
    },
  },

  /** 5. Timeline lộ trình mẫu */
  timeline: {
    tag: 'Lịch Trình Tối Ưu',
    title: 'Lộ Trình Du Lịch Mẫu',
    description: 'Cuộn hoặc nhấp để đánh dấu từng chặng hành trình',
    /** @param {number} done @param {number} total @returns {string} */
    progress: (done, total) => `Tiến độ hành trình: ${done}/${total} chặng hoàn thành`,
    completed: 'Đã hoàn thành',
    hintUndo: 'Bấm để hoàn tác (undo)',
    hintDone: 'Bấm để đánh dấu hoàn thành',
  },

  /** 6. Cẩm nang an toàn */
  safety: {
    tag: 'Bảo Vệ Hành Trình',
    title: 'Cẩm Nang Di Chuyển An Toàn',
    description: 'Các nguyên tắc vàng giúp hành trình du lịch Kinh Bắc luôn trọn vẹn và an tâm',
    heroEyebrow: 'Ưu tiên số 1 • Khuyến cáo chính thức',
  },

  /** 7. Popover chi tiết */
  popover: {
    suitableFor: 'Phù hợp cho',
    details: 'Chi tiết lộ trình',
    pros: 'Ưu điểm nổi bật',
    cons: 'Lưu ý & Nhược điểm',
    tips: 'Lời khuyên từ thổ địa',
  },
};
