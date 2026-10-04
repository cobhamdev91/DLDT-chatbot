/**
 * @file effects/visibility.js
 * @description Hiệu ứng UI dựa trên IntersectionObserver / ResizeObserver:
 * phát hiện phần tử vào khung nhìn, phần tử kích hoạt đang ở giữa màn hình,
 * và đo kích thước phần tử.
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Phát hiện phần tử xuất hiện trong khung nhìn (chỉ kích hoạt MỘT lần).
 * @param {import('react').RefObject<Element>} ref - Phần tử cần theo dõi.
 * @param {number} [threshold=0.3] - Tỉ lệ diện tích hiển thị tối thiểu.
 * @returns {boolean} true sau lần đầu phần tử lọt vào khung nhìn.
 */
export function useInViewOnce(ref, threshold = 0.3) {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasEntered) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasEntered(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, hasEntered]);

  return hasEntered;
}

/**
 * Theo dõi các phần tử con có thuộc tính `data-bg-index` trong vùng chứa;
 * trả về chỉ số của phần tử vừa đi qua dải giữa màn hình.
 * Dùng cho hiệu ứng "đổi ảnh nền theo cuộn" (ScrollBackground).
 * @param {import('react').RefObject<Element>} containerRef - Vùng chứa trigger.
 * @param {number} triggerCount - Số trigger (đổi giá trị → gắn lại observer).
 * @returns {number} Chỉ số nền đang kích hoạt (mặc định 0).
 */
export function useActiveTrigger(containerRef, triggerCount) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const triggers = container.querySelectorAll('[data-bg-index]');
    if (!triggers.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.getAttribute('data-bg-index'));
          if (!Number.isNaN(index)) setActiveIndex(index);
        });
      },
      /* Dải mỏng quanh đường giữa khung nhìn (10% chiều cao) */
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    triggers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef, triggerCount]);

  return activeIndex;
}

/**
 * Đo kích thước (px) của phần tử và cập nhật khi thay đổi.
 * @param {import('react').RefObject<HTMLElement>} ref - Phần tử cần đo.
 * @returns {{ width: number, height: number }} Kích thước hiện tại (0 trước khi đo).
 */
export function useElementSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => setSize({ width: el.offsetWidth, height: el.offsetHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
