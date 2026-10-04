/**
 * @file app/lang-nghe/[slug]/page.js
 * @description Route mỏng /lang-nghe/[slug]: tham số tĩnh, metadata, render DetailPage.
 */

import { notFound } from 'next/navigation';
import DetailPage from '@/modules/detail/DetailPage';
import { buildVillageDetail } from '@/modules/crafts/logic/buildVillageDetail';
import { craftVillages } from '@/data/craftVillages';
import { findBySlug, toStaticParams } from '@/logic/collection';
import { crafts as t } from '@/locales/vi/crafts';

/**
 * Sinh trước mọi trang chi tiết làng nghề khi build.
 * @returns {Promise<Array<{ slug: string }>>}
 */
export async function generateStaticParams() {
  return toStaticParams(craftVillages);
}

/**
 * Metadata SEO theo từng làng nghề.
 * @param {{ params: Promise<{ slug: string }> }} props
 * @returns {Promise<import('next').Metadata>}
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const village = findBySlug(craftVillages, slug);
  if (!village) return { title: t.detail.notFoundTitle };

  return {
    title: t.detail.metaTitle(village.name),
    description: t.detail.metaDescription(village.name),
  };
}

/**
 * @param {{ params: Promise<{ slug: string }> }} props
 * @returns {Promise<JSX.Element>}
 */
export default async function VillageDetailRoute({ params }) {
  const { slug } = await params;
  const village = findBySlug(craftVillages, slug);
  if (!village) notFound();

  return <DetailPage model={buildVillageDetail(village, craftVillages)} />;
}
