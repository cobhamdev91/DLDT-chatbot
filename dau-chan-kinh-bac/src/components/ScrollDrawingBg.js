'use client';

import { useEffect, useRef } from 'react';

export default function ScrollDrawingBackground() {
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.scroll-draw-path');
    if (!paths || paths.length === 0) return;

    // Set initial dash offsets
    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = docHeight > 0 ? scrollTop / docHeight : 0;

      paths.forEach((path) => {
        const length = path.getTotalLength();
        const drawLength = length * scrollFraction;
        path.style.strokeDashoffset = length - drawLength;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        {/* Main flowing path - resembles footsteps trail */}
        <path
          className="scroll-draw-path"
          d="M200 0 C180 200, 220 400, 180 600 S140 800, 200 1000 S260 1200, 200 1400 S140 1600, 200 1800 S260 2000, 200 2200 S140 2400, 200 2600 S260 2800, 200 3000 S140 3200, 200 3400 S260 3600, 200 3800 S140 4000, 200 4200 S260 4400, 200 4600 S140 4800, 200 5000 S260 5200, 200 5400 S140 5600, 200 5800 S260 5900, 200 6000"
          stroke="rgba(200, 50, 40, 0.08)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Secondary decorative path */}
        <path
          className="scroll-draw-path"
          d="M100 100 Q130 300, 100 500 T100 900 T100 1300 T100 1700 T100 2100 T100 2500 T100 2900 T100 3300 T100 3700 T100 4100 T100 4500 T100 4900 T100 5300 T100 5700"
          stroke="rgba(212, 168, 83, 0.06)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="scroll-draw-path"
          d="M300 200 Q270 400, 300 600 T300 1000 T300 1400 T300 1800 T300 2200 T300 2600 T300 3000 T300 3400 T300 3800 T300 4200 T300 4600 T300 5000 T300 5400 T300 5800"
          stroke="rgba(212, 168, 83, 0.06)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Footstep dots along the path */}
        {Array.from({ length: 30 }).map((_, i) => {
          const y = 200 + i * 200;
          const x = 200 + Math.sin(i * 0.8) * 60;
          return (
            <g key={i}>
              <circle
                className="scroll-draw-path"
                cx={x - 8}
                cy={y}
                r="4"
                stroke="rgba(200, 50, 40, 0.1)"
                strokeWidth="1.5"
                fill="none"
              />
              <circle
                className="scroll-draw-path"
                cx={x + 8}
                cy={y + 15}
                r="4"
                stroke="rgba(200, 50, 40, 0.1)"
                strokeWidth="1.5"
                fill="none"
              />
            </g>
          );
        })}

        {/* Lotus symbols at key points */}
        {[800, 1800, 2800, 3800, 4800].map((y, i) => (
          <g key={`lotus-${i}`}>
            <path
              className="scroll-draw-path"
              d={`M200 ${y} C195 ${y - 15}, 185 ${y - 25}, 200 ${y - 35} C215 ${y - 25}, 205 ${y - 15}, 200 ${y}`}
              stroke="rgba(200, 50, 40, 0.12)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              className="scroll-draw-path"
              d={`M200 ${y} C188 ${y - 10}, 178 ${y - 22}, 188 ${y - 30}`}
              stroke="rgba(200, 50, 40, 0.08)"
              strokeWidth="1"
              fill="none"
            />
            <path
              className="scroll-draw-path"
              d={`M200 ${y} C212 ${y - 10}, 222 ${y - 22}, 212 ${y - 30}`}
              stroke="rgba(200, 50, 40, 0.08)"
              strokeWidth="1"
              fill="none"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
