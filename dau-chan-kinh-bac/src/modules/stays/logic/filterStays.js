/**
 * @file modules/stays/logic/filterStays.js
 * @description Hàm thuần cho trang Lưu trú: lọc theo khu vực + hạng phòng,
 * tính "giá từ" (giữ nguyên quy tắc bản cũ).
 */

import { includesText } from '@/logic/text';

/**
 * Khu vực lọc: khoá → từ khoá tìm trong địa chỉ (null = toàn tỉnh).
 * Thứ tự khoá = thứ tự hiển thị trong dropdown.
 * @readonly
 */
export const STAY_AREAS = Object.freeze({
  all: null,
  bacNinh: 'Bắc Ninh',
  tuSon: 'Từ Sơn',
  tienDu: 'Tiên Du',
  yenPhong: 'Yên Phong',
});

/** Từ khoá nhận diện loại hình homestay */
const HOMESTAY_KEYWORD = 'homestay';

/**
 * Hạng phòng: khoá → điều kiện trên bản ghi.
 * @type {Readonly<Record<string, (stay: Object) => boolean>>}
 */
export const STAY_RATINGS = Object.freeze({
  all: () => true,
  five: (stay) => stay.stars === 5,
  four: (stay) => stay.stars === 4,
  three: (stay) => stay.stars === 3 || stay.stars === 2,
  homestay: (stay) => includesText(stay.type, HOMESTAY_KEYWORD) || stay.stars === 0,
});

/**
 * Ngày mặc định của thanh đặt phòng (ô nhập không kiểm soát – chỉ minh hoạ).
 * @readonly
 */
export const BOOKING_DEFAULTS = Object.freeze({ checkIn: '2025-05-04', checkOut: '2025-05-05' });

/**
 * Lọc cơ sở lưu trú theo khu vực và hạng phòng.
 * @param {Object[]} items - Danh sách cơ sở lưu trú.
 * @param {{ area: keyof typeof STAY_AREAS, rating: keyof typeof STAY_RATINGS }} filters - Bộ lọc.
 * @returns {Object[]}
 */
export function filterStays(items, { area, rating }) {
  const keyword = STAY_AREAS[area];
  const matchesRating = STAY_RATINGS[rating] ?? STAY_RATINGS.all;

  return items.filter(
    (stay) => (!keyword || includesText(stay.location, keyword.toLowerCase())) && matchesRating(stay)
  );
}

/**
 * Lấy mức giá thấp nhất từ chuỗi khoảng giá, bỏ đơn vị "VNĐ".
 * @example priceFrom('800.000 – 1.500.000 VNĐ') // → "800.000"
 * @param {string} priceRange - Khoảng giá dạng "A – B VNĐ".
 * @returns {string}
 */
export function priceFrom(priceRange) {
  return priceRange.split('–')[0].replace('VNĐ', '').trim();
}
