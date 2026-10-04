/**
 * @file modules/destinations/components/DestinationFilterBar.js
 * @description Thanh lọc gọn một hàng: ô tìm kiếm + dropdown loại hình + bộ đếm.
 * Component thuần hiển thị – mọi state do hook useDestinationFilters cung cấp.
 */

'use client';

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

          {/* Dropdown loại hình: mục đầu là "Tất cả" */}
          <select
            id="destination-category"
            className="filter-bar__select"
            aria-label={t.list.categoryLabel}
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value={ALL_CATEGORIES}>{t.list.allCategories}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Bộ đếm kết quả */}
          <span className="filter-bar__count">{t.list.count(count)}</span>
        </div>
      </div>
    </section>
  );
}
