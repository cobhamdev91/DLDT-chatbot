'use client';

import { useState, useRef, useEffect, useId } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

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
  autoRedirectDelay = 3000,
  children 
}) {
  const router = useRouter();
  const timerRef = useRef(null);
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const rawId = useId();
  const gradientId = 'cardBorder-' + rawId.replace(/[^a-zA-Z0-9_-]/g, '');

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const updateDims = () => {
      if (el) {
        setDims({ w: el.offsetWidth, h: el.offsetHeight });
      }
    };
    updateDims();
    const ro = new ResizeObserver(updateDims);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverKey(prev => prev + 1);
    if (href) {
      timerRef.current = setTimeout(() => {
        router.push(href);
      }, autoRedirectDelay);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleBackClick = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (href) {
      router.push(href);
    }
  };

  const renderBorderSvg = () => {
    if (!href) return null;
    const strokeWidth = 3.5;
    const offset = strokeWidth / 2;
    const width = dims.w > strokeWidth ? dims.w - strokeWidth : 'calc(100% - 3.5px)';
    const height = dims.h > strokeWidth ? dims.h - strokeWidth : 'calc(100% - 3.5px)';

    return (
      <svg 
        className="flip-card-border-svg" 
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A853" />
            <stop offset="45%" stopColor="#E67E22" />
            <stop offset="100%" stopColor="#C83228" />
          </linearGradient>
        </defs>
        {/* Subtle guide track */}
        <rect
          className="flip-card-border-track"
          x={offset}
          y={offset}
          width={width}
          height={height}
          rx="16"
          ry="16"
        />
        {/* Animated running border progress */}
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
          style={{
            animationDuration: isHovered ? `${autoRedirectDelay}ms` : '0ms'
          }}
        />
      </svg>
    );
  };

  return (
    <div 
      ref={cardRef}
      className={`flip-card ${isHovered ? 'flipped-hover' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flip-card-inner">
        {/* FRONT */}
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
          {renderBorderSvg()}
        </div>

        {/* BACK — clickable for navigation */}
        <div 
          className="flip-card-back"
          onClick={handleBackClick}
          style={{ cursor: href ? 'pointer' : 'default' }}
        >
          <h3 className="flip-card-back-title">{backTitle || frontTitle}</h3>
          <div className="flip-card-back-content">
            {backContent && <p>{backContent}</p>}
            {children}
          </div>
          {backFooter && (
            <div className="flip-card-back-footer">{backFooter}</div>
          )}
          {href && (
            <div className="flip-card-hint-back">
              <span>Nhấn để xem chi tiết</span>
              <ArrowRight size={13} />
            </div>
          )}
          {renderBorderSvg()}
        </div>
      </div>
    </div>
  );
}

