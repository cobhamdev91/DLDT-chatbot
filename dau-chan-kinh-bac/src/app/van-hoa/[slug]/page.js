/**
 * @file app/van-hoa/[slug]/page.js
 * @description Route mỏng /van-hoa/[slug]. Chuyển từ Client Component
 * (useParams) sang Server Component: sinh tĩnh, có metadata và trả 404 chuẩn.
 */

import { notFound } from 'next/navigation';
import DetailPage from '@/modules/detail/DetailPage';
import { buildCultureDetail } from '@/modules/culture/logic/buildCultureDetail';
import { cultureData } from '@/data/culture';
import { findBySlug, toStaticParams } from '@/logic/collection';
import { stripLeadingNumber } from '@/logic/text';
import { culture as t } from '@/locales/vi/culture';

/** Trường slug của chuyên đề văn hóa */
const SLUG_KEY = 'id';

/**
 * Sinh trước mọi trang chuyên đề khi build.
 * @returns {Promise<Array<{ slug: string }>>}
 */
export async function generateStaticParams() {
  return toStaticParams(cultureData.sections, SLUG_KEY);
}

/**
 * Metadata SEO theo chuyên đề.
 * @param {{ params: Promise<{ slug: string }> }} props
 * @returns {Promise<import('next').Metadata>}
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const section = findBySlug(cultureData.sections, slug, SLUG_KEY);
  if (!section) return { title: t.detail.notFoundTitle };

  return {
    title: t.detail.metaTitle(stripLeadingNumber(section.title)),
    description: section.intro,
  };
}

/**
 * @param {{ params: Promise<{ slug: string }> }} props
 * @returns {Promise<JSX.Element>}
 */
export default async function CultureDetailRoute({ params }) {
  const { slug } = await params;
  const section = findBySlug(cultureData.sections, slug, SLUG_KEY);
  if (!section) notFound();

  return <DetailPage model={buildCultureDetail(section, cultureData)} />;
}
