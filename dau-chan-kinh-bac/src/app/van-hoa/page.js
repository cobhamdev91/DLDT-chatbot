'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Landmark, Home, Sparkles, Music, Clock, Play, Pause } from 'lucide-react';
import { LotusIcon } from '@/components/Icons';
import ParallaxHero from '@/components/ParallaxHero';
import FlipCard from '@/components/FlipCard';
import Lightbox from '@/components/Lightbox';
import Breadcrumb from '@/components/Breadcrumb';
import AnimatedCounter from '@/components/AnimatedCounter';
import { siteContent } from '@/data/content';

const { pageHeroes } = siteContent;

const culturalPillars = [
  {
    title: 'Lối Hát Giao Duyên Đối Đáp',
    subtitle: 'Nghệ thuật ứng tác đỉnh cao',
    desc: 'Những câu hát mộc không cần nhạc đệm, thể hiện sự am hiểu điển tích, tình tứ và kính trọng lẫn nhau giữa liền anh liền chị.',
    image: '/images/quan_ho_culture.jpg',
    tag: 'Âm Nhạc',
    slug: 'quan-ho'
  },
  {
    title: 'Trang Phục Áo Tứ Thân & Nón Quai Thao',
    subtitle: 'Nét duyên Kinh Bắc xưa',
    desc: 'Áo năm thân the thâm, dải yếm đào hoa sen, nón quai thao che nghiêng duyên dáng tạo nên biểu tượng thanh tao của người quan họ.',
    image: '/images/hero_kinh_bac.jpg',
    tag: 'Trang Phục',
    slug: 'trang-phuc'
  },
  {
    title: 'Tục Kết Chạ Nghĩa Tình',
    subtitle: 'Chuẩn mực ứng xử hiếu nghĩa',
    desc: 'Mối tình kết chạ bền chặt qua nhiều thế hệ giữa các làng quan họ: trọng nghĩa khinh tài, xem nhau như ruột thịt.',
    image: '/images/craft_village_pottery.jpg',
    tag: 'Phong Tục',
    slug: 'khong-gian'
  },
  {
    title: 'Làng Diềm Thủy Tổ Quan Họ',
    subtitle: 'Cội nguồn câu hát ngàn năm',
    desc: 'Ngôi làng cổ thờ Đức Vua Bà – Thủy tổ sáng lập làn điệu Quan họ, nơi giếng ngọc nghìn năm nước ngọt lành linh thiêng.',
    image: '/images/den_do.jpg',
    tag: 'Cội Nguồn',
    slug: 'con-nguoi'
  }
];

const songs = [
  { title: 'Ngồi Tựa Mạn Thuyền', type: 'Giọng vặt', dur: '4:15', desc: 'Làn điệu mượt mà khắc họa khung cảnh bến đò bến nước trao duyên tình tứ.' },
  { title: 'Khách Đến Chơi Nhà', type: 'Giọng lề lối', dur: '3:50', desc: 'Câu hát chào đón nồng hậu, têm trầu mời nước thắm đượm tình người đất Bắc.' },
  { title: 'Cò Lả Kinh Bắc', type: 'Dân ca biến tấu', dur: '3:20', desc: 'Giai điệu thanh thoát, bay bổng trên những cánh đồng lúa chín vàng trĩu hạt.' },
  { title: 'Người Ơi Người Ở Đừng Về', type: 'Giọng giã bạn', dur: '5:10', desc: 'Lời từ biệt dùng dằng kẻ ở người đi đẫm lệ quyến luyến lúc chia tay canh hát.' }
];

// Gallery images for culture lightbox
const cultureImages = [
  { src: '/images/quan_ho_culture.jpg', alt: 'Quan họ giao duyên', caption: 'Liền anh liền chị hát giao duyên bên hồ' },
  { src: '/images/hero_kinh_bac.jpg', alt: 'Trang phục Quan họ', caption: 'Áo tứ thân, nón quai thao – biểu tượng Kinh Bắc' },
  { src: '/images/craft_village_pottery.jpg', alt: 'Làng nghề văn hóa', caption: 'Nghệ nhân gốm Phù Lãng lưu giữ hồn Kinh Bắc' },
  { src: '/images/den_do.jpg', alt: 'Đền Đô linh thiêng', caption: 'Đền Đô – nơi thờ 8 vị vua triều Lý' },
  { src: '/images/chua_dau.jpg', alt: 'Chùa Dâu cổ kính', caption: 'Chùa Dâu – trung tâm Phật giáo cổ nhất Việt Nam' },
];

export default function VanHoaPage() {
  const [playingSong, setPlayingSong] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const togglePlay = (title) => {
    if (playingSong === title) setPlayingSong(null);
    else setPlayingSong(title);
  };

  const openGallery = (idx) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="culture-page">
      {/* 1. PARALLAX HERO WITH CUTOUT TEXT */}
      <ParallaxHero
        image={pageHeroes.vanHoa.image}
        imageAlt={pageHeroes.vanHoa.imageAlt}
        badge={pageHeroes.vanHoa.badge}
        title={pageHeroes.vanHoa.title}
        description={pageHeroes.vanHoa.desc}
        cutoutText="Quan Họ"
      />

      {/* BREADCRUMB */}
      <Breadcrumb items={[{ label: 'Văn hóa Quan họ' }]} />

      {/* 2. QUICK FACTS BOX (4 COLUMNS - MASTER STYLE) */}
      <section className="quick-widgets-wrapper">
        <div className="container">
          <div className="quick-widgets-box">
            <div className="quick-widget-item">
              <span className="widget-label">DI SẢN THẾ GIỚI</span>
              <div className="widget-main-stat">
                <Landmark size={28} color="#C83228" strokeWidth={1.8} style={{ marginRight: '6px' }} />
                <span className="widget-number"><AnimatedCounter end={2009} duration={2000} /></span>
              </div>
              <div className="widget-desc">UNESCO vinh danh Di sản văn hóa phi vật thể</div>
              <span className="widget-sub">Đại diện của nhân loại</span>
            </div>

            <div className="quick-widget-item">
              <span className="widget-label">LÀNG QUAN HỌ GỐC</span>
              <div className="widget-main-stat">
                <Home size={28} color="#1B3322" strokeWidth={1.8} style={{ marginRight: '6px' }} />
                <span className="widget-number"><AnimatedCounter end={49} duration={1500} /></span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                  làng cổ
                </span>
              </div>
              <div className="widget-desc">Được bảo tồn nguyên vẹn làn điệu cổ truyền</div>
              <span className="widget-sub">Tập trung ven bờ sông Cầu</span>
            </div>

            <div className="quick-widget-item">
              <span className="widget-label">LỄ HỘI TRUYỀN THỐNG</span>
              <div className="widget-main-stat">
                <Sparkles size={28} color="#D4A853" strokeWidth={1.8} style={{ marginRight: '6px' }} />
                <span className="widget-number"><AnimatedCounter end={500} duration={1800} suffix="+" /></span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                  lễ hội / năm
                </span>
              </div>
              <div className="widget-desc">Hội Lim, Hội Đền Đô, Hội Chùa Dâu rộn ràng</div>
              <span className="widget-sub">Mùa xuân trẩy hội miền Quan họ</span>
            </div>

            <div className="quick-widget-item">
              <span className="widget-label">CÔNG TRÌNH BIỂU TƯỢNG</span>
              <div className="widget-main-stat" style={{ alignItems: 'center' }}>
                <Music size={26} color="#B8781B" strokeWidth={1.8} style={{ marginRight: '6px' }} />
                <span style={{ fontWeight: 700, color: 'var(--color-primary-dark)', fontSize: '1rem' }}>
                  Nhà hát Quan họ
                </span>
              </div>
              <div className="widget-desc" style={{ color: '#B8781B', fontWeight: 700 }}>
                Kiến trúc nón quai thao độc bản
              </div>
              <span className="widget-sub">Biểu diễn định kỳ cuối tuần</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOTUS DIVIDER 1 */}
      <div className="container">
        <div className="lotus-divider">
          <div className="lotus-divider-content">
            <LotusIcon size={26} color="#C83228" />
            <span>Di Sản Sống Cùng <span className="red-text">Thời Gian</span></span>
          </div>
        </div>
      </div>

      {/* 4. FOUR PILLARS - FLIP CARDS */}
      <section className="container" style={{ marginBottom: '40px' }}>
        <div className="card-grid">
          {culturalPillars.map((p, idx) => (
            <FlipCard
              key={idx}
              image={p.image}
              imageAlt={p.title}
              frontTitle={p.title}
              frontSubtitle={p.subtitle}
              frontBadge={p.tag}
              backTitle={p.title}
              backContent={p.desc}
              href={`/van-hoa/${p.slug}`}
              backFooter={
                <span style={{ color: '#D4A853', fontWeight: 600, fontSize: '0.8125rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <Landmark size={14} /> Di sản văn hóa Kinh Bắc
                </span>
              }
            />
          ))}
        </div>
      </section>

      {/* 5. LOTUS DIVIDER 2 */}
      <div className="container">
        <div className="lotus-divider">
          <div className="lotus-divider-content">
            <LotusIcon size={26} color="#C83228" />
            <span>Thưởng Thức <span className="red-text">Làn Điệu Cổ</span></span>
          </div>
        </div>
      </div>

      {/* 6. AUDIO LISTENING SECTION */}
      <section className="container" style={{ marginBottom: '80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {songs.map((song, idx) => {
            const isPlaying = playingSong === song.title;
            return (
              <div
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '26px',
                  border: isPlaying ? '1.5px solid #C83228' : '1px solid rgba(107, 58, 42, 0.08)',
                  boxShadow: '0 8px 24px rgba(74, 37, 24, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.25s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    background: '#F9F2E3',
                    color: '#B8781B',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '50px'
                  }}>
                    {song.type}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-light)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={15} color="var(--color-text-light)" /> {song.dur}
                  </span>
                </div>

                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
                  {song.title}
                </h4>
                <p style={{ fontSize: '1rem', color: '#4E3E34', lineHeight: '1.7', marginBottom: '20px', flexGrow: 1 }}>
                  {song.desc}
                </p>

                <button
                  onClick={() => togglePlay(song.title)}
                  style={{
                    background: isPlaying ? '#C83228' : '#FAF7F2',
                    color: isPlaying ? '#FFFFFF' : 'var(--color-primary-dark)',
                    border: '1px solid rgba(107, 58, 42, 0.12)',
                    padding: '12px 20px',
                    borderRadius: '50px',
                    fontWeight: 700,
                    fontSize: '0.96rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                  }}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={15} fill="currentColor" />
                      <span>Đang phát thử...</span>
                    </>
                  ) : (
                    <>
                      <Play size={15} fill="currentColor" />
                      <span>Nghe giai điệu cổ</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox
        images={cultureImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        startIndex={lightboxIndex}
      />
    </div>
  );
}
