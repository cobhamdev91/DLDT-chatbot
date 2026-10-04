/**
 * @file components/shared/ParallaxHero/ParallaxHero.js
 * @description Banner đầu trang con: ảnh nền parallax, lớp phủ tối, chữ cắt
 * viền chìm phía sau (tuỳ chọn), badge – tiêu đề – mô tả và sóng đáy.
 */

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import WaveDivider from '@/components/shared/WaveDivider/WaveDivider';
import { useParallax } from '@/effects/scroll';

/**
 * @typedef {Object} HeroContent
 * @property {string} image        - Ảnh nền.
 * @property {string} [imageAlt]   - Alt ảnh (mặc định = tiêu đề).
 * @property {string} [badge]      - Nhãn nhỏ phía trên tiêu đề.
 * @property {string} title        - Tiêu đề trang (h1 duy nhất).
 * @property {string} [description] - Mô tả ngắn.
 * @property {string} [cutoutText] - Chữ cắt viền trang trí phía sau.
 */

/**
 * @param {HeroContent} props
 * @returns {JSX.Element}
 */
export default function ParallaxHero({ image, imageAlt, badge, title, description, cutoutText }) {
  const heroRef = useRef(null);
  const imageLayerRef = useRef(null);

  /* Hiệu ứng: ảnh trôi chậm 30% theo cuộn (biến --parallax-y) */
  useParallax(heroRef, imageLayerRef);

  return (
    <section className="parallax-hero" ref={heroRef}>
      {/* Lớp ảnh nền – nhận biến --parallax-y, ảnh con kế thừa */}
      <div className="parallax-hero-image" ref={imageLayerRef}>
        <Image src={image} alt={imageAlt || title} fill priority className="parallax-hero-img" />
      </div>
      <div className="parallax-hero-overlay" />

      {/* Chữ cắt viền trang trí (không phải tiêu đề ngữ nghĩa) */}
      {cutoutText && (
        <div className="cutout-text-layer" aria-hidden="true">
          <span className="cutout-text">{cutoutText}</span>
        </div>
      )}

      {/* Nội dung: badge – h1 – mô tả */}
      <div className="container parallax-hero-content">
        {badge && <span className="tag-badge">{badge}</span>}
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

      <WaveDivider />
    </section>
  );
}
