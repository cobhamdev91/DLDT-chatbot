/**
 * @file data/restaurants.js
 * @description Danh sách quán ăn gia truyền được giới thiệu ở trang Ẩm thực
 * (chuyển từ hằng số trong page cũ về tầng dữ liệu – SSOT).
 */

/**
 * @typedef {Object} Restaurant
 * @property {string} name    - Tên quán.
 * @property {string} dish    - Món đặc trưng.
 * @property {string} address - Địa chỉ.
 * @property {string} hours   - Giờ mở cửa.
 * @property {string} phone   - Số điện thoại hiển thị.
 */

/** @type {Restaurant[]} */
export const restaurants = [
  {
    name: 'Quán Phở Gan Cháy Cụ Cần',
    dish: 'Phở gan cháy Đáp Cầu gia truyền',
    address: 'Số 42 Tiền An, TP. Bắc Ninh',
    hours: '06:00 – 21:00',
    phone: '0988 123 456',
  },
  {
    name: 'Lò Bánh Phu Thê Minh Hạnh',
    dish: 'Bánh phu thê Đình Bảng nức tiếng',
    address: 'Khu phố Lý Thường Kiệt, Từ Sơn',
    hours: '07:00 – 20:00',
    phone: '0912 345 678',
  },
  {
    name: 'Cơ Sở Nem Bùi Tuấn Liên',
    dish: 'Nem bùi Ninh Xá chính gốc',
    address: 'Ngã tư Ninh Xá, TX. Thuận Thành',
    hours: '06:30 – 19:30',
    phone: '0977 888 999',
  },
  {
    name: 'Bánh Tẻ Làng Chờ Bà Ân',
    dish: 'Bánh tẻ nóng lá dong dẻo thơm',
    address: 'Thị trấn Chờ, H. Yên Phong',
    hours: '06:00 – 18:00',
    phone: '0933 555 777',
  },
];
