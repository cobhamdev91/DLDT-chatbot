/**
 * @file app/am-thuc/[slug]/page.js
 * @description Route mỏng /am-thuc/[slug]: tham số tĩnh, metadata, render DetailPage.
 */

import { notFound } from 'next/navigation';
import DetailPage from '@/modules/detail/DetailPage';
import { buildFoodDetail } from '@/modules/cuisine/logic/buildFoodDetail';
import { foods } from '@/data/foods';
import { findBySlug, toStaticParams } from '@/logic/collection';
import { cuisine as t } from '@/locales/vi/cuisine';

/**
 * Sinh trước mọi trang chi tiết món ăn khi build.
 * @returns {Promise<Array<{ slug: string }>>}
 */
export async function generateStaticParams() {
  return toStaticParams(foods);
}

/**
 * Metadata SEO theo từng món.
 * @param {{ params: Promise<{ slug: string }> }} props
 * @returns {Promise<import('next').Metadata>}
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const food = findBySlug(foods, slug);
  if (!food) return { title: t.detail.notFoundTitle };

  return {
    title: t.detail.metaTitle(food.name),
    description: food.description || t.detail.metaDescription(food.name),
  };
}

/**
 * @param {{ params: Promise<{ slug: string }> }} props
 * @returns {Promise<JSX.Element>}
 */
export default async function FoodDetailRoute({ params }) {
  const { slug } = await params;
  const food = findBySlug(foods, slug);
  if (!food) notFound();

  return <DetailPage model={buildFoodDetail(food, foods)} />;
}
