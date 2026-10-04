/**
 * @file app/layout.js
 * @description Layout gốc (Server Component): khai báo metadata SEO mặc định,
 * nạp font + toàn bộ CSS (một điểm vào duy nhất styles/index.css) và dựng
 * khung trang: thanh cuộn, nền vẽ, header, nội dung, footer, chatbot.
 */

import '@/styles/index.css';
import Chatbot from '@/components/layout/Chatbot/Chatbot';
import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import ScrollDrawingBg from '@/components/layout/ScrollDrawingBg/ScrollDrawingBg';
import ScrollIndicator from '@/components/layout/ScrollIndicator/ScrollIndicator';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import { siteConfig } from '@/data/siteConfig';
import { layout } from '@/locales/vi/layout';

/** Metadata mặc định – các trang con ghi đè title/description riêng */
export const metadata = {
  title: layout.meta.title,
  description: layout.meta.description,
  keywords: layout.meta.keywords,
  icons: siteConfig.icons,
};

/**
 * @param {{ children: import('react').ReactNode }} props
 * @returns {JSX.Element}
 */
export default function RootLayout({ children }) {
  return (
    <html lang={siteConfig.lang}>
      <head>
        {/* Kết nối sớm tới máy chủ font */}
        {siteConfig.fontPreconnect.map(({ href, crossOrigin }) => (
          <link key={href} rel="preconnect" href={href} crossOrigin={crossOrigin} />
        ))}
        {/* Bộ font Google (nạp ở layout gốc nên áp dụng cho mọi trang) */}
        <link href={siteConfig.fontsHref} rel="stylesheet" />
      </head>
      <body>
        <ChatbotProvider>
          {/* Lớp trang trí cố định */}
          <ScrollIndicator />
          <ScrollDrawingBg />

          {/* Khung trang */}
          <Header />
          <main>{children}</main>
          <Footer />

          {/* Trợ lý AI nổi góc phải */}
          <Chatbot />
        </ChatbotProvider>
      </body>
    </html>
  );
}
