/**
 * @file components/layout/Footer/Footer.js
 * @description Chân trang 4 cột: thương hiệu – liên kết nhanh – thông tin
 * hữu ích – liên hệ & mạng xã hội; dải bản quyền ở đáy.
 */

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { KinhBacEmblem, SOCIAL_ICONS } from '@/components/shared/Icons/Icons';
import { MAIN_NAV, USEFUL_LINKS } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { common } from '@/locales/vi/common';
import { layout } from '@/locales/vi/layout';

const { footer } = layout;

/**
 * Danh sách dòng liên hệ (icon + nhãn + giá trị) – dựng từ cấu hình + locale.
 * @type {ReadonlyArray<{ id: string, Icon: import('react').ElementType, label: string, value: string }>}
 */
const CONTACT_ROWS = Object.freeze([
  { id: 'hotline', Icon: Phone, label: footer.contact.hotline, value: siteConfig.hotline.display },
  { id: 'email', Icon: Mail, label: footer.contact.email, value: siteConfig.email },
  { id: 'address', Icon: MapPin, label: footer.contact.address, value: footer.contact.addressValue },
]);

/**
 * Cột danh sách liên kết có tiêu đề.
 * @param {Object} props
 * @param {string} props.title - Tiêu đề cột.
 * @param {ReadonlyArray<{ key: string, href: string }>} props.items - Mục liên kết.
 * @param {Record<string, string>} props.labels - Bảng nhãn tra theo khóa.
 * @returns {JSX.Element}
 */
function LinkColumn({ title, items, labels }) {
  return (
    <div className="site-footer__col">
      <h4 className="site-footer__col-title">{title}</h4>
      <ul className="site-footer__links">
        {items.map((item) => (
          <li key={item.key}>
            <Link href={item.href}>{labels[item.key]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Footer toàn site (Server Component – không cần JS phía client).
 * @returns {JSX.Element}
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* ===== CỘT THƯƠNG HIỆU ===== */}
        <div className="site-footer__brand">
          <div className="site-footer__logo-row">
            <div className="site-footer__logo-circle">
              <KinhBacEmblem size={48} />
            </div>
            <div>
              <div className="site-footer__logo-title">
                <span className="site-footer__script">{common.brand.script}</span>
                <span className="site-footer__brand-main">{common.brand.main}</span>
                <span className="site-footer__badge">{common.brand.regionStamp}</span>
              </div>
              <span className="site-footer__tagline">{common.brand.tagline}</span>
            </div>
          </div>
          <p className="site-footer__desc">{footer.desc}</p>
        </div>

        {/* ===== LIÊN KẾT NHANH ===== */}
        <LinkColumn title={footer.quickLinksTitle} items={MAIN_NAV} labels={layout.nav} />

        {/* ===== THÔNG TIN HỮU ÍCH ===== */}
        <LinkColumn title={footer.usefulInfoTitle} items={USEFUL_LINKS} labels={footer.usefulLinks} />

        {/* ===== LIÊN HỆ & MẠNG XÃ HỘI ===== */}
        <div className="site-footer__col">
          <h4 className="site-footer__col-title">{footer.contactTitle}</h4>
          <div className="site-footer__social">
            {siteConfig.socials.map(({ id, href, label }) => {
              const SocialIcon = SOCIAL_ICONS[id];
              return (
                <a key={id} href={href} className="site-footer__social-icon" aria-label={label}>
                  <SocialIcon size={16} />
                </a>
              );
            })}
          </div>

          {CONTACT_ROWS.map(({ id, Icon, label, value }) => (
            <div key={id} className="site-footer__contact">
              <Icon size={16} />
              <span>
                <strong>{label}</strong> {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== DẢI BẢN QUYỀN ===== */}
      <div className="site-footer__copyright">
        <div className="site-footer__copyright-inner">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
