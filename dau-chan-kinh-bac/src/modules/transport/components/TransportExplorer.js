/**
 * @file modules/transport/components/TransportExplorer.js
 * @description Khối 3 + 4 – Thanh lọc nhu cầu di chuyển và lưới thẻ phương tiện.
 * Client Component giữ state chế độ lọc; logic lọc / đếm ở logic/filterTransports.js.
 */

'use client';

import { useMemo, useState } from 'react';
import Icon from '@/components/shared/Icon/Icon';
import { cx } from '@/logic/classNames';
import { transport } from '@/locales/vi/transport';
import { ALL_TRANSPORTS, buildFilterOptions, filterTransports } from '../logic/filterTransports';
import TransportCard from './TransportCard';

const t = transport.filter;

/**
 * @param {Object} props
 * @param {Array<Object>} props.items - Danh sách phương tiện (data/transport.js).
 * @returns {JSX.Element}
 */
export default function TransportExplorer({ items }) {
  const [mode, setMode] = useState(ALL_TRANSPORTS);

  /** Nút lọc kèm số đếm – chỉ tính lại khi dữ liệu đổi */
  const options = useMemo(() => buildFilterOptions(items, t.modes), [items]);
  /** Danh sách sau lọc */
  const visible = useMemo(() => filterTransports(items, mode), [items, mode]);

  return (
    <>
      {/* Thanh lọc nhu cầu */}
      <section className="mode-filter">
        <div className="container">
          <div className="mode-filter__box">
            <span className="mode-filter__label icon-text">
              <Icon name="Compass" size={16} />
              {t.label}
            </span>
            <div className="mode-filter__options" role="group" aria-label={t.label}>
              {options.map((option) => {
                const isActive = option.key === mode;
                return (
                  <button
                    key={option.key}
                    type="button"
                    className={cx('mode-filter__btn', isActive && 'mode-filter__btn--active')}
                    onClick={() => setMode(option.key)}
                    aria-pressed={isActive}
                  >
                    <span>{option.label}</span>
                    <span className="mode-filter__count">{option.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Lưới thẻ phương tiện */}
      <section className="section section--flush-top">
        <div className="container">
          <div className="trans-grid">
            {visible.map((item) => (
              <TransportCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
