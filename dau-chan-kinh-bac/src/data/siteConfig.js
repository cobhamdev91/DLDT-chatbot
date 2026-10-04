/**
 * @file siteConfig.js
 * @description Cấu hình kỹ thuật toàn site (SSOT): số hotline, email, mạng xã hội,
 * font, icon và cấu hình nhúng chatbot. Chỉ chứa DỮ LIỆU cấu hình, không chứa
 * câu chữ hiển thị (câu chữ nằm ở src/locales).
 */

/**
 * @typedef {Object} PhoneNumber
 * @property {string} display - Dạng hiển thị cho người đọc (có dấu cách/chấm).
 * @property {string} tel     - Dạng quay số dùng cho href "tel:".
 */

/**
 * Cấu hình toàn cục của website.
 * @type {{
 *   lang: string,
 *   fontsHref: string,
 *   fontPreconnect: Array<{ href: string, crossOrigin?: string }>,
 *   icons: { icon: string, shortcut: string, apple: string },
 *   hotline: PhoneNumber,
 *   email: string,
 *   socials: Array<{ id: string, href: string, label: string }>,
 *   chatbot: {
 *     projectId: string, publicToken: string, hostOrigin: string,
 *     greetingDelay: number, greetingAutoHide: number
 *   },
 *   hoverRedirectDelay: number
 * }}
 */
export const siteConfig = Object.freeze({
  /** Ngôn ngữ của thẻ <html> */
  lang: 'vi',

  /** Google Fonts: Dancing Script, Inter, Playfair Display */
  fontsHref:
    'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap',

  /** Các origin cần preconnect để tải font nhanh hơn (gstatic cần CORS ẩn danh) */
  fontPreconnect: [
    { href: 'https://fonts.googleapis.com' },
    { href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  ],

  /** Biểu tượng trang (favicon) */
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },

  /** Tổng đài hỗ trợ chung */
  hotline: { display: '1900 1234', tel: '19001234' },

  /** Email liên hệ */
  email: 'info@dauchankinhbac.vn',

  /** Liên kết mạng xã hội (href tạm "#" cho tới khi có kênh chính thức) */
  socials: [
    { id: 'facebook', href: '#', label: 'Facebook' },
    { id: 'instagram', href: '#', label: 'Instagram' },
    { id: 'youtube', href: '#', label: 'YouTube' },
    { id: 'tiktok', href: '#', label: 'TikTok' },
  ],

  /** Cấu hình nhúng chatbot WorkflowHub */
  chatbot: {
    projectId: '01e54cda-a723-491d-8859-518f9f45d570',
    publicToken: '21632fe7-5b18-4d58-b81e-07862dbe6045',
    hostOrigin: 'https://workflowhub-web-id11.onrender.com',
    /** Thời gian chờ (ms) trước khi hiện bong bóng chào */
    greetingDelay: 3000,
    /** Thời gian (ms) bong bóng chào tự ẩn */
    greetingAutoHide: 10000,
  },

  /** Thời gian (ms) giữ chuột trên thẻ trước khi tự chuyển trang */
  hoverRedirectDelay: 3000,
});

/**
 * Dựng URL iframe chatbot từ cấu hình.
 * @param {typeof siteConfig.chatbot} config - Cấu hình chatbot.
 * @returns {string} URL nhúng đầy đủ kèm publicToken.
 */
export function buildChatbotUrl(config) {
  return `${config.hostOrigin}/embed/projects/${config.projectId}/chat?publicToken=${config.publicToken}`;
}
