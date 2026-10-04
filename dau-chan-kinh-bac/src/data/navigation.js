/**
 * @file data/navigation.js
 * @description Cấu trúc điều hướng (SSOT) dùng chung cho Header & Footer.
 * Chỉ chứa KHÓA + đường dẫn; nhãn hiển thị tra theo khóa trong
 * locales/vi/layout.js → đổi URL sửa ROUTES, đổi chữ sửa locale.
 */

import { ROUTES } from '@/data/routes';

/**
 * @typedef {Object} NavItem
 * @property {string} key  - Khóa tra nhãn trong `layout.nav` / `layout.footer.usefulLinks`.
 * @property {string} href - Đường dẫn đích.
 */

/**
 * Menu chính (header desktop + "Liên kết nhanh" ở footer), theo thứ tự hiển thị.
 * @type {ReadonlyArray<NavItem>}
 */
export const MAIN_NAV = Object.freeze(
  ['home', 'destinations', 'cuisine', 'culture', 'stays', 'transport', 'crafts'].map((key) => ({
    key,
    href: ROUTES[key],
  }))
);

/**
 * Mục "Về chúng tôi" – tách riêng vì hiển thị dạng nút icon trên desktop
 * và dạng mục menu trên mobile.
 * @type {Readonly<NavItem>}
 */
export const ABOUT_NAV = Object.freeze({ key: 'about', href: ROUTES.about });

/**
 * Cột "Thông tin hữu ích" ở footer.
 * @type {ReadonlyArray<NavItem>}
 */
export const USEFUL_LINKS = Object.freeze([
  { key: 'guide', href: ROUTES.destinations },
  { key: 'festivals', href: ROUTES.culture },
  { key: 'transportFaq', href: ROUTES.transport },
  { key: 'foodNews', href: ROUTES.cuisine },
  { key: 'partners', href: ROUTES.transport },
]);

/**
 * Kiểm tra một mục menu có ứng với trang hiện tại không.
 * Trang chủ chỉ khớp tuyệt đối; trang khác khớp cả trang con (chi tiết).
 * @param {string} pathname - Đường dẫn hiện tại (usePathname).
 * @param {string} href - Đường dẫn của mục menu.
 * @returns {boolean}
 */
export function isActivePath(pathname, href) {
  if (href === ROUTES.home) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
