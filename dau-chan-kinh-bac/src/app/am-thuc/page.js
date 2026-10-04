/**
 * @file app/am-thuc/page.js
 * @description Route mỏng /am-thuc: metadata + render module trang.
 */

import CuisinePage from '@/modules/cuisine/CuisinePage';
import { cuisine as t } from '@/locales/vi/cuisine';

/** Metadata SEO trang Ẩm thực */
export const metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default CuisinePage;
