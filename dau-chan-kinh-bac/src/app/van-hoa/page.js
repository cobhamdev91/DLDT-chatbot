/**
 * @file app/van-hoa/page.js
 * @description Route mỏng /van-hoa: metadata + render module trang.
 */

import CulturePage from '@/modules/culture/CulturePage';
import { culture as t } from '@/locales/vi/culture';

/** Metadata SEO trang Văn hóa */
export const metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default CulturePage;
