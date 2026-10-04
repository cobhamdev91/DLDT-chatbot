/**
 * @file modules/transport/effects/useTimelineAutoCheck.js
 * @description Hiệu ứng UI riêng của timeline lộ trình mẫu: tự đánh dấu chặng
 * khi cuộn xuống qua ngưỡng và hoàn tác khi cuộn ngược lên (có trễ – hysteresis
 * – để tránh nhấp nháy). Dùng requestAnimationFrame để gộp sự kiện cuộn.
 */

'use client';

import { useEffect } from 'react';

/** Ngưỡng theo tỉ lệ chiều cao viewport */
const CHECK_RATIO = 0.7;
const UNDO_RATIO = 0.76;

/** Selector các chặng trong khung timeline (đọc `data-id`) */
const STEP_SELECTOR = '[data-id]';

/**
 * Tính trạng thái mới từ vị trí các chặng; trả về chính `prev` nếu không đổi
 * (tránh render thừa).
 * @param {Record<string, boolean>} prev - Trạng thái hiện tại.
 * @param {NodeListOf<HTMLElement>} steps - Các phần tử chặng.
 * @param {number} viewportHeight - window.innerHeight.
 * @returns {Record<string, boolean>}
 */
function computeAutoCheck(prev, steps, viewportHeight) {
  const checkLine = viewportHeight * CHECK_RATIO;
  const undoLine = viewportHeight * UNDO_RATIO;
  let changed = false;
  const next = { ...prev };

  steps.forEach((step) => {
    const { top } = step.getBoundingClientRect();
    const id = step.dataset.id;
    if (top <= checkLine && !next[id]) {
      next[id] = true;
      changed = true;
    } else if (top > undoLine && next[id]) {
      delete next[id];
      changed = true;
    }
  });

  return changed ? next : prev;
}

/**
 * Gắn lắng nghe cuộn cho timeline và cập nhật trạng thái hoàn thành.
 * @param {import('react').RefObject<HTMLElement>} containerRef - Khung timeline.
 * @param {import('react').Dispatch<import('react').SetStateAction<Record<string, boolean>>>} setCompleted
 *   - Hàm cập nhật state (từ useState).
 */
export function useTimelineAutoCheck(containerRef, setCompleted) {
  useEffect(() => {
    let ticking = false;

    /** Mỗi lần cuộn: xếp lịch tính lại ở khung hình kế tiếp (tối đa 1 lần/khung). */
    const onScroll = () => {
      if (ticking || !containerRef.current) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        const container = containerRef.current;
        if (!container) return;
        const steps = container.querySelectorAll(STEP_SELECTOR);
        setCompleted((prev) => computeAutoCheck(prev, steps, window.innerHeight));
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [containerRef, setCompleted]);
}
