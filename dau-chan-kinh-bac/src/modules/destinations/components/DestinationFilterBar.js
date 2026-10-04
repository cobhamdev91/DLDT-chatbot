/**
 * @file modules/destinations/components/DestinationFilterBar.js
 * @description Thanh lọc gọn một hàng: ô tìm kiếm + dropdown loại hình + bộ đếm.
 * Component thuần hiển thị – mọi state do hook useDestinationFilters cung cấp.
 */

'use client';

import Dropdown from '@/components/shared/Dropdown/Dropdown';
import SearchField from '@/components/shared/SearchField/SearchField';
import { destinations as t } from '@/locales/vi/destinations';
import { ALL_CATEGORIES } from '../logic/filterDestinations';

/**
 * @param {Object} props
 * @param {string} props.query - Từ khoá.
 * @param {(v: string) => void} props.onQueryChange - Đổi từ khoá.
 * @param {string} props.category - Loại hình đang chọn.
 * @param {(v: string) => void} props.onCategoryChange - Đổi loại hình.
 * @param {string[]} props.categories - Danh sách loại hình.
 * @param {number} props.count - Số kết quả.
 * @returns {JSX.Element}
 */
export default function DestinationFilterBar({ query, onQueryChange, category, onCategoryChange, categories, count }) {
  const categoryOptions = [
    { value: ALL_CATEGORIES, label: t.list.allCategories },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  return (
    <section className="filter-bar">
      <div className="container">
        {/* Hàng ngang: tìm kiếm co giãn · dropdown · bộ đếm */}
        <div className="filter-bar__row">
          <SearchField
            id="destination-search"
            compact
            value={query}
            onChange={onQueryChange}
            placeholder={t.list.searchPlaceholder}
          />

          {/* Dropdown loại hình tùy chỉnh cao cấp */}
          <div className="filter-bar__dropdown-wrap">
            <Dropdown
              id="destination-category"
              ariaLabel={t.list.categoryLabel}
              value={category}
              onChange={onCategoryChange}
              options={categoryOptions}
            />
          </div>

          {/* Bộ đếm kết quả */}
          <span className="filter-bar__count">{t.list.count(count)}</span>
        </div>
      </div>
    </section>
  );
}
