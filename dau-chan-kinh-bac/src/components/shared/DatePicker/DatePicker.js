/**
 * @file components/shared/DatePicker/DatePicker.js
 * @description Thành phần DatePicker chọn ngày tùy chỉnh cao cấp: hiển thị
 * định dạng DD/MM/YYYY chuẩn tiếng Việt, kèm popover lịch tháng sinh động,
 * cho phép chuyển tháng, chọn nhanh "Hôm nay", đóng tự động khi click ngoài.
 */

'use client';

import { useId, useMemo, useRef, useState } from 'react';
import Icon from '@/components/shared/Icon/Icon';
import { useClickOutside } from '@/effects/clickOutside';
import { useEscapeKey } from '@/effects/keyboard';
import { cx } from '@/logic/classNames';
import {
  buildMonthGrid,
  formatDisplayDate,
  getTodayISO,
  parseDateISO,
} from '@/logic/calendar';
import { common as t } from '@/locales/vi/common';

/**
 * @param {Object} props
 * @param {string} [props.id] - ID phần tử.
 * @param {string} props.value - Ngày đang chọn dạng 'YYYY-MM-DD'.
 * @param {(dateISO: string) => void} props.onChange - Hàm callback khi ngày thay đổi.
 * @param {string} [props.placeholder] - Chuỗi gợi ý khi chưa chọn ngày.
 * @param {string} [props.className] - Class tùy biến bao ngoài.
 * @param {string} [props.ariaLabel] - Nhãn trợ năng.
 * @param {boolean} [props.disabled] - Vô hiệu hóa.
 * @returns {JSX.Element}
 */
export default function DatePicker({
  id,
  value,
  onChange,
  placeholder = t.datePicker.placeholder,
  className,
  ariaLabel,
  disabled = false,
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const popoverId = `${inputId}-calendar`;

  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);

  // Phân tích ngày đang chọn để khởi tạo góc nhìn tháng/năm
  const parsed = useMemo(() => parseDateISO(value), [value]);
  const initialYear = parsed?.year ?? new Date().getFullYear();
  const initialMonth = parsed?.month ?? new Date().getMonth();

  const [viewYear, setViewYear] = useState(initialYear);
  const [viewMonth, setViewMonth] = useState(initialMonth);

  // Đóng khi click ra ngoài hoặc nhấn ESC
  useEscapeKey(isOpen, () => setIsOpen(false));
  useClickOutside(wrapRef, () => setIsOpen(false), isOpen);

  // Lưới 35-42 ô ngày trong tháng đang xem
  const monthGrid = useMemo(() => {
    return buildMonthGrid(viewYear, viewMonth, value);
  }, [viewYear, viewMonth, value]);

  /** Chuyển sang tháng trước */
  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  /** Chuyển sang tháng kế tiếp */
  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  /** Chọn một ngày cụ thể */
  const handleSelectDay = (dateISO) => {
    onChange(dateISO);
    setIsOpen(false);
  };

  /** Nút chọn nhanh ngày hôm nay */
  const handleSelectToday = (e) => {
    e.stopPropagation();
    const todayISO = getTodayISO();
    const now = new Date();
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    onChange(todayISO);
    setIsOpen(false);
  };

  const displayText = value ? formatDisplayDate(value) : '';

  return (
    <div
      ref={wrapRef}
      className={cx(
        'custom-datepicker',
        isOpen && 'is-open',
        disabled && 'is-disabled',
        className
      )}
    >
      {/* Nút trigger hiển thị ngày */}
      <button
        type="button"
        id={inputId}
        className="custom-datepicker__trigger"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={popoverId}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          if (!isOpen && parsed) {
            setViewYear(parsed.year);
            setViewMonth(parsed.month);
          }
          setIsOpen((prev) => !prev);
        }}
      >
        <span className="custom-datepicker__trigger-content">
          <span className="custom-datepicker__icon">
            <Icon name="Calendar" size={15} />
          </span>
          <span
            className={cx(
              'custom-datepicker__text',
              !displayText && 'is-placeholder'
            )}
          >
            {displayText || placeholder}
          </span>
        </span>

        <span className="custom-datepicker__arrow">
          <Icon name="ChevronDown" size={14} />
        </span>
      </button>

      {/* Popover khung lịch */}
      {isOpen && (
        <div id={popoverId} className="custom-datepicker__popover" role="dialog">
          {/* Header tháng và nút điều hướng */}
          <div className="custom-datepicker__header">
            <button
              type="button"
              className="custom-datepicker__nav-btn"
              onClick={handlePrevMonth}
              aria-label={t.datePicker.prevMonth}
            >
              <Icon name="ChevronLeft" size={16} />
            </button>

            <span className="custom-datepicker__month-title">
              {t.datePicker.months[viewMonth]}, {viewYear}
            </span>

            <button
              type="button"
              className="custom-datepicker__nav-btn"
              onClick={handleNextMonth}
              aria-label={t.datePicker.nextMonth}
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>

          {/* Dải thứ trong tuần */}
          <div className="custom-datepicker__weekdays">
            {t.datePicker.weekdays.map((weekday) => (
              <span key={weekday} className="custom-datepicker__weekday">
                {weekday}
              </span>
            ))}
          </div>

          {/* Lưới các ngày trong tháng */}
          <div className="custom-datepicker__grid">
            {monthGrid.map((cell) => {
              return (
                <button
                  key={cell.dateISO}
                  type="button"
                  onClick={() => handleSelectDay(cell.dateISO)}
                  className={cx(
                    'custom-datepicker__day',
                    !cell.isCurrentMonth && 'is-outside-month',
                    cell.isToday && 'is-today',
                    cell.isSelected && 'is-selected'
                  )}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Chân lịch: nút chọn nhanh hôm nay */}
          <div className="custom-datepicker__footer">
            <button
              type="button"
              className="custom-datepicker__today-btn"
              onClick={handleSelectToday}
            >
              {t.datePicker.today}
            </button>
            <button
              type="button"
              className="custom-datepicker__close-btn"
              onClick={() => setIsOpen(false)}
            >
              {t.actions.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
