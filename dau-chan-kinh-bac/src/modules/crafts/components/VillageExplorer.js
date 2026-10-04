/**
 * @file modules/crafts/components/VillageExplorer.js
 * @description Phần tương tác trang Làng nghề: ô tìm kiếm rộng + lưới ảnh
 * 2 cột (masonry) chứa OverlayCard + trạng thái không có kết quả.
 */

'use client';

import { useMemo, useState } from 'react';
import SearchField from '@/components/shared/SearchField/SearchField';
import OverlayCard from '@/components/shared/OverlayCard/OverlayCard';
import NoResults from '@/components/shared/NoResults/NoResults';
import { ROUTES, detailPath } from '@/data/routes';
import { FALLBACK_IMAGES } from '@/data/media';
import { crafts as t } from '@/locales/vi/crafts';
import { distributeColumns } from '@/logic/collection';
import { filterVillages } from '../logic/filterVillages';

/** Số cột của lưới ảnh */
const COLUMN_COUNT = 2;

/**
 * @param {{ villages: Object[] }} props - Toàn bộ làng nghề.
 * @returns {JSX.Element}
 */
export default function VillageExplorer({ villages }) {
  const [query, setQuery] = useState('');

  /** Kết quả lọc đã chia sẵn vào các cột */
  const results = useMemo(() => filterVillages(villages, query), [villages, query]);
  const columns = useMemo(() => distributeColumns(results, COLUMN_COUNT), [results]);

  return (
    <>
      {/* Dải tìm kiếm nền kem */}
      <section className="section bg-light crafts-search">
        <div className="container">
          <SearchField id="craft-search" value={query} onChange={setQuery} placeholder={t.list.searchPlaceholder} />
        </div>
      </section>

      {/* Lưới ảnh 2 cột */}
      <section className="section section--flush-top">
        <div className="container">
          <div className="image-grid-row">
            {columns.map((column, columnIndex) => (
              // Một cột ảnh (khoá theo vị trí cột – số cột cố định)
              <div key={columnIndex} className="image-grid-column">
                {column.map((village) => (
                  <OverlayCard
                    key={village.slug}
                    image={village.image || FALLBACK_IMAGES.crafts}
                    imageAlt={village.name}
                    title={village.name}
                    href={detailPath(ROUTES.crafts, village.slug)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Không có kết quả → xoá từ khoá */}
          {results.length === 0 && (
            <NoResults message={t.list.noResults(query)} actionLabel={t.list.reset} onReset={() => setQuery('')} />
          )}
        </div>
      </section>
    </>
  );
}
