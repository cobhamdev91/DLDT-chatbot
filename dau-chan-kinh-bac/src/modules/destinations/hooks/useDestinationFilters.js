/**
 * @file modules/destinations/hooks/useDestinationFilters.js
 * @description Hook state bộ lọc trang Điểm đến: ghép state React với hàm
 * lọc thuần (filterDestinations). Component chỉ gọi hook và hiển thị.
 */

'use client';

import { useMemo, useState } from 'react';
import { uniqueValues } from '@/logic/collection';
import { ALL_CATEGORIES, filterDestinations } from '../logic/filterDestinations';

/**
 * @param {Object[]} items - Toàn bộ điểm đến.
 * @returns {{
 *   category: string, setCategory: (v: string) => void,
 *   query: string, setQuery: (v: string) => void,
 *   categories: string[], results: Object[], reset: () => void
 * }}
 */
export function useDestinationFilters(items) {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [query, setQuery] = useState('');

  /** Danh sách loại hình không trùng lặp (tính một lần) */
  const categories = useMemo(() => uniqueValues(items, 'category'), [items]);

  /** Kết quả sau lọc */
  const results = useMemo(() => filterDestinations(items, { category, query }), [items, category, query]);

  /** Đưa bộ lọc về mặc định */
  const reset = () => {
    setCategory(ALL_CATEGORIES);
    setQuery('');
  };

  return { category, setCategory, query, setQuery, categories, results, reset };
}
