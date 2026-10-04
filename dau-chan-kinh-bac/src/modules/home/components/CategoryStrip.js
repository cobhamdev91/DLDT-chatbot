/**
 * @file modules/home/components/CategoryStrip.js
 * @description Dải 7 biểu tượng danh mục (squircle). Mục "Lịch trình" là neo
 * cuộn trong trang nên dùng thẻ <a>, các mục khác dùng <Link>.
 */

import Link from 'next/link';
import Icon from '@/components/shared/Icon/Icon';
import { cx, modifier } from '@/logic/classNames';
import { home as t } from '@/locales/vi/home';

/** Kích thước & độ dày nét icon danh mục */
const ICON_SIZE = 32;
const ICON_STROKE = 2.3;

/**
 * @param {{ categories: import('@/data/home').HomeCategory[] }} props
 * @returns {JSX.Element}
 */
export default function CategoryStrip({ categories }) {
  return (
    <section className="container category-strip-section">
      <div className="category-icon-strip">
        {categories.map((cat) => {
          const Tag = cat.isAnchor ? 'a' : Link;
          return (
            // Một mục: squircle tô màu theo tone + nhãn
            <Tag key={cat.id} href={cat.href} className="cat-icon-item">
              <div className={cx('cat-icon-squircle', modifier('cat-icon-squircle', cat.tone))}>
                <Icon name={cat.icon} size={ICON_SIZE} strokeWidth={ICON_STROKE} />
              </div>
              <span className="cat-icon-label">{t.categories[cat.id]}</span>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
