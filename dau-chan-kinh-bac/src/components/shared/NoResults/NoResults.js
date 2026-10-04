/**
 * @file components/shared/NoResults/NoResults.js
 * @description Hộp thông báo "không tìm thấy kết quả" + nút đặt lại bộ lọc.
 * Style dùng class tiện ích `.no-results` (styles/utilities.css).
 */

'use client';

/**
 * @param {Object} props
 * @param {string} props.message - Câu thông báo.
 * @param {string} props.actionLabel - Nhãn nút đặt lại.
 * @param {() => void} props.onReset - Hàm đặt lại bộ lọc.
 * @returns {JSX.Element}
 */
export default function NoResults({ message, actionLabel, onReset }) {
  return (
    <div className="no-results" role="status">
      <p>{message}</p>
      <button type="button" className="btn btn-outline" onClick={onReset}>
        {actionLabel}
      </button>
    </div>
  );
}
