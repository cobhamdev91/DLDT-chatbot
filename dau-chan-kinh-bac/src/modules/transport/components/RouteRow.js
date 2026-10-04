/**
 * @file modules/transport/components/RouteRow.js
 * @description Một hàng phương tiện trong bộ ước tính (kiểu Rome2Rio):
 * [phương tiện + nhãn] [thời gian + cung đường] [giá] [nút] + ngăn accordion.
 */

'use client';

import Icon from '@/components/shared/Icon/Icon';
import { cx, modifier } from '@/logic/classNames';
import { transport } from '@/locales/vi/transport';

const t = transport.estimator;

/**
 * Chặn sự kiện nhấp lan lên hàng (tránh vừa mở popover vừa đảo accordion).
 * @param {import('react').MouseEvent} event
 */
const stopRowToggle = (event) => event.stopPropagation();

/**
 * @param {Object} props
 * @param {import('../logic/route').RouteRow} props.row - View-model hàng.
 * @param {boolean} props.isExpanded - Ngăn accordion đang mở.
 * @param {(key: string) => void} props.onToggle - Đảo accordion theo khoá.
 * @param {(slug: string) => void} props.onOpenDetail - Mở popover chi tiết.
 * @returns {JSX.Element}
 */
export default function RouteRow({ row, isExpanded, onToggle, onOpenDetail }) {
  /** Đảo accordion của chính hàng này. */
  const toggle = () => onToggle(row.key);

  return (
    <div className={cx('route-row-card', isExpanded && 'is-expanded', row.recommended && 'is-recommended')}>
      {/* Hàng chính – nhấp để mở/đóng ngăn chi tiết */}
      <div className="route-row-main" onClick={toggle}>
        {/* Cột 1: phương tiện & nhãn */}
        <div className="route-col-mode">
          <div className={cx('route-mode-icon-box', modifier('route-mode-icon-box', row.key))}>
            <Icon name={row.icon} size={26} />
          </div>
          <div className="route-mode-meta">
            <div className="route-mode-title">{row.name}</div>
            <div className="route-mode-tags">
              <span className={cx('route-badge', modifier('route-badge', row.badgeTone))}>{row.badge}</span>
              <span className="route-sub-tag">{row.tag}</span>
            </div>
          </div>
        </div>

        {/* Cột 2: thời gian & cung đường */}
        <div className="route-col-journey">
          <div className="route-time-highlight">
            <Icon name="Clock" size={16} />
            <span>{row.time}</span>
          </div>
          <div className="route-path-summary" title={row.route}>
            <Icon name="MapPin" size={13} />
            <span>{row.route}</span>
          </div>
        </div>

        {/* Cột 3: chi phí */}
        <div className="route-col-fare">
          <div className="route-fare-amount">{row.cost}</div>
          <div className="route-fare-note">{t.fareNote}</div>
        </div>

        {/* Cột 4: hành động (không lan sự kiện lên hàng) */}
        <div className="route-col-cta" onClick={stopRowToggle}>
          <button type="button" className="btn-route-action" onClick={() => onOpenDetail(row.slug)}>
            <span>{t.detailCta}</span>
            <Icon name="ArrowRight" size={14} />
          </button>
          <button
            type="button"
            className={cx('btn-route-toggle', isExpanded && 'open')}
            onClick={toggle}
            aria-label={t.toggleAria}
            aria-expanded={isExpanded}
          >
            <Icon name="ChevronDown" size={18} />
          </button>
        </div>
      </div>

      {/* Ngăn accordion: trải nghiệm + lời khuyên */}
      {isExpanded && (
        <div className="route-accordion-drawer">
          <div className="route-drawer-content">
            <div className="drawer-item">
              <strong>{t.drawer.experience}</strong>
              <p>{row.desc}</p>
            </div>
            <div className="drawer-item">
              <strong>{t.drawer.advice}</strong>
              <p>{row.advice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
