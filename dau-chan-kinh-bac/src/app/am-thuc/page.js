'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Tag, Sparkles, Clock, PhoneCall, Coins } from 'lucide-react';
import { LotusIcon } from '@/components/Icons';
import ParallaxHero from '@/components/ParallaxHero';
import FlipCard from '@/components/FlipCard';
import Lightbox from '@/components/Lightbox';
import Breadcrumb from '@/components/Breadcrumb';
import { foods } from '@/data/foods';
import { siteContent } from '@/data/content';

const { pageHeroes } = siteContent;

const categories = [
  'Tất cả (12)',
  'Món ăn đặc sản',
  'Bánh truyền thống',
  'Đặc sản làm quà'
];

const authenticRestaurants = [
  {
    name: 'Quán Phở Gan Cháy Cụ Cần',
    dish: 'Phở gan cháy Đáp Cầu gia truyền',
    address: 'Số 42 Tiền An, TP. Bắc Ninh',
    hours: '06:00 – 21:00',
    phone: '0988 123 456'
  },
  {
    name: 'Lò Bánh Phu Thê Minh Hạnh',
    dish: 'Bánh phu thê Đình Bảng nức tiếng',
    address: 'Khu phố Lý Thường Kiệt, Từ Sơn',
    hours: '07:00 – 20:00',
    phone: '0912 345 678'
  },
  {
    name: 'Cơ Sở Nem Bùi Tuấn Liên',
    dish: 'Nem bùi Ninh Xá chính gốc',
    address: 'Ngã tư Ninh Xá, TX. Thuận Thành',
    hours: '06:30 – 19:30',
    phone: '0977 888 999'
  },
  {
    name: 'Bánh Tẻ Làng Chờ Bà Ân',
    dish: 'Bánh tẻ nóng lá dong dẻo thơm',
    address: 'Thị trấn Chờ, H. Yên Phong',
    hours: '06:00 – 18:00',
    phone: '0933 555 777'
  }
];

export default function AmThucPage() {
  const [selectedCat, setSelectedCat] = useState('Tất cả (12)');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          food.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          food.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCat === 'Tất cả (12)') return matchesSearch;
    if (selectedCat === 'Bánh truyền thống') {
      return matchesSearch && (food.name.toLowerCase().includes('bánh') || food.category?.includes('Bánh'));
    }
    if (selectedCat === 'Đặc sản làm quà') {
      return matchesSearch && (food.name.toLowerCase().includes('nem') || food.name.toLowerCase().includes('bánh') || food.name.toLowerCase().includes('rượu'));
    }
    return matchesSearch;
  });

  // Lightbox images from all foods
  const lightboxImages = foods.map(f => ({
    src: f.image || '/images/bac_ninh_cuisine.jpg',
    alt: f.name,
    caption: `${f.name} – ${f.origin}`,
  }));

  const openLightbox = (foodId) => {
    const idx = foods.findIndex(f => f.id === foodId);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  return (
    <div className="food-page">
      {/* 1. PARALLAX HERO WITH CUTOUT TEXT */}
      <ParallaxHero
        image={pageHeroes.amThuc.image}
        imageAlt={pageHeroes.amThuc.imageAlt}
        badge={pageHeroes.amThuc.badge}
        title={pageHeroes.amThuc.title}
        description={pageHeroes.amThuc.desc}
        cutoutText="Ẩm Thực"
      />

      {/* BREADCRUMB */}
      <Breadcrumb items={[{ label: 'Ẩm thực' }]} />

      {/* 2. PILL FILTER BAR */}
      <section style={{ padding: '30px 0 20px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', margin: '0 auto' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  background: selectedCat === cat ? '#C83228' : '#FFFFFF',
                  color: selectedCat === cat ? '#FFFFFF' : '#4A3C35',
                  border: '1px solid rgba(107, 58, 42, 0.12)',
                  padding: '12px 28px',
                  borderRadius: '50px',
                  fontWeight: 600,
                  fontSize: '1.08rem',
                  cursor: 'pointer',
                  boxShadow: selectedCat === cat ? '0 4px 14px rgba(200, 50, 40, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LOTUS DIVIDER 1 */}
      <div className="container">
        <div className="lotus-divider">
          <div className="lotus-divider-content">
            <LotusIcon size={26} color="#C83228" />
            <span>Thực Đơn <span className="red-text">Đặc Sắc</span></span>
          </div>
        </div>
      </div>

      {/* 4. FOOD GRID WITH FLIP CARDS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card-grid">
            {filteredFoods.map((food) => (
              <FlipCard
                key={food.id}
                image={food.image || '/images/bac_ninh_cuisine.jpg'}
                imageAlt={food.name}
                frontTitle={food.name}
                frontSubtitle={food.features || food.description}
                frontBadge={food.origin}
                backTitle={food.name}
                backContent={food.taste || food.description}
                href={`/am-thuc/${food.slug}`}
                backFooter={
                  <span style={{ color: '#B8781B', fontWeight: 700, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <Coins size={14} /> {food.priceRange}
                  </span>
                }
              >
                {food.locations && food.locations.length > 0 && (
                  <div style={{ marginTop: '4px', fontSize: '0.78rem', color: '#55443B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span style={{ color: '#C83228', fontWeight: 600, display: 'inline-flex', alignItems: 'center', marginRight: '3px' }}><MapPin size={12} /></span>
                    <span>{food.locations[0].name}</span>
                    {food.locations.length > 1 && <span style={{ color: '#9A8A7A', fontSize: '0.72rem' }}> (+{food.locations.length - 1} nơi)</span>}
                  </div>
                )}

              </FlipCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOTUS DIVIDER 2 */}
      <div className="container">
        <div className="lotus-divider">
          <div className="lotus-divider-content">
            <LotusIcon size={26} color="#C83228" />
            <span>Quán Ăn Gia Truyền <span className="red-text">Chuẩn Vị</span></span>
          </div>
        </div>
      </div>

      {/* 6. AUTHENTIC RESTAURANTS TABLE */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div className="itinerary-table-wrap">
          <div className="itinerary-table-title">
            <Sparkles size={20} color="#D4A853" />
            Quán Ăn Gia Truyền Được Giới Thiệu
          </div>
          <table className="itinerary-table">
            <thead>
              <tr>
                <th>Tên quán</th>
                <th>Món đặc trưng</th>
                <th>Địa chỉ</th>
                <th>Giờ mở</th>
                <th>Liên hệ</th>
              </tr>
            </thead>
            <tbody>
              {authenticRestaurants.map((res, idx) => (
                <tr key={idx}>
                  <td className="place-cell">{res.name}</td>
                  <td>{res.dish}</td>
                  <td className="desc-cell">{res.address}</td>
                  <td className="time-cell">{res.hours}</td>
                  <td>
                    <a
                      href={`tel:${res.phone.replace(/\s+/g, '')}`}
                      style={{ color: '#C83228', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <PhoneCall size={14} /> {res.phone}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox
        images={lightboxImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        startIndex={lightboxIndex}
      />
    </div>
  );
}
