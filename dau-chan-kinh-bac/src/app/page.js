'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Utensils, 
  Music, 
  Hotel, 
  Palette, 
  Calendar, 
  Car, 
  Bike, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Bed,
  ClipboardList
} from 'lucide-react';
import { LotusIcon } from '@/components/Icons';
import TypewriterText from '@/components/TypewriterText';
import ItinerarySlideshow from '@/components/ItinerarySlideshow';
import { siteContent } from '@/data/content';
import styles from './page.module.css';

const { home: content } = siteContent;

const categoryIcons = [MapPin, Utensils, Music, CheckCircle2, Bed, Car, ClipboardList];

export default function Home() {
  return (
    <div className={styles.home}>
      {/* 1. MASTER HERO BANNER */}
      <section className={styles.masterHero}>
        <div className={styles.heroBgWrap}>
          <Image
            src="/images/hero_kinh_bac.jpg"
            alt={content.hero.heroImageAlt}
            fill
            priority
            className={styles.heroBgImg}
          />
          <div className={styles.heroGradientOverlay}></div>
        </div>

        <div className="container">
          <div className={styles.heroGrid}>
            {/* LEFT CONTENT */}
            <div className={styles.heroLeftCol}>
              <div className={styles.titleWithStamp}>
                <h1 className={styles.masterHeroTitle}>
                  <span className={styles.scriptDauChan}>{content.hero.titleLine1}</span>
                  <span className={styles.mainKinhBac}>
                    <TypewriterText 
                      texts={['Kinh Bắc', 'Bắc Ninh', 'Quan Họ']}
                      speed={100}
                      deleteSpeed={50}
                      pauseTime={3000}
                    />
                  </span>
                </h1>
              </div>

              <h2 className={styles.heroMotto}>
                {content.hero.motto}
              </h2>

              <p className={styles.heroDescription}>
                {content.hero.description}
              </p>

              <div className={styles.heroBtnRow}>
                <Link href="/diem-den" className={styles.btnStartExplore}>
                  <Sparkles size={16} /> {content.hero.ctaText}
                </Link>
              </div>
            </div>

            {/* RIGHT VISUAL: LIỀN ANH LIỀN CHỊ */}
            <div className={styles.heroRightCol}>
              <div className={styles.singersImageWrap}>
                <Image
                  src="/images/quan_ho_culture.jpg"
                  alt={content.hero.singersImageAlt}
                  width={620}
                  height={440}
                  priority
                  className={styles.singersImg}
                />
              </div>
            </div>
          </div>
        </div>

        {/* WAVE DIVIDER */}
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C180,120 360,0 540,60 C720,120 900,20 1080,60 C1260,100 1380,40 1440,60 L1440,120 L0,120 Z" fill="#FDF6EC"/>
          </svg>
        </div>
      </section>



      {/* 3. LOTUS DIVIDER 1 */}
      <div className="container">
        <div className="lotus-divider">
          <div className="lotus-divider-content">
            <LotusIcon size={26} color="#C83228" />
            <span>{content.lotusDivider1.text} <span className="red-text">{content.lotusDivider1.highlight}</span></span>
          </div>
        </div>
      </div>

      {/* 4. CATEGORY NAVIGATION STRIP (7 SQUIRCLE ICONS) */}
      <section className="container" style={{ width: '100%', maxWidth: '100%', overflowX: 'clip' }}>
        <div className="category-icon-strip">
          {content.categories.map((cat, idx) => {
            const IconComp = categoryIcons[idx];
            const Tag = cat.isAnchor ? 'a' : Link;
            const props = cat.isAnchor ? { href: cat.href } : { href: cat.href };
            return (
              <Tag key={cat.href} {...props} className="cat-icon-item">
                <div className="cat-icon-squircle" style={{ backgroundColor: cat.bgColor }}>
                  <IconComp size={32} color={cat.iconColor} strokeWidth={2.3} />
                </div>
                <span className="cat-icon-label">{cat.label}</span>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* 5. SUGGESTED ITINERARIES WITH SLIDESHOW */}
      <section className="container" style={{ marginBottom: '80px' }} id="lich-trinh">
        <div className={styles.itineraryHeaderRow}>
          <h3 className={styles.itineraryHeading}>
            {content.itineraryTitle}
          </h3>
          <Link href="/phuong-tien" className={styles.itineraryViewAll}>
            {content.itineraryViewAll}
          </Link>
        </div>

        <ItinerarySlideshow items={content.itineraries} />

        {/* Also show as grid for desktop */}
        <div className="itinerary-row" style={{ display: 'none' }}>
          {/* Hidden by default, slideshow takes over */}
        </div>
      </section>
    </div>
  );
}
