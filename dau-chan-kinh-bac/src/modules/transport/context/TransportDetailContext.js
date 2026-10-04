/**
 * @file modules/transport/context/TransportDetailContext.js
 * @description Ngữ cảnh "phương tiện đang xem chi tiết" của trang /phuong-tien –
 * nguồn sự thật duy nhất cho popover. Ba nơi cùng mở popover (hàng ước tính,
 * danh bạ ứng dụng gọi xe, thẻ phương tiện) chỉ cần gọi `open(slug)`;
 * Provider tự render <TransportPopover> một lần duy nhất.
 */

'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { findBySlug } from '@/logic/collection';
import TransportPopover from '../components/TransportPopover';

/**
 * @typedef {Object} TransportDetailContextValue
 * @property {(slug: string) => void} open - Mở popover theo slug phương tiện.
 * @property {() => void} close - Đóng popover.
 */

/** @type {import('react').Context<TransportDetailContextValue|null>} */
const TransportDetailContext = createContext(null);

/**
 * Provider bọc nội dung trang Phương tiện.
 * @param {Object} props
 * @param {Array<Object>} props.items - Danh sách phương tiện (data/transport.js) – nhận qua props (DI).
 * @param {import('react').ReactNode} props.children
 * @returns {JSX.Element}
 */
export function TransportDetailProvider({ items, children }) {
  const [selected, setSelected] = useState(null);

  /** Tìm phương tiện theo slug và mở popover (slug sai → bỏ qua). */
  const open = useCallback(
    (slug) => {
      const item = findBySlug(items, slug);
      if (item) setSelected(item);
    },
    [items]
  );

  /** Đóng popover. */
  const close = useCallback(() => setSelected(null), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <TransportDetailContext.Provider value={value}>
      {children}
      {selected && <TransportPopover item={selected} onClose={close} />}
    </TransportDetailContext.Provider>
  );
}

/**
 * Hook truy cập hành động mở/đóng popover chi tiết.
 * @throws {Error} Khi gọi ngoài TransportDetailProvider.
 * @returns {TransportDetailContextValue}
 */
export function useTransportDetail() {
  const context = useContext(TransportDetailContext);
  if (!context) throw new Error('useTransportDetail phải được dùng bên trong <TransportDetailProvider>.');
  return context;
}
