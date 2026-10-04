/**
 * @file modules/culture/components/PillarGrid.js
 * @description Lưới 4 thẻ lật "trụ cột văn hóa" – mỗi thẻ dẫn tới trang
 * chuyên đề /van-hoa/[slug].
 */

import FlipCard from '@/components/shared/FlipCard/FlipCard';
import Icon from '@/components/shared/Icon/Icon';
import IconText from '@/components/shared/IconText/IconText';
import { ROUTES, detailPath } from '@/data/routes';
import { culture as t } from '@/locales/vi/culture';

/**
 * @param {{ pillars: Array<{ slug: string, title: string, subtitle: string, desc: string, image: string, tag: string }> }} props
 * @returns {JSX.Element}
 */
export default function PillarGrid({ pillars }) {
  return (
    <section className="container spacer-bottom-md">
      <div className="card-grid">
        {pillars.map((pillar) => (
          <FlipCard
            key={pillar.slug}
            image={pillar.image}
            imageAlt={pillar.title}
            frontTitle={pillar.title}
            frontSubtitle={pillar.subtitle}
            frontBadge={pillar.tag}
            backTitle={pillar.title}
            backContent={pillar.desc}
            href={detailPath(ROUTES.culture, pillar.slug)}
            backFooter={
              /* Chân thẻ: nhãn di sản tông vàng */
              <IconText className="flip-card-meta__accent flip-card-meta__accent--gold">
                <Icon name="Landmark" size={14} /> {t.pillarFooter}
              </IconText>
            }
          />
        ))}
      </div>
    </section>
  );
}
