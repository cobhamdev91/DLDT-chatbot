/**
 * @file modules/detail/components/DetailSidebar.js
 * @description Sidebar "thông tin nhanh" của trang chi tiết: danh sách cặp
 * nhãn – giá trị, nhóm nút hành động và ghi chú cuối (tuỳ chọn).
 */

import Link from 'next/link';
import Icon from '@/components/shared/Icon/Icon';
import { cx, modifier } from '@/logic/classNames';

/**
 * Giá trị của một dòng thông tin: liên kết (sđt) hoặc chữ (có thể nhấn giá).
 * @param {{ item: import('@/modules/detail/types').SidebarItem }} props
 * @returns {JSX.Element}
 */
function InfoValue({ item }) {
  if (item.variant === 'link') {
    return (
      <a href={item.href} className="info-value--link">
        {item.value}
      </a>
    );
  }
  return <span className={modifier('info-value', item.variant) || undefined}>{item.value}</span>;
}

/**
 * Một nút hành động: thẻ <a> cho liên kết ngoài (tel:), <Link> cho nội bộ.
 * @param {{ cta: import('@/modules/detail/types').SidebarCta }} props
 * @returns {JSX.Element}
 */
function SidebarButton({ cta }) {
  const className = cx('btn', `btn-${cta.variant}`, 'full-width');
  const content = (
    <>
      <Icon name={cta.icon} size={16} /> {cta.label}
    </>
  );

  return cta.external ? (
    <a href={cta.href} className={className}>
      {content}
    </a>
  ) : (
    <Link href={cta.href} className={className}>
      {content}
    </Link>
  );
}

/**
 * @param {{ sidebar: import('@/modules/detail/types').DetailViewModel['sidebar'] }} props
 * @returns {JSX.Element}
 */
export default function DetailSidebar({ sidebar }) {
  return (
    <aside className="detail-sidebar">
      {/* Thẻ dính khi cuộn (desktop) */}
      <div className="sidebar-card">
        <h3>{sidebar.title}</h3>

        {/* Danh sách nhãn – giá trị */}
        <ul className="info-list">
          {sidebar.items.map((item) => (
            <li key={item.label}>
              <strong>
                <Icon name={item.icon} size={15} /> {item.label}
              </strong>
              <InfoValue item={item} />
            </li>
          ))}
        </ul>

        {/* Nhóm nút hành động xếp dọc */}
        <div className="sidebar-cta btn-stack">
          {sidebar.ctas.map((cta) => (
            <SidebarButton key={cta.label} cta={cta} />
          ))}
        </div>

        {/* Ghi chú cuối (tuỳ chọn) */}
        {sidebar.note && <p className="sidebar-note">{sidebar.note}</p>}
      </div>
    </aside>
  );
}
