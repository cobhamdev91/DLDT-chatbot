/**
 * @file modules/about/AboutPage.js
 * @description Trang "Về chúng tôi" (/ve-chung-toi): hero → breadcrumb →
 * khối sứ mệnh (giới thiệu, vạch hoa sen, 4 giá trị cốt lõi, hộp CTA).
 * Sửa lỗi bản cũ: ParallaxHero nhận sai prop (`bgImage`, `subtitle`) nên
 * hero mất ảnh nền & mô tả – nay truyền đúng `image`, `description`.
 */

import Link from 'next/link';
import ParallaxHero from '@/components/shared/ParallaxHero/ParallaxHero';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import LotusDivider from '@/components/shared/LotusDivider/LotusDivider';
import Icon from '@/components/shared/Icon/Icon';
import { ROUTES } from '@/data/routes';
import { HERO_IMAGES } from '@/data/media';
import { aboutValues } from '@/data/about';
import { about as t } from '@/locales/vi/about';
import { cx, modifier } from '@/logic/classNames';

/**
 * Thẻ một giá trị cốt lõi.
 * @param {{ value: import('@/data/about').AboutValue }} props
 * @returns {JSX.Element}
 */
function ValueCard({ value }) {
  const text = t.values[value.id];
  return (
    <div className="value-card">
      <div className={cx('value-card__icon', modifier('value-card__icon', value.tone))}>
        <Icon name={value.icon} size={28} />
      </div>
      <h3 className="value-card__title">{text.title}</h3>
      <p className="value-card__desc">{text.desc}</p>
    </div>
  );
}

/**
 * @returns {JSX.Element}
 */
export default function AboutPage() {
  const { intro } = t.mission;

  return (
    <>
      <ParallaxHero
        image={HERO_IMAGES.about}
        imageAlt={t.hero.imageAlt}
        title={t.hero.title}
        description={t.hero.description}
        cutoutText={t.hero.cutoutText}
      />

      <Breadcrumb items={[{ label: t.breadcrumb }]} />

      {/* Section nền kem bao toàn bộ nội dung */}
      <section className="about-mission">
        <div className="container about-mission__inner">
          {/* Cụm giới thiệu sứ mệnh */}
          <div className="about-intro">
            <span className="about-intro__eyebrow">{t.mission.eyebrow}</span>
            <h2 className="about-intro__title">{t.mission.title}</h2>
            <p className="about-intro__text">
              {intro.before}
              <strong>{intro.strong}</strong>
              {intro.after}
            </p>
          </div>

          <LotusDivider compact iconSize={24} />

          {/* Lưới 4 giá trị cốt lõi */}
          <div className="about-values">
            {aboutValues.map((value) => (
              <ValueCard key={value.id} value={value} />
            ))}
          </div>

          {/* Hộp kêu gọi hành động */}
          <div className="about-cta">
            <h3 className="about-cta__title">{t.cta.title}</h3>
            <p className="about-cta__text">{t.cta.text}</p>
            <div className="about-cta__actions">
              <Link href={ROUTES.destinations} className="about-cta__btn about-cta__btn--primary">
                {t.cta.primary} <Icon name="ArrowRight" size={16} />
              </Link>
              <Link href={ROUTES.transport} className="about-cta__btn about-cta__btn--ghost">
                {t.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
