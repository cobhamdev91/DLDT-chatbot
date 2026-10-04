/**
 * @file app/luu-tru/[slug]/page.js
 * @description Route mỏng /luu-tru/[slug]: tham số tĩnh, metadata, render DetailPage.
 */

import { notFound } from 'next/navigation';
import DetailPage from '@/modules/detail/DetailPage';
import { buildStayDetail } from '@/modules/stays/logic/buildStayDetail';
import { accommodations } from '@/data/accommodations';
import { findBySlug, toStaticParams } from '@/logic/collection';
import { stays as t } from '@/locales/vi/stays';

/**
 * Sinh trước mọi trang chi tiết lưu trú khi build.
 * @returns {Promise<Array<{ slug: string }>>}
 */
export async function generateStaticParams() {
  return toStaticParams(accommodations);
}

/**
 * Metadata SEO theo từng cơ sở lưu trú.
 * @param {{ params: Promise<{ slug: string }> }} props
 * @returns {Promise<import('next').Metadata>}
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const stay = findBySlug(accommodations, slug);
  if (!stay) return { title: t.detail.notFoundTitle };

  return {
    title: t.detail.metaTitle(stay.name),
    description: stay.tagline || t.detail.metaDescription(stay.name),
  };
}

/**
 * @param {{ params: Promise<{ slug: string }> }} props
 * @returns {Promise<JSX.Element>}
 */
export default async function StayDetailRoute({ params }) {
  const { slug } = await params;
  const stay = findBySlug(accommodations, slug);
  if (!stay) notFound();

  return <DetailPage model={buildStayDetail(stay, accommodations)} />;
}
