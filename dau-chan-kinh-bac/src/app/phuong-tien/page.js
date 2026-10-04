/**
 * @file app/phuong-tien/page.js
 * @description Route mỏng /phuong-tien: metadata + render module trang.
 * (Bản cũ: 1279 dòng client component với ~70 style inline + <style jsx>.)
 */

import TransportPage from '@/modules/transport/TransportPage';
import { transport as t } from '@/locales/vi/transport';

/** Metadata SEO trang Phương tiện */
export const metadata = {
  title: t.meta.title,
  description: t.meta.description,
};

export default TransportPage;
