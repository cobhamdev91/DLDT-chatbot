/**
 * @file modules/crafts/logic/filterVillages.js
 * @description Hàm thuần lọc làng nghề theo từ khoá, khu vực và ngành nghề truyền thống.
 */

import { includesText, normalizeQuery } from '@/logic/text';

/**
 * Ánh xạ khoá khu vực → hàm kiểm tra bản ghi theo địa danh
 * @type {Readonly<Record<string, (village: Object) => boolean>>}
 */
export const CRAFT_AREAS = Object.freeze({
  all: () => true,
  'tu-son': (v) => includesText(v.location, 'Từ Sơn'),
  'thuan-thanh': (v) => includesText(v.location, 'Thuận Thành'),
  'que-vo': (v) => includesText(v.location, 'Quế Võ'),
  'gia-binh': (v) => includesText(v.location, 'Gia Bình'),
});

/**
 * Ánh xạ khoá ngành nghề → hàm kiểm tra bản ghi
 * @type {Readonly<Record<string, (village: Object) => boolean>>}
 */
export const CRAFT_CATEGORIES = Object.freeze({
  all: () => true,
  tranh: (v) => includesText(v.category, 'tranh'),
  gom: (v) => includesText(v.category, 'gốm'),
  dong: (v) => includesText(v.category, 'đồng'),
  go: (v) => includesText(v.category, 'gỗ') || includesText(v.category, 'mộc'),
  'may-tre': (v) => includesText(v.category, 'mây') || includesText(v.category, 'tre'),
  'kim-khi': (v) => includesText(v.category, 'sắt') || includesText(v.category, 'cơ khí'),
});

/**
 * Lọc làng nghề theo từ khoá, địa bàn và ngành nghề.
 * @param {Object[]} villages - Danh sách làng nghề.
 * @param {string | { query?: string, area?: string, category?: string }} criteria - Bộ lọc.
 * @returns {Object[]}
 */
export function filterVillages(villages, criteria = {}) {
  // Hỗ trợ truyền thẳng chuỗi query hoặc đối tượng { query, area, category }
  const { query = '', area = 'all', category = 'all' } =
    typeof criteria === 'string' ? { query: criteria } : criteria;

  const q = normalizeQuery(query);
  const matchArea = CRAFT_AREAS[area] || CRAFT_AREAS.all;
  const matchCategory = CRAFT_CATEGORIES[category] || CRAFT_CATEGORIES.all;

  return villages.filter((v) => {
    if (!matchArea(v)) return false;
    if (!matchCategory(v)) return false;
    if (!q) return true;

    return (
      includesText(v.name, q) ||
      includesText(v.category, q) ||
      includesText(v.location, q) ||
      includesText(v.history, q) ||
      Boolean(v.highlights?.some((h) => includesText(h, q)))
    );
  });
}

