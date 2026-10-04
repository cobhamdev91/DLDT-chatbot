/**
 * @file modules/transport/logic/timeline.js
 * @description Logic THUẦN cho timeline lộ trình mẫu: đếm chặng đã xong,
 * phần trăm thanh tiến độ, đảo trạng thái một chặng.
 */

/**
 * Đếm số chặng đã hoàn thành.
 * @param {Array<{id: number|string}>} stops - Danh sách chặng.
 * @param {Record<string, boolean>} completed - Bản đồ id → đã xong.
 * @returns {number}
 */
export function countCompleted(stops, completed) {
  return stops.filter((stop) => Boolean(completed[stop.id])).length;
}

/**
 * Phần trăm chiều cao thanh tiến độ: chặng đầu = 0%, chặng cuối = 100%.
 * @param {number} done - Số chặng đã xong.
 * @param {number} total - Tổng số chặng.
 * @returns {number} 0 → 100.
 */
export function progressPercent(done, total) {
  if (done === 0 || total <= 1) return 0;
  return Math.min(100, Math.round(((done - 1) / (total - 1)) * 100));
}

/**
 * Đảo trạng thái hoàn thành của một chặng (trả về object MỚI – bất biến).
 * @param {Record<string, boolean>} completed - Trạng thái hiện tại.
 * @param {number|string} id - Id chặng.
 * @returns {Record<string, boolean>}
 */
export function toggleStop(completed, id) {
  const next = { ...completed };
  if (next[id]) delete next[id];
  else next[id] = true;
  return next;
}
