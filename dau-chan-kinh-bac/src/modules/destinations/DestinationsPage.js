/**
 * @file modules/destinations/DestinationsPage.js
 * @description Trang danh sách Điểm đến (/diem-den): hero parallax →
 * breadcrumb → bộ lọc + lưới thẻ. Server Component; phần tương tác tách
 * sang DestinationExplorer (client).
 */

import ParallaxHero from '@/components/shared/ParallaxHero/ParallaxHero';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import { HERO_IMAGES } from '@/data/media';
import { destinations } from '@/data/destinations';
import { destinations as t } from '@/locales/vi/destinations';
import DestinationExplorer from './components/DestinationExplorer';

/**
 * @returns {JSX.Element}
 */
export default function DestinationsPage() {
  return (
    <div className="destinations-page">
      <ParallaxHero
        image={HERO_IMAGES.destinations}
        imageAlt={t.hero.imageAlt}
        badge={t.hero.badge}
        title={t.hero.title}
        description={t.hero.description}
        cutoutText={t.hero.cutoutText}
      />

      <Breadcrumb items={[{ label: t.breadcrumb }]} />

      <DestinationExplorer items={destinations} />
    </div>
  );
}
