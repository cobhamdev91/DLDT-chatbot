'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * "Change Background Image on Scroll" wrapper.
 *
 * - Renders a sticky, full-viewport background layer behind its children.
 * - Any descendant with a `data-bg-index="<n>"` attribute acts as a trigger:
 *   when it crosses the middle of the viewport, background image `n` fades in.
 *
 * Props:
 *   images: Array<{ src: string, alt?: string }>
 *   children: content rendered on top of the background
 */
export default function ScrollBackground({ images = [], children, className = '' }) {
  const wrapRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const triggers = wrap.querySelectorAll('[data-bg-index]');
    if (!triggers.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-bg-index'));
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      // A thin band around the vertical centre of the viewport
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    triggers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [images.length]);

  return (
    <div ref={wrapRef} className={`scroll-bg ${className}`}>
      <div className="scroll-bg-stage" aria-hidden="true">
        <div className="scroll-bg-viewport">
          {images.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className={`scroll-bg-layer ${i === active ? 'is-active' : ''}`}
            >
              <Image
                src={img.src}
                alt={img.alt || ''}
                fill
                sizes="100vw"
                className="scroll-bg-img"
                priority={i === 0}
              />
            </div>
          ))}
          <div className="scroll-bg-overlay" />
        </div>
      </div>

      <div className="scroll-bg-content">{children}</div>
    </div>
  );
}
