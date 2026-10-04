/**
 * @file modules/detail/components/RelatedCards.js
 * @description Lưới thẻ "nội dung liên quan" ở cuối trang chi tiết.
 */

import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/shared/Icon/Icon';
import IconText from '@/components/shared/IconText/IconText';

/**
 * Phụ đề thẻ: có cờ `subtitleIcon` → kèm icon ghim đỏ phía trước.
 * @param {{ card: import('@/modules/detail/types').RelatedCardModel }} props
 * @returns {JSX.Element}
 */
function CardSubtitle({ card }) {
  if (!card.subtitleIcon) return <p className="related-card__subtitle">{card.subtitle}</p>;
  return (
    <IconText as="p" gap="xs" className="related-card__subtitle">
      <Icon name="MapPin" size={14} /> {card.subtitle}
    </IconText>
  );
}

/**
 * Một thẻ liên quan: ảnh + badge, tiêu đề, phụ đề, [giá] + nút xem chi tiết.
 * @param {{ card: import('@/modules/detail/types').RelatedCardModel }} props
 * @returns {JSX.Element}
 */
function RelatedCard({ card }) {
  const cta = (
    <Link href={card.href} className="btn-sm btn-outline">
      {card.cta}
    </Link>
  );

  return (
    <div className="related-card">
      {/* Khung ảnh + nhãn góc */}
      <div className="related-card__image-wrap">
        <Image src={card.image} alt={card.title} width={400} height={220} className="related-card__image" />
        <span className="related-card__badge">{card.badge}</span>
      </div>

      {/* Phần chữ */}
      <div className="related-card__content">
        <h3 className="related-card__title">{card.title}</h3>
        <CardSubtitle card={card} />

        {/* Có giá → chân thẻ (giá + nút); không → chỉ nút */}
        {card.price ? (
          <div className="related-card__footer">
            <span className="related-card__price">{card.price}</span>
            {cta}
          </div>
        ) : (
          cta
        )}
      </div>
    </div>
  );
}

/**
 * @param {{ related: import('@/modules/detail/types').DetailViewModel['related'] }} props
 * @returns {JSX.Element|null}
 */
export default function RelatedCards({ related }) {
  if (!related.items.length) return null;

  return (
    <section className="related-section">
      <h2>{related.title}</h2>
      <div className="card-grid">
        {related.items.map((card) => (
          <RelatedCard key={card.key} card={card} />
        ))}
      </div>
    </section>
  );
}
