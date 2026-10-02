'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { craftVillages } from '@/data/craftVillages';
import ParallaxHero from '@/components/ParallaxHero';
import { siteContent } from '@/data/content';
import Breadcrumb from '@/components/Breadcrumb';

import FlipCard from '@/components/FlipCard';

const { pageHeroes } = siteContent;

export default function LangNghePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVillages = craftVillages.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
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

      {/* VILLAGE GRID — FLIP CARDS */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="results-count" style={{ marginBottom: '20px' }}>
            Tổng cộng <strong>{filteredVillages.length}</strong> làng nghề truyền thống tiêu biểu
          </div>

          <div className="card-grid">
            {filteredVillages.map((v) => (
              <FlipCard
                key={v.id}
                image={v.image || '/images/craft_village_pottery.jpg'}
                imageAlt={v.name}
                frontTitle={v.name}
                frontBadge={v.category}
                backTitle={v.name}
                backContent={v.history ? (v.history.split('.')[0] + '.') : ''}
                href={`/lang-nghe/${v.slug}`}
                backFooter={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
                    <span style={{ color: '#B8781B', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {v.duration || '2–3 giờ'}
                    </span>
                    <span style={{ color: '#55443B', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="#C83228" /> {v.location.split(',')[1] || v.location}
                    </span>
                  </div>
                }
              >
                {v.highlights?.[0] && (
                  <div className="flip-card-highlight-badge">
                    <span className="flip-card-highlight-icon"><Sparkles size={12} color="#D4A853" /></span>
                    <span className="flip-card-highlight-text">{v.highlights[0]}</span>
                  </div>
                )}
              </FlipCard>
            ))}
          </div>

          {filteredVillages.length === 0 && (
            <div className="no-results">
              <p>Không tìm thấy làng nghề nào phù hợp với &quot;{searchQuery}&quot;.</p>
              <button className="btn btn-outline" onClick={() => setSearchQuery('')}>
                Xem tất cả 8 làng nghề
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
