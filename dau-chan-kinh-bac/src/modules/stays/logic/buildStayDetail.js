/**
 * @file modules/stays/logic/buildStayDetail.js
 * @description Builder THUẦN: bản ghi lưu trú → DetailViewModel.
 */

import { ROUTES, detailPath } from '@/data/routes';
import { FALLBACK_IMAGES } from '@/data/media';
import { relatedItems } from '@/logic/collection';
import { shortLocation, telHref } from '@/logic/text';
import { numberBlocks, blockIf } from '@/modules/detail/logic/numbering';
import { presentItems } from '@/modules/detail/logic/sidebar';
import { stays as t } from '@/locales/vi/stays';
import { detail as common } from '@/locales/vi/detail';

/**
 * Nút hành động sidebar: [gọi đặt phòng nếu có số] + chỉ đường.
 * @param {Object} stay - Bản ghi lưu trú.
 * @returns {import('@/modules/detail/types').SidebarCta[]}
 */
function buildCtas(stay) {
  const d = t.detail;
  const directions = { href: ROUTES.transport, label: d.ctas.transport, icon: 'Navigation', variant: 'outline' };
  if (!stay.phone) return [directions];

  return [
    { href: telHref(stay.phone), label: d.ctas.call, icon: 'Phone', variant: 'primary', external: true },
    directions,
  ];
}

/**
 * @param {Object} stay - Bản ghi lưu trú (data/accommodations.js).
 * @param {Object[]} all - Toàn bộ cơ sở lưu trú.
 * @returns {import('@/modules/detail/types').DetailViewModel}
 */
export function buildStayDetail(stay, all) {
  const d = t.detail;

  return {
    /* ----- Hero ----- */
    hero: {
      image: stay.heroImage || stay.image || FALLBACK_IMAGES.generic,
      alt: stay.name,
      badge: stay.stars > 0 ? d.heroBadge(stay.stars, stay.type) : stay.type,
      title: stay.name,
      lead: { text: stay.tagline },
    },

    breadcrumb: [{ label: t.breadcrumb, href: ROUTES.stays }, { label: stay.name }],

    /* ----- Khối nội dung ----- */
    blocks: numberBlocks([
      blockIf(stay.story, () => ({
        type: 'prose',
        id: 'story',
        title: d.headings.story,
        paragraphs: [stay.story],
      })),
      blockIf(stay.amenities, () => ({
        type: 'pills',
        id: 'amenities',
        title: d.headings.amenities,
        icon: 'Check',
        iconTone: 'success',
        iconStrokeWidth: 2.5,
        items: stay.amenities,
      })),
      blockIf(stay.experience, () => ({
        type: 'callout',
        id: 'experience',
        title: d.headings.experience,
        icon: 'Coffee',
        text: stay.experience,
      })),
      blockIf(stay.suitableFor, () => ({
        type: 'pills',
        id: 'suitable-for',
        title: d.headings.suitableFor,
        icon: 'User',
        iconTone: 'gold-dark',
        pillTone: 'gold',
        items: stay.suitableFor,
      })),
      blockIf(stay.itinerary, () => ({
        type: 'checklist',
        id: 'itinerary',
        heading: { icon: 'Compass', text: d.itineraryHeading },
        lead: stay.itinerary,
      })),
      blockIf(stay.funFact, () => ({
        type: 'funfact',
        id: 'fun-fact',
        icon: 'Sparkles',
        heading: common.funFactHeading,
        text: stay.funFact,
      })),
    ]),

    /* ----- Sidebar ----- */
    sidebar: {
      title: d.sidebarTitle,
      items: presentItems([
        { icon: 'MapPin', label: d.sidebar.address, value: stay.location },
        { icon: 'Coins', label: d.sidebar.price, value: stay.priceRange, variant: 'price' },
        {
          icon: 'Phone',
          label: d.sidebar.phone,
          value: stay.phone,
          variant: 'link',
          href: stay.phone && telHref(stay.phone),
        },
        { icon: 'Building', label: d.sidebar.scale, value: stay.scale },
      ]),
      ctas: buildCtas(stay),
      note: d.note,
    },

    /* ----- Thẻ liên quan ----- */
    related: {
      title: d.relatedTitle,
      items: relatedItems(all, stay.slug).map((rel) => ({
        key: rel.slug,
        href: detailPath(ROUTES.stays, rel.slug),
        image: rel.image || FALLBACK_IMAGES.generic,
        badge: rel.type,
        title: rel.name,
        subtitle: shortLocation(rel.location),
        subtitleIcon: true,
        price: rel.priceRange,
        cta: d.relatedCta,
      })),
    },
  };
}
