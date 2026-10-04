/**
 * @file components/shared/SearchField/SearchField.js
 * @description Ô tìm kiếm có icon kính lúp và nút xoá (×) khi có từ khoá.
 * Component "có kiểm soát" (controlled) – trạng thái nằm ở module cha.
 */

'use client';

import { Search, X } from 'lucide-react';
import { common } from '@/locales/vi/common';
import { cx } from '@/logic/classNames';

/**
 * @param {Object} props
 * @param {string} props.value - Từ khoá hiện tại.
 * @param {(value: string) => void} props.onChange - Cập nhật từ khoá.
 * @param {string} props.placeholder - Gợi ý trong ô.
 * @param {boolean} [props.compact=false] - Biến thể gọn (chung hàng với dropdown).
 * @param {string} [props.id] - id cho input (kiểm thử / label).
 * @returns {JSX.Element}
 */
export default function SearchField({ value, onChange, placeholder, compact = false, id }) {
  return (
    <div className={cx('search-field', compact && 'search-field--compact')}>
      <Search size={compact ? 16 : 18} className="search-field__icon" aria-hidden="true" />
      <input
        id={id}
        type="text"
        className="search-field__input"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {/* Nút xoá chỉ hiện khi có từ khoá */}
      {value && (
        <button
          type="button"
          className="search-field__clear"
          onClick={() => onChange('')}
          aria-label={common.search.clear}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
