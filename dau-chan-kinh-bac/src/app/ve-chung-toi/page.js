/**
 * @file app/ve-chung-toi/page.js
 * @description Route mỏng /ve-chung-toi: metadata + render module trang.
 */

import AboutPage from '@/modules/about/AboutPage';
import { about as t } from '@/locales/vi/about';

/** Metadata SEO trang Về chúng tôi */
export const metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default AboutPage;
