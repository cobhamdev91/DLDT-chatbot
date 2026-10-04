/**
 * @file modules/detail/logic/sidebar.js
 * @description Hàm thuần hỗ trợ dựng sidebar trang chi tiết.
 */

/**
 * Bỏ các dòng thông tin không có giá trị (dữ liệu thiếu trường).
 * @param {import('@/modules/detail/types').SidebarItem[]} items - Danh sách dòng.
 * @returns {import('@/modules/detail/types').SidebarItem[]}
 */
export function presentItems(items) {
  return items.filter((item) => Boolean(item.value));
}
