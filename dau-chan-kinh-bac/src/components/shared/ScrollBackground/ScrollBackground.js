/**
 * @file components/shared/ScrollBackground/ScrollBackground.js
 * @description Hiệu ứng "đổi ảnh nền theo cuộn": lớp nền dính (sticky) phía
 * sau nội dung; phần tử con có `data-bg-index="n"` đi qua giữa màn hình →
 * ảnh nền thứ n hiện dần.
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useActiveTrigger } from '@/effects/visibility';
import { cx } from '@/logic/classNames';

/**
 * @param {Object} props
 * @param {Array<{ src: string, alt?: string }>} props.images - Danh sách ảnh nền.
 * @param {import('react').ReactNode} props.children - Nội dung phía trên nền.
 * @returns {JSX.Element}
 */
export default function ScrollBackground({ images, children }) {
  const wrapRef = useRef(null);
  const activeIndex = useActiveTrigger(wrapRef, images.length);

  return (
    <div ref={wrapRef} className="scroll-bg">
      {/* Sân khấu nền dính – chỉ trang trí */}
      <div className="scroll-bg-stage" aria-hidden="true">
        <div className="scroll-bg-viewport">
          {images.map((img, index) => (
            <div key={img.src} className={cx('scroll-bg-layer', index === activeIndex && 'is-active')}>
              <Image
                src={img.src}
                alt={img.alt || ''}
                fill
                sizes="100vw"
                className="scroll-bg-img"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="scroll-bg-overlay" />
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="scroll-bg-content">{children}</div>
    </div>
  );
}
