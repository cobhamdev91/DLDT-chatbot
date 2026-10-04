/**
 * @file effects/animation.js
 * @description Hiệu ứng UI hoạt hoạ chữ/số: đếm số tăng dần, gõ chữ
 * (typewriter). Phần tính toán thuần nằm ở logic/animation.js.
 */

'use client';

import { useEffect, useState } from 'react';
import { easeOutCubic, nextTypewriterStep } from '@/logic/animation';

/**
 * Đếm số từ 0 tới `end` với hàm giảm tốc ease-out-cubic, bắt đầu khi `start` = true.
 * @param {number} end - Giá trị đích.
 * @param {number} duration - Thời lượng (ms).
 * @param {boolean} start - Bật đếm (thường lấy từ useInViewOnce).
 * @returns {number} Giá trị hiện tại (số nguyên).
 */
export function useCountUp(end, duration, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return undefined;
    const startTime = performance.now();
    let frameId = 0;

    /** Khung hình: tính tiến độ và cập nhật số. */
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.floor(easeOutCubic(progress) * end));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, end, duration]);

  return value;
}

/**
 * Hiệu ứng gõ – xoá chữ lần lượt qua danh sách từ.
 * @param {string[]} words - Danh sách từ hiển thị luân phiên.
 * @param {{ speed: number, deleteSpeed: number, pauseTime: number }} timing - Nhịp gõ (ms).
 * @returns {string} Chuỗi đang hiển thị.
 */
export function useTypewriter(words, { speed, deleteSpeed, pauseTime }) {
  const [state, setState] = useState({ text: '', index: 0, deleting: false });

  useEffect(() => {
    if (!words.length) return undefined;
    const { next, delay } = nextTypewriterStep(state, words, { speed, deleteSpeed, pauseTime });
    const id = setTimeout(() => setState(next), delay);
    return () => clearTimeout(id);
  }, [state, words, speed, deleteSpeed, pauseTime]);

  return state.text;
}
