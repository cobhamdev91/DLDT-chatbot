'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, isOpen, onClose, startIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, [startIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goTo(-1);
      if (e.key === 'ArrowRight') goTo(1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, currentIndex]);

  const goTo = useCallback((dir) => {
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }, [images.length]);

  if (!isOpen || !images || images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Đóng">
          <X size={24} />
        </button>

        {images.length > 1 && (
          <>
            <button className="lightbox-nav lightbox-prev" onClick={() => goTo(-1)} aria-label="Ảnh trước">
              <ChevronLeft size={32} />
            </button>
            <button className="lightbox-nav lightbox-next" onClick={() => goTo(1)} aria-label="Ảnh sau">
              <ChevronRight size={32} />
            </button>
          </>
        )}

        <div className="lightbox-image-wrap">
          <Image
            src={current.src}
            alt={current.alt || ''}
            width={1200}
            height={800}
            className="lightbox-image"
            style={{ objectFit: 'contain', maxHeight: '80vh', width: 'auto' }}
          />
        </div>

        {current.caption && (
          <p className="lightbox-caption">{current.caption}</p>
        )}

        {images.length > 1 && (
          <div className="lightbox-counter">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {images.length > 1 && (
          <div className="lightbox-thumbnails">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`lightbox-thumb ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <Image src={img.src} alt="" width={60} height={40} style={{ objectFit: 'cover', borderRadius: '4px' }} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
