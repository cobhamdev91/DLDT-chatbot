/**
 * @file components/layout/Chatbot/ChatbotPopup.js
 * @description Cửa sổ chat: header (avatar, tên, trạng thái, nút làm mới /
 * đóng) + thân chứa iframe chatbot nạp lười ở lần mở đầu tiên.
 * Hiện/ẩn hoàn toàn bằng class `.is-open` (chatbot.css).
 */

'use client';

import { useState } from 'react';
import { AssistantAvatarIcon, CloseIcon, RefreshIcon } from '@/components/layout/Chatbot/ChatbotIcons';
import { useChatbot } from '@/contexts/ChatbotContext';
import { buildChatbotUrl, siteConfig } from '@/data/siteConfig';
import { layout } from '@/locales/vi/layout';
import { cx } from '@/logic/classNames';

const { chatbot: text } = layout;

/** URL nhúng iframe – tính một lần từ cấu hình */
const IFRAME_URL = buildChatbotUrl(siteConfig.chatbot);

/**
 * @returns {JSX.Element}
 */
export default function ChatbotPopup() {
  const { isOpen, hasLoaded, close } = useChatbot();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  /** Làm mới iframe: hiện lại loader và đổi key để React nạp lại */
  const refresh = (event) => {
    event.stopPropagation();
    setIsLoading(true);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={cx('chatbot-popup', isOpen && 'is-open')} id="chatbot-popup" aria-hidden={!isOpen}>
      {/* ===== HEADER CỬA SỔ ===== */}
      <div className="chatbot-popup__header">
        <div className="chatbot-popup__header-left">
          <div className="chatbot-popup__avatar">
            <AssistantAvatarIcon />
          </div>
          <div className="chatbot-popup__info">
            <span className="chatbot-popup__name">{text.botName}</span>
            <span className="chatbot-popup__status">
              <span className="chatbot-popup__status-dot" />
              {text.status}
            </span>
          </div>
        </div>
        <div className="chatbot-popup__header-actions">
          <button
            type="button"
            className="chatbot-popup__header-btn"
            id="chatbot-refresh"
            aria-label={text.refresh}
            title={text.refresh}
            onClick={refresh}
          >
            <RefreshIcon />
          </button>
          <button
            type="button"
            className="chatbot-popup__header-btn"
            id="chatbot-close"
            aria-label={text.close}
            title={text.close}
            onClick={close}
          >
            <CloseIcon size={16} />
          </button>
        </div>
      </div>

      {/* ===== THÂN: loader + iframe ===== */}
      <div className="chatbot-popup__body" id="chatbot-body">
        {isLoading && (
          <div className="chatbot-popup__loader" id="chatbot-loader">
            <div className="chatbot-popup__spinner" />
            <span className="chatbot-popup__loader-text">{text.loading}</span>
          </div>
        )}
        {hasLoaded && (
          <iframe
            key={refreshKey}
            src={IFRAME_URL}
            allow="clipboard-write"
            title={text.iframeTitle}
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>
    </div>
  );
}
