/**
 * @file components/shared/Icons/Icons.js
 * @description Bộ icon SVG tự vẽ của dự án: hoa sen, ấn triện Kinh Bắc và
 * icon mạng xã hội. Màu lấy theo `currentColor` → CSS quyết định màu
 * (xem icons.css), không truyền màu cứng qua props.
 */

import { common } from '@/locales/vi/common';
import { cx } from '@/logic/classNames';

/**
 * Thuộc tính nét chung của icon dạng outline (giống lucide).
 * @type {Readonly<Record<string, string>>}
 */
const STROKE_PROPS = Object.freeze({
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '2',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

/**
 * Icon hoa sen – biểu tượng di sản Kinh Bắc. Mặc định màu đỏ son (CSS).
 * @param {{ size?: number, className?: string }} props
 * @param {number} [props.size=24] - Kích thước cạnh (px).
 * @param {string} [props.className] - Class bổ sung (vd: modifier màu).
 * @returns {JSX.Element}
 */
export function LotusIcon({ size = 24, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx('lotus-icon', className)}
      aria-hidden="true"
    >
      {/* Cánh giữa */}
      <path d="M12 3C11 7 9.5 12 12 18C14.5 12 13 7 12 3Z" fill="currentColor" opacity="0.9" />
      {/* Cánh trái */}
      <path d="M11 6C8 9 5 13 8 18C9.5 15 11 12 11.5 8" fill="currentColor" opacity="0.75" />
      {/* Cánh phải */}
      <path d="M13 6C16 9 19 13 16 18C14.5 15 13 12 12.5 8" fill="currentColor" opacity="0.75" />
      {/* Lá đế hai bên */}
      <path d="M5 14C3 16 4 19 8 19C10 19 11 18 11.5 17C9 17 6.5 15.5 5 14Z" fill="currentColor" opacity="0.5" />
      <path d="M19 14C21 16 20 19 16 19C14 19 13 18 12.5 17C15 17 17.5 15.5 19 14Z" fill="currentColor" opacity="0.5" />
      {/* Mặt nước */}
      <path d="M7 21C10 21.5 14 21.5 17 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Icon Facebook.
 * @param {{ size?: number }} props
 * @returns {JSX.Element}
 */
export function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...STROKE_PROPS} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/**
 * Icon Instagram.
 * @param {{ size?: number }} props
 * @returns {JSX.Element}
 */
export function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...STROKE_PROPS} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * Icon YouTube.
 * @param {{ size?: number }} props
 * @returns {JSX.Element}
 */
export function YoutubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...STROKE_PROPS} aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

/**
 * Icon TikTok.
 * @param {{ size?: number }} props
 * @returns {JSX.Element}
 */
export function TiktokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...STROKE_PROPS} aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

/**
 * Bảng tra icon mạng xã hội theo `id` trong siteConfig.socials.
 * @type {Readonly<Record<string, (props: { size?: number }) => JSX.Element>>}
 */
export const SOCIAL_ICONS = Object.freeze({
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
});

/**
 * Ấn triện chính thức "Dấu Chân Kinh Bắc":
 * nền sơn mài đỏ son, viền vàng, mái chùa thời Lý, hoa sen, sóng sông Đuống
 * và chuỗi hạt trống đồng. Kích thước có thể điều khiển bằng CSS
 * (vd: header thu nhỏ khi cuộn) – khi đó không truyền `size`.
 * @param {{ size?: number, className?: string }} props
 * @param {number} [props.size] - Kích thước cạnh (px); bỏ trống để CSS quyết định.
 * @param {string} [props.className] - Class bổ sung.
 * @returns {JSX.Element}
 */
export function KinhBacEmblem({ size, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx('kb-emblem', className)}
      role="img"
      aria-label={common.brand.emblemLabel}
    >
      <defs>
        {/* Gradient sơn mài đỏ son */}
        <linearGradient id="kbEmblemSealBg" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#A62017" />
          <stop offset="45%" stopColor="#7E140D" />
          <stop offset="100%" stopColor="#4A0B07" />
        </linearGradient>
        {/* Gradient vàng hoàng gia */}
        <linearGradient id="kbEmblemGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3CD" />
          <stop offset="25%" stopColor="#E8BE65" />
          <stop offset="55%" stopColor="#C29031" />
          <stop offset="85%" stopColor="#DCAB47" />
          <stop offset="100%" stopColor="#FFEAA8" />
        </linearGradient>
        {/* Gradient ngà – vàng cho hoa sen trung tâm */}
        <linearGradient id="kbEmblemLotus" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="45%" stopColor="#F7DE9E" />
          <stop offset="100%" stopColor="#C7922D" />
        </linearGradient>
      </defs>

      {/* 1. Vòng sơn mài + viền vàng */}
      <circle cx="50" cy="50" r="47.5" fill="url(#kbEmblemSealBg)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="url(#kbEmblemGold)" strokeWidth="2.4" />

      {/* 2. Chuỗi hạt trống đồng */}
      <circle cx="50" cy="50" r="43.5" fill="none" stroke="url(#kbEmblemGold)" strokeWidth="0.8" strokeDasharray="1.2 2.2" />
      <circle cx="50" cy="50" r="40.5" fill="none" stroke="url(#kbEmblemGold)" strokeWidth="0.5" opacity="0.65" />

      {/* 3. Đỉnh tháp & châu ngọc */}
      <circle cx="50" cy="16.5" r="1.8" fill="#FFF9E6" />
      <path d="M 50 18 L 52.2 24 L 50 29 L 47.8 24 Z" fill="url(#kbEmblemLotus)" />

      {/* 4. Mái chùa cong thời Lý */}
      <path d="M 28 34.5 C 36 38.5 64 38.5 72 34.5 C 69 31 63 32 50 32.8 C 37 32 31 31 28 34.5 Z" fill="url(#kbEmblemGold)" />
      <path d="M 28 34.5 C 24 33.5 21.5 27.5 25.5 24.5 C 26.5 28.5 28.5 31.5 31.5 33.5 Z" fill="url(#kbEmblemGold)" />
      <path d="M 72 34.5 C 76 33.5 78.5 27.5 74.5 24.5 C 73.5 28.5 71.5 31.5 68.5 33.5 Z" fill="url(#kbEmblemGold)" />

      {/* 5. Hoa sen nở: cánh ngoài → cánh trong → cánh giữa */}
      <path d="M 42 47.5 C 30.5 52.5 29.5 63 41 68 C 38 62 40 54 42 47.5 Z" fill="url(#kbEmblemGold)" opacity="0.88" />
      <path d="M 58 47.5 C 69.5 52.5 70.5 63 59 68 C 62 62 60 54 58 47.5 Z" fill="url(#kbEmblemGold)" opacity="0.88" />
      <path d="M 47.5 40.5 C 38.5 46.5 37.5 57.5 46.5 65.5 C 44.5 58.5 46.5 48.5 47.5 40.5 Z" fill="url(#kbEmblemGold)" opacity="0.95" />
      <path d="M 52.5 40.5 C 61.5 46.5 62.5 57.5 53.5 65.5 C 55.5 58.5 53.5 48.5 52.5 40.5 Z" fill="url(#kbEmblemGold)" opacity="0.95" />
      <path d="M 50 34.5 C 44 43.5 44 57.5 50 67.5 C 56 57.5 56 43.5 50 34.5 Z" fill="url(#kbEmblemLotus)" />

      {/* 6. Bệ sen & sóng sông Đuống / dải lụa Quan họ */}
      <path d="M 28 69.5 C 38 74.5 62 74.5 72 69.5 C 64 73.5 36 73.5 28 69.5 Z" fill="url(#kbEmblemLotus)" />
      <path d="M 22 75.5 C 34 81.5 66 81.5 78 75.5 C 67 79.5 33 79.5 22 75.5 Z" fill="url(#kbEmblemGold)" />
      <path d="M 32 82.5 C 41 85.5 59 85.5 68 82.5 C 60 85 40 85 32 82.5 Z" fill="url(#kbEmblemGold)" opacity="0.75" />

      {/* 7. Sao lấp lánh hai bên */}
      <path d="M 24 20 Q 24 22 26 22 Q 24 22 24 24 Q 24 22 22 22 Q 24 22 24 20 Z" fill="#FFEAA8" opacity="0.85" />
      <path d="M 76 20 Q 76 22 78 22 Q 76 22 76 24 Q 76 22 74 22 Q 76 22 76 20 Z" fill="#FFEAA8" opacity="0.85" />
    </svg>
  );
}
