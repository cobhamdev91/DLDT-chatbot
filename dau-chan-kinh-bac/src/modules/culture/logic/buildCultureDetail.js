/**
 * @file modules/culture/logic/buildCultureDetail.js
 * @description Builder THUẦN: chuyên đề văn hóa → DetailViewModel.
 * Khác 4 loại còn lại: tiêu đề khối KHÔNG đánh số (giữ như bản cũ) và thẻ
 * liên quan gồm tất cả chuyên đề khác.
 */

import { ROUTES, detailPath } from '@/data/routes';
import { FALLBACK_IMAGES } from '@/data/media';
import { relatedItems } from '@/logic/collection';
import { stripLeadingNumber, truncate } from '@/logic/text';
import { blockIf } from '@/modules/detail/logic/numbering';
import { culture as t } from '@/locales/vi/culture';
import { detail as common } from '@/locales/vi/detail';

/** Độ dài đoạn dẫn hero / phụ đề thẻ liên quan */
const LEAD_LENGTH = 100;
const RELATED_SUBTITLE_LENGTH = 60;
/** Số trải nghiệm gợi ý hiển thị */
const MAX_EXPERIENCES = 3;

/**
 * @param {import('@/data/culture').CultureSection} section - Chuyên đề hiện tại.
 * @param {{ sections: import('@/data/culture').CultureSection[], experiences: Array<{ title: string, desc: string }> }} data - Dữ liệu văn hóa.
 * @returns {import('@/modules/detail/types').DetailViewModel}
 */
export function buildCultureDetail(section, data) {
  const d = t.detail;
  const title = stripLeadingNumber(section.title);

  return {
    /* ----- Hero ----- */
    hero: {
      image: section.image || FALLBACK_IMAGES.culture,
      alt: section.title,
      badge: section.badge,
      title,
      lead: { text: truncate(section.intro, LEAD_LENGTH) },
    },

    breadcrumb: [{ label: t.breadcrumb, href: ROUTES.culture }, { label: title }],

    /* ----- Khối nội dung (không đánh số) ----- */
    blocks: [
      { type: 'prose', id: 'intro', title: d.headings.intro, paragraphs: [section.intro] },
      blockIf(section.points, () => ({
        type: 'points',
        id: 'points',
        title: d.headings.points,
        items: section.points.map((point) => ({ title: point.heading, text: point.content })),
      })),
      blockIf(data.experiences, () => ({
        type: 'checklist',
        id: 'experiences',
        title: d.headings.experiences,
        icon: 'Music',
        iconTone: 'primary',
        items: data.experiences.slice(0, MAX_EXPERIENCES).map((exp) => ({ strong: exp.title, text: exp.desc })),
      })),
      { type: 'funfact', id: 'fun-fact', icon: 'Sparkles', heading: common.funFactHeading, text: d.funFact },
    ].filter(Boolean),

    /* ----- Sidebar ----- */
    sidebar: {
      title: d.sidebarTitle,
      items: [
        { icon: 'BookOpen', label: d.sidebar.topic, value: section.badge },
        { icon: 'Landmark', label: d.sidebar.heritage, value: d.sidebar.heritageValue },
        { icon: 'MapPin', label: d.sidebar.region, value: d.sidebar.regionValue },
      ],
      ctas: [
        { href: ROUTES.destinations, label: d.ctas.destinations, icon: 'Navigation', variant: 'outline' },
        { href: ROUTES.cuisine, label: d.ctas.cuisine, icon: 'Utensils', variant: 'primary' },
      ],
    },

    /* ----- Thẻ liên quan: mọi chuyên đề khác ----- */
    related: {
      title: d.relatedTitle,
      items: relatedItems(data.sections, section.id, data.sections.length, 'id').map((rel) => ({
        key: rel.id,
        href: detailPath(ROUTES.culture, rel.id),
        image: rel.image || FALLBACK_IMAGES.culture,
        badge: rel.badge,
        title: stripLeadingNumber(rel.title),
        subtitle: truncate(rel.intro, RELATED_SUBTITLE_LENGTH),
        cta: d.relatedCta,
      })),
    },
  };
}
