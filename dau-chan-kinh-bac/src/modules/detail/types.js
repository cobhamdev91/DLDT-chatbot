/**
 * @file modules/detail/types.js
 * @description Định nghĩa kiểu (JSDoc) cho "view-model" trang chi tiết.
 * Mỗi module (điểm đến, ẩm thực, lưu trú, làng nghề, văn hóa) có một hàm
 * builder THUẦN chuyển bản ghi dữ liệu → DetailViewModel; component
 * DetailPage chỉ việc hiển thị (Open/Closed: thêm loại khối mới = thêm
 * renderer, không sửa trang).
 */

/**
 * @typedef {Object} DetailHeroModel
 * @property {string} image  - Ảnh nền hero.
 * @property {string} alt    - Alt ảnh.
 * @property {string} badge  - Nhãn vàng phía trên tiêu đề.
 * @property {string} title  - Tiêu đề H1.
 * @property {{ text: string, prefix?: string, icon?: string }} lead - Đoạn dẫn (có thể kèm icon).
 */

/**
 * @typedef {Object} DetailBlock
 * @property {'prose'|'text'|'pills'|'callout'|'funfact'|'checklist'|'locations'|'points'} type - Loại khối.
 * @property {string} id         - Khoá duy nhất trong trang.
 * @property {string} [title]    - Tiêu đề h2 (khối hộp như funfact có thể không có).
 * @property {number} [bgIndex]  - Chỉ số ảnh nền (hiệu ứng ScrollBackground).
 * Các trường còn lại tuỳ loại khối – xem DetailBlocks.js.
 */

/**
 * @typedef {Object} SidebarItem
 * @property {string} icon    - Tên icon (components/shared/Icon).
 * @property {string} label   - Nhãn.
 * @property {string} value   - Giá trị hiển thị.
 * @property {'price'|'link'} [variant] - Kiểu nhấn giá trị.
 * @property {string} [href]  - Liên kết (khi variant = 'link').
 */

/**
 * @typedef {Object} SidebarCta
 * @property {string} href    - Đích.
 * @property {string} label   - Nhãn nút.
 * @property {string} icon    - Tên icon.
 * @property {'primary'|'outline'} variant - Kiểu nút.
 * @property {boolean} [external] - true → thẻ <a> (vd "tel:").
 */

/**
 * @typedef {Object} RelatedCardModel
 * @property {string} key       - Khoá React.
 * @property {string} href      - Trang chi tiết.
 * @property {string} image     - Ảnh thẻ.
 * @property {string} badge     - Nhãn góc ảnh.
 * @property {string} title     - Tiêu đề.
 * @property {string} subtitle  - Phụ đề.
 * @property {boolean} [subtitleIcon] - Hiện icon ghim trước phụ đề.
 * @property {string} [price]   - Giá (có → hiện chân thẻ).
 * @property {string} cta       - Nhãn nút.
 */

/**
 * @typedef {Object} DetailViewModel
 * @property {DetailHeroModel} hero
 * @property {Array<{ label: string, href?: string }>} breadcrumb
 * @property {DetailBlock[]} blocks
 * @property {{ title: string, items: SidebarItem[], ctas: SidebarCta[], note?: string }} sidebar
 * @property {{ title: string, items: RelatedCardModel[] }} related
 * @property {Array<{ src: string, alt: string }>} [scrollBackground] - Có → bọc thân trang bằng ScrollBackground.
 */

export {};
