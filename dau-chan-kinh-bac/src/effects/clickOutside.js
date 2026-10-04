/**
 * @file effects/clickOutside.js
 * @description Hook lắng nghe sự kiện click/tap ra ngoài phần tử mục tiêu
 * (dùng để đóng dropdown, date picker, popover).
 */

'use client';

import { useEffect, useRef } from 'react';

/**
 * Lắng nghe click/touch bên ngoài phần tử để kích hoạt callback đóng.
 * @param {import('react').RefObject<HTMLElement | null>} ref - Ref của phần tử cần theo dõi.
 * @param {() => void} handler - Hàm xử lý gọi khi click ra ngoài.
 * @param {boolean} [active=true] - Chỉ kích hoạt khi active = true.
 */
export function useClickOutside(ref, handler, active = true) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!active) return undefined;

    const onPointerDown = (event) => {
      const el = ref.current;
      if (!el || el.contains(event.target)) return;
      handlerRef.current?.(event);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [ref, active]);
}
