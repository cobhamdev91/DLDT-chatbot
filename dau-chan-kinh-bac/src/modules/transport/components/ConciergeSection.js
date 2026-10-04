/**
 * @file modules/transport/components/ConciergeSection.js
 * @description Khối 2 – Danh bạ gọi nhanh taxi & dịch vụ đưa đón (lưới 2 cột).
 * Server Component: dữ liệu nhận qua props; chỉ nút "Xem Hướng Dẫn" là client.
 * Neo `ANCHORS.hotline` để các trang khác (lưu trú, chi tiết) trỏ tới.
 */

import Icon from '@/components/shared/Icon/Icon';
import { ANCHORS } from '@/data/routes';
import { cx, modifier } from '@/logic/classNames';
import { telHref } from '@/logic/text';
import { transport } from '@/locales/vi/transport';
import OpenDetailButton from './OpenDetailButton';

const t = transport.concierge;

/**
 * Thẻ một dịch vụ: icon | tên + trạng thái + mô tả + đặc điểm | nút gọi / hướng dẫn.
 * @param {Object} props
 * @param {import('@/data/transport').ConciergeService} props.service
 * @returns {JSX.Element}
 */
function ConciergeCard({ service }) {
  return (
    <div className="concierge-card-vip">
      {/* Ô icon theo tông màu dịch vụ */}
      <div className={cx('concierge-icon-squircle', modifier('concierge-icon-squircle', service.tone))}>
        <Icon name={service.iconName} size={24} />
      </div>

      {/* Thông tin dịch vụ */}
      <div className="concierge-details">
        <div className="concierge-title-line">
          <h4 className="concierge-brand-name">{service.name}</h4>
          <span className={cx('concierge-status-pill', modifier('concierge-status-pill', service.statusTone))}>
            {service.status}
          </span>
        </div>
        <p className="concierge-service-desc">{service.desc}</p>
        <div className="concierge-feature-pills">
          {service.features.map((feature) => (
            <span key={feature} className="concierge-pill">
              <Icon name="Check" size={11} strokeWidth={2.5} />
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Hành động: gọi hotline hoặc mở hướng dẫn ứng dụng */}
      <div className="concierge-call-box">
        {service.phone ? (
          <a href={telHref(service.phone)} className="btn-concierge-hotline">
            <Icon name="Phone" size={14} />
            <span>{service.phone}</span>
          </a>
        ) : (
          <OpenDetailButton slug={service.guideSlug} className="btn-concierge-app">
            <Icon name="Zap" size={14} />
            <span>{t.guideCta}</span>
          </OpenDetailButton>
        )}
      </div>
    </div>
  );
}

/**
 * @param {Object} props
 * @param {ReadonlyArray<import('@/data/transport').ConciergeService>} props.services - Danh bạ dịch vụ.
 * @returns {JSX.Element}
 */
export default function ConciergeSection({ services }) {
  return (
    <section className="concierge-section" id={ANCHORS.hotline}>
      <div className="container">
        <div className="concierge-wrapper">
          {/* Đầu khối: icon + tiêu đề | nhãn xác thực */}
          <div className="concierge-header">
            <div className="concierge-header-left">
              <div className="concierge-header-icon">
                <Icon name="PhoneCall" size={22} />
              </div>
              <div>
                <h3 className="concierge-header-title">{t.title}</h3>
                <p className="concierge-header-sub">{t.subtitle}</p>
              </div>
            </div>
            <span className="concierge-verified-badge">
              <Icon name="Shield" size={14} />
              {t.verified}
            </span>
          </div>

          {/* Lưới 2 cột thẻ dịch vụ */}
          <div className="concierge-grid-2col">
            {services.map((service) => (
              <ConciergeCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
