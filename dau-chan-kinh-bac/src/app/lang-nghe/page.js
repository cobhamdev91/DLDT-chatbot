'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { craftVillages } from '@/data/craftVillages';
import ParallaxHero from '@/components/ParallaxHero';
import { siteContent } from '@/data/content';
import Breadcrumb from '@/components/Breadcrumb';
import OverlayCard from '@/components/OverlayCard';

const { pageHeroes } = siteContent;
const COLUMN_COUNT = 2;

export default function LangNghePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.toLowerCase();
  const filteredVillages = craftVillages.filter(v =>
    v.name.toLowerCase().includes(query) ||
    v.category.toLowerCase().includes(query) ||
    v.location.toLowerCase().includes(query) ||
    v.highlights.some(h => h.toLowerCase().includes(query))
  );

  // Distribute items into 2 columns (W3Schools Responsive Image Grid)
  const columns = Array.from({ length: COLUMN_COUNT }, () => []);
  filteredVillages.forEach((village, idx) => {
    columns[idx % COLUMN_COUNT].push(village);
  });

  return (
    <div className="craft-villages-page">
      {/* PARALLAX HERO WITH CUTOUT TEXT */}
      <ParallaxHero
        image={pageHeroes.langNghe.image}
        imageAlt={pageHeroes.langNghe.imageAlt}
        badge={pageHeroes.langNghe.badge}
        title={pageHeroes.langNghe.title}
        description={pageHeroes.langNghe.desc}
        cutoutText="Làng Nghề"
      />

      {/* BREADCRUMB */}
      <Breadcrumb items={[{ label: 'Làng nghề' }]} />

      {/* SEARCH BAR */}
      <section className="section bg-light" style={{ padding: '30px 0' }}>
        <div className="container">
          <div className="filter-wrapper">
            <div className="search-box full-width" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={18} style={{ position: 'absolute', left: '16px', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Tìm làng nghề (Đông Hồ, Phù Lãng, Đại Bái, Đồng Kỵ, Xuân Lai...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                style={{ paddingLeft: '44px' }}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Xóa tìm kiếm"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VILLAGES — 2-COLUMN RESPONSIVE IMAGE GRID, IMAGE OVERLAY FADE + BORDER PROGRESS */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="image-grid-row">
            {columns.map((colVillages, colIndex) => (
              <div key={colIndex} className="image-grid-column">
                {colVillages.map((v) => (
                  <OverlayCard
                    key={v.id}
                    image={v.image || '/images/craft_village_pottery.jpg'}
                    imageAlt={v.name}
                    title={v.name}
                    href={`/lang-nghe/${v.slug}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {filteredVillages.length === 0 && (
            <div className="no-results">
              <p>Không tìm thấy làng nghề nào phù hợp với &quot;{searchQuery}&quot;.</p>
              <button className="btn btn-outline" onClick={() => setSearchQuery('')}>
                Xem tất cả làng nghề
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
