/**
 * @file logic/text.js
 * @description Hàm xử lý chuỗi thuần (không phụ thuộc React/DOM).
 */

import { detail } from '@/locales/vi/detail';

/**
 * Bỏ số thứ tự đầu chuỗi, vd "1. Dân ca Quan họ" → "Dân ca Quan họ".
 * @param {string} text - Chuỗi gốc.
 * @returns {string}
 */
export function stripLeadingNumber(text) {
  return text.replace(/^\d+\.\s*/, '');
}

/**
 * Cắt chuỗi tới `length` ký tự và thêm dấu "..." (luôn thêm, giữ hành vi cũ).
 * @param {string} text - Chuỗi gốc.
 * @param {number} length - Số ký tự giữ lại.
 * @returns {string}
 */
export function truncate(text, length) {
  return `${text.substring(0, length)}${detail.ellipsis}`;
}

/**
 * Rút gọn địa chỉ: lấy phần sau dấu phẩy đầu tiên (thường là phường/xã),
 * không có thì giữ nguyên.
 * @example shortLocation('Số 25 Lý Thái Tổ, phường Võ Cường') // → "phường Võ Cường"
 * @param {string} location - Địa chỉ đầy đủ.
 * @returns {string}
 */
export function shortLocation(location) {
  const part = location.split(',')[1];
  return part ? part.trim() : location;
}

/**
 * Tách đoạn văn theo dòng trống ("\n\n").
 * @param {string} text - Văn bản nhiều đoạn.
 * @returns {string[]}
 */
export function splitParagraphs(text) {
  return text.split('\n\n');
}

/**
 * Tạo href "tel:" từ số điện thoại hiển thị (bỏ dấu cách/chấm).
 * @param {string} phone - Số điện thoại dạng hiển thị.
 * @returns {string}
 */
export function telHref(phone) {
  return `tel:${phone.replace(/[\s.]+/g, '')}`;
}

/**
 * So khớp không phân biệt hoa thường: chuỗi `text` có chứa `query` không.
 * @param {string|undefined} text - Chuỗi cần tìm trong.
 * @param {string} query - Từ khoá (đã chuẩn hoá chữ thường).
 * @returns {boolean}
 */
export function includesText(text, query) {
  return Boolean(text) && text.toLowerCase().includes(query);
}

/**
 * Chuẩn hoá từ khoá tìm kiếm (cắt khoảng trắng, chữ thường).
 * @param {string} query - Từ khoá người dùng nhập.
 * @returns {string}
 */
export function normalizeQuery(query) {
  return query.trim().toLowerCase();
}
