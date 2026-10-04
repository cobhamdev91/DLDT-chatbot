/**
 * @file contexts/ChatbotContext.js
 * @description Ngữ cảnh (Context) trạng thái chatbot – nguồn sự thật duy nhất
 * cho việc mở/đóng cửa sổ chat. Thay cho biến toàn cục `window.openChatbot`:
 * mọi component con (FAB, popup, nút "Hỏi trợ lý" ở trang bất kỳ) đọc/ghi
 * trạng thái qua hook useChatbot().
 */

'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * @typedef {Object} ChatbotContextValue
 * @property {boolean} isOpen    - Cửa sổ chat đang mở.
 * @property {boolean} hasLoaded - Iframe đã từng được nạp (nạp lười ở lần mở đầu).
 * @property {() => void} open   - Mở cửa sổ chat (đồng thời đánh dấu đã nạp).
 * @property {() => void} close  - Đóng cửa sổ chat.
 * @property {() => void} toggle - Đảo trạng thái mở/đóng.
 */

/** @type {import('react').Context<ChatbotContextValue|null>} */
const ChatbotContext = createContext(null);

/**
 * Provider bọc toàn ứng dụng (đặt trong app/layout.js).
 * @param {{ children: import('react').ReactNode }} props
 * @returns {JSX.Element}
 */
export function ChatbotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  /** Mở chat và kích hoạt nạp iframe lần đầu. */
  const open = useCallback(() => {
    setIsOpen(true);
    setHasLoaded(true);
  }, []);

  /** Đóng chat (giữ iframe để mở lại nhanh). */
  const close = useCallback(() => setIsOpen(false), []);

  /** Đảo trạng thái. */
  const toggle = useCallback(() => {
    setHasLoaded(true);
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ isOpen, hasLoaded, open, close, toggle }),
    [isOpen, hasLoaded, open, close, toggle]
  );

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
}

/**
 * Hook truy cập trạng thái chatbot.
 * @throws {Error} Khi gọi ngoài ChatbotProvider.
 * @returns {ChatbotContextValue}
 */
export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) throw new Error('useChatbot phải được dùng bên trong <ChatbotProvider>.');
  return context;
}
