# TASKS 2026-10-04 – Refactor Clean Architecture "Dấu Chân Kinh Bắc"

**Mục tiêu**: Tái cấu trúc toàn bộ `dau-chan-kinh-bac/src` theo Clean Architecture:
SOLID, Single Source of Truth (SSOT), không inline style, không internal CSS (`<style jsx>`),
CSS tách file theo module/page, text không hard-code trong JSX, JSDoc tiếng Việt đầy đủ.

> Trạng thái: `[ ]` chưa làm · `[/]` đang làm · `[x]` xong

---

## 0. Kiến trúc thư mục đích

```
src/
├── app/                 # Route mỏng: chỉ metadata + render <XxxPage/> của module
├── modules/             # Tính năng theo trang (home, destinations, cuisine, culture,
│   └── <module>/        #   crafts, stays, transport, about, detail)
│       ├── components/  # UI riêng của module
│       ├── hooks/       # State hook của module (ghép state + logic thuần)
│       ├── <module>.css # CSS riêng module (BEM-ish, child-combinator khi cần)
│       └── <Module>Page.js
├── components/
│   ├── layout/          # Header, Footer, Chatbot, ScrollIndicator, ScrollDrawingBg
│   └── shared/          # FlipCard, OverlayCard, Breadcrumb, ParallaxHero, Lightbox...
├── contexts/            # React Context (ChatbotContext thay window.openChatbot)
├── effects/             # Hook hiệu ứng UI (scroll, parallax, hover-redirect, ...)
├── logic/               # Hàm thuần: filter, calculate, format (không React)
├── locales/vi/          # Toàn bộ text UI (JS module – bundle sẵn, đọc nhanh nhất)
├── data/                # Dữ liệu domain (điểm đến, món ăn, lưu trú, ...)
└── styles/              # tokens, base, utilities, animations + index.css (entry)
```

## 1. Chuẩn bị
- [x] Khảo sát code hiện tại (14 page, 18 component, 7 data, 5014 dòng globals.css, 250 inline style)
- [x] Lập task (file này)
- [x] Ghi `ARCHITECTURE.md` (quy ước đặt tên, luồng phụ thuộc, quy tắc CSS)

## 2. Nền tảng (Foundation)
- [x] `styles/`: tách tokens / base / utilities / animations từ globals.css
- [x] Phân tích & loại CSS chết (class không còn dùng)
- [x] `styles/index.css` – entry duy nhất, import theo thứ tự cố định (tránh lệch thứ tự CSS dev/prod)
- [x] `locales/vi/*` – text UI theo module + `common`, `layout`, `detail`
- [x] `data/navigation.js` – SSOT cho menu (Header + Footer dùng chung)
- [x] `data/siteConfig.js` – SSOT metadata, hotline, chatbot config

## 3. Logic & Effects & Contexts
- [x] `logic/text.js` – format chuỗi (rút gọn, bỏ số thứ tự, giá từ, địa điểm ngắn)
- [x] Lọc theo module: `modules/*/logic/filter*.js` (điểm đến, món ăn, lưu trú, làng nghề, phương tiện)
- [x] `modules/transport/logic/route.js` – tính lộ trình (estimateRoute thuần + buildRouteRows ghép locale)
- [x] `modules/transport/logic/timeline.js` + `logic/collection.js` – % tiến độ timeline, chia cột
- [x] `effects/*` – useScrolled, useScrollProgressVar, useParallax, useEscapeKey,
      useBodyScrollLock, useElementSize, useHoverRedirect, useInViewOnce, useCountUp,
      useTypewriter, useScrollDrawing, useActiveTrigger, useCssVariable, useTransientFlag;
      `modules/transport/effects/useTimelineAutoCheck`
- [x] `contexts/ChatbotContext.js` – Provider + `useChatbot()`
- [x] `modules/transport/context/TransportDetailContext.js` – SSOT popover chi tiết phương tiện

## 4. Components
- [x] `components/layout/*` – Header, Footer, Chatbot (tách FAB/Greeting/Popup), ScrollIndicator, ScrollDrawingBg
- [x] `components/shared/*` – FlipCard, OverlayCard, Breadcrumb, ParallaxHero, Icon (registry),
      TypewriterText, AnimatedCounter, Icons, KinhBacEmblem, LotusDivider, SearchField,
      ScrollBackground, IconText, NoResults, BorderProgress, WaveDivider
- [x] Bỏ component chết (KinhBacLogo lockup, Lightbox, ItinerarySlideshow) + toàn bộ `src/components/*.js` cũ,
      `app/globals.css`, `app/chatbot-popup.css`, `app/page.module.css`, `data/content.js`
      (giữ `public/chatbot-popup.css` vì script nhúng `chatbot-popup.js` ở gốc repo còn dùng)

## 5. Modules (mỗi module: Page + components + css + logic/hook)
- [x] `detail` (dùng chung 5 trang chi tiết): DetailHero, DetailBlocks, DetailSidebar, RelatedCards
- [x] `home`
- [x] `destinations` (list + detail)
- [x] `cuisine` (list + detail + ScrollBackground)
- [x] `culture` (list + detail → Server Component + generateStaticParams)
- [x] `crafts` (list + detail)
- [x] `stays` (list + detail)
- [x] `transport` (estimator, concierge, filter, cards, timeline, safety bento, popover)
- [x] `about` (sửa bug ParallaxHero nhận sai props `bgImage/subtitle`)

## 6. Route `app/` mỏng
- [x] Mỗi `page.js` chỉ còn metadata + render module page
- [x] `layout.js` dùng `siteConfig` cho metadata, bỏ `style={{}}` ở `<main>`

## 7. Kiểm tra (Audit)
- [x] `grep "style={{"` = 0 trong src
- [x] `grep "<style"` = 0
- [x] Không còn text tiếng Việt hard-code trong JSX (chỉ còn từ khoá so khớp dữ liệu trong `logic/`)
- [x] JSDoc tiếng Việt cho mọi function / component / hook / section
- [x] `npm run lint` sạch (0 lỗi, 0 cảnh báo)
- [x] `npm run build` thành công (71 trang tĩnh/SSG)
- [x] Kiểm tra trực quan (headless Chrome, so sánh `scratch/before` ↔ `scratch/after`)
- [x] Cập nhật `HANDOFF.md` tóm tắt
