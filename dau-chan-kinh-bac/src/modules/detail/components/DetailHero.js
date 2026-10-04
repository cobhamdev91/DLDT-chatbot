/**
 * @file modules/detail/components/DetailHero.js
 * @description Hero của trang chi tiết: ảnh nền mờ + lớp phủ gradient +
 * badge, tiêu đề H1 và đoạn dẫn. Chỉ hiển thị – dữ liệu do builder chuẩn bị.
 */

import Image from 'next/image';
import Icon from '@/components/shared/Icon/Icon';
import IconText from '@/components/shared/IconText/IconText';

/**
 * Đoạn dẫn dưới tiêu đề: có icon → dùng cụm IconText, không → đoạn văn thường.
 * @param {{ lead: import('@/modules/detail/types').DetailHeroModel['lead'] }} props
 * @returns {JSX.Element|null}
 */
function DetailLead({ lead }) {
  if (!lead?.text) return null;

  // Không có icon: đoạn văn thuần
  if (!lead.icon) return <p className="detail-lead">{lead.text}</p>;

  // Có icon: "[tiền tố] (icon) nội dung" nằm cùng hàng
  return (
    <IconText as="p" className="detail-lead">
      {lead.prefix}
      <Icon name={lead.icon} size={16} />
      {lead.text}
    </IconText>
  );
}

/**
 * @param {{ hero: import('@/modules/detail/types').DetailHeroModel }} props
 * @returns {JSX.Element}
 */
export default function DetailHero({ hero }) {
  return (
    <section className="detail-hero">
      {/* Lớp ảnh nền phủ kín (ưu tiên tải sớm vì nằm đầu trang) */}
      <div className="detail-hero__image">
        <Image src={hero.image} alt={hero.alt} fill priority sizes="100vw" />
      </div>

      {/* Lớp phủ gradient tối giúp chữ dễ đọc */}
      <div className="detail-hero__overlay" />

      {/* Khối chữ: badge → tiêu đề → đoạn dẫn */}
      <div className="container detail-hero__content">
        <span className="detail-badge">{hero.badge}</span>
        <h1 className="detail-title">{hero.title}</h1>
        <DetailLead lead={hero.lead} />
      </div>
    </section>
  );
}
