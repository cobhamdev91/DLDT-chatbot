/**
 * @file data/about.js
 * @description Cấu hình hiển thị 4 giá trị cốt lõi trang "Về chúng tôi"
 * (icon + tông màu). Câu chữ nằm ở locales/vi/about.js (khoá theo `id`).
 */

/**
 * @typedef {Object} AboutValue
 * @property {string} id   - Khoá ghép câu chữ (about.values[id]).
 * @property {string} icon - Tên icon (components/shared/Icon).
 * @property {'red'|'forest'|'gold'} tone - Tông màu icon.
 */

/** @type {AboutValue[]} */
export const aboutValues = [
  { id: 'heritage', icon: 'Sparkles', tone: 'red' },
  { id: 'experience', icon: 'Compass', tone: 'forest' },
  { id: 'trust', icon: 'ShieldCheck', tone: 'gold' },
  { id: 'companion', icon: 'Users', tone: 'red' },
];
