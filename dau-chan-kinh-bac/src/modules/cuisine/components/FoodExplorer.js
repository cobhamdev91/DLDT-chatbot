/**
 * @file modules/cuisine/components/FoodExplorer.js
 * @description Phần tương tác trang Ẩm thực: thanh lọc đa năng (SearchField + 2 Dropdown)
 * + vạch ngăn hoa sen + lưới thẻ món ăn (FlipCard). Client Component.
 */

'use client';

import { useMemo, useState } from 'react';
import LotusDivider from '@/components/shared/LotusDivider/LotusDivider';
import NoResults from '@/components/shared/NoResults/NoResults';
import { cuisine as t } from '@/locales/vi/cuisine';
import {
  ALL_CUISINE_CATEGORY,
  ALL_CUISINE_REGION,
  extractCuisineRegions,
  filterFoods,
} from '../logic/filterFoods';
import CuisineFilterBar from './CuisineFilterBar';
import FoodCard from './FoodCard';

/**
 * @param {{ foods: Object[] }} props - Toàn bộ món ăn.
 * @returns {JSX.Element}
 */
export default function FoodExplorer({ foods }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL_CUISINE_CATEGORY);
  const [region, setRegion] = useState(ALL_CUISINE_REGION);

  // Trích xuất danh sách khu vực xuất xứ từ dữ liệu
  const regions = useMemo(() => extractCuisineRegions(foods), [foods]);

  // Lọc kết quả theo 3 tiêu chí
  const results = useMemo(
    () => filterFoods(foods, { query, category, region }),
    [foods, query, category, region]
  );

  // Hàm đặt lại toàn bộ bộ lọc
  const handleResetFilters = () => {
    setQuery('');
    setCategory(ALL_CUISINE_CATEGORY);
    setRegion(ALL_CUISINE_REGION);
  };

  return (
    <>
      {/* Thanh lọc đa năng tích hợp Dropdown và SearchField */}
      <CuisineFilterBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        region={region}
        onRegionChange={setRegion}
        regions={regions}
        count={results.length}
      />

      <LotusDivider text={t.list.menuDivider} />

      {/* Lưới thẻ món ăn */}
      <section className="section section--flush-top">
        <div className="container">
          {results.length === 0 ? (
            <NoResults
              message={t.list.noResults}
              actionLabel={t.list.clearFilters}
              onReset={handleResetFilters}
            />
          ) : (
            <div className="card-grid">
              {results.map((food) => (
                <FoodCard key={food.slug} food={food} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
