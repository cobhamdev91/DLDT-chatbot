/**
 * @file components/shared/WaveDivider/WaveDivider.js
 * @description Đường sóng uốn lượn ở đáy hero, cùng màu nền trang để "hòa"
 * hero vào phần nội dung. Màu tô định nghĩa trong wave-divider.css.
 */

import { cx } from '@/logic/classNames';

/** Đường cong sóng chuẩn (viewBox 1440×120) */
const WAVE_PATH =
  'M0,60 C180,120 360,0 540,60 C720,120 900,20 1080,60 C1260,100 1380,40 1440,60 L1440,120 L0,120 Z';

/**
 * @param {{ tall?: boolean }} props
 * @param {boolean} [props.tall=false] - Biến thể cao 100px (hero trang chủ).
 * @returns {JSX.Element}
 */
export default function WaveDivider({ tall = false }) {
  return (
    <div className={cx('wave-divider', tall && 'wave-divider--tall')} aria-hidden="true">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d={WAVE_PATH} />
      </svg>
    </div>
  );
}
