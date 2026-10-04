/**
 * @file modules/stays/components/HotlineBanner.js
 * @description Banner xanh rêu "Tổng đài hỗ trợ đặt phòng" + nút gọi hotline.
 * Số hotline lấy từ siteConfig (SSOT).
 */

import Icon from '@/components/shared/Icon/Icon';
import { siteConfig } from '@/data/siteConfig';
import { stays as t } from '@/locales/vi/stays';

/**
 * @returns {JSX.Element}
 */
export default function HotlineBanner() {
  return (
    <section className="container spacer-bottom-lg">
      <div className="hotline-banner">
        {/* Chữ bên trái: nhãn nhỏ + tiêu đề */}
        <div>
          <span className="hotline-banner__eyebrow">{t.hotline.eyebrow}</span>
          <h3 className="hotline-banner__title">{t.hotline.title}</h3>
        </div>

        {/* Nút gọi bên phải */}
        <div className="hotline-banner__actions">
          <a href={`tel:${siteConfig.hotline.tel}`} className="hotline-banner__call">
            <Icon name="PhoneCall" size={18} /> {siteConfig.hotline.display}
          </a>
        </div>
      </div>
    </section>
  );
}
