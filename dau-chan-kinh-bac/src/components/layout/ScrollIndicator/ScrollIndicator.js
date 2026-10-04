/**
 * @file components/layout/ScrollIndicator/ScrollIndicator.js
 * @description Thanh tiến trình cuộn mảnh trên cùng màn hình. Chiều rộng
 * thanh do CSS tính từ biến `--scroll-progress` (hook useScrollProgressVar).
 */

'use client';

import { useRef } from 'react';
import { useScrollProgressVar } from '@/effects/scroll';

/**
 * @returns {JSX.Element}
 */
export default function ScrollIndicator() {
  const trackRef = useRef(null);

  /* Hiệu ứng: ghi tỉ lệ cuộn (0 → 1) vào biến CSS của rãnh */
  useScrollProgressVar(trackRef);

  return (
    <div className="scroll-indicator-track" ref={trackRef} aria-hidden="true">
      <div className="scroll-indicator-bar" />
    </div>
  );
}
