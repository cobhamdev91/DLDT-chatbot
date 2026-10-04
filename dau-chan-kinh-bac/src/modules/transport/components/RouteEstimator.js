/**
 * @file modules/transport/components/RouteEstimator.js
 * @description Khối 1 – Ước tính & so sánh lộ trình Hà Nội → Bắc Ninh:
 * 2 dropdown (điểm đi / điểm đến) + 4 hàng phương tiện. Số liệu tính bằng
 * logic thuần (logic/route.js); component chỉ giữ state chọn & accordion.
 */

'use client';

import { useMemo, useState } from 'react';
import Icon from '@/components/shared/Icon/Icon';
import { cx } from '@/logic/classNames';
import { useTransientFlag } from '@/effects/timers';
import { transport } from '@/locales/vi/transport';
import { buildRouteRows, DEFAULT_DESTINATION, DEFAULT_ORIGIN, estimateRoute } from '../logic/route';
import { useTransportDetail } from '../context/TransportDetailContext';
import RouteRow from './RouteRow';

const t = transport.estimator;

/** Thời lượng nhịp "pulse" khi kết quả đổi (ms) – khớp animation CSS */
const PULSE_MS = 300;

/**
 * @param {Object} props
 * @param {ReadonlyArray<{id: string, name: string}>} props.origins - Điểm xuất phát (data).
 * @param {ReadonlyArray<{id: string, name: string, optionLabel?: string}>} props.destinations - Điểm đến (data).
 * @returns {JSX.Element}
 */
export default function RouteEstimator({ origins, destinations }) {
  const [origin, setOrigin] = useState(DEFAULT_ORIGIN);
  const [destination, setDestination] = useState(DEFAULT_DESTINATION);
  const [expandedKey, setExpandedKey] = useState(null);
  const [isPulsing, pulse] = useTransientFlag(PULSE_MS);
  const { open } = useTransportDetail();

  /** View-model tính lại chỉ khi đổi điểm đi / đến */
  const { distance, duration, rows } = useMemo(
    () => buildRouteRows(estimateRoute(origin, destination), t),
    [origin, destination]
  );

  /**
   * Tạo handler cho dropdown: cập nhật state + kích hoạt nhịp pulse.
   * @param {(value: string) => void} setter
   * @returns {(event: import('react').ChangeEvent<HTMLSelectElement>) => void}
   */
  const handleSelect = (setter) => (event) => {
    setter(event.target.value);
    pulse();
  };

  /** Đảo accordion: mở hàng mới hoặc đóng hàng đang mở. */
  const toggleRow = (key) => setExpandedKey((prev) => (prev === key ? null : key));

  return (
    <section className="estimator-section">
      <div className="container">
        <div className="estimator-box">
          {/* Tiêu đề + nhãn tổng khoảng cách / thời gian */}
          <div className="estimator-header">
            <div className="estimator-title">
              <Icon name="Compass" size={22} />
              <span>{t.title}</span>
            </div>
            <span className={cx('estimator-dist-badge', isPulsing && 'pulse-update')}>
              {t.summary(distance, duration)}
            </span>
          </div>

          {/* Viên nhập kép: điểm đi → điểm đến */}
          <div className="estimator-inputs-modern">
            <div className="input-group-modern">
              <label className="input-label-modern input-label-modern--origin" htmlFor="route-origin">
                <Icon name="MapPin" size={15} />
                <span>{t.originLabel}</span>
              </label>
              <select id="route-origin" className="select-modern" value={origin} onChange={handleSelect(setOrigin)}>
                {origins.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mũi tên trang trí giữa 2 trường */}
            <div className="swap-arrow-modern" aria-hidden="true">
              <Icon name="ArrowRight" size={20} />
            </div>

            <div className="input-group-modern">
              <label className="input-label-modern input-label-modern--destination" htmlFor="route-destination">
                <Icon name="Compass" size={15} />
                <span>{t.destinationLabel}</span>
              </label>
              <select
                id="route-destination"
                className="select-modern"
                value={destination}
                onChange={handleSelect(setDestination)}
              >
                {destinations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.optionLabel ?? item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Danh sách 4 hàng phương tiện */}
          <div className={cx('route-list-container', isPulsing && 'pulse-update')}>
            {rows.map((row) => (
              <RouteRow
                key={row.key}
                row={row}
                isExpanded={expandedKey === row.key}
                onToggle={toggleRow}
                onOpenDetail={open}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
