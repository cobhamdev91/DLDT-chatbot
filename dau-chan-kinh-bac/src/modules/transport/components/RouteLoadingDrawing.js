/**
 * @file modules/transport/components/RouteLoadingDrawing.js
 * @description Hiệu ứng loading mô phỏng nét vẽ "Dấu chân Kinh Bắc":
 * nét vẽ đường mòn uốn lượn bằng SVG stroke-dashoffset, các cặp dấu chân
 * bước dần từ điểm đi đến điểm đến, hoa sen bung nở cùng thông điệp tối ưu hóa.
 */

'use client';

import { transport as tLocale } from '@/locales/vi/transport';

const t = tLocale.estimator;

/**
 * Danh sách 6 mốc dấu chân trên đường lộ trình.
 * Mỗi mốc gồm toạ độ x, y, góc xoay và độ trễ xuất hiện (delay giây).
 */
const FOOTSTEP_STOPS = [
  { id: 1, x: 100, y: 45, angle: -18, delay: '0.1s' },
  { id: 2, x: 165, y: 74, angle: 22, delay: '0.22s' },
  { id: 3, x: 230, y: 72, angle: 8, delay: '0.34s' },
  { id: 4, x: 295, y: 38, angle: -25, delay: '0.46s' },
  { id: 5, x: 360, y: 40, angle: -8, delay: '0.58s' },
  { id: 6, x: 415, y: 68, angle: 20, delay: '0.7s' },
];

/** Đường cong lộ trình nối từ Hà Nội sang Bắc Ninh */
const ROUTE_PATH_D = 'M 40 60 C 120 20, 180 95, 250 55 C 320 15, 380 90, 460 60';

/**
 * @returns {JSX.Element}
 */
export default function RouteLoadingDrawing() {
  return (
    <div className="route-loading-container" role="status" aria-live="polite">
      {/* Sân khấu nét vẽ SVG Dấu Chân Kinh Bắc */}
      <div className="route-loading-stage">
        <svg
          viewBox="0 0 500 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="route-loading-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradient màu đường nối: từ vàng kim sang đỏ son Kinh Bắc */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4A853" />
              <stop offset="50%" stopColor="#C83228" />
              <stop offset="100%" stopColor="#8C1812" />
            </linearGradient>

            {/* Bóng đổ nhẹ cho các dấu chân */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#4A2518" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* 1. Đường mòn nền mờ */}
          <path
            d={ROUTE_PATH_D}
            className="route-loading-path route-loading-path--track"
          />

          {/* 2. Nét bút vẽ động uốn lượn nối 2 điểm */}
          <path
            d={ROUTE_PATH_D}
            stroke="url(#routeGradient)"
            className="route-loading-path route-loading-path--animated"
          />

          {/* 3. Điểm xuất phát (Hà Nội): Vòng radar lan tỏa + ghim đỏ */}
          <g transform="translate(40, 60)">
            <circle cx="0" cy="0" r="14" className="route-pulse-ring" />
            <circle cx="0" cy="0" r="7" fill="#C83228" />
            <circle cx="0" cy="0" r="3" fill="#FFFDF9" />
          </g>

          {/* 4. Các cặp dấu chân bước đi nhịp nhàng dọc cung đường */}
          {FOOTSTEP_STOPS.map(({ id, x, y, angle }) => (
            <g
              key={id}
              transform={`translate(${x}, ${y}) rotate(${angle})`}
              className={`route-footstep-group route-footstep-group--${id}`}
              filter="url(#softShadow)"
            >
              {/* Bàn chân trái */}
              <ellipse cx="-5" cy="-4" rx="3.5" ry="5.5" className="route-footstep-print" />
              <circle cx="-5" cy="-11" r="1.3" className="route-footstep-print" />
              <circle cx="-2.5" cy="-10.5" r="1" className="route-footstep-print" />

              {/* Bàn chân phải */}
              <ellipse cx="5" cy="5" rx="3.5" ry="5.5" className="route-footstep-print" />
              <circle cx="5" cy="-2" r="1.3" className="route-footstep-print" />
              <circle cx="7.5" cy="-1.5" r="1" className="route-footstep-print" />
            </g>
          ))}

          {/* 5. Điểm đến (Bắc Ninh): Hoa sen bung nở ngát hương */}
          <g transform="translate(460, 60)" className="route-lotus-target">
            {/* Vòng hào quang sáng nhẹ */}
            <circle cx="0" cy="0" r="16" className="route-target-glow" />
            {/* Cánh sen trung tâm */}
            <path
              d="M0 6 C-3 2, -6 -5, 0 -11 C6 -5, 3 2, 0 6 Z"
              fill="#C83228"
            />
            {/* Cánh sen trái */}
            <path
              d="M-2 4 C-8 1, -10 -4, -6 -9 C-3 -6, -2 0, -2 4 Z"
              fill="#D4A853"
            />
            {/* Cánh sen phải */}
            <path
              d="M2 4 C8 1, 10 -4, 6 -9 C3 -6, 2 0, 2 4 Z"
              fill="#D4A853"
            />
            {/* Nhụy sen vàng */}
            <circle cx="0" cy="0" r="2" fill="#FFFBF5" />
          </g>
        </svg>
      </div>

      {/* Thông điệp tải sinh động */}
      <div className="route-loading-text-box">
        <h4 className="route-loading-title">{t.loadingTitle}</h4>
        <p className="route-loading-subtitle">{t.loadingSubtitle}</p>
      </div>
    </div>
  );
}
