/**
 * @file modules/destinations/logic/buildDestinationDetail.js
 * @description Builder THUẦN: bản ghi điểm đến → DetailViewModel.
 * Sửa lỗi bản cũ: đọc đúng trường `experience`, `funFact`, `location`,
 * `category`, `duration`, `suitableFor` (bản cũ đọc `experiences`,
 * `didYouKnow`, `quickInfo.*` không tồn tại nên các khối bị ẩn) và đánh số
 * tiêu đề liên tục.
 */

import { ROUTES, detailPath } from '@/data/routes';
import { FALLBACK_IMAGES } from '@/data/media';
import { relatedItems } from '@/logic/collection';
import { splitParagraphs } from '@/logic/text';
import { numberBlocks, blockIf } from '@/modules/detail/logic/numbering';
import { presentItems } from '@/modules/detail/logic/sidebar';
import { destinations as t } from '@/locales/vi/destinations';
import { detail as common } from '@/locales/vi/detail';

/**
 * @param {Object} dest - Bản ghi điểm đến (data/destinations.js).
 * @param {Object[]} all - Toàn bộ điểm đến (lấy thẻ liên quan).
 * @returns {import('@/modules/detail/types').DetailViewModel}
 */
export function buildDestinationDetail(dest, all) {
  const d = t.detail;

  return {
    /* ----- Hero ----- */
    hero: {
      image: dest.image || FALLBACK_IMAGES.generic,
      alt: dest.name,
      badge: dest.category,
      title: dest.name,
      lead: { text: dest.subtitle },
    },

    breadcrumb: [{ label: t.breadcrumb, href: ROUTES.destinations }, { label: dest.name }],

    /* ----- Khối nội dung (null = bỏ qua) ----- */
    blocks: numberBlocks([
      blockIf(dest.history, () => ({
        type: 'prose',
        id: 'history',
        title: d.headings.history,
        paragraphs: splitParagraphs(dest.history),
      })),
      blockIf(dest.nameMeaning, () => ({
        type: 'text',
        id: 'name-meaning',
        title: d.headings.nameMeaning,
        text: dest.nameMeaning,
      })),
      blockIf(dest.highlights, () => ({
        type: 'pills',
        id: 'highlights',
        title: d.headings.highlights,
        icon: 'Sparkles',
        items: dest.highlights,
      })),
      blockIf(dest.experience, () => ({
        type: 'callout',
        id: 'experience',
        title: d.headings.experience,
        icon: 'Lightbulb',
        text: dest.experience,
      })),
      blockIf(dest.funFact, () => ({
        type: 'funfact',
        id: 'fun-fact',
        icon: 'Sparkles',
        heading: common.funFactHeading,
        text: dest.funFact,
      })),
      blockIf(dest.saferCheck, () => ({
        type: 'checklist',
        id: 'safer-check',
        heading: { icon: 'ShieldCheck', text: d.saferHeading },
        icon: 'Check',
        iconStrokeWidth: 2.5,
        items: dest.saferCheck,
      })),
    ]),

    /* ----- Sidebar ----- */
    sidebar: {
      title: common.quickInfoTitle,
      items: presentItems([
        { icon: 'MapPin', label: d.sidebar.location, value: dest.location },
        { icon: 'Landmark', label: d.sidebar.category, value: dest.category },
        { icon: 'Clock', label: d.sidebar.duration, value: dest.duration },
        { icon: 'Users', label: d.sidebar.suitableFor, value: dest.suitableFor },
      ]),
      ctas: [
        { href: ROUTES.transport, label: d.ctas.transport, icon: 'Navigation', variant: 'outline' },
        { href: ROUTES.cuisine, label: d.ctas.cuisine, icon: 'Utensils', variant: 'primary' },
      ],
    },

    /* ----- Thẻ liên quan ----- */
    related: {
      title: d.relatedTitle,
      items: relatedItems(all, dest.slug).map((rel) => ({
        key: rel.slug,
        href: detailPath(ROUTES.destinations, rel.slug),
        image: rel.image || FALLBACK_IMAGES.generic,
        badge: rel.category,
        title: rel.name,
        subtitle: rel.subtitle,
        cta: d.relatedCta,
      })),
    },
  };
}
