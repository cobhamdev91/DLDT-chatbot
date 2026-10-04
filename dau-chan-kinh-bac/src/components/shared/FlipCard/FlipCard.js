/**
 * @file components/shared/FlipCard/FlipCard.js
 * @description Thẻ lật 3D: mặt trước là ảnh + tiêu đề, mặt sau là mô tả +
 * slot nội dung tuỳ biến (children). Hover giữ chuột → viền chạy, hết thời
 * gian tự chuyển trang; nhấp mặt sau → chuyển ngay.
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import BorderProgress from '@/components/shared/BorderProgress/BorderProgress';
import { siteConfig } from '@/data/siteConfig';
import { common } from '@/locales/vi/common';
import { useHoverRedirect } from '@/effects/timers';
import { useElementSize } from '@/effects/visibility';
import { cx } from '@/logic/classNames';

/**
 * @param {Object} props
 * @param {string} props.image - Ảnh mặt trước.
 * @param {string} [props.imageAlt] - Alt ảnh (mặc định = tiêu đề).
 * @param {string} props.frontTitle - Tiêu đề mặt trước.
 * @param {string} [props.frontSubtitle] - Phụ đề mặt trước (ẩn bằng CSS, giữ cho SEO).
 * @param {string} [props.frontBadge] - Nhãn phân loại góc trên.
 * @param {string} [props.backTitle] - Tiêu đề mặt sau (mặc định = frontTitle).
 * @param {string} [props.backContent] - Đoạn mô tả mặt sau.
 * @param {import('react').ReactNode} [props.backFooter] - Chân mặt sau.
 * @param {string} [props.href] - Trang chi tiết; có → bật hover-redirect.
 * @param {number} [props.autoRedirectDelay] - Thời gian giữ chuột (ms).
 * @param {import('react').ReactNode} [props.children] - Nội dung thêm ở mặt sau.
 * @returns {JSX.Element}
 */
export default function FlipCard({
  image,
  imageAlt,
  frontTitle,
  frontSubtitle,
  frontBadge,
  backTitle,
  backContent,
  backFooter,
  href,
  autoRedirectDelay = siteConfig.hoverRedirectDelay,
  children,
}) {
  const cardRef = useRef(null);
  const { width, height } = useElementSize(cardRef);
  const { isHovered, runKey, onMouseEnter, onMouseLeave, navigateNow } = useHoverRedirect(
    href,
    autoRedirectDelay
  );

  /** Viền tiến trình – chỉ hiển thị khi thẻ có liên kết */
  const border = href ? (
    <BorderProgress
      width={width}
      height={height}
      isActive={isHovered}
      runKey={runKey}
      duration={autoRedirectDelay}
    />
  ) : null;

  return (
    /* Khung thẻ: theo dõi hover để lật & hẹn giờ chuyển trang */
    <div
      ref={cardRef}
      className={cx('flip-card', isHovered && 'flipped-hover')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flip-card-inner">
        {/* ===== MẶT TRƯỚC: ảnh + badge + tiêu đề ===== */}
        <div className="flip-card-front">
          <div className="flip-card-image-wrap">
            <Image
              src={image}
              alt={imageAlt || frontTitle}
              width={400}
              height={300}
              className="flip-card-image"
            />
            <div className="flip-card-image-overlay" />
          </div>
          {frontBadge && <span className="flip-card-badge">{frontBadge}</span>}
          <div className="flip-card-front-content">
            <h3 className="flip-card-title">{frontTitle}</h3>
            {frontSubtitle && <p className="flip-card-subtitle">{frontSubtitle}</p>}
          </div>
          {border}
        </div>

        {/* ===== MẶT SAU: mô tả + slot + gợi ý nhấp (nhấp → chuyển trang ngay) ===== */}
        <div className={cx('flip-card-back', href && 'flip-card-back--link')} onClick={navigateNow}>
          <h3 className="flip-card-back-title">{backTitle || frontTitle}</h3>
          <div className="flip-card-back-content">
            {backContent && <p>{backContent}</p>}
            {children}
          </div>
          {backFooter && <div className="flip-card-back-footer">{backFooter}</div>}
          {href && (
            <div className="flip-card-hint-back">
              <span>{common.flipCard.hint}</span>
              <ArrowRight size={13} />
            </div>
          )}
          {border}
        </div>
      </div>
    </div>
  );
}
