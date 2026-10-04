/**
 * @file modules/transport/components/TransportCard.js
 * @description Thẻ một phương tiện trong lưới: icon + nhãn đặc tính → tên →
 * nhãn giá → mô tả 2 dòng → 2 ưu điểm → chân thẻ (phân loại + nút chi tiết).
 */

import Icon from '@/components/shared/Icon/Icon';
import { cx, modifier } from '@/logic/classNames';
import { transportBadgeTones } from '@/data/transport';
import { transport } from '@/locales/vi/transport';
import OpenDetailButton from './OpenDetailButton';

const t = transport.card;

/** Số ưu điểm hiển thị trên thẻ (đầy đủ trong popover) */
const PROS_ON_CARD = 2;

/**
 * Rút gọn khoảng giá: bỏ phần chú thích trong ngoặc.
 * @example shortPrice('200.000 – 500.000 VNĐ/chuyến (xăng + phí)') // '200.000 – 500.000 VNĐ/chuyến'
 * @param {string} priceRange
 * @returns {string}
 */
const shortPrice = (priceRange) => priceRange.split('(')[0].trim();

/**
 * @param {Object} props
 * @param {Object} props.item - Bản ghi transportTypes.
 * @returns {JSX.Element}
 */
export default function TransportCard({ item }) {
  const badgeTone = transportBadgeTones[item.slug];

  return (
    <div className="trans-card">
      {/* Đầu thẻ: icon trái + nhãn đặc tính phải */}
      <div className="trans-card__head">
        <div className="trans-icon">
          <Icon name={item.iconName} size={22} strokeWidth={2.2} />
        </div>
        {badgeTone && (
          <span className={cx('trans-badge', modifier('trans-badge', badgeTone))}>{t.badges[badgeTone]}</span>
        )}
      </div>

      {/* Tên phương tiện */}
      <h3 className="trans-card__title">{item.name}</h3>

      {/* Nhãn giá rút gọn */}
      <div className="trans-card__price">
        <span>{shortPrice(item.priceRange)}</span>
      </div>

      {/* Mô tả ngắn – CSS giới hạn 2 dòng */}
      <p className="trans-card__summary">{item.summary}</p>

      {/* Ưu điểm nổi bật */}
      {item.pros?.length > 0 && (
        <div className="trans-card__pros">
          {item.pros.slice(0, PROS_ON_CARD).map((pro) => (
            <div key={pro} className="trans-card__pro">
              <Icon name="Check" size={14} strokeWidth={2.5} />
              <span>{pro}</span>
            </div>
          ))}
        </div>
      )}

      {/* Chân thẻ: phân loại + nút mở popover */}
      <div className="trans-card__footer">
        <span className="trans-card__category">{item.category}</span>
        <OpenDetailButton slug={item.slug} className="btn-ghost-cta">
          {t.cta}
        </OpenDetailButton>
      </div>
    </div>
  );
}
