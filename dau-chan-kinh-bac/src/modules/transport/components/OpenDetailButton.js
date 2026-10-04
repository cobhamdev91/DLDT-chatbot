/**
 * @file modules/transport/components/OpenDetailButton.js
 * @description Nút mở popover chi tiết phương tiện theo slug. Tách riêng để
 * các khối tĩnh (Server Component) như danh bạ gọi nhanh chỉ cần nhúng một
 * "đảo" client nhỏ thay vì biến cả khối thành client.
 */

'use client';

import { useTransportDetail } from '../context/TransportDetailContext';

/**
 * @param {Object} props
 * @param {string} props.slug - Slug phương tiện cần mở.
 * @param {string} props.className - Class nút (do nơi dùng quyết định giao diện).
 * @param {import('react').ReactNode} props.children - Nội dung nút.
 * @returns {JSX.Element}
 */
export default function OpenDetailButton({ slug, className, children }) {
  const { open } = useTransportDetail();
  return (
    <button type="button" className={className} onClick={() => open(slug)}>
      {children}
    </button>
  );
}
