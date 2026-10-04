/**
 * @file effects/cssVariable.js
 * @description Hiệu ứng UI ghi giá trị động vào BIẾN CSS (custom property)
 * trên phần tử đích – thay cho `style={{...}}` inline trong JSX.
 */

'use client';

import { useEffect } from 'react';

/**
 * Đồng bộ một biến CSS trên phần tử ref mỗi khi `value` đổi.
 * @example useCssVariable(trackRef, '--timeline-progress', 40)
 * @param {import('react').RefObject<HTMLElement>} ref - Phần tử nhận biến.
 * @param {string} name - Tên biến (bắt đầu bằng `--`).
 * @param {string|number} value - Giá trị cần ghi.
 */
export function useCssVariable(ref, name, value) {
  useEffect(() => {
    ref.current?.style.setProperty(name, String(value));
  }, [ref, name, value]);
}
