/**
 * Centralized content/i18n file for "Dấu Chân Kinh Bắc"
 * All user-facing text is stored here for easy customization and future multilingual support.
 */

export const siteContent = {
  // ==================== SITE META ====================
  meta: {
    title: 'Dấu chân Kinh Bắc – Khám phá Du lịch Bắc Ninh',
    description: 'Cẩm nang du lịch Kinh Bắc toàn diện – Điểm đến, Ẩm thực, Văn hóa Quan họ, Làng nghề truyền thống, Lưu trú và Phương tiện.',
    keywords: 'du lịch Bắc Ninh, Kinh Bắc, Quan họ, Đền Đô, Chùa Dâu, ẩm thực Bắc Ninh, làng nghề Bắc Ninh',
  },

  // ==================== HEADER ====================
  header: {
    logoCalligraphy: 'Dấu Chân',
    logoMain: 'Kinh Bắc',
    redStamp: 'BẮC NINH',
    tagline: 'Khám phá – Trải nghiệm – Lưu dấu',
    navLinks: [
      { href: '/', label: 'Trang chủ' },
      { href: '/diem-den', label: 'Khám phá' },
      { href: '/am-thuc', label: 'Ẩm thực' },
      { href: '/van-hoa', label: 'Văn hóa' },
      { href: '/luu-tru', label: 'Lưu trú' },
      { href: '/phuong-tien', label: 'Phương tiện' },
      { href: '/lang-nghe', label: 'Làng nghề' },
    ],
    searchLabel: 'Tìm kiếm',
    favLabel: 'Yêu thích',
    accountLabel: 'Tài khoản',
  },

  // ==================== HOMEPAGE ====================
  home: {
    hero: {
      titleLine1: 'Dấu Chân',
      titleLine2: 'Kinh Bắc',
      stamp: 'BẮC NINH',
      motto: 'Khám phá – Trải nghiệm – Lưu dấu',
      description: 'Vùng đất của Quan họ, của làng nghề truyền thống và những con người mến khách. Hãy bắt đầu hành trình khám phá Kinh Bắc ngay hôm nay!',
      ctaText: 'Bắt đầu khám phá →',
      heroImageAlt: 'Dấu chân Kinh Bắc',
      singersImageAlt: 'Liền anh liền chị Quan họ Kinh Bắc',
    },
    widgets: [
      {
        label: 'THỜI TIẾT HÔM NAY',
        title: 'Bắc Ninh',
        mainStat: '29°C',
        desc: 'Có mây • 30° / 25°',
        sub: 'Cập nhật 16:20 hôm nay',
      },
      {
        label: 'BẢN ĐỒ KINH BẮC',
        desc: '8 đơn vị hành chính & bản đồ số',
        linkText: 'Khám phá địa điểm quanh bạn →',
        linkHref: '/diem-den',
      },
      {
        label: 'ĐƠN VỊ HÀNH CHÍNH',
        mainStat: '99',
        unit: 'xã, phường',
        desc: '(33 phường – 66 xã)',
        sub: 'Theo đơn vị hành chính mới năm 2025',
      },
      {
        label: 'DI CHUYỂN',
        route: 'Hà Nội ➔ Bắc Ninh',
        desc: '~ 35–45 phút cao tốc',
        linkText: 'Xem hướng dẫn di chuyển →',
        linkHref: '/phuong-tien',
      },
    ],
    lotusDivider1: {
      text: 'Mỗi vùng đất là một',
      highlight: 'câu chuyện',
    },
    categories: [
      { href: '/diem-den', label: 'Điểm đến', bgColor: '#EAF6ED', iconColor: '#27AE60' },
      { href: '/am-thuc', label: 'Ẩm thực', bgColor: '#FFF3E2', iconColor: '#E67E22' },
      { href: '/van-hoa', label: 'Văn hóa', bgColor: '#FDE8EF', iconColor: '#E91E63' },
      { href: '/lang-nghe', label: 'Làng nghề', bgColor: '#FDE8E8', iconColor: '#C83228' },
      { href: '/luu-tru', label: 'Lưu trú', bgColor: '#F4EBF7', iconColor: '#9C27B0' },
      { href: '/phuong-tien', label: 'Phương tiện', bgColor: '#EFEBE9', iconColor: '#6D4C41' },
      { href: '#lich-trinh', label: 'Lịch trình', bgColor: '#FEF9E7', iconColor: '#D4A853', isAnchor: true },
    ],
    itineraryTitle: 'Lịch trình gợi ý cho bạn',
    itineraryViewAll: 'Xem tất cả →',
    itineraries: [
      {
        title: 'Kinh Bắc trong ngày',
        subtitle: 'Khám phá văn hóa – lịch sử – ẩm thực',
        duration: '1 NGÀY',
        points: '5 điểm đến',
        food: 'Ẩm thực',
        transport: 'Xe máy / Ô tô',
        image: '/images/den_do.jpg',
        imageAlt: 'Kinh Bắc trong ngày',
      },
      {
        title: 'Hành trình văn hóa & trải nghiệm',
        subtitle: 'Quan họ – Làng nghề – Ẩm thực',
        duration: '2 NGÀY 1 ĐÊM',
        points: '7 điểm đến',
        food: 'Lưu trú',
        transport: 'Ô tô',
        image: '/images/hero_kinh_bac.jpg',
        imageAlt: 'Hành trình văn hóa & trải nghiệm',
      },
      {
        title: 'Kinh Bắc – Về miền di sản',
        subtitle: 'Di sản – Tâm linh – Thiên nhiên',
        duration: '2 NGÀY 1 ĐÊM',
        points: '6 điểm đến',
        food: 'Lưu trú',
        transport: 'Ô tô',
        image: '/images/craft_village_pottery.jpg',
        imageAlt: 'Kinh Bắc – Về miền di sản',
      },
    ],
  },

  // ==================== DETAIL PAGE HEROES ====================
  pageHeroes: {
    amThuc: {
      badge: 'Mỹ Vị Đất Bắc',
      title: 'Ẩm Thực Tinh Hoa Kinh Bắc',
      desc: 'Hương vị truyền thống tinh túy từ bàn tay khéo léo của người dân đất học: Từ bát phở gan cháy giòn thơm đến chiếc bánh phu thê dẻo quánh tình nghĩa phu thê.',
      image: '/images/ui_am_thuc_theme.jpg',
      imageAlt: 'Ẩm thực tinh hoa Kinh Bắc',
    },
    vanHoa: {
      badge: 'Di Sản UNESCO Thế Giới',
      title: 'Văn Hóa & Dân Ca Quan Họ',
      desc: 'Di sản văn hóa phi vật thể đại diện của nhân loại: Nơi những câu hát giao duyên mộc mạc hòa quyện cùng tấm lòng hiếu khách và chuẩn mực thanh tao đất cổ Kinh Bắc.',
      image: '/images/ui_van_hoa_theme.jpg',
      imageAlt: 'Văn hóa & Dân ca Quan họ Bắc Ninh',
    },
    luuTru: {
      badge: 'Nghỉ Dưỡng Thượng Lưu & Mộc Mạc',
      title: 'Lưu Trú & Nghỉ Dưỡng Bắc Ninh',
      desc: 'Từ khách sạn 5 sao sang trọng tầm nhìn bao trọn thành phố đến những homestay mộc mạc nép mình bên chân núi và câu hát Quan họ.',
      image: '/images/ui_luu_tru_theme.jpg',
      imageAlt: 'Lưu trú & Nghỉ dưỡng Bắc Ninh',
    },
    diemDen: {
      badge: '18 Điểm Hẹn Di Sản',
      title: 'Điểm Đến Du Lịch Bắc Ninh',
      desc: 'Vùng đất địa linh nhân kiệt với 18 danh lam cổ kính, đền chùa ngàn năm tuổi và những thắng cảnh thiên nhiên sông núi hữu tình.',
      image: '/images/den_do_temple.jpg',
      imageAlt: 'Điểm đến du lịch Bắc Ninh',
    },
    langNghe: {
      badge: 'Tinh Hoa Bách Nghệ',
      title: 'Làng Nghề Truyền Thống Bắc Ninh',
      desc: 'Vùng đất trăm nghề với những đôi bàn tay tài hoa lưu truyền kỹ nghệ ngàn năm: từ tranh điệp Đông Hồ, gốm men da lươn Phù Lãng đến đúc đồng Đại Bái và thủ phủ gỗ Đồng Kỵ.',
      image: '/images/craft_village_pottery.jpg',
      imageAlt: 'Làng nghề truyền thống Bắc Ninh',
    },
    phuongTien: {
      badge: 'Chỉ 35–45 Phút Từ Thủ Đô',
      title: 'Phương Tiện Đến & Đi',
      desc: 'Tra cứu lộ trình tối ưu từ Hà Nội, kết nối danh bạ taxi uy tín và lựa chọn phương tiện di chuyển thông minh cho chuyến đi Kinh Bắc.',
      image: '/images/ui_phuong_tien_theme.jpg',
      imageAlt: 'Phương tiện di chuyển Bắc Ninh',
    },
  },

  // ==================== FOOTER ====================
  footer: {
    brand: {
      desc: 'Cẩm nang du lịch điện tử về Bắc Ninh, giúp bạn khám phá vùng đất Kinh Bắc giàu truyền thống và hiếu khách.',
    },
    quickLinks: {
      title: 'LIÊN KẾT NHANH',
      links: [
        { href: '/', label: 'Trang chủ' },
        { href: '/diem-den', label: 'Khám phá' },
        { href: '/am-thuc', label: 'Ẩm thực' },
        { href: '/van-hoa', label: 'Văn hóa' },
        { href: '/luu-tru', label: 'Lưu trú' },
        { href: '/phuong-tien', label: 'Phương tiện' },
        { href: '/lang-nghe', label: 'Làng nghề' },
      ],
    },
    usefulInfo: {
      title: 'THÔNG TIN HỮU ÍCH',
      links: [
        { href: '/diem-den', label: 'Cẩm nang du lịch' },
        { href: '/van-hoa', label: 'Sự kiện – Lễ hội' },
        { href: '/phuong-tien', label: 'Hỏi đáp di chuyển' },
        { href: '/am-thuc', label: 'Tin tức ẩm thực' },
        { href: '/phuong-tien', label: 'Liên hệ đối tác' },
      ],
    },
    contact: {
      title: 'KẾT NỐI VỚI CHÚNG TÔI',
      hotline: '1900 1234',
      email: 'info@dauchankinhbac.vn',
      address: 'TP. Bắc Ninh, tỉnh Bắc Ninh',
    },
    copyright: '© 2025 Dấu Chân Kinh Bắc. All rights reserved.',
  },

  // ==================== COMMON LABELS ====================
  common: {
    exploreBtn: 'Khám phá ngay →',
    viewDetailBtn: 'Xem chi tiết →',
    bookNowBtn: 'Đặt phòng ngay →',
    searchPlaceholder: 'Tìm kiếm...',
    noResults: 'Không tìm thấy kết quả phù hợp.',
    resetFilter: 'Đặt lại bộ lọc',
    allCategories: 'Tất cả',
    scrollDown: 'Cuộn xuống khám phá',
  },
};
