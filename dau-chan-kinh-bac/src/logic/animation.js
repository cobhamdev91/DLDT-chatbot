/**
 * @file logic/animation.js
 * @description Hàm thuần phục vụ hoạt hoạ (không đụng DOM/React) – dễ test.
 */

/**
 * Hàm giảm tốc bậc ba: nhanh lúc đầu, chậm dần về cuối.
 * @param {number} t - Tiến độ 0 → 1.
 * @returns {number} Giá trị đã nội suy 0 → 1.
 */
export function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * @typedef {Object} TypewriterState
 * @property {string}  text     - Chuỗi đang hiển thị.
 * @property {number}  index    - Chỉ số từ hiện tại trong danh sách.
 * @property {boolean} deleting - Đang ở pha xoá chữ hay không.
 */

/**
 * Tính bước kế tiếp của hiệu ứng gõ chữ (máy trạng thái thuần).
 * - Đang gõ & chưa đủ chữ → thêm 1 ký tự sau `speed` ms.
 * - Gõ đủ → chờ `pauseTime` ms rồi chuyển sang pha xoá.
 * - Đang xoá & còn chữ → bớt 1 ký tự sau `deleteSpeed` ms.
 * - Xoá hết → sang từ kế tiếp.
 * @param {TypewriterState} state - Trạng thái hiện tại.
 * @param {string[]} words - Danh sách từ.
 * @param {{ speed: number, deleteSpeed: number, pauseTime: number }} timing - Nhịp (ms).
 * @returns {{ next: TypewriterState, delay: number }} Trạng thái kế tiếp & độ trễ.
 */
export function nextTypewriterStep(state, words, { speed, deleteSpeed, pauseTime }) {
  const word = words[state.index % words.length];

  if (!state.deleting) {
    if (state.text.length < word.length) {
      return { next: { ...state, text: word.slice(0, state.text.length + 1) }, delay: speed };
    }
    return { next: { ...state, deleting: true }, delay: pauseTime };
  }

  if (state.text.length > 0) {
    return { next: { ...state, text: state.text.slice(0, -1) }, delay: deleteSpeed };
  }
  return {
    next: { text: '', index: (state.index + 1) % words.length, deleting: false },
    delay: speed,
  };
}
