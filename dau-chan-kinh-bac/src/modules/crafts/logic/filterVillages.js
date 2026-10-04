/**
 * @file modules/crafts/logic/filterVillages.js
 * @description Hàm thuần lọc làng nghề theo từ khoá.
 */

import { includesText, normalizeQuery } from '@/logic/text';

/**
 * Lọc làng nghề: từ khoá xuất hiện trong tên / ngành nghề / vị trí / điểm nổi bật.
 * @param {Object[]} villages - Danh sách làng nghề.
 * @param {string} query - Từ khoá người dùng nhập.
 * @returns {Object[]}
 */
export function filterVillages(villages, query) {
  const q = normalizeQuery(query);
  if (!q) return villages;

  return villages.filter(
    (v) =>
      includesText(v.name, q) ||
      includesText(v.category, q) ||
      includesText(v.location, q) ||
      Boolean(v.highlights?.some((h) => includesText(h, q)))
  );
}
