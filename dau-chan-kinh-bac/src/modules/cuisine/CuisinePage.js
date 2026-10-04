/**
 * @file modules/cuisine/CuisinePage.js
 * @description Trang danh sách Ẩm thực (/am-thuc): hero → breadcrumb →
 * [lọc + lưới món] → vạch ngăn → bảng quán gia truyền.
 * Server Component; phần tương tác nằm trong FoodExplorer.
 * (Đã bỏ Lightbox của bản cũ – component không bao giờ được mở.)
 */

import ParallaxHero from '@/components/shared/ParallaxHero/ParallaxHero';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import LotusDivider from '@/components/shared/LotusDivider/LotusDivider';
import { HERO_IMAGES } from '@/data/media';
import { foods } from '@/data/foods';
import { restaurants } from '@/data/restaurants';
import { cuisine as t } from '@/locales/vi/cuisine';
import FoodExplorer from './components/FoodExplorer';
import RestaurantTable from './components/RestaurantTable';

/**
 * @returns {JSX.Element}
 */
export default function CuisinePage() {
  return (
    <div className="food-page">
      <ParallaxHero
        image={HERO_IMAGES.cuisine}
        imageAlt={t.hero.imageAlt}
        badge={t.hero.badge}
        title={t.hero.title}
        description={t.hero.description}
        cutoutText={t.hero.cutoutText}
      />

      <Breadcrumb items={[{ label: t.breadcrumb }]} />

      <FoodExplorer foods={foods} />

      <LotusDivider text={t.list.restaurantDivider} />

      <RestaurantTable restaurants={restaurants} />
    </div>
  );
}
