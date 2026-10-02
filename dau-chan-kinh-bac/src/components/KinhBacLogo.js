import React from 'react';
import Link from 'next/link';

/**
 * KinhBacEmblem - The official SVG royal seal emblem of Dấu Chân Kinh Bắc
 * Features:
 *  - Imperial Lacquer Vermilion Seal Background
 *  - Sacred Blooming Lotus of Kinh Bac
 *  - Vietnamese Lý Dynasty Curved Pagoda Roof (Đền Đô / Chùa Dâu)
 *  - Flowing Silk Ribbon & Water Waves of Sông Đuống
 *  - Traditional Bronze Drum Beaded Trim
 */
export function KinhBacEmblem({ size = 40, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        filter: 'drop-shadow(0 2px 6px rgba(107, 27, 22, 0.28))',
        ...style
      }}
      aria-label="Logo Dấu Chân Kinh Bắc"
    >
      <defs>
        {/* Royal Lacquer Crimson Gradient */}
        <linearGradient id="kbEmblemSealBg" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#A62017"/>
          <stop offset="45%" stopColor="#7E140D"/>
          <stop offset="100%" stopColor="#4A0B07"/>
        </linearGradient>

        {/* Imperial Burnished Gold Gradient */}
        <linearGradient id="kbEmblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3CD"/>
          <stop offset="25%" stopColor="#E8BE65"/>
          <stop offset="55%" stopColor="#C29031"/>
          <stop offset="85%" stopColor="#DCAB47"/>
          <stop offset="100%" stopColor="#FFEAA8"/>
        </linearGradient>

        {/* Glowing Ivory-Gold for Center Lotus */}
        <linearGradient id="kbEmblemLotus" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7"/>
          <stop offset="45%" stopColor="#F7DE9E"/>
          <stop offset="100%" stopColor="#C7922D"/>
        </linearGradient>
      </defs>

      {/* 1. Outer Imperial Lacquer Circle with Golden Rim */}
      <circle cx="50" cy="50" r="47.5" fill="url(#kbEmblemSealBg)"/>
      <circle cx="50" cy="50" r="47" fill="none" stroke="url(#kbEmblemGold)" strokeWidth="2.4"/>
      
      {/* 2. Traditional Bronze Drum Beaded Ring */}
      <circle cx="50" cy="50" r="43.5" fill="none" stroke="url(#kbEmblemGold)" strokeWidth="0.8" strokeDasharray="1.2 2.2"/>
      <circle cx="50" cy="50" r="40.5" fill="none" stroke="url(#kbEmblemGold)" strokeWidth="0.5" opacity="0.65"/>

      {/* 3. Lý Dynasty Pagoda Finial (Đỉnh tháp & Châu ngọc) */}
      <circle cx="50" cy="16.5" r="1.8" fill="#FFF9E6"/>
      <path d="M 50 18 L 52.2 24 L 50 29 L 47.8 24 Z" fill="url(#kbEmblemLotus)"/>

      {/* 4. Lý Dynasty Curved Pagoda Roof (Mái chùa cong di sản) */}
      <path d="M 28 34.5 C 36 38.5 64 38.5 72 34.5 C 69 31 63 32 50 32.8 C 37 32 31 31 28 34.5 Z" fill="url(#kbEmblemGold)"/>
      <path d="M 28 34.5 C 24 33.5 21.5 27.5 25.5 24.5 C 26.5 28.5 28.5 31.5 31.5 33.5 Z" fill="url(#kbEmblemGold)"/>
      <path d="M 72 34.5 C 76 33.5 78.5 27.5 74.5 24.5 C 73.5 28.5 71.5 31.5 68.5 33.5 Z" fill="url(#kbEmblemGold)"/>

      {/* 5. Blooming Sacred Lotus (Hoa sen nở rực rỡ) */}
      {/* Outer Petals */}
      <path d="M 42 47.5 C 30.5 52.5 29.5 63 41 68 C 38 62 40 54 42 47.5 Z" fill="url(#kbEmblemGold)" opacity="0.88"/>
      <path d="M 58 47.5 C 69.5 52.5 70.5 63 59 68 C 62 62 60 54 58 47.5 Z" fill="url(#kbEmblemGold)" opacity="0.88"/>

      {/* Inner Petals */}
      <path d="M 47.5 40.5 C 38.5 46.5 37.5 57.5 46.5 65.5 C 44.5 58.5 46.5 48.5 47.5 40.5 Z" fill="url(#kbEmblemGold)" opacity="0.95"/>
      <path d="M 52.5 40.5 C 61.5 46.5 62.5 57.5 53.5 65.5 C 55.5 58.5 53.5 48.5 52.5 40.5 Z" fill="url(#kbEmblemGold)" opacity="0.95"/>

      {/* Center Petal */}
      <path d="M 50 34.5 C 44 43.5 44 57.5 50 67.5 C 56 57.5 56 43.5 50 34.5 Z" fill="url(#kbEmblemLotus)"/>

      {/* 6. Pedestal & Flowing Silk Waves of Sông Đuống (Dòng sông Đuống & Dải lụa Quan họ) */}
      <path d="M 28 69.5 C 38 74.5 62 74.5 72 69.5 C 64 73.5 36 73.5 28 69.5 Z" fill="url(#kbEmblemLotus)"/>
      <path d="M 22 75.5 C 34 81.5 66 81.5 78 75.5 C 67 79.5 33 79.5 22 75.5 Z" fill="url(#kbEmblemGold)"/>
      <path d="M 32 82.5 C 41 85.5 59 85.5 68 82.5 C 60 85 40 85 32 82.5 Z" fill="url(#kbEmblemGold)" opacity="0.75"/>

      {/* 7. Celestial Star Sparkles */}
      <path d="M 24 20 Q 24 22 26 22 Q 24 22 24 24 Q 24 22 22 22 Q 24 22 24 20 Z" fill="#FFEAA8" opacity="0.85"/>
      <path d="M 76 20 Q 76 22 78 22 Q 76 22 76 24 Q 76 22 74 22 Q 76 22 76 20 Z" fill="#FFEAA8" opacity="0.85"/>
    </svg>
  );
}

/**
 * KinhBacLogo - Complete Brand Lockup (Emblem + Typography + Tagline)
 */
export default function KinhBacLogo({
  size = 40,
  isScrolled = false,
  isDark = false,
  showTagline = true,
  href = '/',
  className = '',
  style = {}
}) {
  const content = (
    <div
      className={`kinhbac-logo-lockup ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        ...style
      }}
    >
      {/* Royal Seal Emblem */}
      <div
        className="kinhbac-logo-emblem-wrap"
        style={{
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <KinhBacEmblem size={size} />
      </div>

      {/* Typography */}
      <div
        className="kinhbac-logo-text-wrap"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          lineHeight: 1.15
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', whiteSpace: 'nowrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading, "Playfair Display", serif)',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: size > 40 ? '1.05rem' : '0.875rem',
              color: isDark 
                ? '#F8E8D2' 
                : isScrolled 
                  ? '#C83228' 
                  : 'rgba(255, 255, 255, 0.92)',
              transition: 'color 0.3s ease'
            }}
          >
            Dấu Chân
          </span>
          <span
            style={{
              fontFamily: 'var(--font-heading, "Playfair Display", serif)',
              fontWeight: 800,
              fontSize: size > 40 ? '1.3rem' : '1.125rem',
              letterSpacing: '-0.3px',
              color: isDark 
                ? '#FAF7F2' 
                : isScrolled 
                  ? '#1E120D' 
                  : '#FFFFFF',
              transition: 'color 0.3s ease'
            }}
          >
            Kinh Bắc
          </span>
          {/* Traditional Seal Stamp */}
          <span
            style={{
              fontSize: '0.625rem',
              fontWeight: 700,
              padding: '1px 5px',
              borderRadius: '3px',
              background: '#C83228',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              letterSpacing: '0.5px',
              marginLeft: '2px',
              textTransform: 'uppercase'
            }}
          >
            Di Sản
          </span>
        </div>

        {showTagline && (
          <span
            className="kinhbac-logo-tagline"
            style={{
              fontSize: '0.7rem',
              color: isDark 
                ? 'rgba(250, 247, 242, 0.65)' 
                : isScrolled 
                  ? '#7A695E' 
                  : 'rgba(255, 255, 255, 0.65)',
              letterSpacing: '0.3px',
              marginTop: '3px',
              whiteSpace: 'nowrap',
              fontWeight: 400,
              transition: 'color 0.3s ease'
            }}
          >
            Khám phá • Trải nghiệm • Lưu dấu
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return content;
}
