/**
 * @file modules/cuisine/components/FoodExplorer.js
 * @description Phần tương tác trang Ẩm thực: thanh lọc pill + vạch ngăn +
 * lưới thẻ món ăn. Client Component (giữ nhóm lọc đang chọn).
 */

'use client';

import { useMemo, useState } from 'react';
import LotusDivider from '@/components/shared/LotusDivider/LotusDivider';
import { cuisine as t } from '@/locales/vi/cuisine';
import { cx } from '@/logic/classNames';
import { CUISINE_FILTERS, filterFoods } from '../logic/filterFoods';
import FoodCard from './FoodCard';

/**
 * @param {{ foods: Object[] }} props - Toàn bộ món ăn.
 * @returns {JSX.Element}
 */
export default function FoodExplorer({ foods }) {
  const [filterKey, setFilterKey] = useState(CUISINE_FILTERS[0]);
  const results = useMemo(() => filterFoods(foods, filterKey), [foods, filterKey]);

  return (
    <>
      {/* Thanh lọc dạng viên thuốc */}
      <section className="pill-filter">
        <div className="container">
          <div className="pill-filter__row" role="group" aria-label={t.list.filterGroupLabel}>
            {CUISINE_FILTERS.map((key) => (
              <button
                key={key}
                id={`cuisine-filter-${key}`}
                type="button"
                aria-pressed={filterKey === key}
                className={cx('pill-filter__btn', filterKey === key && 'pill-filter__btn--active')}
                onClick={() => setFilterKey(key)}
              >
                {t.list.filters[key]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <LotusDivider text={t.list.menuDivider} />

      {/* Lưới thẻ món ăn */}
      <section className="section section--flush-top">
        <div className="container">
          <div className="card-grid">
            {results.map((food) => (
              <FoodCard key={food.slug} food={food} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
