/**
 * @file modules/culture/CulturePage.js
 * @description Trang Văn hóa Quan họ (/van-hoa): hero → breadcrumb → số liệu
 * nhanh → vạch ngăn → 4 trụ cột → vạch ngăn → làn điệu cổ.
 * Server Component; chỉ SongList là client (state bài đang phát).
 * (Đã bỏ Lightbox của bản cũ – không có nút nào mở được.)
 */

import ParallaxHero from '@/components/shared/ParallaxHero/ParallaxHero';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import LotusDivider from '@/components/shared/LotusDivider/LotusDivider';
import { HERO_IMAGES } from '@/data/media';
import { cultureData, cultureStats } from '@/data/culture';
import { culture as t } from '@/locales/vi/culture';
import CultureStats from './components/CultureStats';
import PillarGrid from './components/PillarGrid';
import SongList from './components/SongList';

/**
 * @returns {JSX.Element}
 */
export default function CulturePage() {
  return (
    <div className="culture-page">
      <ParallaxHero
        image={HERO_IMAGES.culture}
        imageAlt={t.hero.imageAlt}
        badge={t.hero.badge}
        title={t.hero.title}
        description={t.hero.description}
        cutoutText={t.hero.cutoutText}
      />

      <Breadcrumb items={[{ label: t.breadcrumb }]} />

      <CultureStats stats={cultureStats} />

      <LotusDivider text={t.dividers.pillars} />
      <PillarGrid pillars={cultureData.pillars} />

      <LotusDivider text={t.dividers.songs} />
      <SongList songs={cultureData.songs} />
    </div>
  );
}
