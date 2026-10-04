/**
 * @file modules/detail/DetailPage.js
 * @description Khung trang chi tiết dùng chung cho 5 loại nội dung.
 * Nhận DetailViewModel (do builder thuần của từng module dựng) và ghép:
 *   Hero → [ScrollBackground?] → Breadcrumb → Lưới (nội dung + sidebar) → Liên quan.
 * Component chỉ hiển thị, không chứa logic dữ liệu (Single Responsibility).
 */

import Breadcrumb from '@/components/shared/Breadcrumb/Breadcrumb';
import ScrollBackground from '@/components/shared/ScrollBackground/ScrollBackground';
import DetailHero from './components/DetailHero';
import DetailBlocks from './components/DetailBlocks';
import DetailSidebar from './components/DetailSidebar';
import RelatedCards from './components/RelatedCards';

/**
 * Thân trang: breadcrumb + lưới 2 cột + thẻ liên quan.
 * @param {{ model: import('./types').DetailViewModel }} props
 * @returns {JSX.Element}
 */
function DetailBody({ model }) {
  return (
    <>
      <Breadcrumb items={model.breadcrumb} />

      {/* Khung chứa thân trang */}
      <div className="container detail-body">
        {/* Lưới 2 cột: nội dung chính (trái) + sidebar (phải) */}
        <div className="detail-layout">
          <DetailBlocks blocks={model.blocks} />
          <DetailSidebar sidebar={model.sidebar} />
        </div>

        <RelatedCards related={model.related} />
      </div>
    </>
  );
}

/**
 * @param {{ model: import('./types').DetailViewModel }} props
 * @returns {JSX.Element}
 */
export default function DetailPage({ model }) {
  return (
    <article className="detail-page">
      <DetailHero hero={model.hero} />

      {/* Có ảnh nền cuộn → bọc thân trang bằng ScrollBackground (trang Ẩm thực) */}
      {model.scrollBackground ? (
        <ScrollBackground images={model.scrollBackground}>
          <DetailBody model={model} />
        </ScrollBackground>
      ) : (
        <DetailBody model={model} />
      )}
    </article>
  );
}
