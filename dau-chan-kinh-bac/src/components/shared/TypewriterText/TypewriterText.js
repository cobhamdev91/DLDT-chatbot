/**
 * @file components/shared/TypewriterText/TypewriterText.js
 * @description Chữ tự gõ – xoá luân phiên qua danh sách từ, kèm con trỏ
 * nhấp nháy. Logic máy trạng thái ở logic/animation.js, hiệu ứng ở
 * effects/animation.js – component chỉ hiển thị.
 */

'use client';

import { useTypewriter } from '@/effects/animation';
import { useBlink } from '@/effects/timers';
import { cx } from '@/logic/classNames';

/** Ký tự con trỏ (không phải câu chữ nội dung) */
const CURSOR_CHAR = '|';

/**
 * @param {Object} props
 * @param {string[]} props.texts - Danh sách từ.
 * @param {number} [props.speed=80] - Tốc độ gõ (ms/ký tự).
 * @param {number} [props.deleteSpeed=40] - Tốc độ xoá (ms/ký tự).
 * @param {number} [props.pauseTime=2000] - Thời gian dừng khi gõ xong (ms).
 * @param {string} [props.className] - Class bổ sung.
 * @returns {JSX.Element}
 */
export default function TypewriterText({ texts, speed = 80, deleteSpeed = 40, pauseTime = 2000, className }) {
  const text = useTypewriter(texts, { speed, deleteSpeed, pauseTime });
  const cursorVisible = useBlink();

  return (
    <span className={cx('typewriter', className)}>
      {text}
      <span className={cx('typewriter-cursor', cursorVisible && 'visible')} aria-hidden="true">
        {CURSOR_CHAR}
      </span>
    </span>
  );
}
