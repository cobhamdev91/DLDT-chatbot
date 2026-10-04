/**
 * @file modules/transport/TransportPage.js
 * @description Trang Phương tiện (/phuong-tien) – Server Component lắp ráp:
 * hero → breadcrumb → [ước tính lộ trình → danh bạ gọi nhanh → lọc + lưới thẻ
 * → timeline lộ trình mẫu → cẩm nang an toàn]. Toàn bộ khối nằm trong
 * TransportDetailProvider để dùng chung một popover chi tiết.
 * Dữ liệu được TIÊM qua props (DI) – component con không tự import data.
 */

import ParallaxHero from '@/components/shared/ParallaxHero/ParallaxHero';
import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import { HERO_IMAGES } from '@/data/media';
import {
  conciergeServices,
  itineraries,
  routeDestinations,
  routeOrigins,
  safetyRules,
  transportTypes,
} from '@/data/transport';
import { transport as t } from '@/locales/vi/transport';
import { TransportDetailProvider } from './context/TransportDetailContext';
import RouteEstimator from './components/RouteEstimator';
import ConciergeSection from './components/ConciergeSection';
import TransportExplorer from './components/TransportExplorer';
import ItineraryTimeline from './components/ItineraryTimeline';
import SafetyBento from './components/SafetyBento';

/**
 * @returns {JSX.Element}
 */
export default function TransportPage() {
  return (
    <div className="transport-page">
      <ParallaxHero
        image={HERO_IMAGES.transport}
        imageAlt={t.hero.imageAlt}
        badge={t.hero.badge}
        title={t.hero.title}
        description={t.hero.description}
        cutoutText={t.hero.cutoutText}
      />

      <Breadcrumb items={[{ label: t.breadcrumb }]} />

      <TransportDetailProvider items={transportTypes}>
        {/* 1. Ước tính lộ trình */}
        <RouteEstimator origins={routeOrigins} destinations={routeDestinations} />

        {/* 2. Danh bạ gọi nhanh */}
        <ConciergeSection services={conciergeServices} />

        {/* 3 + 4. Lọc nhu cầu + lưới thẻ phương tiện */}
        <TransportExplorer items={transportTypes} />

        {/* 5. Lộ trình mẫu dạng timeline */}
        <ItineraryTimeline stops={itineraries} />

        {/* 6. Cẩm nang an toàn */}
        <SafetyBento rules={safetyRules} />
      </TransportDetailProvider>
    </div>
  );
}
