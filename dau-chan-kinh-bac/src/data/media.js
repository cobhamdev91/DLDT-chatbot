/**
 * @file media.js
 * @description SSOT cho đường dẫn ảnh dùng ở cấp trang (hero, ảnh dự phòng).
 * Ảnh riêng của từng bản ghi (món ăn, điểm đến...) vẫn nằm trong file data tương ứng.
 */

/**
 * Ảnh nền hero của từng trang danh sách.
 * @readonly
 */
export const HERO_IMAGES = Object.freeze({
  home: '/images/hero_kinh_bac.jpg',
  homeSingers: '/images/quan_ho_culture.jpg',
  destinations: '/images/hero_diem_den.jpg',
  cuisine: '/images/hero_am_thuc.jpg',
  culture: '/images/hero_van_hoa.jpg',
  crafts: '/images/hero_lang_nghe.jpg',
  stays: '/images/hero_luu_tru.jpg',
  transport: '/images/hero_phuong_tien.jpg',
  about: '/images/hero_kinh_bac.jpg',
});

/**
 * Ảnh dự phòng khi bản ghi thiếu ảnh riêng.
 * @readonly
 */
export const FALLBACK_IMAGES = Object.freeze({
  generic: '/images/hero_kinh_bac.jpg',
  cuisine: '/images/bac_ninh_cuisine.jpg',
  crafts: '/images/craft_village_pottery.jpg',
  culture: '/images/quan_ho_culture.jpg',
});
