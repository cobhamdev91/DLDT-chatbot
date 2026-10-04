/**
 * @file modules/cuisine/components/CuisineFilterBar.js
 * @description Thanh lọc ẩm thực đa chiều: Ô tìm kiếm món ăn + Dropdown phân loại đặc sản
 * + Dropdown xuất xứ khu vực + Bộ đếm kết quả.
 * Component thuần hiển thị, mọi state và logic do component cha hoặc hook quản lý.
 */

'use client';

import { useMemo } from 'react';
import Dropdown from '@/components/shared/Dropdown';
import SearchField from '@/components/shared/SearchField/SearchField';
import { cuisine as t } from '@/locales/vi/cuisine';
import { ALL_CUISINE_CATEGORY, ALL_CUISINE_REGION, CUISINE_FILTERS } from '../logic/filterFoods';

/**
 * @param {Object} props
 * @param {string} props.query - Từ khóa tìm kiếm.
 * @param {(query: string) => void} props.onQueryChange - Hàm cập nhật từ khóa.
 * @param {string} props.category - Danh mục món ăn đang chọn.
 * @param {(category: string) => void} props.onCategoryChange - Hàm cập nhật danh mục.
 * @param {string} props.region - Khu vực đang chọn.
 * @param {(region: string) => void} props.onRegionChange - Hàm cập nhật khu vực.
 * @param {string[]} props.regions - Danh sách khu vực xuất xứ.
 * @param {number} props.count - Số lượng món ăn sau lọc.
 * @returns {JSX.Element}
 */
export default function CuisineFilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  region,
  onRegionChange,
  regions = [],
  count,
}) {
  /** Lựa chọn danh mục đặc sản cho Dropdown */
  const categoryOptions = useMemo(() => {
    return CUISINE_FILTERS.map((key) => ({
      value: key,
      label: t.list.filters[key] || key,
    }));
  }, []);

  /** Lựa chọn khu vực xuất xứ cho Dropdown */
  const regionOptions = useMemo(() => {
    return [
      { value: ALL_CUISINE_REGION, label: t.list.allRegions },
      ...regions.map((reg) => ({ value: reg, label: reg })),
    ];
  }, [regions]);

  return (
    <section className="cuisine-filter-bar">
      <div className="container">
        <div className="cuisine-filter-bar__row">
          {/* Ô tìm kiếm món ăn */}
          <div className="cuisine-filter-bar__search">
            <SearchField
              id="cuisine-search-input"
              compact
              value={query}
              onChange={onQueryChange}
              placeholder={t.list.searchPlaceholder}
            />
          </div>

          {/* Nhóm Dropdown tùy chỉnh cao cấp */}
          <div className="cuisine-filter-bar__dropdowns">
            {/* Dropdown danh mục đặc sản */}
            <div className="cuisine-filter-bar__dropdown-item">
              <Dropdown
                id="cuisine-category-dropdown"
                ariaLabel={t.list.categoryLabel}
                value={category}
                onChange={onCategoryChange}
                options={categoryOptions}
              />
            </div>

            {/* Dropdown khu vực xuất xứ */}
            <div className="cuisine-filter-bar__dropdown-item">
              <Dropdown
                id="cuisine-region-dropdown"
                ariaLabel={t.list.regionLabel}
                value={region}
                onChange={onRegionChange}
                options={regionOptions}
              />
            </div>
          </div>

          {/* Bộ đếm kết quả */}
          <div className="cuisine-filter-bar__count-wrap">
            <span className="cuisine-filter-bar__count">
              {t.list.count(count)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
