/**
 * @file modules/stays/components/StayCard.js
 * @description Thẻ lật một cơ sở lưu trú: mặt sau có badge tiện ích nổi bật,
 * chân thẻ "Giá từ" + địa điểm rút gọn.
 */

'use client';

import FlipCard from '@/components/shared/FlipCard/FlipCard';
import Icon from '@/components/shared/Icon/Icon';
import IconText from '@/components/shared/IconText/IconText';
import { ROUTES, detailPath } from '@/data/routes';
import { FALLBACK_IMAGES } from '@/data/media';
import { stays as t } from '@/locales/vi/stays';
import { shortLocation, truncate } from '@/logic/text';
import { priceFrom } from '../logic/filterStays';

/** Số ký tự mô tả ngắn ở mặt sau */
const STORY_PREVIEW_LENGTH = 100;

/**
 * @param {{ stay: Object }} props - Bản ghi lưu trú.
 * @returns {JSX.Element}
 */
export default function StayCard({ stay }) {
  /** Chân mặt sau: cột "Giá từ" (trái) – địa điểm (phải) */
  const footer = (
    <div className="flip-card-meta">
      <div className="flip-card-price">
        <small>{t.list.priceFrom}</small>
        <strong>{t.list.currency(priceFrom(stay.priceRange))}</strong>
      </div>
      <IconText gap="xs" className="flip-card-meta__muted">
        <Icon name="MapPin" size={13} /> {shortLocation(stay.location)}
      </IconText>
    </div>
  );

  return (
    <FlipCard
      image={stay.image || FALLBACK_IMAGES.generic}
      imageAlt={stay.name}
      frontTitle={stay.name}
      frontBadge={stay.stars > 0 ? t.list.cardBadge(stay.stars, stay.type) : stay.type}
      backTitle={stay.name}
      backContent={stay.story && truncate(stay.story, STORY_PREVIEW_LENGTH)}
      href={detailPath(ROUTES.stays, stay.slug)}
      backFooter={footer}
    >
      {/* Badge tiện ích nổi bật đầu tiên */}
      {stay.amenities?.[0] && (
        <div className="flip-card-highlight-badge">
          <span className="flip-card-highlight-icon">
            <Icon name="Star" size={12} />
          </span>
          <span className="flip-card-highlight-text">{stay.amenities[0]}</span>
        </div>
      )}
    </FlipCard>
  );
}
