/**
 * @file modules/transport/components/RouteEstimator.js
 * @description Khối 1 – Ước tính & so sánh lộ trình Hà Nội → Bắc Ninh:
 * 2 dropdown (điểm đi / điểm đến) + 4 hàng phương tiện. Số liệu tính bằng
 * logic thuần (logic/route.js); component chỉ giữ state chọn & accordion.
 */

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Dropdown from '@/components/shared/Dropdown/Dropdown';
import Icon from '@/components/shared/Icon/Icon';
import { cx } from '@/logic/classNames';
import { useTransientFlag } from '@/effects/timers';
import { transport } from '@/locales/vi/transport';
import { buildRouteRows, DEFAULT_DESTINATION, DEFAULT_ORIGIN, estimateRoute } from '../logic/route';
import { useTransportDetail } from '../context/TransportDetailContext';
import RouteRow from './RouteRow';
import RouteLoadingDrawing from './RouteLoadingDrawing';

const t = transport.estimator;

/** Thời lượng nhịp "pulse" khi kết quả đổi (ms) – khớp animation CSS */
const PULSE_MS = 300;

/** Thời gian hiển thị loading nét vẽ Dấu chân Kinh Bắc (ms) */
const LOADING_DURATION_MS = 750;

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
  const [isLoading, setIsLoading] = useState(false);
  const [isPulsing, pulse] = useTransientFlag(PULSE_MS);
  const { open } = useTransportDetail();
  const loadingTimerRef = useRef(null);

  const originOptions = useMemo(
    () => origins.map((item) => ({ value: item.id, label: item.name })),
    [origins]
  );

  const destinationOptions = useMemo(
    () => destinations.map((item) => ({ value: item.id, label: item.optionLabel ?? item.name })),
    [destinations]
  );

  /** View-model tính lại chỉ khi đổi điểm đi / đến */
  const { distance, duration, rows } = useMemo(
    () => buildRouteRows(estimateRoute(origin, destination), t),
    [origin, destination]
  );

  /**
   * Kích hoạt chuyển cảnh loading nét vẽ Dấu chân Kinh Bắc khi thay đổi điểm đi / đến.
   */
  const triggerLoadingTransition = useCallback(
    (setter, value) => {
      setter(value);
      setIsLoading(true);

      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }

      loadingTimerRef.current = setTimeout(() => {
        setIsLoading(false);
        pulse();
      }, LOADING_DURATION_MS);
    },
    [pulse]
  );

  const handleOriginChange = useCallback(
    (newOrigin) => triggerLoadingTransition(setOrigin, newOrigin),
    [triggerLoadingTransition]
  );

  const handleDestinationChange = useCallback(
    (newDest) => triggerLoadingTransition(setDestination, newDest),
    [triggerLoadingTransition]
  );

  /** Xoá timer nếu component unmount */
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

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
            <span
              className={cx(
                'estimator-dist-badge',
                isPulsing && 'pulse-update',
                isLoading && 'is-loading'
              )}
            >
              {isLoading ? (
                <>
                  <Icon name="Sparkles" size={13} />
                  <span>{t.calculating}</span>
                </>
              ) : (
                t.summary(distance, duration)
              )}
            </span>
          </div>

          {/* Viên nhập kép: điểm đi → điểm đến */}
          <div className="estimator-inputs-modern">
            <div className="input-group-modern">
              <label className="input-label-modern input-label-modern--origin" htmlFor="route-origin">
                <Icon name="MapPin" size={15} />
                <span>{t.originLabel}</span>
              </label>
              <Dropdown
                id="route-origin"
                value={origin}
                onChange={handleOriginChange}
                options={originOptions}
              />
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
              <Dropdown
                id="route-destination"
                value={destination}
                onChange={handleDestinationChange}
                options={destinationOptions}
              />
            </div>
          </div>

          {/* Danh sách 4 hàng phương tiện HOẶC Nét vẽ Loading Dấu chân Kinh Bắc */}
          {isLoading ? (
            <RouteLoadingDrawing />
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
}
