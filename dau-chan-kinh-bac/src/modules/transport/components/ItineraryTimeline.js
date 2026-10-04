/**
 * @file modules/transport/components/ItineraryTimeline.js
 * @description Khối 5 – Lộ trình du lịch mẫu dạng checklist timeline:
 *   - Cuộn xuống qua ngưỡng → tự đánh dấu chặng; cuộn ngược → hoàn tác
 *     (hiệu ứng ở effects/useTimelineAutoCheck.js).
 *   - Nhấp vào chặng để đánh dấu / hoàn tác thủ công.
 *   - Thanh xanh tiến độ cao theo biến CSS `--timeline-progress` (0 → 100).
 */

'use client';

import { useCallback, useRef, useState } from 'react';
import Icon from '@/components/shared/Icon/Icon';
import { cx } from '@/logic/classNames';
import { useCssVariable } from '@/effects/cssVariable';
import { transport } from '@/locales/vi/transport';
import { countCompleted, progressPercent, toggleStop } from '../logic/timeline';
import { useTimelineAutoCheck } from '../effects/useTimelineAutoCheck';

const t = transport.timeline;

/** Icon mặc định khi chặng không khai báo iconName */
const FALLBACK_ICON = 'Compass';

/**
 * @param {Object} props
 * @param {Array<{id: number, title: string, iconName?: string, target: string, route: string, highlight: string}>} props.stops
 *   - Danh sách chặng (data/transport.js → itineraries).
 * @returns {JSX.Element}
 */
export default function ItineraryTimeline({ stops }) {
  const [completed, setCompleted] = useState({});
  const wrapperRef = useRef(null);

  const done = countCompleted(stops, completed);
  useTimelineAutoCheck(wrapperRef, setCompleted);
  useCssVariable(wrapperRef, '--timeline-progress', progressPercent(done, stops.length));

  /** Nhấp chặng: đảo trạng thái hoàn thành. */
  const handleToggle = useCallback((id) => setCompleted((prev) => toggleStop(prev, id)), []);

  return (
    <section className="section">
      <div className="container">
        {/* Tiêu đề khối + viên tiến độ */}
        <div className="section-header section-header--compact">
          <span className="tag-badge">{t.tag}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc">{t.description}</p>
          <div className="timeline-progress">
            <div className="timeline-progress-pill" aria-live="polite">
              <span className="progress-dot-indicator" />
              <span>{t.progress(done, stops.length)}</span>
            </div>
          </div>
        </div>

        {/* Khung timeline: trục nền + trục tiến độ + các chặng */}
        <div ref={wrapperRef} className="timeline-checklist-wrapper">
          <div className="timeline-track-base" />
          <div className="timeline-track-active" />

          {stops.map((stop) => {
            const isDone = Boolean(completed[stop.id]);
            return (
              // Một chặng – data-id để hiệu ứng cuộn đọc vị trí
              <div
                key={stop.id}
                data-id={stop.id}
                className={cx('timeline-step-item', isDone && 'is-done')}
                onClick={() => handleToggle(stop.id)}
                title={isDone ? t.hintUndo : t.hintDone}
              >
                {/* Chấm tròn: icon chủ đề ↔ dấu tích khi xong */}
                <div className="timeline-dot">
                  <div className="timeline-icon-box">
                    <span className="timeline-icon-check">
                      <Icon name="Check" size={20} strokeWidth={3} />
                    </span>
                    <span className="timeline-icon-emoji">
                      <Icon name={stop.iconName ?? FALLBACK_ICON} size={18} strokeWidth={2.2} />
                    </span>
                  </div>
                </div>

                {/* Thẻ nội dung chặng */}
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div className="timeline-card-title-line">
                      <h4 className="timeline-card-title">{stop.title}</h4>
                      <span className="timeline-badge-completed">
                        <Icon name="Check" size={12} strokeWidth={2.5} />
                        {t.completed}
                      </span>
                    </div>
                    <span className="timeline-badge-target">{stop.target}</span>
                  </div>
                  <p className="timeline-card-route">{stop.route}</p>
                  <div className="timeline-card-highlight">
                    <Icon name="Sparkles" size={13} />
                    {stop.highlight}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
