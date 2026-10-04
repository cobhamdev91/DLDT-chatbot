/**
 * @file modules/home/HomePage.js
 * @description Trang chủ: hero → vạch ngăn → dải danh mục → lịch trình gợi ý.
 * Server Component (chỉ TypewriterText bên trong hero là client).
 */

import LotusDivider from '@/components/shared/LotusDivider/LotusDivider';
import { homeCategories, itineraries } from '@/data/home';
import { home as t } from '@/locales/vi/home';
import HomeHero from './components/HomeHero';
import CategoryStrip from './components/CategoryStrip';
import ItinerarySection from './components/ItinerarySection';

/**
 * @returns {JSX.Element}
 */
export default function HomePage() {
  return (
    <div className="home">
      <HomeHero />
      <LotusDivider text={t.divider} />
      <CategoryStrip categories={homeCategories} />
      <ItinerarySection items={itineraries} />
    </div>
  );
}
