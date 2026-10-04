/**
 * @file modules/detail/logic/numbering.js
 * @description Đánh số thứ tự "1. 2. 3." cho tiêu đề các khối nội dung
 * THỰC SỰ hiển thị (bỏ qua khối rỗng) – tránh lỗi nhảy số như bản cũ.
 */

/**
 * Lọc khối rỗng rồi đánh số tiêu đề các khối có `title`.
 * @param {Array<import('@/modules/detail/types').DetailBlock|null|false>} blocks - Danh sách khối (null/false = bỏ qua).
 * @returns {import('@/modules/detail/types').DetailBlock[]}
 */
export function numberBlocks(blocks) {
  let counter = 0;
  return blocks.filter(Boolean).map((block) => {
    if (!block.title) return block;
    counter += 1;
    return { ...block, title: `${counter}. ${block.title}` };
  });
}

/**
 * Trả về khối nếu điều kiện đúng, ngược lại null (dùng khi dựng danh sách khối).
 * @template T
 * @param {unknown} condition - Điều kiện hiển thị (vd: dữ liệu tồn tại).
 * @param {() => T} factory - Hàm tạo khối.
 * @returns {T|null}
 */
export function blockIf(condition, factory) {
  if (Array.isArray(condition) ? condition.length === 0 : !condition) return null;
  return factory();
}
