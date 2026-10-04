/**
 * @file modules/crafts/logic/buildVillageDetail.js
 * @description Builder THUẦN: bản ghi làng nghề → DetailViewModel.
 */

import { ROUTES, detailPath } from '@/data/routes';
import { FALLBACK_IMAGES } from '@/data/media';
import { relatedItems } from '@/logic/collection';
import { shortLocation } from '@/logic/text';
import { numberBlocks, blockIf } from '@/modules/detail/logic/numbering';
import { presentItems } from '@/modules/detail/logic/sidebar';
import { crafts as t } from '@/locales/vi/crafts';

/**
 * @param {Object} village - Bản ghi làng nghề (data/craftVillages.js).
 * @param {Object[]} all - Toàn bộ làng nghề.
 * @returns {import('@/modules/detail/types').DetailViewModel}
 */
export function buildVillageDetail(village, all) {
  const d = t.detail;

  return {
    /* ----- Hero: lead "(ghim) vị trí" ----- */
    hero: {
      image: village.image || FALLBACK_IMAGES.crafts,
      alt: village.name,
      badge: village.category,
      title: village.name,
      lead: { icon: 'MapPin', text: village.location },
    },

    breadcrumb: [{ label: t.breadcrumb, href: ROUTES.crafts }, { label: village.name }],

    /* ----- Khối nội dung ----- */
    blocks: numberBlocks([
      blockIf(village.history, () => ({
        type: 'prose',
        id: 'history',
        title: d.headings.history,
        paragraphs: [village.history],
      })),
      blockIf(village.highlights, () => ({
        type: 'pills',
        id: 'highlights',
        title: d.headings.highlights,
        icon: 'Sparkles',
        items: village.highlights,
      })),
      blockIf(village.experiences, () => ({
        type: 'checklist',
        id: 'experiences',
        title: d.headings.experiences,
        icon: 'Hammer',
        iconTone: 'primary',
        items: village.experiences,
      })),
      blockIf(village.gifts, () => ({
        type: 'callout',
        id: 'gifts',
        title: d.headings.gifts,
        icon: 'Gift',
        list: village.gifts,
      })),
      blockIf(village.tips, () => ({
        type: 'funfact',
        id: 'tips',
        icon: 'Lightbulb',
        heading: d.tipsHeading,
        text: village.tips,
      })),
    ]),

    /* ----- Sidebar ----- */
    sidebar: {
      title: d.sidebarTitle,
      items: presentItems([
        { icon: 'Tag', label: d.sidebar.name, value: village.name },
        { icon: 'Flame', label: d.sidebar.category, value: village.category },
        { icon: 'MapPin', label: d.sidebar.location, value: village.location },
        { icon: 'Clock', label: d.sidebar.duration, value: village.duration },
      ]),
      ctas: [
        { href: ROUTES.transport, label: d.ctas.transport, icon: 'Navigation', variant: 'outline' },
        { href: ROUTES.cuisine, label: d.ctas.cuisine, icon: 'Utensils', variant: 'primary' },
      ],
    },

    /* ----- Thẻ liên quan ----- */
    related: {
      title: d.relatedTitle,
      items: relatedItems(all, village.slug).map((rel) => ({
        key: rel.slug,
        href: detailPath(ROUTES.crafts, rel.slug),
        image: rel.image || FALLBACK_IMAGES.crafts,
        badge: rel.category,
        title: rel.name,
        subtitle: shortLocation(rel.location),
        subtitleIcon: true,
        cta: d.relatedCta,
      })),
    },
  };
}
