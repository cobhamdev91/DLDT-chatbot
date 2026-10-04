/**
 * @file modules/detail/components/DetailBlocks.js
 * @description Hiển thị danh sách khối nội dung của trang chi tiết.
 * Mỗi `type` ánh xạ tới một renderer nhỏ (Open/Closed: thêm loại khối mới
 * = thêm renderer vào BLOCK_RENDERERS, không sửa vòng lặp).
 *
 * Cấu trúc chung mỗi khối:
 *   <section.content-block [data-bg-index]>
 *     [h2 tiêu đề]  ← chỉ khi khối có `title`
 *     <nội dung theo loại>
 *   </section>
 */

import Icon from '@/components/shared/Icon/Icon';
import { cx, modifier } from '@/logic/classNames';
import { detail as t } from '@/locales/vi/detail';

/* ===========================================================================
 * RENDERER THEO LOẠI KHỐI
 * ======================================================================== */

/**
 * Khối bài viết nhiều đoạn văn.
 * @param {{ block: { paragraphs: string[] } }} props
 * @returns {JSX.Element}
 */
function ProseBlock({ block }) {
  return (
    <div className="prose">
      {block.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

/**
 * Khối một đoạn văn thường (không kiểu bài viết).
 * @param {{ block: { text: string } }} props
 * @returns {JSX.Element}
 */
function TextBlock({ block }) {
  return <p>{block.text}</p>;
}

/**
 * Lưới "viên thuốc" (điểm nổi bật, tiện ích, đối tượng phù hợp).
 * @param {{ block: { items: string[], icon: string, iconTone?: 'success'|'gold-dark', pillTone?: 'gold', iconStrokeWidth?: number } }} props
 * @returns {JSX.Element}
 */
function PillsBlock({ block }) {
  const pillClass = cx('highlight-pill', modifier('highlight-pill', block.pillTone));
  const iconClass = cx('highlight-pill__icon', modifier('highlight-pill__icon', block.iconTone));

  return (
    <div className="highlights-grid">
      {block.items.map((item) => (
        // Một viên: icon nhỏ + nhãn
        <div key={item} className={pillClass}>
          <span className={iconClass}>
            <Icon name={block.icon} size={14} strokeWidth={block.iconStrokeWidth} />
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Hộp trải nghiệm viền trái: icon lớn + đoạn văn HOẶC danh sách gạch đầu dòng.
 * @param {{ block: { icon: string, text?: string, list?: string[] } }} props
 * @returns {JSX.Element}
 */
function CalloutBlock({ block }) {
  return (
    <div className="experience-box">
      <span className="experience-box__icon">
        <Icon name={block.icon} size={24} />
      </span>

      {/* Nội dung: ưu tiên danh sách (quà lưu niệm), không có thì đoạn văn */}
      {block.list ? (
        <div>
          <ul className="detail-gift-list">
            {block.list.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{block.text}</p>
      )}
    </div>
  );
}

/**
 * Hộp "Bạn có biết?" nền kem: tiêu đề nhỏ có icon + đoạn văn.
 * @param {{ block: { heading: string, icon: string, text: string } }} props
 * @returns {JSX.Element}
 */
function FunfactBlock({ block }) {
  return (
    <div className="funfact-box">
      <h3>
        <Icon name={block.icon} size={20} /> {block.heading}
      </h3>
      <p>{block.text}</p>
    </div>
  );
}

/**
 * Một dòng trong checklist: chuỗi thường hoặc cặp "tiêu đề đậm – mô tả".
 * @param {{ item: string | { strong: string, text: string } }} props
 * @returns {JSX.Element}
 */
function ChecklistText({ item }) {
  if (typeof item === 'string') return <span>{item}</span>;
  return (
    <span>
      <strong>{item.strong}</strong>
      {t.itemSeparator}
      {item.text}
    </span>
  );
}

/**
 * Hộp nền vàng nhạt: [tiêu đề có icon] + [danh sách dòng có icon] + [đoạn nhấn].
 * Dùng cho SAFER CHECK, trải nghiệm làng nghề/văn hóa, lộ trình lưu trú.
 * @param {{ block: {
 *   heading?: { icon: string, text: string },
 *   items?: Array<string|{ strong: string, text: string }>,
 *   icon?: string, iconTone?: 'primary', iconStrokeWidth?: number,
 *   lead?: string
 * } }} props
 * @returns {JSX.Element}
 */
function ChecklistBlock({ block }) {
  const iconClass = cx('check-icon', modifier('check-icon', block.iconTone));

  return (
    <div className="safer-box">
      {/* Tiêu đề hộp (tuỳ chọn) */}
      {block.heading && (
        <h3>
          <Icon name={block.heading.icon} size={22} /> {block.heading.text}
        </h3>
      )}

      {/* Danh sách dòng có icon đầu dòng */}
      {block.items?.length > 0 && (
        <ul className="safer-list">
          {block.items.map((item) => (
            <li key={typeof item === 'string' ? item : item.strong}>
              <span className={iconClass}>
                <Icon name={block.icon} size={16} strokeWidth={block.iconStrokeWidth} />
              </span>
              <ChecklistText item={item} />
            </li>
          ))}
        </ul>
      )}

      {/* Đoạn nhấn mạnh (lộ trình gợi ý) */}
      {block.lead && <p className="safer-box__lead">{block.lead}</p>}
    </div>
  );
}

/**
 * Danh sách thẻ địa chỉ (quán ngon / nơi mua).
 * @param {{ block: { items: Array<{ name: string, address: string }> } }} props
 * @returns {JSX.Element}
 */
function LocationsBlock({ block }) {
  return (
    <div className="locations-list">
      {block.items.map((location) => (
        <div key={location.name} className="location-item-card">
          <div className="location-item-card__icon">
            <Icon name="MapPin" size={22} />
          </div>
          <div>
            <strong>{location.name}</strong>
            <p>{location.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Danh sách mục con có tiêu đề h3 + đoạn văn (trang Văn hóa).
 * @param {{ block: { items: Array<{ title: string, text: string }> } }} props
 * @returns {JSX.Element}
 */
function PointsBlock({ block }) {
  return (
    <>
      {block.items.map((point) => (
        <div key={point.title} className="detail-point">
          <h3 className="detail-point__title">
            <Icon name="Sparkles" size={18} />
            {point.title}
          </h3>
          <div className="prose">
            <p>{point.text}</p>
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Bảng ánh xạ loại khối → renderer.
 * @type {Record<string, (props: { block: any }) => JSX.Element>}
 */
const BLOCK_RENDERERS = {
  prose: ProseBlock,
  text: TextBlock,
  pills: PillsBlock,
  callout: CalloutBlock,
  funfact: FunfactBlock,
  checklist: ChecklistBlock,
  locations: LocationsBlock,
  points: PointsBlock,
};

/* ===========================================================================
 * COMPONENT CHÍNH
 * ======================================================================== */

/**
 * @param {{ blocks: import('@/modules/detail/types').DetailBlock[] }} props
 * @returns {JSX.Element}
 */
export default function DetailBlocks({ blocks }) {
  return (
    <div className="detail-main">
      {blocks.map((block) => {
        const Renderer = BLOCK_RENDERERS[block.type];
        if (!Renderer) return null;

        return (
          // Một khối nội dung; data-bg-index kích hoạt đổi ảnh nền ScrollBackground
          <section key={block.id} className="content-block" data-bg-index={block.bgIndex}>
            {block.title && <h2>{block.title}</h2>}
            <Renderer block={block} />
          </section>
        );
      })}
    </div>
  );
}
