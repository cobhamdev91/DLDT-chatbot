/**
 * @file modules/transport/components/SafetyBento.js
 * @description Khối 6 – Cẩm nang di chuyển an toàn dạng lưới bento:
 *   - Quy tắc 1: thẻ lớn (2 cột) nền sơn mài + dòng nhãn ưu tiên.
 *   - Quy tắc 2: thẻ cảnh báo (icon đỏ son).
 *   - Các quy tắc còn lại: thẻ thường (icon vàng đậm).
 * Server Component thuần – không có tương tác.
 */

import Icon from '@/components/shared/Icon/Icon';
import { cx } from '@/logic/classNames';
import { transport } from '@/locales/vi/transport';

const t = transport.safety;

/** Kích thước icon theo loại thẻ */
const ICON_SIZE = Object.freeze({ hero: 28, alert: 24, normal: 22 });

/**
 * Chọn biến thể thẻ theo vị trí quy tắc.
 * @param {number} index - Vị trí trong danh sách.
 * @returns {'hero'|'alert'|'normal'}
 */
const variantOf = (index) => (index === 0 ? 'hero' : index === 1 ? 'alert' : 'normal');

/**
 * @param {Object} props
 * @param {Array<{iconName: string, title: string, desc: string}>} props.rules - Quy tắc an toàn.
 * @returns {JSX.Element}
 */
export default function SafetyBento({ rules }) {
  return (
    <section className="section">
      <div className="container">
        {/* Tiêu đề khối */}
        <div className="section-header">
          <span className="tag-badge">{t.tag}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc">{t.description}</p>
        </div>

        {/* Lưới bento */}
        <div className="safety-bento">
          {rules.map((rule, index) => {
            const variant = variantOf(index);
            const isHero = variant === 'hero';
            const Heading = isHero ? 'h3' : 'h4';
            return (
              <div
                key={rule.title}
                className={cx('bento-card', variant !== 'normal' && `bento-card--${variant}`)}
              >
                {/* Icon (thẻ lớn kèm dòng nhãn ưu tiên) */}
                <div className={cx('bento-card__icon', isHero && 'icon-text icon-text--md')}>
                  <Icon name={rule.iconName} size={ICON_SIZE[variant]} />
                  {isHero && <span className="bento-card__eyebrow">{t.heroEyebrow}</span>}
                </div>
                <Heading className="bento-card__title">{rule.title}</Heading>
                <p className="bento-card__desc">{rule.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
