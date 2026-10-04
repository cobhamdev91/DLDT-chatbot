/**
 * @file logic/collection.js
 * @description Hàm thuần thao tác trên danh sách bản ghi (tìm theo slug,
 * lấy bản ghi liên quan, chia cột...).
 */

/**
 * Tìm bản ghi theo slug.
 * @template T
 * @param {T[]} items - Danh sách bản ghi.
 * @param {string} slug - Slug cần tìm.
 * @param {string} [key='slug'] - Tên trường chứa slug.
 * @returns {T|undefined}
 */
export function findBySlug(items, slug, key = 'slug') {
  return items.find((item) => item[key] === slug);
}

/**
 * Lấy các bản ghi khác bản ghi hiện tại (tối đa `limit`).
 * @template T
 * @param {T[]} items - Danh sách bản ghi.
 * @param {string} slug - Slug bản ghi hiện tại.
 * @param {number} [limit=3] - Số lượng tối đa.
 * @param {string} [key='slug'] - Tên trường chứa slug.
 * @returns {T[]}
 */
export function relatedItems(items, slug, limit = 3, key = 'slug') {
  return items.filter((item) => item[key] !== slug).slice(0, limit);
}

/**
 * Danh sách giá trị không trùng lặp của một trường (giữ thứ tự xuất hiện).
 * @template T
 * @param {T[]} items - Danh sách bản ghi.
 * @param {keyof T} key - Tên trường.
 * @returns {Array<T[keyof T]>}
 */
export function uniqueValues(items, key) {
  return Array.from(new Set(items.map((item) => item[key])));
}

/**
 * Chia danh sách vào N cột theo vòng (kiểu lưới ảnh masonry).
 * @template T
 * @param {T[]} items - Danh sách bản ghi.
 * @param {number} columnCount - Số cột.
 * @returns {T[][]}
 */
export function distributeColumns(items, columnCount) {
  const columns = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => columns[index % columnCount].push(item));
  return columns;
}

/**
 * Tạo danh sách tham số tĩnh cho generateStaticParams.
 * @param {Array<Record<string, string>>} items - Danh sách bản ghi.
 * @param {string} [key='slug'] - Tên trường chứa slug.
 * @returns {Array<{ slug: string }>}
 */
export function toStaticParams(items, key = 'slug') {
  return items.map((item) => ({ slug: item[key] }));
}
