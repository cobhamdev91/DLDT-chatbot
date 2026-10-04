/**
 * @file modules/stays/components/StayExplorer.js
 * @description Phần tương tác trang Lưu trú: thanh đặt phòng + vạch ngăn +
 * bộ đếm + lưới thẻ lật. Client Component (giữ state bộ lọc).
 */

'use client';

import { useMemo, useState } from 'react';
import LotusDivider from '@/components/shared/LotusDivider/LotusDivider';
import { stays as t } from '@/locales/vi/stays';
import { filterStays } from '../logic/filterStays';
import BookingBar from './BookingBar';
import StayCard from './StayCard';

/**
 * @param {{ items: Object[] }} props - Toàn bộ cơ sở lưu trú.
 * @returns {JSX.Element}
 */
export default function StayExplorer({ items }) {
  const [area, setArea] = useState('all');
  const [rating, setRating] = useState('all');
  const results = useMemo(() => filterStays(items, { area, rating }), [items, area, rating]);

  return (
    <>
      <BookingBar area={area} onAreaChange={setArea} rating={rating} onRatingChange={setRating} />

      <LotusDivider text={t.list.divider} />

      {/* Lưới thẻ lật */}
      <section className="section section--flush-top">
        <div className="container">
          {/* Bộ đếm kết quả */}
          <div className="result-count">
            {t.list.countPrefix} <strong>{results.length}</strong> {t.list.countSuffix}
          </div>

          <div className="card-grid">
            {results.map((stay) => (
              <StayCard key={stay.slug} stay={stay} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
