/**
 * @file modules/home/components/ItinerarySection.js
 * @description Khối "Lịch trình gợi ý": hàng tiêu đề + liên kết "Xem tất cả"
 * và lưới 3 thẻ lịch trình (thay cho ItinerarySlideshow cũ).
 */

import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/shared/Icon/Icon';
import IconText from '@/components/shared/IconText/IconText';
import { ROUTES, ANCHORS } from '@/data/routes';
import { home as t } from '@/locales/vi/home';

/** Số thẻ hiển thị */
const MAX_ITEMS = 3;

/**
 * Một thẻ lịch trình: ảnh + nhãn thời lượng, tiêu đề, mô tả, thanh meta.
 * @param {{ item: import('@/data/home').Itinerary }} props
 * @returns {JSX.Element}
 */
function ItineraryCard({ item }) {
  return (
    <div className="itin-master-card">
      {/* Khung ảnh + nhãn thời lượng */}
      <div className="itin-img-box">
        <Image src={item.image} alt={item.imageAlt || item.title} fill sizes="(max-width: 900px) 100vw, 33vw" />
        <span className="itin-badge-pill">{item.duration}</span>
      </div>

      {/* Phần chữ */}
      <div className="itin-content-box">
        <h4 className="itin-card-title">{item.title}</h4>
        <p className="itin-card-sub">{item.subtitle}</p>

        {/* Thanh meta: điểm đến · ăn/ở · phương tiện · chi tiết */}
        <div className="itin-meta-bar">
          <IconText gap="xs" className="itin-meta--place">
            <Icon name="MapPin" size={14} /> {item.points}
          </IconText>
          <IconText gap="xs" className="itin-meta--food">
            <Icon name={item.foodIcon} size={14} /> {item.food}
          </IconText>
          <IconText gap="xs" className="itin-meta--transport">
            <Icon name={item.transportIcon} size={14} /> {item.transport}
          </IconText>
          <Link href={ROUTES.transport} className="itin-detail-btn">
            {t.itinerary.detail}
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{ items: import('@/data/home').Itinerary[] }} props
 * @returns {JSX.Element}
 */
export default function ItinerarySection({ items }) {
  return (
    <section id={ANCHORS.itinerary} className="container spacer-bottom-lg">
      {/* Hàng tiêu đề */}
      <div className="itinerary-header-row">
        <h3 className="itinerary-heading">{t.itinerary.title}</h3>
        <Link href={ROUTES.transport} className="itinerary-view-all">
          {t.itinerary.viewAll}
        </Link>
      </div>

      {/* Lưới 3 thẻ */}
      <div className="slideshow-container">
        {items.slice(0, MAX_ITEMS).map((item) => (
          <div key={item.title} className="slideshow-slide">
            <ItineraryCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
