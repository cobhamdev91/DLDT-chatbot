/**
 * @file app/lang-nghe/page.js
 * @description Route mỏng /lang-nghe: metadata + render module trang.
 */

import CraftsPage from '@/modules/crafts/CraftsPage';
import { crafts as t } from '@/locales/vi/crafts';

/** Metadata SEO trang Làng nghề */
export const metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default CraftsPage;
