/**
 * @file components/layout/Header/Header.js
 * @description Thanh đầu trang cố định: logo (ấn triện + chữ), menu chính,
 * nút "Về chúng tôi" và hamburger cho mobile. Trong suốt ở đỉnh trang,
 * cuộn > 25px chuyển sang nền kem mờ (modifier --scrolled).
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users } from 'lucide-react';
import { KinhBacEmblem } from '@/components/shared/Icons/Icons';
import { ABOUT_NAV, MAIN_NAV, isActivePath } from '@/data/navigation';
import { ROUTES } from '@/data/routes';
import { common } from '@/locales/vi/common';
import { layout } from '@/locales/vi/layout';
import { useScrolled } from '@/effects/scroll';
import { cx } from '@/logic/classNames';

/** Đường cong đáy header (viewBox 1440×120) */
const CURVE_PATH = 'M0,0 H1440 V60 C1380,40 1260,100 1080,60 C900,20 720,120 540,60 C360,0 180,120 0,60 Z';

/** Số vạch của nút hamburger */
const BURGER_LINES = [0, 1, 2];

/**
 * Một mục menu kèm gạch chân chỉ báo trang hiện tại.
 * @param {Object} props
 * @param {string} props.href - Đường dẫn.
 * @param {string} props.label - Nhãn.
 * @param {boolean} props.isActive - Là trang hiện tại.
 * @param {string} [props.className] - Class bổ sung.
 * @param {() => void} props.onNavigate - Đóng menu mobile sau khi chọn.
 * @returns {JSX.Element}
 */
function NavLink({ href, label, isActive, className, onNavigate }) {
  return (
    <Link
      href={href}
      className={cx('site-header__link', isActive && 'site-header__link--active', className)}
      onClick={onNavigate}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
      {isActive && <span className="site-header__indicator" />}
    </Link>
  );
}

/**
 * Header toàn site.
 * @returns {JSX.Element}
 */
export default function Header() {
  const pathname = usePathname();
  const isScrolled = useScrolled(25);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  /** Đóng menu mobile */
  const closeMenu = () => setIsMobileOpen(false);

  return (
    <header className={cx('site-header', isScrolled && 'site-header--scrolled')}>
      <div className="site-header__inner">
        {/* ===== LOGO: ấn triện + tên thương hiệu ===== */}
        <Link href={ROUTES.home} className="site-header__logo" aria-label={layout.header.homeAriaLabel}>
          <div className="site-header__logo-badge">
            <KinhBacEmblem />
          </div>
          <div className="site-header__logo-text">
            <div className="site-header__logo-title">
              <span className="site-header__logo-script">{common.brand.script}</span>
              <span className="site-header__logo-main">{common.brand.main}</span>
              <span className="site-header__logo-stamp">{common.brand.heritageStamp}</span>
            </div>
            <span className="site-header__logo-tagline">{common.brand.tagline}</span>
          </div>
        </Link>

        {/* ===== MENU CHÍNH (ngang trên desktop, thả xuống trên mobile) ===== */}
        <nav className={cx('site-header__nav', isMobileOpen && 'site-header__nav--open')}>
          {MAIN_NAV.map((item) => (
            <NavLink
              key={item.key}
              href={item.href}
              label={layout.nav[item.key]}
              isActive={isActivePath(pathname, item.href)}
              onNavigate={closeMenu}
            />
          ))}
          {/* "Về chúng tôi" – chỉ hiện trong menu mobile */}
          <NavLink
            href={ABOUT_NAV.href}
            label={layout.nav[ABOUT_NAV.key]}
            isActive={isActivePath(pathname, ABOUT_NAV.href)}
            className="site-header__link--about"
            onNavigate={closeMenu}
          />
        </nav>

        {/* ===== NÚT TIỆN ÍCH ===== */}
        <div className="site-header__actions">
          {/* Nút icon "Về chúng tôi" (desktop) */}
          <Link
            href={ABOUT_NAV.href}
            className="site-header__icon-btn"
            aria-label={layout.nav[ABOUT_NAV.key]}
            title={layout.nav[ABOUT_NAV.key]}
          >
            <Users size={20} strokeWidth={2} />
          </Link>

          {/* Hamburger (mobile/tablet) */}
          <button
            type="button"
            className={cx('site-header__burger', isMobileOpen && 'site-header__burger--active')}
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label={layout.header.menuAriaLabel}
            aria-expanded={isMobileOpen}
          >
            {BURGER_LINES.map((line) => (
              <span key={line} />
            ))}
          </button>
        </div>
      </div>

      {/* Lớp phủ tối phía sau menu mobile – nhấp để đóng */}
      {isMobileOpen && <div className="site-header__overlay" onClick={closeMenu} />}

      {/* Đường cong đáy – "tan" header vào nội dung khi đã cuộn */}
      <div className="site-header__curve" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d={CURVE_PATH} fill="currentColor" />
        </svg>
      </div>
    </header>
  );
}
