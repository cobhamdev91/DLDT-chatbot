'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Star, Tag, PhoneCall } from 'lucide-react';
import { LotusIcon } from '@/components/Icons';
import ParallaxHero from '@/components/ParallaxHero';
import FlipCard from '@/components/FlipCard';
import { accommodations } from '@/data/accommodations';
import { siteContent } from '@/data/content';
import Breadcrumb from '@/components/Breadcrumb';

const { pageHeroes } = siteContent;

export default function LuuTruPage() {
  const [location, setLocation] = useState('all');
  const [starRating, setStarRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStays = accommodations.filter(stay => {
    let matchesLoc = true;
    if (location !== 'all') {
      matchesLoc = stay.location.toLowerCase().includes(location.toLowerCase());
    }

    let matchesStar = true;
    if (starRating === '5') matchesStar = stay.stars === 5;
    else if (starRating === '4') matchesStar = stay.stars === 4;
    else if (starRating === '3') matchesStar = stay.stars === 3 || stay.stars === 2;
    else if (starRating === 'homestay') matchesStar = stay.type.toLowerCase().includes('homestay') || stay.stars === 0;

    const matchesSearch = stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stay.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLoc && matchesStar && matchesSearch;
  });

  return (
    <div className="stays-page">
      {/* 1. PARALLAX HERO WITH CUTOUT TEXT */}
      <ParallaxHero
        image={pageHeroes.luuTru.image}
        imageAlt={pageHeroes.luuTru.imageAlt}
        badge={pageHeroes.luuTru.badge}
        title={pageHeroes.luuTru.title}
        description={pageHeroes.luuTru.desc}
        cutoutText="Lưu Trú"
      />

      {/* BREADCRUMB */}
      <Breadcrumb items={[{ label: 'Lưu trú' }]} />

      {/* 2. QUICK SEARCH & BOOKING BAR */}
      <section style={{ marginTop: '0', marginBottom: '28px', paddingTop: '28px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '20px 24px',
            border: '1px solid rgba(107, 58, 42, 0.08)',
            boxShadow: '0 8px 24px rgba(74, 37, 24, 0.05)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            alignItems: 'center'
          }}>
            <div>
              <label style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                Ngày nhận phòng
              </label>
              <input
                type="date"
                defaultValue="2025-05-04"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(107, 58, 42, 0.15)',
                  background: '#FAF7F2',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                Ngày trả phòng
              </label>
              <input
                type="date"
                defaultValue="2025-05-05"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(107, 58, 42, 0.15)',
                  background: '#FAF7F2',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                Khu vực
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(107, 58, 42, 0.15)',
                  background: '#FAF7F2',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              >
                <option value="all">Toàn tỉnh Bắc Ninh</option>
                <option value="Bắc Ninh">TP. Bắc Ninh</option>
                <option value="Từ Sơn">TP. Từ Sơn</option>
                <option value="Tiên Du">Huyện Tiên Du</option>
                <option value="Yên Phong">Huyện Yên Phong</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>
                Hạng phòng
              </label>
              <select
                value={starRating}
                onChange={(e) => setStarRating(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(107, 58, 42, 0.15)',
                  background: '#FAF7F2',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              >
                <option value="all">Tất cả hạng sao</option>
                <option value="5">5 Sao đẳng cấp</option>
                <option value="4">4 Sao cao cấp</option>
                <option value="3">2–3 Sao tiện ích</option>
                <option value="homestay">Homestay trải nghiệm</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOTUS DIVIDER 1 */}
      <div className="container">
        <div className="lotus-divider">
          <div className="lotus-divider-content">
            <LotusIcon size={26} color="#C83228" />
            <span>Không Gian Nghỉ Dưỡng <span className="red-text">Chọn Lọc</span></span>
          </div>
        </div>
      </div>

      {/* 4. STAYS GRID WITH FLIP CARDS & PROGRESS BAR AUTO-DIRECT */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ marginBottom: '16px', fontSize: '0.8125rem', color: '#7A6A5A' }}>
            Hiển thị <strong>{filteredStays.length}</strong> cơ sở lưu trú phù hợp
          </div>
          <div className="card-grid">
            {filteredStays.map((stay) => (
              <FlipCard
                key={stay.id}
                image={stay.image || '/images/hero_kinh_bac.jpg'}
                imageAlt={stay.name}
                frontTitle={stay.name}
                frontBadge={stay.stars > 0 ? `${stay.stars} ⭐ ${stay.type}` : stay.type}
                backTitle={stay.name}
                backContent={stay.story?.substring(0, 100) + '...'}
                href={`/luu-tru/${stay.slug}`}
                backFooter={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.6875rem', color: '#9A8A7A', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Giá từ
                      </span>
                      <span style={{ color: '#B8781B', fontWeight: 700 }}>
                        {stay.priceRange.split('–')[0].replace('VNĐ', '').trim()}đ
                      </span>
                    </div>
                    <span style={{ color: '#55443B', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="#C83228" /> {stay.location.split(',')[1] || stay.location}
                    </span>
                  </div>
                }
              >
                {stay.amenities?.[0] && (
                  <div className="flip-card-highlight-badge">
                    <span className="flip-card-highlight-icon"><Star size={12} color="#D4A853" /></span>
                    <span className="flip-card-highlight-text">{stay.amenities[0]}</span>
                  </div>
                )}
              </FlipCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GREEN HOTLINE BANNER (MASTER STYLE) */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div style={{
          background: '#1B3322',
          borderRadius: '20px',
          padding: '30px 40px',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 16px 40px rgba(27, 51, 34, 0.15)'
        }}>
          <div>
            <span style={{ fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#8BA896', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
              HỖ TRỢ 24/7
            </span>
            <h3 style={{ fontFamily: 'var(--font-accent)', fontSize: '1.55rem', color: '#FFFFFF', margin: 0 }}>
              Tổng Đài Hỗ Trợ Đặt Phòng & Báo Giá Trực Tiếp
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <a
              href="tel:19001234"
              style={{
                background: '#C83228',
                color: '#fff',
                padding: '14px 30px',
                borderRadius: '50px',
                fontWeight: 700,
                fontSize: '1.05rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(200, 50, 40, 0.4)'
              }}
            >
              <PhoneCall size={18} /> 1900 1234
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
