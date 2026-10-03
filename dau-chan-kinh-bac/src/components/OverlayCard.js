'use client';

import { useState, useRef, useEffect, useId } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Image card with a fade-in overlay (W3Schools "Image Overlay Fade" style).
 * - Default: pure image, no text.
 * - Hover: dark overlay fades in showing only the title, and a gradient
 *   progress stroke runs around the card border. When it completes, the
 *   card navigates to `href` (same auto-direct behaviour as FlipCard).
 */
export default function OverlayCard({
  image,
  imageAlt,
  title,
  href,
  autoRedirectDelay = 3000,
}) {
  const router = useRouter();
  const timerRef = useRef(null);
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const rawId = useId();
  const gradientId = 'overlayBorder-' + rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const updateDims = () => setDims({ w: el.offsetWidth, h: el.offsetHeight });
    updateDims();
    const ro = new ResizeObserver(updateDims);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverKey((k) => k + 1);
    if (href) {
      timerRef.current = setTimeout(() => router.push(href), autoRedirectDelay);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const strokeWidth = 3.5;
  const offset = strokeWidth / 2;
  const width = dims.w > strokeWidth ? dims.w - strokeWidth : 0;
  const height = dims.h > strokeWidth ? dims.h - strokeWidth : 0;

  return (
    <Link
      ref={cardRef}
      href={href || '#'}
      className={`overlay-card ${isHovered ? 'is-hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={title}
    >
      <img src={image} alt={imageAlt || title} loading="lazy" className="overlay-card-image" />

      <div className="overlay-card-overlay">
        <h3 className="overlay-card-title">{title}</h3>
      </div>

      {href && width > 0 && (
        <svg className="flip-card-border-svg" aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A853" />
              <stop offset="45%" stopColor="#E67E22" />
              <stop offset="100%" stopColor="#C83228" />
            </linearGradient>
          </defs>
          <rect
            className="overlay-card-border-track"
            x={offset}
            y={offset}
            width={width}
            height={height}
            rx="16"
            ry="16"
          />
          <rect
            key={hoverKey}
            className={`flip-card-border-stroke ${isHovered ? 'animating' : ''}`}
            x={offset}
            y={offset}
            width={width}
            height={height}
            rx="16"
            ry="16"
            stroke={`url(#${gradientId})`}
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{ animationDuration: isHovered ? `${autoRedirectDelay}ms` : '0ms' }}
          />
        </svg>
      )}
    </Link>
  );
}
