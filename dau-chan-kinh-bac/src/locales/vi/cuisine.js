/**
 * @file locales/vi/cuisine.js
 * @description Câu chữ module "Ẩm thực": hero, thanh lọc, vạch ngăn, bảng
 * quán gia truyền, trang chi tiết món ăn.
 */

export const cuisine = {
  /** Metadata trang danh sách */
  meta: {
    title: 'Ẩm thực tinh hoa Kinh Bắc – Dấu chân Kinh Bắc',
    description:
      'Hương vị truyền thống tinh túy từ bàn tay khéo léo của người dân đất học: Từ bát phở gan cháy giòn thơm đến chiếc bánh phu thê dẻo quánh tình nghĩa phu thê.',
  },

  /** Hero đầu trang */
  hero: {
    badge: 'Mỹ Vị Đất Bắc',
    title: 'Ẩm Thực Tinh Hoa Kinh Bắc',
    description:
      'Hương vị truyền thống tinh túy từ bàn tay khéo léo của người dân đất học: Từ bát phở gan cháy giòn thơm đến chiếc bánh phu thê dẻo quánh tình nghĩa phu thê.',
    imageAlt: 'Ẩm thực tinh hoa Kinh Bắc',
    cutoutText: 'Ẩm Thực',
  },

  breadcrumb: 'Ẩm thực',

  /** Danh sách món */
  list: {
    searchPlaceholder: 'Tìm món ngon, đặc sản Bắc Ninh...',
    categoryLabel: 'Loại đặc sản',
    regionLabel: 'Khu vực xuất xứ',
    allRegions: 'Tất cả khu vực',
    /** Nhãn các nút lọc – khoá khớp với CUISINE_FILTERS trong logic */
    filters: {
      all: 'Tất cả danh mục',
      dishes: 'Món ăn đặc sản',
      cakes: 'Bánh truyền thống',
      gifts: 'Đặc sản làm quà',
    },
    filterGroupLabel: 'Lọc món ăn',
    /** @param {number} count @returns {string} */
    count: (count) => `${count} món ngon`,
    noResults: 'Không tìm thấy món ăn phù hợp với bộ lọc',
    clearFilters: 'Xóa bộ lọc',
    menuDivider: { lead: 'Thực Đơn', highlight: 'Đặc Sắc' },
    restaurantDivider: { lead: 'Quán Ăn Gia Truyền', highlight: 'Chuẩn Vị' },
    /** @param {number} count @returns {string} */
    moreLocations: (count) => ` (+${count} nơi)`,
  },

  /** Bảng quán gia truyền */
  restaurants: {
    title: 'Quán Ăn Gia Truyền Được Giới Thiệu',
    columns: {
      name: 'Tên quán',
      dish: 'Món đặc trưng',
      address: 'Địa chỉ',
      hours: 'Giờ mở',
      phone: 'Liên hệ',
    },
  },

  /** Trang chi tiết */
  detail: {
    notFoundTitle: 'Món ăn không tồn tại',
    /** @param {string} name @returns {string} */
    metaTitle: (name) => `${name} – Đặc sản Bắc Ninh | Dấu chân Kinh Bắc`,
    /** @param {string} name @returns {string} */
    metaDescription: (name) =>
      `Tìm hiểu ${name}, đặc sản trứ danh vùng Kinh Bắc với hương vị và địa chỉ quán ngon.`,
    badge: 'Đặc Sản Mỹ Vị Kinh Bắc',
    leadPrefix: 'Nguồn gốc:',
    headings: {
      origin: 'Nguồn gốc & Câu chuyện',
      features: 'Nguyên liệu & Bí quyết chế biến',
      taste: 'Hương vị khi thưởng thức',
      locations: 'Địa chỉ quán ngon & Nơi mua uy tín',
    },
    tasteHeading: 'Cảm nhận vị giác:',
    /** Alt ảnh nền cuộn theo từng phân cảnh */
    sceneAlt: {
      /** @param {string} name @returns {string} */
      origin: (name) => `Nguồn gốc ${name}`,
      /** @param {string} name @returns {string} */
      features: (name) => `Chế biến ${name}`,
      /** @param {string} name @returns {string} */
      taste: (name) => `Hương vị ${name}`,
    },
    sidebar: {
      name: 'Món ăn:',
      origin: 'Xuất xứ:',
      price: 'Giá tham khảo:',
    },
    ctas: {
      cuisine: 'Khám phá thêm món ngon khác',
      destinations: 'Điểm du lịch gần đây',
    },
    relatedTitle: 'Đặc Sản Khác Đáng Thử',
    relatedBadge: 'Đặc sản',
    relatedCta: 'Xem chi tiết',
  },
};
