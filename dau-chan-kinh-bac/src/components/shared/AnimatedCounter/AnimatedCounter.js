/**
 * @file components/shared/AnimatedCounter/AnimatedCounter.js
 * @description Số đếm tăng dần khi cuộn tới (định dạng vi-VN).
 */

'use client';

import { useRef } from 'react';
import { useCountUp } from '@/effects/animation';
import { useInViewOnce } from '@/effects/visibility';

/**
 * @param {Object} props
 * @param {number} props.end - Giá trị đích.
 * @param {number} [props.duration=2000] - Thời lượng (ms).
 * @param {string} [props.prefix=''] - Tiền tố.
 * @param {string} [props.suffix=''] - Hậu tố.
 * @returns {JSX.Element}
 */
export default function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const hasEntered = useInViewOnce(ref);
  const value = useCountUp(end, duration, hasEntered);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString('vi-VN')}
      {suffix}
    </span>
  );
}
