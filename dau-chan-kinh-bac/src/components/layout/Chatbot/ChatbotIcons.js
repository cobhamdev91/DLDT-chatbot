/**
 * @file components/layout/Chatbot/ChatbotIcons.js
 * @description Icon SVG riêng của chatbot (bong bóng chat, avatar, làm mới,
 * đóng). Tách riêng để các phần FAB/Popup chỉ lo bố cục.
 */

/** Thuộc tính nét chung */
const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/** Đường bong bóng chat */
const BUBBLE_PATH = 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z';

/**
 * Bong bóng chat (nút FAB).
 * @param {{ size: number }} props
 * @returns {JSX.Element}
 */
export function ChatBubbleIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" {...STROKE} aria-hidden="true">
      <path d={BUBBLE_PATH} />
    </svg>
  );
}

/**
 * Bong bóng chat có 3 chấm (avatar trợ lý).
 * @returns {JSX.Element}
 */
export function AssistantAvatarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.8" {...STROKE} aria-hidden="true">
      <path d={BUBBLE_PATH} />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Mũi tên vòng (làm mới).
 * @returns {JSX.Element}
 */
export function RefreshIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" {...STROKE} aria-hidden="true">
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

/**
 * Dấu × (đóng).
 * @param {{ size: number }} props
 * @returns {JSX.Element}
 */
export function CloseIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2.5" {...STROKE} aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
