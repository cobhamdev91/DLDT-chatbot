/**
 * @file effects/timers.js
 * @description Hiệu ứng UI dựa trên thời gian: hẹn giờ, nhấp nháy,
 * tự chuyển trang khi giữ chuột (hover-redirect).
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Gọi `callback` sau `delay` ms khi `active` = true; tự huỷ khi đổi điều kiện.
 * @param {() => void} callback - Hàm cần gọi.
 * @param {number|null} delay - Độ trễ (ms); null → không hẹn giờ.
 * @param {boolean} [active=true] - Điều kiện bật hẹn giờ.
 */
export function useTimeout(callback, delay, active = true) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!active || delay == null) return undefined;
    const id = setTimeout(() => callbackRef.current(), delay);
    return () => clearTimeout(id);
  }, [delay, active]);
}

/**
 * Gọi `callback` lặp lại mỗi `delay` ms khi `active` = true.
 * @param {() => void} callback - Hàm cần gọi.
 * @param {number|null} delay - Chu kỳ (ms); null → dừng.
 * @param {boolean} [active=true] - Điều kiện chạy.
 */
export function useInterval(callback, delay, active = true) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (!active || delay == null) return undefined;
    const id = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(id);
  }, [delay, active]);
}

/**
 * Cờ bật/tắt luân phiên theo chu kỳ (vd: con trỏ nhấp nháy).
 * @param {number} [period=530] - Chu kỳ đảo trạng thái (ms).
 * @returns {boolean} Trạng thái hiện tại.
 */
export function useBlink(period = 530) {
  const [isOn, setIsOn] = useState(true);
  useInterval(() => setIsOn((prev) => !prev), period);
  return isOn;
}

/**
 * Cờ tạm thời: `trigger()` bật cờ, tự tắt sau `duration` ms
 * (vd: nhịp "pulse" khi kết quả vừa cập nhật).
 * @param {number} [duration=300] - Thời gian giữ cờ (ms).
 * @returns {[boolean, () => void]} [đang bật, hàm kích hoạt].
 */
export function useTransientFlag(duration = 300) {
  const [isActive, setIsActive] = useState(false);
  const trigger = useCallback(() => setIsActive(true), []);
  useTimeout(() => setIsActive(false), duration, isActive);
  return [isActive, trigger];
}

/**
 * Hover giữ chuột trên thẻ → sau `delay` ms tự chuyển tới `href`.
 * Trả về trạng thái hover, khóa `runKey` (đổi mỗi lần hover để khởi động
 * lại animation viền) và các handler gắn vào phần tử.
 * @param {string|undefined} href - Đích chuyển trang; không có → chỉ theo dõi hover.
 * @param {number} delay - Thời gian giữ chuột (ms).
 * @returns {{
 *   isHovered: boolean,
 *   runKey: number,
 *   onMouseEnter: () => void,
 *   onMouseLeave: () => void,
 *   navigateNow: () => void
 * }}
 */
export function useHoverRedirect(href, delay) {
  const router = useRouter();
  const timerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [runKey, setRunKey] = useState(0);

  /** Huỷ hẹn giờ chuyển trang đang chờ (nếu có). */
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  /** Bắt đầu hover: bật trạng thái, khởi động lại viền, hẹn giờ chuyển trang. */
  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
    setRunKey((prev) => prev + 1);
    if (href) timerRef.current = setTimeout(() => router.push(href), delay);
  }, [href, delay, router]);

  /** Rời chuột: tắt trạng thái và huỷ chuyển trang. */
  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
    clearTimer();
  }, [clearTimer]);

  /** Chuyển trang ngay (khi người dùng nhấp). */
  const navigateNow = useCallback(() => {
    clearTimer();
    if (href) router.push(href);
  }, [href, router, clearTimer]);

  return { isHovered, runKey, onMouseEnter, onMouseLeave, navigateNow };
}
