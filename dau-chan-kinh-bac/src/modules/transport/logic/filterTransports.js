/**
 * @file modules/transport/logic/filterTransports.js
 * @description Logic THUẦN lọc phương tiện theo nhu cầu di chuyển và dựng
 * danh sách nút lọc kèm số đếm (tính từ dữ liệu, không hard-code).
 */

import { transportFilterGroups } from '@/data/transport';

/** Khoá "tất cả" của thanh lọc */
export const ALL_TRANSPORTS = 'all';

/**
 * Thứ tự nút lọc (khoá khớp `transport.filter.modes` trong locale).
 * @readonly
 */
export const TRANSPORT_FILTERS = Object.freeze([ALL_TRANSPORTS, ...Object.keys(transportFilterGroups)]);

/**
 * Lọc danh sách phương tiện theo nhóm nhu cầu.
 * Khoá không xác định → trả nguyên danh sách.
 * @template {{slug: string}} T
 * @param {T[]} items - Danh sách phương tiện.
 * @param {string} mode - Khoá nhóm lọc.
 * @returns {T[]}
 */
export function filterTransports(items, mode) {
  const group = transportFilterGroups[mode];
  if (mode === ALL_TRANSPORTS || !group) return items;
  return items.filter((item) => group.includes(item.slug));
}

/**
 * Dựng danh sách nút lọc: khoá + nhãn + số lượng phương tiện khớp.
 * @param {Array<{slug: string}>} items - Danh sách phương tiện.
 * @param {Record<string, string>} labels - Nhãn theo khoá (locale).
 * @returns {Array<{key: string, label: string, count: number}>}
 */
export function buildFilterOptions(items, labels) {
  return TRANSPORT_FILTERS.map((key) => ({
    key,
    label: labels[key],
    count: filterTransports(items, key).length,
  }));
}
