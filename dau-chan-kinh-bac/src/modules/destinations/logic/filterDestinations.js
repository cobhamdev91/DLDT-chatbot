/**
 * @file modules/destinations/logic/filterDestinations.js
 * @description Hàm thuần lọc danh sách điểm đến theo loại hình + từ khoá.
 */

import { includesText, normalizeQuery } from '@/logic/text';

/**
 * Giá trị "Tất cả" của bộ lọc loại hình (khoá kỹ thuật, không phải nhãn).
 * @type {string}
 */
export const ALL_CATEGORIES = 'all';

/**
 * Lọc điểm đến: khớp loại hình (hoặc "tất cả") VÀ từ khoá xuất hiện trong
 * tên / phụ đề / một điểm nổi bật.
 * @param {Object[]} items - Danh sách điểm đến.
 * @param {{ category: string, query: string }} filters - Bộ lọc hiện tại.
 * @returns {Object[]}
 */
export function filterDestinations(items, { category, query }) {
  const q = normalizeQuery(query);

  return items.filter((dest) => {
    const matchesCategory = category === ALL_CATEGORIES || dest.category === category;
    const matchesQuery =
      !q ||
      includesText(dest.name, q) ||
      includesText(dest.subtitle, q) ||
      Boolean(dest.highlights?.some((h) => includesText(h, q)));
    return matchesCategory && matchesQuery;
  });
}
