/**
 * @file components/layout/ScrollDrawingBg/ScrollDrawingBg.js
 * @description Nền SVG chìm cố định phía sau trang: đường mòn dấu chân và
 * hoa sen được "vẽ" dần theo tỉ lệ cuộn. Tọa độ hình học tính sẵn một lần
 * (thuần) ở cấp module; hiệu ứng vẽ ở hook useScrollDrawing.
 */

'use client';

import { useRef } from 'react';
import { useScrollDrawing } from '@/effects/scroll';

/** Đường mòn chính uốn lượn giữa trang */
const TRAIL_PATH =
  'M200 0 C180 200, 220 400, 180 600 S140 800, 200 1000 S260 1200, 200 1400 S140 1600, 200 1800 S260 2000, 200 2200 S140 2400, 200 2600 S260 2800, 200 3000 S140 3200, 200 3400 S260 3600, 200 3800 S140 4000, 200 4200 S260 4400, 200 4600 S140 4800, 200 5000 S260 5200, 200 5400 S140 5600, 200 5800 S260 5900, 200 6000';

/** Hai đường trang trí phụ hai bên */
const SIDE_PATHS = [
  'M100 100 Q130 300, 100 500 T100 900 T100 1300 T100 1700 T100 2100 T100 2500 T100 2900 T100 3300 T100 3700 T100 4100 T100 4500 T100 4900 T100 5300 T100 5700',
  'M300 200 Q270 400, 300 600 T300 1000 T300 1400 T300 1800 T300 2200 T300 2600 T300 3000 T300 3400 T300 3800 T300 4200 T300 4600 T300 5000 T300 5400 T300 5800',
];

/**
 * 30 cặp dấu chân dọc đường mòn (lệch hình sin).
 * @type {ReadonlyArray<{ id: number, x: number, y: number }>}
 */
const FOOTSTEPS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: 200 + Math.sin(i * 0.8) * 60,
  y: 200 + i * 200,
}));

/**
 * Hoa sen tại các mốc cuộn quan trọng: mỗi hoa gồm cánh giữa + 2 cánh bên.
 * @type {ReadonlyArray<{ y: number, petal: string, leaves: string[] }>}
 */
const LOTUSES = [800, 1800, 2800, 3800, 4800].map((y) => ({
  y,
  petal: `M200 ${y} C195 ${y - 15}, 185 ${y - 25}, 200 ${y - 35} C215 ${y - 25}, 205 ${y - 15}, 200 ${y}`,
  leaves: [
    `M200 ${y} C188 ${y - 10}, 178 ${y - 22}, 188 ${y - 30}`,
    `M200 ${y} C212 ${y - 10}, 222 ${y - 22}, 212 ${y - 30}`,
  ],
}));

/**
 * @returns {JSX.Element}
 */
export default function ScrollDrawingBg() {
  const svgRef = useRef(null);

  /* Hiệu ứng: đo độ dài nét & cập nhật tỉ lệ cuộn vào biến CSS */
  useScrollDrawing(svgRef);

  return (
    <div className="scroll-drawing-bg" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 400 6000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="scroll-drawing-svg"
        preserveAspectRatio="none"
      >
        {/* Đường mòn chính */}
        <path className="scroll-draw-path scroll-draw-path--trail" d={TRAIL_PATH} />

        {/* Đường phụ hai bên */}
        {SIDE_PATHS.map((d) => (
          <path key={d} className="scroll-draw-path scroll-draw-path--side" d={d} />
        ))}

        {/* Dấu chân trái – phải */}
        {FOOTSTEPS.map(({ id, x, y }) => (
          <g key={id}>
            <circle className="scroll-draw-path scroll-draw-path--step" cx={x - 8} cy={y} r="4" />
            <circle className="scroll-draw-path scroll-draw-path--step" cx={x + 8} cy={y + 15} r="4" />
          </g>
        ))}

        {/* Hoa sen */}
        {LOTUSES.map(({ y, petal, leaves }) => (
          <g key={y}>
            <path className="scroll-draw-path scroll-draw-path--petal" d={petal} />
            {leaves.map((d) => (
              <path key={d} className="scroll-draw-path scroll-draw-path--leaf" d={d} />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
