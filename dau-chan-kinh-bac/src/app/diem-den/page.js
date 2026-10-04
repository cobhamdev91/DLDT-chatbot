/**
 * @file app/diem-den/page.js
 * @description Route mỏng /diem-den: khai báo metadata + render module trang.
 */

import DestinationsPage from '@/modules/destinations/DestinationsPage';
import { destinations as t } from '@/locales/vi/destinations';

/** Metadata SEO của trang danh sách điểm đến */
export const metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default DestinationsPage;
