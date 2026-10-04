/**
 * @file modules/home/components/HomeHero.js
 * @description Hero trang chủ: ảnh nền mờ + gradient, cột trái (tiêu đề 2
 * dòng có chữ gõ luân phiên, khẩu hiệu, mô tả, nút) và cột phải (ảnh liền
 * anh liền chị), đáy là đường sóng.
 */

import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/shared/Icon/Icon';
import TypewriterText from '@/components/shared/TypewriterText/TypewriterText';
import WaveDivider from '@/components/shared/WaveDivider/WaveDivider';
import { ROUTES } from '@/data/routes';
import { HERO_IMAGES } from '@/data/media';
import { home as t } from '@/locales/vi/home';

/** Nhịp gõ chữ (ms): gõ · xoá · dừng giữa hai cụm */
const TYPEWRITER_TIMING = Object.freeze({ speed: 100, deleteSpeed: 50, pauseTime: 3000 });

/** Kích thước ảnh minh hoạ cột phải */
const SINGERS_SIZE = Object.freeze({ width: 620, height: 440 });

/**
 * @returns {JSX.Element}
 */
export default function HomeHero() {
  return (
    <section className="home-hero">
      {/* Lớp nền: ảnh + gradient */}
      <div className="home-hero__bg">
        <Image src={HERO_IMAGES.home} alt={t.hero.heroImageAlt} fill priority sizes="100vw" />
        <div className="home-hero__overlay" />
      </div>

      <div className="container">
        <div className="home-hero__grid">
          {/* ===== Cột trái: nội dung ===== */}
          <div className="home-hero__content">
            <div className="home-hero__title-row">
              <h1 className="home-hero__title">
                <span className="home-hero__script">{t.hero.titleLine1}</span>
                <span className="home-hero__main">
                  <TypewriterText texts={t.hero.typewriter} {...TYPEWRITER_TIMING} />
                </span>
              </h1>
            </div>

            <h2 className="home-hero__motto">{t.hero.motto}</h2>
            <p className="home-hero__desc">{t.hero.description}</p>

            {/* Hàng nút hành động */}
            <div className="home-hero__actions">
              <Link href={ROUTES.destinations} className="home-hero__cta">
                <Icon name="Sparkles" size={16} /> {t.hero.cta}
              </Link>
            </div>
          </div>

          {/* ===== Cột phải: ảnh liền anh liền chị ===== */}
          <div className="home-hero__visual">
            <div className="home-hero__visual-frame">
              <Image
                src={HERO_IMAGES.homeSingers}
                alt={t.hero.singersImageAlt}
                width={SINGERS_SIZE.width}
                height={SINGERS_SIZE.height}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <WaveDivider tall />
    </section>
  );
}
