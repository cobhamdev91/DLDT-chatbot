/**
 * @file components/shared/IconText/IconText.js
 * @description Cụm "icon + chữ" nằm cùng hàng – thay cho mẫu inline-style
 * `display:inline-flex; align-items:center; gap:Npx` lặp lại khắp nơi.
 */

import { cx, modifier } from '@/logic/classNames';

/**
 * @param {Object} props
 * @param {import('react').ElementType} [props.as='span'] - Thẻ HTML bọc ngoài (span, h3, p...).
 * @param {'xs'|'sm'|'md'} [props.gap='sm'] - Khoảng cách icon–chữ (4/6/8px).
 * @param {boolean} [props.block=false] - true → flex khối thay vì inline-flex.
 * @param {string} [props.className] - Class bổ sung.
 * @param {import('react').ReactNode} props.children - Icon và chữ.
 * @returns {JSX.Element}
 */
export default function IconText({ as: Tag = 'span', gap = 'sm', block = false, className, children }) {
  return (
    <Tag className={cx('icon-text', modifier('icon-text', gap), block && 'icon-text--block', className)}>
      {children}
    </Tag>
  );
}
