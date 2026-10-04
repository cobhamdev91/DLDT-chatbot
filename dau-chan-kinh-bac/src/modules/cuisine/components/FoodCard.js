/**
 * @file modules/cuisine/components/FoodCard.js
 * @description Thẻ lật một món ăn: mặt sau có dòng địa chỉ quán đầu tiên
 * (+N nơi) và chân thẻ hiển thị khoảng giá.
 */

'use client';

import FlipCard from '@/components/shared/FlipCard/FlipCard';
import Icon from '@/components/shared/Icon/Icon';
import IconText from '@/components/shared/IconText/IconText';
import { ROUTES, detailPath } from '@/data/routes';
import { FALLBACK_IMAGES } from '@/data/media';
import { cuisine as t } from '@/locales/vi/cuisine';

/**
 * Dòng địa chỉ quán đầu tiên (một dòng, cắt "..." khi dài).
 * @param {{ locations: Array<{ name: string }> }} props
 * @returns {JSX.Element}
 */
function FirstLocation({ locations }) {
  const extra = locations.length - 1;
  return (
    <div className="flip-card-location">
      <span className="flip-card-location__icon">
        <Icon name="MapPin" size={12} />
      </span>
      <span>{locations[0].name}</span>
      {extra > 0 && <span className="flip-card-location__more">{t.list.moreLocations(extra)}</span>}
    </div>
  );
}

/**
 * @param {{ food: Object }} props - Bản ghi món ăn.
 * @returns {JSX.Element}
 */
export default function FoodCard({ food }) {
  return (
    <FlipCard
      image={food.image || FALLBACK_IMAGES.cuisine}
      imageAlt={food.name}
      frontTitle={food.name}
      frontSubtitle={food.features || food.description}
      frontBadge={food.origin}
      backTitle={food.name}
      backContent={food.taste || food.description}
      href={detailPath(ROUTES.cuisine, food.slug)}
      backFooter={
        /* Chân thẻ: khoảng giá nhấn đậm */
        <IconText className="flip-card-meta__accent flip-card-meta__accent--strong">
          <Icon name="Coins" size={14} /> {food.priceRange}
        </IconText>
      }
    >
      {food.locations?.length > 0 && <FirstLocation locations={food.locations} />}
    </FlipCard>
  );
}
