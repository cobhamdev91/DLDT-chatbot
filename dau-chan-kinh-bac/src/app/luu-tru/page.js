/**
 * @file app/luu-tru/page.js
 * @description Route mỏng /luu-tru: metadata + render module trang.
 */

import StaysPage from '@/modules/stays/StaysPage';
import { stays as t } from '@/locales/vi/stays';

/** Metadata SEO trang Lưu trú */
export const metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default StaysPage;
