import React from 'react';

// ELEGANT LOTUS FLOWER SVG FOR KINH BẮC ROYAL HERITAGE
export function LotusIcon({ size = 24, color = '#C83228', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Central petal */}
      <path
        d="M12 3C11 7 9.5 12 12 18C14.5 12 13 7 12 3Z"
        fill={color}
        opacity="0.9"
      />
      {/* Left petal */}
      <path
        d="M11 6C8 9 5 13 8 18C9.5 15 11 12 11.5 8"
        fill={color}
        opacity="0.75"
      />
      {/* Right petal */}
      <path
        d="M13 6C16 9 19 13 16 18C14.5 15 13 12 12.5 8"
        fill={color}
        opacity="0.75"
      />
      {/* Outer base leaves */}
      <path
        d="M5 14C3 16 4 19 8 19C10 19 11 18 11.5 17C9 17 6.5 15.5 5 14Z"
        fill={color}
        opacity="0.5"
      />
      <path
        d="M19 14C21 16 20 19 16 19C14 19 13 18 12.5 17C15 17 17.5 15.5 19 14Z"
        fill={color}
        opacity="0.5"
      />
      {/* Water base line */}
      <path
        d="M7 21C10 21.5 14 21.5 17 21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// SOCIAL ICONS
export function FacebookIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export function InstagramIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export function YoutubeIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9 10 15" fill={color}/>
    </svg>
  );
}

export function TiktokIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
    </svg>
  );
}
