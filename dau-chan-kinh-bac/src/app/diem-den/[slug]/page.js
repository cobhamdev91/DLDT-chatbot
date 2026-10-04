/**
 * @file app/diem-den/[slug]/page.js
 * @description Route mỏng /diem-den/[slug]: sinh tham số tĩnh, metadata và
 * render DetailPage với view-model do builder thuần dựng.
 */

import { notFound } from 'next/navigation';
import DetailPage from '@/modules/detail/DetailPage';
import { buildDestinationDetail } from '@/modules/destinations/logic/buildDestinationDetail';
import { destinations } from '@/data/destinations';
import { findBySlug, toStaticParams } from '@/logic/collection';
import { destinations as t } from '@/locales/vi/destinations';

/**
 * Sinh trước mọi trang chi tiết điểm đến khi build.
 * @returns {Promise<Array<{ slug: string }>>}
 */
export async function generateStaticParams() {
  return toStaticParams(destinations);
}

/**
 * Metadata SEO theo từng điểm đến.
 * @param {{ params: Promise<{ slug: string }> }} props
 * @returns {Promise<import('next').Metadata>}
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = findBySlug(destinations, slug);
  if (!dest) return { title: t.detail.notFoundTitle };

  return {
    title: t.detail.metaTitle(dest.name),
    description: dest.subtitle || t.detail.metaDescription(dest.name),
  };
}

/**
 * @param {{ params: Promise<{ slug: string }> }} props
 * @returns {Promise<JSX.Element>}
 */
export default async function DestinationDetailRoute({ params }) {
  const { slug } = await params;
  const dest = findBySlug(destinations, slug);
  if (!dest) notFound();

  return <DetailPage model={buildDestinationDetail(dest, destinations)} />;
}
