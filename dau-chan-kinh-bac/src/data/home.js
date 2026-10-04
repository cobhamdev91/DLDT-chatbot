/**
 * @file data/home.js
 * @description Dữ liệu trang chủ (SSOT): cấu hình dải danh mục và các lịch
 * trình gợi ý. Nhãn danh mục nằm ở locales/vi/home.js (khoá theo `id`).
 */

import { ROUTES, ANCHORS, anchorHref } from './routes';

/**
 * @typedef {Object} HomeCategory
 * @property {string} id       - Khoá ghép nhãn trong locale (home.categories[id]).
 * @property {string} href     - Đích liên kết.
 * @property {string} icon     - Tên icon (components/shared/Icon).
 * @property {'green'|'orange'|'pink'|'red'|'purple'|'brown'|'gold'} tone - Tông màu squircle.
 * @property {boolean} [isAnchor] - true → neo cuộn trong trang (dùng thẻ <a>).
 */

/** @type {HomeCategory[]} */
export const homeCategories = [
  { id: 'destinations', href: ROUTES.destinations, icon: 'MapPin', tone: 'green' },
  { id: 'cuisine', href: ROUTES.cuisine, icon: 'Utensils', tone: 'orange' },
  { id: 'culture', href: ROUTES.culture, icon: 'Music', tone: 'pink' },
  { id: 'crafts', href: ROUTES.crafts, icon: 'CheckCircle2', tone: 'red' },
  { id: 'stays', href: ROUTES.stays, icon: 'Bed', tone: 'purple' },
  { id: 'transport', href: ROUTES.transport, icon: 'Car', tone: 'brown' },
  { id: 'itinerary', href: anchorHref(ANCHORS.itinerary), icon: 'ClipboardList', tone: 'gold', isAnchor: true },
];

/**
 * @typedef {Object} Itinerary
 * @property {string} title     - Tên lịch trình.
 * @property {string} subtitle  - Mô tả ngắn.
 * @property {string} duration  - Thời lượng (nhãn góc ảnh).
 * @property {string} points    - Số điểm đến.
 * @property {string} food      - Nhãn ăn/ở.
 * @property {'Utensils'|'Hotel'} foodIcon - Icon cho nhãn ăn/ở.
 * @property {string} transport - Phương tiện.
 * @property {'Bike'|'Car'} transportIcon - Icon phương tiện.
 * @property {string} image     - Ảnh thẻ.
 * @property {string} imageAlt  - Alt ảnh.
 */

/** @type {Itinerary[]} */
export const itineraries = [
  {
    title: 'Kinh Bắc trong ngày',
    subtitle: 'Khám phá văn hóa – lịch sử – ẩm thực',
    duration: '1 NGÀY',
    points: '5 điểm đến',
    food: 'Ẩm thực',
    foodIcon: 'Utensils',
    transport: 'Xe máy / Ô tô',
    transportIcon: 'Bike',
    image: '/images/den_do.jpg',
    imageAlt: 'Kinh Bắc trong ngày',
  },
  {
    title: 'Hành trình văn hóa & trải nghiệm',
    subtitle: 'Quan họ – Làng nghề – Ẩm thực',
    duration: '2 NGÀY 1 ĐÊM',
    points: '7 điểm đến',
    food: 'Lưu trú',
    foodIcon: 'Hotel',
    transport: 'Ô tô',
    transportIcon: 'Car',
    image: '/images/hero_kinh_bac.jpg',
    imageAlt: 'Hành trình văn hóa & trải nghiệm',
  },
  {
    title: 'Kinh Bắc – Về miền di sản',
    subtitle: 'Di sản – Tâm linh – Thiên nhiên',
    duration: '2 NGÀY 1 ĐÊM',
    points: '6 điểm đến',
    food: 'Lưu trú',
    foodIcon: 'Hotel',
    transport: 'Ô tô',
    transportIcon: 'Car',
    image: '/images/craft_village_pottery.jpg',
    imageAlt: 'Kinh Bắc – Về miền di sản',
  },
];
