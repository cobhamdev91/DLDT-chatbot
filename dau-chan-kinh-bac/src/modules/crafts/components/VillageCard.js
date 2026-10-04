/**
 * @file modules/crafts/components/VillageCard.js
 * @description Thẻ lật một làng nghề truyền thống: mặt trước ảnh phủ tràn + badge ngành nghề,
 * mặt sau có badge điểm nổi bật, thời gian tham quan và địa điểm rút gọn.
 */

'use client';

import FlipCard from '@/components/shared/FlipCard/FlipCard';
import Icon from '@/components/shared/Icon/Icon';
import IconText from '@/components/shared/IconText/IconText';
import { ROUTES, detailPath } from '@/data/routes';
import { FALLBACK_IMAGES } from '@/data/media';
import { shortLocation, truncate } from '@/logic/text';

/** Số ký tự giới thiệu ngắn ở mặt sau */
const HISTORY_PREVIEW_LENGTH = 110;

/**
 * @param {{ village: Object }} props - Bản ghi làng nghề.
 * @returns {JSX.Element}
 */
export default function VillageCard({ village }) {
  /** Chân mặt sau: thời gian (trái) – địa điểm (phải) */
  const footer = (
    <div className="flip-card-meta">
      <IconText gap="xs" className="flip-card-meta__accent">
        <Icon name="Clock" size={13} /> {village.duration}
      </IconText>
      <IconText gap="xs" className="flip-card-meta__muted">
        <Icon name="MapPin" size={13} /> {shortLocation(village.location)}
      </IconText>
    </div>
  );

  return (
    <FlipCard
      image={village.image || FALLBACK_IMAGES.crafts}
      imageAlt={village.name}
      frontTitle={village.name}
      frontBadge={village.category}
      backTitle={village.name}
      backContent={village.history && truncate(village.history, HISTORY_PREVIEW_LENGTH)}
      href={detailPath(ROUTES.crafts, village.slug)}
      backFooter={footer}
    >
      {/* Badge điểm nổi bật đầu tiên của làng nghề */}
      {village.highlights?.[0] && (
        <div className="flip-card-highlight-badge">
          <span className="flip-card-highlight-icon">
            <Icon name="Sparkles" size={12} />
          </span>
          <span className="flip-card-highlight-text">{village.highlights[0]}</span>
        </div>
      )}
    </FlipCard>
  );
}
