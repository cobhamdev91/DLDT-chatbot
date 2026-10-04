/**
 * @file modules/destinations/components/DestinationCard.js
 * @description Thẻ lật cho một điểm đến: mặt sau gồm 2 chip điểm nổi bật và
 * hàng meta (thời lượng · địa điểm).
 */

'use client';

import FlipCard from '@/components/shared/FlipCard/FlipCard';
import Icon from '@/components/shared/Icon/Icon';
import IconText from '@/components/shared/IconText/IconText';
import { ROUTES, detailPath } from '@/data/routes';
import { FALLBACK_IMAGES } from '@/data/media';
import { destinations as t } from '@/locales/vi/destinations';

/** Số chip điểm nổi bật hiển thị ở mặt sau */
const MAX_TAGS = 2;

/**
 * @param {{ dest: Object }} props - Bản ghi điểm đến.
 * @returns {JSX.Element}
 */
export default function DestinationCard({ dest }) {
  /** Chân mặt sau: thời lượng (nhấn) – địa điểm (phụ) */
  const footer = (
    <div className="flip-card-meta">
      <IconText gap="xs" className="flip-card-meta__accent">
        <Icon name="Clock" size={13} /> {dest.duration || t.list.defaultDuration}
      </IconText>
      <IconText gap="xs" className="flip-card-meta__muted">
        <Icon name="MapPin" size={13} /> {dest.location}
      </IconText>
    </div>
  );

  return (
    <FlipCard
      image={dest.image || FALLBACK_IMAGES.generic}
      imageAlt={dest.name}
      frontTitle={dest.name}
      frontSubtitle={dest.subtitle}
      frontBadge={dest.category}
      backTitle={dest.name}
      backContent={dest.subtitle}
      href={detailPath(ROUTES.destinations, dest.slug)}
      backFooter={footer}
    >
      {/* Chip điểm nổi bật (tối đa 2) */}
      {dest.highlights && (
        <div className="flip-card-tags">
          {dest.highlights.slice(0, MAX_TAGS).map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>
      )}
    </FlipCard>
  );
}
