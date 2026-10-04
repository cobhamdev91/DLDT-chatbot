/**
 * @file effects/scroll.js
 * @description Hiệu ứng UI gắn với sự kiện cuộn trang. Mọi giá trị động
 * được ghi vào BIẾN CSS (custom property) trên phần tử đích thay vì inline
 * style trong JSX → CSS quyết định cách hiển thị, JS chỉ cung cấp số liệu.
 */

'use client';

import { useEffect, useState } from 'react';

/**
 * Tính tỉ lệ cuộn của toàn trang (0 → 1).
 * @returns {number} 0 ở đỉnh trang, 1 ở cuối trang.
 */
export function getPageScrollRatio() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
}

/**
 * Đăng ký lắng nghe cuộn (passive) và gọi handler ngay một lần lúc gắn.
 * @param {() => void} handler - Hàm xử lý mỗi lần cuộn.
 * @returns {() => void} Hàm huỷ đăng ký.
 */
function subscribeScroll(handler) {
  window.addEventListener('scroll', handler, { passive: true });
  handler();
  return () => window.removeEventListener('scroll', handler);
}

/**
 * Theo dõi việc trang đã cuộn quá một ngưỡng hay chưa (vd: đổi nền header).
 * @param {number} [threshold=25] - Ngưỡng cuộn (px).
 * @returns {boolean} true nếu window.scrollY lớn hơn ngưỡng.
 */
export function useScrolled(threshold = 25) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(
    () => subscribeScroll(() => setIsScrolled(window.scrollY > threshold)),
    [threshold]
  );

  return isScrolled;
}

/**
 * Ghi tỉ lệ cuộn toàn trang vào biến CSS `--scroll-progress` (0 → 1)
 * trên phần tử ref. Dùng cho thanh tiến trình cuộn và nét vẽ nền.
 * @param {import('react').RefObject<HTMLElement|SVGElement>} ref - Phần tử nhận biến CSS.
 */
export function useScrollProgressVar(ref) {
  useEffect(
    () =>
      subscribeScroll(() => {
        ref.current?.style.setProperty('--scroll-progress', String(getPageScrollRatio()));
      }),
    [ref]
  );
}

/**
 * Hiệu ứng parallax: ảnh trôi chậm hơn tốc độ cuộn.
 * Ghi độ dịch (px) vào biến CSS `--parallax-y` trên phần tử ảnh.
 * @param {import('react').RefObject<HTMLElement>} containerRef - Khung hero để đo vị trí.
 * @param {import('react').RefObject<HTMLElement>} targetRef - Phần tử nhận biến CSS.
 * @param {number} [rate=0.3] - Hệ số trôi (0.3 = trôi bằng 30% quãng cuộn).
 */
export function useParallax(containerRef, targetRef, rate = 0.3) {
  useEffect(
    () =>
      subscribeScroll(() => {
        const container = containerRef.current;
        const target = targetRef.current;
        if (!container || !target) return;
        const offset = Math.max(0, -container.getBoundingClientRect().top * rate);
        target.style.setProperty('--parallax-y', `${offset}px`);
      }),
    [containerRef, targetRef, rate]
  );
}

/**
 * Hiệu ứng "vẽ nét theo cuộn" cho SVG nền:
 * 1. Đo độ dài từng nét `.scroll-draw-path` một lần → biến `--path-length`.
 * 2. Cập nhật `--scroll-progress` trên SVG khi cuộn (CSS tự tính dashoffset).
 * 3. Gắn class `is-ready` để hiện SVG sau khi đo xong (tránh nháy).
 * @param {import('react').RefObject<SVGSVGElement>} svgRef - SVG chứa các nét vẽ.
 */
export function useScrollDrawing(svgRef) {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;

    svg.querySelectorAll('.scroll-draw-path').forEach((path) => {
      path.style.setProperty('--path-length', String(path.getTotalLength()));
    });
    svg.classList.add('is-ready');

    return subscribeScroll(() => {
      svg.style.setProperty('--scroll-progress', String(getPageScrollRatio()));
    });
  }, [svgRef]);
}
