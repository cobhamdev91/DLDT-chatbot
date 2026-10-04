/**
 * @file modules/stays/StaysPage.js
 * @description Trang danh sách Lưu trú (/luu-tru): hero → breadcrumb →
 * [đặt phòng + lưới thẻ] → banner tổng đài. Server Component.
 */

import ParallaxHero from '@/components/shared/ParallaxHero/ParallaxHero';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import { HERO_IMAGES } from '@/data/media';
import { accommodations } from '@/data/accommodations';
import { stays as t } from '@/locales/vi/stays';
import StayExplorer from './components/StayExplorer';
import HotlineBanner from './components/HotlineBanner';

/**
 * @returns {JSX.Element}
 */
export default function StaysPage() {
  return (
    <div className="stays-page">
      <ParallaxHero
        image={HERO_IMAGES.stays}
        imageAlt={t.hero.imageAlt}
        badge={t.hero.badge}
        title={t.hero.title}
        description={t.hero.description}
        cutoutText={t.hero.cutoutText}
      />

      <Breadcrumb items={[{ label: t.breadcrumb }]} />

      <StayExplorer items={accommodations} />

      <HotlineBanner />
    </div>
  );
}
