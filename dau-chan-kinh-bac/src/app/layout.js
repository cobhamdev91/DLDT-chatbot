import './globals.css';
import './chatbot-popup.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import ScrollIndicator from '@/components/ScrollIndicator';
import ScrollDrawingBg from '@/components/ScrollDrawingBg';

export const metadata = {
  title: 'Dấu chân Kinh Bắc – Khám phá Du lịch Bắc Ninh',
  description: 'Cẩm nang du lịch Kinh Bắc toàn diện – Điểm đến, Ẩm thực, Văn hóa Quan họ, Làng nghề truyền thống, Lưu trú và Phương tiện. Khám phá – Trải nghiệm – Lưu dấu.',
  keywords: 'du lịch Bắc Ninh, Kinh Bắc, Quan họ, Đền Đô, Chùa Dâu, ẩm thực Bắc Ninh, làng nghề Bắc Ninh',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollIndicator />
        <ScrollDrawingBg />
        <Header />
        <main style={{ paddingTop: '0' }}>{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
