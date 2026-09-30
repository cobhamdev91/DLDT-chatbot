'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

  const handleMouseEnter = () => {
    if (href) {
      timerRef.current = setTimeout(() => {
        router.push(href);
      }, autoRedirectDelay);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleBackClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div 
      className="flip-card"
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
            <span className="flip-card-hint-back">Nhấn để xem chi tiết →</span>
          )}
        </div>
      </div>
    </div>
  );
}
