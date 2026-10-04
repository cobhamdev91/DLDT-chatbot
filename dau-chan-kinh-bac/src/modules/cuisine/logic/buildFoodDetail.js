/**
 * @file modules/cuisine/logic/buildFoodDetail.js
 * @description Builder THUẦN: bản ghi món ăn → DetailViewModel (kèm danh
 * sách ảnh nền cuộn theo phân cảnh – khối có bgIndex tương ứng).
 */

import { ROUTES, detailPath } from '@/data/routes';
import { FALLBACK_IMAGES } from '@/data/media';
import { relatedItems } from '@/logic/collection';
import { numberBlocks, blockIf } from '@/modules/detail/logic/numbering';
import { cuisine as t } from '@/locales/vi/cuisine';
import { detail as common } from '@/locales/vi/detail';

/**
 * Chỉ số ảnh nền theo phân cảnh (khớp thứ tự mảng scrollBackground).
 * @readonly
 */
const SCENE_INDEX = Object.freeze({ origin: 0, features: 1, taste: 2, locations: 3 });

/**
 * Dựng danh sách ảnh nền cuộn: ảnh phân cảnh nếu có, không thì ảnh chính.
 * @param {Object} food - Bản ghi món ăn.
 * @param {string} mainImage - Ảnh chính (đã có dự phòng).
 * @returns {Array<{ src: string, alt: string }>}
 */
function buildScenes(food, mainImage) {
  const scenes = food.scenes || {};
  const alt = t.detail.sceneAlt;
  return [
    { src: scenes.origin || mainImage, alt: alt.origin(food.name) },
    { src: scenes.features || mainImage, alt: alt.features(food.name) },
    { src: scenes.taste || mainImage, alt: alt.taste(food.name) },
    { src: mainImage, alt: food.name },
  ];
}

/**
 * @param {Object} food - Bản ghi món ăn (data/foods.js).
 * @param {Object[]} all - Toàn bộ món ăn.
 * @returns {import('@/modules/detail/types').DetailViewModel}
 */
export function buildFoodDetail(food, all) {
  const d = t.detail;
  const mainImage = food.image || FALLBACK_IMAGES.cuisine;

  return {
    /* ----- Hero: lead "Nguồn gốc: (ghim) xuất xứ" ----- */
    hero: {
      image: mainImage,
      alt: food.name,
      badge: d.badge,
      title: food.name,
      lead: { prefix: d.leadPrefix, icon: 'MapPin', text: food.origin },
    },

    breadcrumb: [{ label: t.breadcrumb, href: ROUTES.cuisine }, { label: food.name }],

    scrollBackground: buildScenes(food, mainImage),

    /* ----- Khối nội dung theo phân cảnh ----- */
    blocks: numberBlocks([
      blockIf(food.description, () => ({
        type: 'prose',
        id: 'origin',
        title: d.headings.origin,
        bgIndex: SCENE_INDEX.origin,
        paragraphs: [food.description],
      })),
      blockIf(food.features, () => ({
        type: 'callout',
        id: 'features',
        title: d.headings.features,
        bgIndex: SCENE_INDEX.features,
        icon: 'Utensils',
        text: food.features,
      })),
      blockIf(food.taste, () => ({
        type: 'funfact',
        id: 'taste',
        title: d.headings.taste,
        bgIndex: SCENE_INDEX.taste,
        icon: 'Sparkles',
        heading: d.tasteHeading,
        text: food.taste,
      })),
      blockIf(food.locations, () => ({
        type: 'locations',
        id: 'locations',
        title: d.headings.locations,
        bgIndex: SCENE_INDEX.locations,
        items: food.locations,
      })),
    ]),

    /* ----- Sidebar ----- */
    sidebar: {
      title: common.quickInfoTitle,
      items: [
        { icon: 'Tag', label: d.sidebar.name, value: food.name },
        { icon: 'MapPin', label: d.sidebar.origin, value: food.origin },
        { icon: 'Coins', label: d.sidebar.price, value: food.priceRange, variant: 'price' },
      ],
      ctas: [
        { href: ROUTES.cuisine, label: d.ctas.cuisine, icon: 'Utensils', variant: 'outline' },
        { href: ROUTES.destinations, label: d.ctas.destinations, icon: 'Landmark', variant: 'primary' },
      ],
    },

    /* ----- Thẻ liên quan ----- */
    related: {
      title: d.relatedTitle,
      items: relatedItems(all, food.slug).map((rel) => ({
        key: rel.slug,
        href: detailPath(ROUTES.cuisine, rel.slug),
        image: rel.image || FALLBACK_IMAGES.cuisine,
        badge: d.relatedBadge,
        title: rel.name,
        subtitle: rel.origin,
        subtitleIcon: true,
        price: rel.priceRange,
        cta: d.relatedCta,
      })),
    },
  };
}
