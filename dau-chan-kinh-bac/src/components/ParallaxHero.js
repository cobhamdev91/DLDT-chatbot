'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function ParallaxHero({ image, imageAlt, badge, title, description, cutoutText }) {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !imgRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const rate = scrolled * 0.3;
      imgRef.current.style.transform = `translateY(${Math.max(0, rate)}px) scale(1.1)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="parallax-hero" ref={heroRef}>
      <div className="parallax-hero-image">
        <Image
          ref={imgRef}
          src={image}
          alt={imageAlt || title}
          fill
          priority
          className="parallax-hero-img"
        />
      </div>
      <div className="parallax-hero-overlay" />

      {/* Cutout text effect */}
      {cutoutText && (
        <div className="cutout-text-layer">
          <h1 className="cutout-text">{cutoutText}</h1>
        </div>
      )}

      <div className="container parallax-hero-content">
        {badge && <span className="tag-badge">{badge}</span>}
        {!cutoutText && <h1>{title}</h1>}
        {cutoutText && <h1>{title}</h1>}
        {description && <p>{description}</p>}
      </div>

      {/* Wave divider at bottom */}
      <div className="parallax-hero-wave">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C180,120 360,0 540,60 C720,120 900,20 1080,60 C1260,100 1380,40 1440,60 L1440,120 L0,120 Z" fill="#FDF6EC"/>
        </svg>
      </div>
    </section>
  );
}
