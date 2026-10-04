/**
 * @file modules/crafts/components/VillageExplorer.js
 * @description Phần tương tác trang Làng nghề: thanh lọc nhanh + vạch ngăn hoa sen +
 * bộ đếm kết quả + lưới thẻ lật FlipCard 3D (chuẩn bố cục như trang lưu trú).
 */

'use client';

import { useMemo, useState } from 'react';
import LotusDivider from '@/components/shared/LotusDivider/LotusDivider';
import NoResults from '@/components/shared/NoResults/NoResults';
import { crafts as t } from '@/locales/vi/crafts';
import { filterVillages } from '../logic/filterVillages';
import CraftFilterBar from './CraftFilterBar';
import VillageCard from './VillageCard';

/**
 * @param {{ villages: Object[] }} props - Toàn bộ làng nghề.
 * @returns {JSX.Element}
 */
export default function VillageExplorer({ villages }) {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('all');
  const [category, setCategory] = useState('all');

  /** Kết quả lọc đa chiều theo từ khoá, khu vực và ngành nghề */
  const results = useMemo(
    () => filterVillages(villages, { query, area, category }),
    [villages, query, area, category]
  );

  /** Đặt lại toàn bộ bộ lọc */
  const handleReset = () => {
    setQuery('');
    setArea('all');
    setCategory('all');
  };

  return (
    <>
      {/* 1. Thanh lọc nhanh (tìm kiếm + khu vực + ngành nghề) */}
      <CraftFilterBar
        query={query}
        onQueryChange={setQuery}
        area={area}
        onAreaChange={setArea}
        category={category}
        onCategoryChange={setCategory}
      />

      {/* 2. Vạch ngăn hoa sen */}
      <LotusDivider text={t.list.divider} />

      {/* 3. Lưới thẻ lật 3D (FlipCard) như trang lưu trú */}
      <section className="section section--flush-top">
        <div className="container">
          {/* Bộ đếm kết quả */}
          <div className="result-count">
            {t.list.countPrefix} <strong>{results.length}</strong> {t.list.countSuffix}
          </div>

          {/* Lưới thẻ responsive 3 cột .card-grid */}
          <div className="card-grid">
            {results.map((village) => (
              <VillageCard key={village.slug} village={village} />
            ))}
          </div>

          {/* Trạng thái không có kết quả */}
          {results.length === 0 && (
            <NoResults
              message={t.list.noResults(query)}
              actionLabel={t.list.reset}
              onReset={handleReset}
            />
          )}
        </div>
      </section>
    </>
  );
}
