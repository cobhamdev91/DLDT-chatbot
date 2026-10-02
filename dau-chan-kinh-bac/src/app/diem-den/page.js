'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, MapPin, Clock, ArrowRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import ParallaxHero from '@/components/ParallaxHero';
import FlipCard from '@/components/FlipCard';
import Breadcrumb from '@/components/Breadcrumb';
import { siteContent } from '@/data/content';

const { pageHeroes } = siteContent;

export default function DiemDenPage() {
  const [filterCategory, setFilterCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = ['Tất cả', ...Array.from(new Set(destinations.map(d => d.category)))];

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = filterCategory === 'Tất cả' || dest.category === filterCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (dest.subtitle && dest.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (dest.highlights && dest.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="destinations-page">
      {/* PARALLAX HERO WITH CUTOUT TEXT */}
      <ParallaxHero
        image={pageHeroes.diemDen.image}
        imageAlt={pageHeroes.diemDen.imageAlt}
        badge={pageHeroes.diemDen.badge}
        title={pageHeroes.diemDen.title}
        description={pageHeroes.diemDen.desc}
        cutoutText="Điểm Đến"
      />

      {/* BREADCRUMB */}
      <Breadcrumb items={[{ label: 'Điểm đến' }]} />

      {/* COMPACT FILTER: search + dropdown in one row */}
      <section style={{ padding: '24px 0 16px' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            {/* Search input */}
            <div style={{ position: 'relative', flex: '1 1 300px', minWidth: '200px' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9A8A7A' }} />
              <input
                type="text"
                placeholder="Tìm kiếm điểm đến..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 36px 10px 40px',
                  border: '1px solid rgba(107, 58, 42, 0.12)',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  background: '#FFFFFF',
                  color: '#3A2A1A',
                  outline: 'none',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#9A8A7A', padding: '2px',
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category dropdown */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{
                padding: '10px 16px',
                border: '1px solid rgba(107, 58, 42, 0.12)',
                borderRadius: '10px',
                fontSize: '0.875rem',
                background: '#FFFFFF',
                color: '#3A2A1A',
                cursor: 'pointer',
                outline: 'none',
                minWidth: '180px',
              }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Result count */}
            <span style={{ fontSize: '0.8125rem', color: '#7A6A5A', whiteSpace: 'nowrap' }}>
              {filteredDestinations.length} điểm đến
            </span>
          </div>
        </div>
      </section>

      {/* DESTINATIONS GRID — FLIP CARDS */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="card-grid">
            {filteredDestinations.map((dest) => (
              <FlipCard
                key={dest.id}
                image={dest.image || '/images/hero_kinh_bac.jpg'}
                imageAlt={dest.name}
                frontTitle={dest.name}
                frontSubtitle={dest.subtitle}
                frontBadge={dest.category}
                backTitle={dest.name}
                backContent={dest.subtitle}
                href={`/diem-den/${dest.slug}`}
                backFooter={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#B8781B', fontSize: '0.8125rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {dest.duration || '1–2 giờ'}
                    </span>
                    <span style={{ color: '#55443B', fontSize: '0.8125rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="#C83228" /> {dest.location}
                    </span>
                  </div>
                }
              >
                {dest.highlights && (
                  <div style={{ marginTop: '4px', marginBottom: '4px' }}>
                    {dest.highlights.slice(0, 2).map((h, idx) => (
                      <span key={idx} style={{
                        display: 'inline-block',
                        background: 'rgba(212, 168, 83, 0.15)',
                        color: '#B8781B',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        marginRight: '6px',
                        marginBottom: '2px',
                      }}>
                        {h}
                      </span>
                    ))}
                  </div>
                )}

              </FlipCard>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="no-results">
              <p>Không tìm thấy điểm đến nào phù hợp.</p>
              <button
                className="btn btn-outline"
                onClick={() => { setFilterCategory('Tất cả'); setSearchQuery(''); }}
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
