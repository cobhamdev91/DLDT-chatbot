/**
 * @file modules/destinations/components/DestinationExplorer.js
 * @description Phần tương tác của trang Điểm đến: thanh lọc + lưới thẻ lật +
 * trạng thái "không có kết quả". Client Component (giữ state bộ lọc).
 */

'use client';

import NoResults from '@/components/shared/NoResults/NoResults';
import { destinations as t } from '@/locales/vi/destinations';
import { useDestinationFilters } from '../hooks/useDestinationFilters';
import DestinationFilterBar from './DestinationFilterBar';
import DestinationCard from './DestinationCard';

/**
 * @param {{ items: Object[] }} props - Toàn bộ điểm đến (truyền từ Server Component).
 * @returns {JSX.Element}
 */
export default function DestinationExplorer({ items }) {
  const { category, setCategory, query, setQuery, categories, results, reset } = useDestinationFilters(items);

  return (
    <>
      <DestinationFilterBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        count={results.length}
      />

      {/* Lưới thẻ lật (sát thanh lọc nên bỏ đệm trên) */}
      <section className="section section--flush-top">
        <div className="container">
          <div className="card-grid">
            {results.map((dest) => (
              <DestinationCard key={dest.slug} dest={dest} />
            ))}
          </div>

          {/* Không có kết quả → nút đặt lại bộ lọc */}
          {results.length === 0 && (
            <NoResults message={t.list.noResults} actionLabel={t.list.reset} onReset={reset} />
          )}
        </div>
      </section>
    </>
  );
}
