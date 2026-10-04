/**
 * @file modules/crafts/CraftsPage.js
 * @description Trang danh sách Làng nghề (/lang-nghe): hero → breadcrumb →
 * tìm kiếm + lưới ảnh. Server Component; phần tương tác ở VillageExplorer.
 */

import ParallaxHero from '@/components/shared/ParallaxHero/ParallaxHero';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import { HERO_IMAGES } from '@/data/media';
import { craftVillages } from '@/data/craftVillages';
import { crafts as t } from '@/locales/vi/crafts';
import VillageExplorer from './components/VillageExplorer';

/**
 * @returns {JSX.Element}
 */
export default function CraftsPage() {
  return (
    <div className="craft-villages-page">
      <ParallaxHero
        image={HERO_IMAGES.crafts}
        imageAlt={t.hero.imageAlt}
        badge={t.hero.badge}
        title={t.hero.title}
        description={t.hero.description}
        cutoutText={t.hero.cutoutText}
      />

      <Breadcrumb items={[{ label: t.breadcrumb }]} />

      <VillageExplorer villages={craftVillages} />
    </div>
  );
}
