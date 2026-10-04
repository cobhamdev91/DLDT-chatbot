/**
 * @file modules/transport/components/TransportPopover.js
 * @description Popover chi tiết phương tiện: drawer trượt từ phải (desktop) /
 * bottom-sheet (mobile ≤ 640px – CSS tự chuyển). Render qua portal vào <body>
 * để thoát stacking context; ESC + click lớp phủ để đóng; khóa cuộn nền.
 * Chỉ được render khi đã có phương tiện được chọn (sau thao tác người dùng)
 * nên luôn chạy phía client → an toàn với `document.body`.
 */

'use client';

import { createPortal } from 'react-dom';
import Icon from '@/components/shared/Icon/Icon';
import { useBodyScrollLock, useEscapeKey } from '@/effects/keyboard';
import { common } from '@/locales/vi/common';
import { transport as t } from '@/locales/vi/transport';

/**
 * Danh sách có icon (ưu điểm / nhược điểm).
 * @param {Object} props
 * @param {string[]} props.items - Các dòng nội dung.
 * @param {'pro'|'con'} props.tone - Kiểu dòng (đổi icon + màu).
 * @returns {JSX.Element[]}
 */
function IconList({ items, tone }) {
  const isPro = tone === 'pro';
  return items.map((text) => (
    // Một dòng: icon (tích xanh / tam giác vàng) + nội dung
    <div key={text} className={`popover-list-item popover-list-item--${tone}`}>
      <Icon name={isPro ? 'Check' : 'TriangleAlert'} size={isPro ? 14 : 13} strokeWidth={isPro ? 2.5 : undefined} />
      <span>{text}</span>
    </div>
  ));
}

/**
 * @param {Object} props
 * @param {Object} props.item - Phương tiện đang xem (bản ghi transportTypes).
 * @param {() => void} props.onClose - Đóng popover.
 * @returns {import('react').ReactPortal}
 */
export default function TransportPopover({ item, onClose }) {
  useEscapeKey(true, onClose);
  useBodyScrollLock(true);

  return createPortal(
    <>
      {/* Lớp phủ mờ – nhấp để đóng */}
      <div className="popover-overlay" onClick={onClose} aria-hidden="true" />

      {/* Tấm popover */}
      <aside className="transport-popover" role="dialog" aria-modal="true" aria-label={item.name}>
        {/* Thanh kéo (chỉ hiện ở mobile) */}
        <div className="mobile-handle-bar" />

        {/* Đầu popover: icon + tên + phân loại | nút đóng */}
        <div className="popover-header">
          <div className="popover-title-group">
            <div className="trans-icon">
              <Icon name={item.iconName} size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="popover-title">{item.name}</h3>
              <span className="popover-category">{item.category}</span>
            </div>
          </div>
          <button type="button" className="popover-close" onClick={onClose} aria-label={common.actions.close}>
            <Icon name="X" size={18} />
          </button>
        </div>

        {/* Thân popover cuộn được */}
        <div className="popover-body">
          {/* Hộp giá */}
          <div className="popover-price">
            <Icon name="Coins" size={18} />
            <span>{item.priceRange}</span>
          </div>

          {/* Đối tượng phù hợp */}
          {item.suitableFor && (
            <div className="popover-block">
              <h4>{t.popover.suitableFor}</h4>
              <p>{item.suitableFor}</p>
            </div>
          )}

          {/* Chi tiết lộ trình */}
          <div className="popover-block popover-block--loose">
            <h4>{t.popover.details}</h4>
            <p>{item.details}</p>
          </div>

          {/* Ưu điểm */}
          {item.pros?.length > 0 && (
            <div className="popover-block">
              <h4>{t.popover.pros}</h4>
              <IconList items={item.pros} tone="pro" />
            </div>
          )}

          {/* Nhược điểm / lưu ý */}
          {item.cons?.length > 0 && (
            <div className="popover-block">
              <h4>{t.popover.cons}</h4>
              <IconList items={item.cons} tone="con" />
            </div>
          )}

          {/* Lời khuyên từ thổ địa */}
          {item.tips && (
            <div className="popover-tip">
              <div className="popover-tip__head">
                <Icon name="Sparkles" size={14} />
                <strong>{t.popover.tips}</strong>
              </div>
              <p>{item.tips}</p>
            </div>
          )}
        </div>
      </aside>
    </>,
    document.body
  );
}
