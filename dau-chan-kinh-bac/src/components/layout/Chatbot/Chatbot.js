/**
 * @file components/layout/Chatbot/Chatbot.js
 * @description Trợ lý AI Kinh Bắc – ghép 3 phần: bong bóng chào hỏi,
 * cửa sổ chat và nút nổi (FAB). Trạng thái mở/đóng lấy từ ChatbotContext;
 * lời chào do hook useChatbotGreeting điều khiển.
 */

'use client';

import ChatbotPopup from '@/components/layout/Chatbot/ChatbotPopup';
import { ChatBubbleIcon, CloseIcon } from '@/components/layout/Chatbot/ChatbotIcons';
import { useChatbotGreeting } from '@/components/layout/Chatbot/useChatbotGreeting';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useEscapeKey } from '@/effects/keyboard';
import { layout } from '@/locales/vi/layout';
import { cx } from '@/logic/classNames';

const { chatbot: text } = layout;

/**
 * Bong bóng chào hỏi phía trên FAB.
 * @param {{ isVisible: boolean, onDismiss: () => void }} props
 * @returns {JSX.Element}
 */
function ChatbotGreeting({ isVisible, onDismiss }) {
  return (
    <div className={cx('chatbot-greeting', isVisible && 'is-visible')} id="chatbot-greeting">
      <button
        type="button"
        className="chatbot-greeting__close"
        id="chatbot-greeting-close"
        aria-label={text.close}
        onClick={(event) => {
          event.stopPropagation();
          onDismiss();
        }}
      >
        <CloseIcon size={12} />
      </button>
      <p className="chatbot-greeting__text">
        {text.greeting.lead}
        <strong>{text.greeting.highlight}</strong>
        {text.greeting.tail}
      </p>
    </div>
  );
}

/**
 * Nút nổi mở/đóng chat; hiện huy hiệu "1" khi lời chào đang hiển thị.
 * @param {{ isOpen: boolean, showBadge: boolean, onToggle: () => void }} props
 * @returns {JSX.Element}
 */
function ChatbotFab({ isOpen, showBadge, onToggle }) {
  return (
    <button
      type="button"
      className={cx('chatbot-fab', isOpen && 'is-open')}
      id="chatbot-fab"
      aria-label={isOpen ? text.fabClose : text.fabOpen}
      aria-expanded={isOpen}
      onClick={onToggle}
    >
      <span className="fab-icon-chat">
        <ChatBubbleIcon size={28} />
      </span>
      <span className="fab-icon-close">
        <CloseIcon size={24} />
      </span>
      {showBadge && (
        <span className="chatbot-fab__badge" id="chatbot-badge">
          {text.unreadBadge}
        </span>
      )}
    </button>
  );
}

/**
 * Widget chatbot hoàn chỉnh (đặt một lần trong app/layout.js).
 * @returns {JSX.Element}
 */
export default function Chatbot() {
  const { isOpen, toggle, close } = useChatbot();
  const greeting = useChatbotGreeting(isOpen);

  /* Hiệu ứng: ESC đóng cửa sổ chat */
  useEscapeKey(isOpen, close);

  /** Mở/đóng chat; lần mở đầu tiên tắt luôn lời chào */
  const handleToggle = () => {
    if (!isOpen) greeting.dismiss();
    toggle();
  };

  return (
    <>
      <ChatbotGreeting isVisible={greeting.isVisible} onDismiss={greeting.dismiss} />
      <ChatbotPopup />
      <ChatbotFab isOpen={isOpen} showBadge={greeting.isVisible} onToggle={handleToggle} />
    </>
  );
}
