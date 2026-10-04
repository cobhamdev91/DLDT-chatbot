/**
 * @file logic/classNames.js
 * @description Tiện ích ghép tên class CSS có điều kiện (thuần, không phụ thuộc React).
 * Thay cho việc nối chuỗi template `${a} ${cond ? b : ''}` rải rác trong JSX.
 */

/**
 * Ghép các tên class hợp lệ thành một chuỗi, bỏ qua giá trị falsy.
 * @example cx('btn', isActive && 'btn--active', null) // → "btn btn--active"
 * @param {...(string|false|null|undefined|0)} parts - Danh sách tên class hoặc giá trị rỗng.
 * @returns {string} Chuỗi class đã ghép, phân tách bằng dấu cách.
 */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

/**
 * Tạo class modifier theo chuẩn BEM nếu có giá trị.
 * @example modifier('cat-icon-squircle', 'green') // → "cat-icon-squircle--green"
 * @param {string} block - Tên khối/phần tử gốc.
 * @param {string|undefined|null} value - Tên modifier (bỏ trống → trả về chuỗi rỗng).
 * @returns {string} Tên class modifier hoặc chuỗi rỗng.
 */
export function modifier(block, value) {
  return value ? `${block}--${value}` : '';
}
