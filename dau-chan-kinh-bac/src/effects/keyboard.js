/**
 * @file effects/keyboard.js
 * @description Hiệu ứng UI liên quan bàn phím & khóa cuộn nền cho các lớp
 * phủ (modal, lightbox, popover, chatbot).
 */

'use client';

import { useEffect, useRef } from 'react';

/**
 * Gắn bảng phím tắt → hàm xử lý khi `active` = true.
 * Handler luôn đọc phiên bản mới nhất (qua ref) nên không cần memo hoá.
 * @example useKeyHandlers(isOpen, { Escape: close, ArrowLeft: prev })
 * @param {boolean} active - Chỉ lắng nghe khi true.
 * @param {Record<string, (event: KeyboardEvent) => void>} handlers - Ánh xạ `event.key` → hàm.
 */
export function useKeyHandlers(active, handlers) {
  const handlersRef = useRef(handlers);

  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    if (!active) return undefined;
    const onKeyDown = (event) => handlersRef.current[event.key]?.(event);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);
}

/**
 * Đóng lớp phủ khi nhấn phím Escape.
 * @param {boolean} active - Chỉ lắng nghe khi lớp phủ đang mở.
 * @param {() => void} onEscape - Hàm đóng.
 */
export function useEscapeKey(active, onEscape) {
  useKeyHandlers(active, { Escape: onEscape });
}

/**
 * Khóa cuộn trang nền khi lớp phủ đang mở (thêm class `is-scroll-locked`
 * vào <body>; quy tắc CSS nằm ở styles/base.css).
 * @param {boolean} locked - true → khóa cuộn.
 */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    document.body.classList.add('is-scroll-locked');
    return () => document.body.classList.remove('is-scroll-locked');
  }, [locked]);
}
