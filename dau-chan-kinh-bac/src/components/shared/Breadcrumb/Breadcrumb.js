/**
 * @file components/shared/Breadcrumb/Breadcrumb.js
 * @description Thanh breadcrumb: "Trang chủ › Mục › Trang hiện tại".
 * Mục cuối (không có href) hiển thị dạng chữ thường – trang hiện tại.
 */

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '@/data/routes';
import { common } from '@/locales/vi/common';

/**
 * @typedef {Object} BreadcrumbItem
 * @property {string} label  - Nhãn hiển thị.
 * @property {string} [href] - Liên kết; bỏ trống với trang hiện tại.
 */

/**
 * @param {{ items?: BreadcrumbItem[] }} props
 * @returns {JSX.Element}
 */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label={common.breadcrumb.ariaLabel} className="breadcrumb-nav">
      <div className="container breadcrumb-container">
        {/* Mốc gốc: Trang chủ */}
        <Link href={ROUTES.home} className="breadcrumb-link">
          <Home size={14} /> <span>{common.breadcrumb.home}</span>
        </Link>

        {/* Các cấp tiếp theo */}
        {items.map((item) => (
          <span key={item.label} className="breadcrumb-item">
            <ChevronRight size={13} className="breadcrumb-sep" />
            {item.href ? (
              <Link href={item.href} className="breadcrumb-link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb-current">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
