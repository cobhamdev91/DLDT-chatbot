/**
 * @file modules/crafts/components/CraftFilterBar.js
 * @description Thanh lọc làng nghề: ô tìm kiếm + dropdown khu vực + dropdown ngành nghề.
 * Tự động kích hoạt bộ lọc khi chọn (auto-apply), bo góc 12px chuẩn thiết kế.
 */

'use client';

import Dropdown from '@/components/shared/Dropdown/Dropdown';
import SearchField from '@/components/shared/SearchField/SearchField';
import { crafts as t } from '@/locales/vi/crafts';

/**
 * @param {Object} props
 * @param {string} props.query - Từ khoá tìm kiếm.
 * @param {(v: string) => void} props.onQueryChange - Đổi từ khoá.
 * @param {string} props.area - Khu vực đang chọn.
 * @param {(v: string) => void} props.onAreaChange - Đổi khu vực.
 * @param {string} props.category - Ngành nghề đang chọn.
 * @param {(v: string) => void} props.onCategoryChange - Đổi ngành nghề.
 * @returns {JSX.Element}
 */
export default function CraftFilterBar({
  query,
  onQueryChange,
  area,
  onAreaChange,
  category,
  onCategoryChange,
}) {
  const l = t.list;
  const areaOptions = Object.keys(l.areas).map((key) => ({
    value: key,
    label: l.areas[key],
  }));

  const categoryOptions = Object.keys(l.categories).map((key) => ({
    value: key,
    label: l.categories[key],
  }));

  return (
    <section className="craft-filter-bar">
      <div className="container">
        {/* Hộp nền trắng chứa lưới trường lọc tương tự trang lưu trú */}
        <div className="craft-filter-bar__box">
          {/* Ô tìm kiếm từ khoá */}
          <div className="craft-filter-bar__field craft-filter-bar__field--search">
            <label htmlFor="craft-search">{l.searchLabel}</label>
            <SearchField
              id="craft-search"
              compact
              value={query}
              onChange={onQueryChange}
              placeholder={l.searchPlaceholder}
            />
          </div>

          {/* Dropdown khu vực */}
          <div className="craft-filter-bar__field">
            <label htmlFor="craft-area">{l.areaLabel}</label>
            <Dropdown
              id="craft-area"
              value={area}
              onChange={onAreaChange}
              options={areaOptions}
            />
          </div>

          {/* Dropdown ngành nghề */}
          <div className="craft-filter-bar__field">
            <label htmlFor="craft-category">{l.categoryLabel}</label>
            <Dropdown
              id="craft-category"
              value={category}
              onChange={onCategoryChange}
              options={categoryOptions}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
