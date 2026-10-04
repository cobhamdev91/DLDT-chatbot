/**
 * @file components/layout/Chatbot/useChatbotGreeting.js
 * @description Hiệu ứng UI riêng của chatbot: bong bóng chào hỏi tự hiện
 * sau `greetingDelay` ms (nếu người dùng chưa mở chat / chưa tắt lời chào)
 * và tự ẩn sau `greetingAutoHide` ms.
 */

'use client';

import { useCallback, useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { useTimeout } from '@/effects/timers';

/**
 * @param {boolean} isChatOpen - Cửa sổ chat đang mở (lấy từ ChatbotContext).
 * @returns {{ isVisible: boolean, dismiss: () => void }}
 *   isVisible – bong bóng đang hiển thị; dismiss – tắt vĩnh viễn trong phiên.
 */
export function useChatbotGreeting(isChatOpen) {
  const [isShown, setIsShown] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { greetingDelay, greetingAutoHide } = siteConfig.chatbot;

  /* Hẹn giờ hiện lời chào khi chưa mở chat và chưa bị tắt */
  useTimeout(() => setIsShown(true), greetingDelay, !isDismissed && !isChatOpen);

  /* Hẹn giờ tự ẩn sau khi đã hiện */
  useTimeout(() => setIsShown(false), greetingAutoHide, isShown);

  /** Tắt lời chào (người dùng bấm × hoặc đã mở chat). */
  const dismiss = useCallback(() => {
    setIsShown(false);
    setIsDismissed(true);
  }, []);

  return { isVisible: isShown && !isChatOpen && !isDismissed, dismiss };
}
