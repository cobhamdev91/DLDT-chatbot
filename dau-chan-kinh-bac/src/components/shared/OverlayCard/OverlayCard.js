/**
 * @file components/shared/OverlayCard/OverlayCard.js
 * @description Thẻ ảnh có lớp phủ mờ dần khi hover (kiểu "Image Overlay
 * Fade"): mặc định chỉ có ảnh; hover → hiện tiêu đề + viền chạy, hết thời
 * gian tự chuyển trang (cùng hành vi với FlipCard).
 */

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import BorderProgress from '@/components/shared/BorderProgress/BorderProgress';
import { siteConfig } from '@/data/siteConfig';
import { useHoverRedirect } from '@/effects/timers';
import { useElementSize } from '@/effects/visibility';

/**
 * @param {Object} props
 * @param {string} props.image - Ảnh thẻ.
 * @param {string} [props.imageAlt] - Alt ảnh (mặc định = tiêu đề).
 * @param {string} props.title - Tiêu đề hiện khi hover.
 * @param {string} props.href - Trang đích.
 * @param {number} [props.autoRedirectDelay] - Thời gian giữ chuột (ms).
 * @returns {JSX.Element}
 */
export default function OverlayCard({
  image,
  imageAlt,
  title,
  href,
  autoRedirectDelay = siteConfig.hoverRedirectDelay,
}) {
  const cardRef = useRef(null);
  const { width, height } = useElementSize(cardRef);
  const { isHovered, runKey, onMouseEnter, onMouseLeave } = useHoverRedirect(href, autoRedirectDelay);

  return (
    <Link
      ref={cardRef}
      href={href}
      className="overlay-card"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={title}
    >
      {/* Ảnh tự nhiên (giữ tỉ lệ gốc cho lưới masonry) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={imageAlt || title} loading="lazy" className="overlay-card-image" />

      {/* Lớp phủ tối + tiêu đề, hiện khi hover */}
      <div className="overlay-card-overlay">
        <h3 className="overlay-card-title">{title}</h3>
      </div>

      {/* Viền tiến trình sáng trên nền ảnh */}
      <BorderProgress
        width={width}
        height={height}
        isActive={isHovered}
        runKey={runKey}
        duration={autoRedirectDelay}
        light
      />
    </Link>
  );
}
