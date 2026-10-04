/**
 * @file locales/vi/common.js
 * @description Câu chữ tiếng Việt dùng chung cho nhiều component/trang:
 * thương hiệu, breadcrumb, nút hành động, nhãn trợ năng (aria).
 * Lưu dạng JS module (không phải JSON) để được bundle sẵn – đọc tức thì,
 * không tốn request và hỗ trợ hàm nội suy (template function).
 */

export const common = {
  /** Bộ nhận diện thương hiệu (logo chữ) */
  brand: {
    script: 'Dấu Chân',
    main: 'Kinh Bắc',
    regionStamp: 'BẮC NINH',
    heritageStamp: 'Di Sản',
    tagline: 'Khám phá – Trải nghiệm – Lưu dấu',
    emblemLabel: 'Logo Dấu Chân Kinh Bắc',
  },

  /** Thanh điều hướng breadcrumb */
  breadcrumb: {
    ariaLabel: 'Breadcrumb',
    home: 'Trang chủ',
  },

  /** Thẻ lật FlipCard */
  flipCard: {
    hint: 'Nhấn để xem chi tiết',
  },

  /** Ô tìm kiếm */
  search: {
    clear: 'Xóa tìm kiếm',
  },

  /** Nhãn hành động chung */
  actions: {
    close: 'Đóng',
    resetFilter: 'Đặt lại bộ lọc',
    confirm: 'Xác nhận',
  },

  /** Thành phần Dropdown */
  dropdown: {
    placeholder: 'Chọn một mục...',
    noOptions: 'Không có lựa chọn phù hợp',
  },

  /** Thành phần chọn ngày DatePicker */
  datePicker: {
    placeholder: 'Chọn ngày...',
    today: 'Hôm nay',
    clear: 'Xóa',
    weekdays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    months: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    prevMonth: 'Tháng trước',
    nextMonth: 'Tháng sau',
  },
};
