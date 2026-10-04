/**
 * @file components/shared/Dropdown/Dropdown.js
 * @description Thành phần Dropdown tùy chỉnh cao cấp (thay thế thẻ <select> thô sơ):
 * hiển thị đẹp mắt, hỗ trợ icon, menu popover bo góc mềm mại, đóng khi click ngoài hoặc ESC.
 */

'use client';

import { useId, useMemo, useRef, useState } from 'react';
import Icon from '@/components/shared/Icon/Icon';
import { useClickOutside } from '@/effects/clickOutside';
import { useEscapeKey } from '@/effects/keyboard';
import { cx } from '@/logic/classNames';
import { common as t } from '@/locales/vi/common';

/**
 * @typedef {Object} DropdownOption
 * @property {string} value - Giá trị định danh.
 * @property {string} label - Nhãn hiển thị cho người dùng.
 * @property {string} [icon] - Tên icon (tùy chọn).
 * @property {boolean} [disabled] - Vô hiệu hóa tùy chọn này.
 */

/**
 * @param {Object} props
 * @param {string} [props.id] - ID phần tử.
 * @param {string} props.value - Giá trị đang được chọn.
 * @param {(value: string) => void} props.onChange - Hàm callback khi chọn giá trị mới.
 * @param {Array<DropdownOption | string>} props.options - Danh sách tùy chọn.
 * @param {string} [props.placeholder] - Chữ gợi ý khi chưa chọn.
 * @param {string} [props.className] - Class tùy biến bao ngoài.
 * @param {string} [props.ariaLabel] - Nhãn trợ năng cho trình đọc màn hình.
 * @param {boolean} [props.disabled] - Vô hiệu hóa toàn bộ dropdown.
 * @returns {JSX.Element}
 */
export default function Dropdown({
  id,
  value,
  onChange,
  options = [],
  placeholder = t.dropdown.placeholder,
  className,
  ariaLabel,
  disabled = false,
}) {
  const autoId = useId();
  const selectId = id || autoId;
  const listboxId = `${selectId}-listbox`;

  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);

  // Đóng khi nhấn phím Escape hoặc click ra ngoài
  useEscapeKey(isOpen, () => setIsOpen(false));
  useClickOutside(wrapRef, () => setIsOpen(false), isOpen);

  // Chuẩn hóa danh sách options thành mảng đối tượng { value, label, icon, disabled }
  const normalizedOptions = useMemo(() => {
    return options.map((opt) => {
      if (typeof opt === 'string') {
        return { value: opt, label: opt };
      }
      return opt;
    });
  }, [options]);

  // Tìm lựa chọn đang active
  const selectedOption = useMemo(() => {
    return normalizedOptions.find((opt) => String(opt.value) === String(value));
  }, [normalizedOptions, value]);

  /** Chọn một mục trong danh sách */
  const handleSelect = (optValue, isOptDisabled) => {
    if (disabled || isOptDisabled) return;
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className={cx(
        'custom-dropdown',
        isOpen && 'is-open',
        disabled && 'is-disabled',
        className
      )}
    >
      {/* Nút kích hoạt dropdown */}
      <button
        type="button"
        id={selectId}
        className="custom-dropdown__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
      >
        <span className="custom-dropdown__trigger-content">
          {selectedOption?.icon && (
            <span className="custom-dropdown__icon">
              <Icon name={selectedOption.icon} size={15} />
            </span>
          )}
          <span
            className={cx(
              'custom-dropdown__label',
              !selectedOption && 'is-placeholder'
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>

        <span className="custom-dropdown__arrow">
          <Icon name="ChevronDown" size={14} />
        </span>
      </button>

      {/* Menu danh sách các lựa chọn */}
      {isOpen && (
        <div
          id={listboxId}
          className="custom-dropdown__menu"
          role="listbox"
          tabIndex={-1}
        >
          {normalizedOptions.length === 0 ? (
            <div className="custom-dropdown__empty">{t.dropdown.noOptions}</div>
          ) : (
            normalizedOptions.map((opt) => {
              const isSelected = String(opt.value) === String(value);

              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  className={cx(
                    'custom-dropdown__item',
                    isSelected && 'is-selected',
                    opt.disabled && 'is-disabled'
                  )}
                  onClick={() => handleSelect(opt.value, opt.disabled)}
                >
                  <span className="custom-dropdown__item-label">
                    {opt.icon && (
                      <span className="custom-dropdown__item-icon">
                        <Icon name={opt.icon} size={14} />
                      </span>
                    )}
                    <span>{opt.label}</span>
                  </span>

                  {isSelected && (
                    <span className="custom-dropdown__item-check">
                      <Icon name="Check" size={14} />
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
