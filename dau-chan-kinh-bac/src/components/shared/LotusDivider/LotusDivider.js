/**
 * @file components/shared/LotusDivider/LotusDivider.js
 * @description Vạch ngăn trang trí: hai vạch mảnh + hoa sen + câu chữ có
 * phần nhấn đỏ son. Biến thể `compact` chỉ có hoa sen (trang Về chúng tôi).
 */

import { LotusIcon } from '@/components/shared/Icons/Icons';
import { cx } from '@/logic/classNames';

/**
 * @typedef {Object} DividerText
 * @property {string} lead      - Phần chữ thường phía trước.
 * @property {string} highlight - Phần chữ nhấn đỏ son.
 * @property {string} [tail]    - Phần chữ thường phía sau (tuỳ chọn).
 */

/**
 * @param {Object} props
 * @param {DividerText} [props.text] - Câu chữ (bỏ trống với biến thể compact).
 * @param {boolean} [props.compact=false] - Chỉ hiện icon, khoảng cách gọn.
 * @param {number} [props.iconSize=26] - Kích thước hoa sen (px).
 * @returns {JSX.Element}
 */
export default function LotusDivider({ text, compact = false, iconSize = 26 }) {
  return (
    /* Khung căn giữa trong container chuẩn */
    <div className="container">
      <div className={cx('lotus-divider', compact && 'lotus-divider--compact')}>
        <div className="lotus-divider-content">
          <LotusIcon size={iconSize} />
          {text && (
            <span>
              {text.lead} <span className="red-text">{text.highlight}</span>
              {text.tail && ` ${text.tail}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
