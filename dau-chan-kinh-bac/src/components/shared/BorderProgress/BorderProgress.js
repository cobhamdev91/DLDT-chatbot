/**
 * @file components/shared/BorderProgress/BorderProgress.js
 * @description Lớp SVG viền chạy quanh thẻ khi hover – báo hiệu thời gian
 * còn lại trước khi tự chuyển trang. Dùng chung cho FlipCard & OverlayCard.
 * Thời lượng chạy truyền qua biến CSS `--border-run-duration` (đặt bằng
 * effect, không inline style).
 */

'use client';

import { useEffect, useId, useRef } from 'react';
import { cx } from '@/logic/classNames';

/** Độ dày nét viền (px) – trùng với stroke-width trong border-progress.css */
const STROKE_WIDTH = 3.5;
/** Bán kính bo góc (px) – trùng với border-radius của thẻ */
const RADIUS = 16;

/**
 * @param {Object} props
 * @param {number} props.width - Chiều rộng thẻ (px) đo bởi useElementSize.
 * @param {number} props.height - Chiều cao thẻ (px).
 * @param {boolean} props.isActive - Đang hover → chạy viền.
 * @param {number} props.runKey - Khóa đổi mỗi lần hover để khởi động lại animation.
 * @param {number} props.duration - Thời lượng chạy (ms).
 * @param {boolean} [props.light=false] - Rãnh dẫn màu sáng (cho nền ảnh tối).
 * @returns {JSX.Element|null}
 */
export default function BorderProgress({ width, height, isActive, runKey, duration, light = false }) {
  const svgRef = useRef(null);
  const gradientId = `borderProgress-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  /* Hiệu ứng: đồng bộ thời lượng chạy vào biến CSS */
  useEffect(() => {
    svgRef.current?.style.setProperty('--border-run-duration', `${duration}ms`);
  }, [duration]);

  /* Chưa đo được kích thước → chưa vẽ */
  if (width <= STROKE_WIDTH || height <= STROKE_WIDTH) return null;

  const offset = STROKE_WIDTH / 2;
  const rectProps = {
    x: offset,
    y: offset,
    width: width - STROKE_WIDTH,
    height: height - STROKE_WIDTH,
    rx: RADIUS,
    ry: RADIUS,
  };

  return (
    <svg
      ref={svgRef}
      className={cx('border-progress', light && 'border-progress--light', isActive && 'is-active')}
      aria-hidden="true"
    >
      <defs>
        {/* Gradient vàng đồng → cam → đỏ son */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A853" />
          <stop offset="45%" stopColor="#E67E22" />
          <stop offset="100%" stopColor="#C83228" />
        </linearGradient>
      </defs>
      {/* Rãnh dẫn mờ */}
      <rect className="border-progress__track" {...rectProps} />
      {/* Nét chạy – key đổi để animation chạy lại từ đầu */}
      <rect
        key={runKey}
        className="border-progress__stroke"
        {...rectProps}
        stroke={`url(#${gradientId})`}
        pathLength="100"
      />
    </svg>
  );
}
