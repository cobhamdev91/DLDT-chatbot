/**
 * @file modules/culture/components/CultureStats.js
 * @description Hộp 4 ô số liệu nhanh (đếm số động khi cuộn tới).
 * Cấu hình số liệu ở data/culture.js, câu chữ ở locales/vi/culture.js.
 */

import AnimatedCounter from '@/components/shared/AnimatedCounter/AnimatedCounter';
import Icon from '@/components/shared/Icon/Icon';
import { cx, modifier } from '@/logic/classNames';
import { culture as t } from '@/locales/vi/culture';

/** Độ dày nét icon số liệu */
const ICON_STROKE = 1.8;

/**
 * Một ô số liệu: nhãn → (icon + số + đơn vị) → mô tả → dòng phụ.
 * Ô không có `end` (công trình biểu tượng) hiển thị tên thay cho số.
 * @param {{ stat: import('@/data/culture').CultureStat }} props
 * @returns {JSX.Element}
 */
function StatItem({ stat }) {
  const text = t.widgets[stat.id];
  const hasNumber = typeof stat.end === 'number';

  return (
    <div className="quick-widget-item">
      <span className="widget-label">{text.label}</span>

      {/* Hàng số liệu chính */}
      <div className={cx('widget-main-stat', !hasNumber && 'widget-main-stat--center')}>
        <Icon
          name={stat.icon}
          size={stat.iconSize}
          strokeWidth={ICON_STROKE}
          className={cx('widget-icon', modifier('widget-icon', stat.tone))}
        />
        {hasNumber && (
          <span className="widget-number">
            <AnimatedCounter end={stat.end} duration={stat.duration} suffix={stat.suffix} />
          </span>
        )}
        {text.unit && <span className="widget-unit">{text.unit}</span>}
      </div>

      {/* Mô tả: ô không có số nhấn vàng đậm */}
      <div className={cx('widget-desc', !hasNumber && 'widget-desc--accent')}>{text.desc}</div>
      <span className="widget-sub">{text.sub}</span>
    </div>
  );
}

/**
 * @param {{ stats: import('@/data/culture').CultureStat[] }} props
 * @returns {JSX.Element}
 */
export default function CultureStats({ stats }) {
  return (
    <section className="quick-widgets-wrapper">
      <div className="container">
        <div className="quick-widgets-box">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
