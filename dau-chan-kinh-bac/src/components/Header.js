'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users } from 'lucide-react';
import { KinhBacEmblem } from '@/components/KinhBacLogo';
import { siteContent } from '@/data/content';
import styles from './Header.module.css';

const { header: content } = siteContent;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* LOGO */}
        <Link href="/" className={styles.logo} aria-label="Trang chủ Dấu Chân Kinh Bắc">
          <div className={styles.logoBadge}>
            <KinhBacEmblem size={isScrolled ? 36 : 42} />
          </div>
          <div className={styles.logoTextWrap}>
            <div className={styles.logoTitleRow}>
              <span className={styles.logoCalligraphy}>{content.logoCalligraphy}</span>
              <span className={styles.logoMain}>{content.logoMain}</span>
              <span className={styles.logoStamp}>Di Sản</span>
            </div>
            <span className={styles.logoTagline}>{content.tagline}</span>
          </div>
        </Link>

        {/* NAVIGATION */}
        <nav className={`${styles.nav} ${isMobileOpen ? styles.navOpen : ''}`}>
          {content.navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
                {isActive && <span className={styles.activeIndicator}></span>}
              </Link>
            );
          })}
          {/* Mobile/Tablet list menu item for About Us */}
          <Link
            href="/ve-chung-toi"
            className={`${styles.navLink} ${styles.aboutUsNavLink} ${pathname === '/ve-chung-toi' ? styles.navLinkActive : ''}`}
            onClick={() => setIsMobileOpen(false)}
          >
            Về chúng tôi
            {pathname === '/ve-chung-toi' && <span className={styles.activeIndicator}></span>}
          </Link>
        </nav>

        {/* UTILITY ACTIONS */}
        <div className={styles.headerActions}>
          <Link
            href="/ve-chung-toi"
            className={styles.iconBtn}
            aria-label="Về chúng tôi"
            title="Về chúng tôi"
          >
            <Users size={20} strokeWidth={2} />
          </Link>

          {/* HAMBURGER FOR MOBILE */}
          <button
            className={`${styles.hamburger} ${isMobileOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <div className={styles.overlay} onClick={() => setIsMobileOpen(false)} />
      )}

      {/* CURVED BOTTOM SVG - merges header into content */}
      <div className={styles.headerCurve} aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,0 H1440 V60 C1380,40 1260,100 1080,60 C900,20 720,120 540,60 C360,0 180,120 0,60 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </header>
  );
}
