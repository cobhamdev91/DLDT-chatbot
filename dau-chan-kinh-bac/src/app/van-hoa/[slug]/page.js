'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Music, Sparkles, Landmark, MapPin, Navigation, Utensils, BookOpen } from 'lucide-react';
import { cultureData } from '@/data/culture';
import Breadcrumb from '@/components/Breadcrumb';

const sectionImages = {
  'quan-ho': '/images/quan_ho_culture.jpg',
  'trang-phuc': '/images/hero_kinh_bac.jpg',
  'khong-gian': '/images/craft_village_pottery.jpg',
  'con-nguoi': '/images/den_do.jpg',
};

const sectionBadges = {
  'quan-ho': 'Âm Nhạc',
  'trang-phuc': 'Trang Phục',
  'khong-gian': 'Không Gian',
  'con-nguoi': 'Con Người',
};

export default function CultureDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const section = cultureData.sections.find((s) => s.id === slug);

  if (!section) {
    return (
      <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
        <h1>Nội dung không tồn tại</h1>
        <Link href="/van-hoa" className="btn btn-primary" style={{ marginTop: '20px' }}>
          ← Quay về trang Văn hóa
        </Link>
      </div>
    );
  }

  const heroImage = sectionImages[slug] || '/images/quan_ho_culture.jpg';
  const badge = sectionBadges[slug] || 'Văn Hóa';
  const otherSections = cultureData.sections.filter((s) => s.id !== slug);

  return (
    <article className="detail-page">
      {/* HERO BANNER */}
      <section className="detail-hero">
        <div className="detail-hero-image">
          <Image
            src={heroImage}
            alt={section.title}
            fill
            priority
            className="detail-hero-img"
          />
        </div>
        <div className="detail-hero-overlay"></div>
        <div className="container detail-hero-content">
          <span className="badge badge-gold">{badge}</span>
          <h1 className="detail-title">{section.title.replace(/^\d+\.\s*/, '')}</h1>
          <p className="detail-lead">{section.intro.substring(0, 100)}...</p>
        </div>
      </section>

      <Breadcrumb items={[
        { label: 'Văn hóa Quan họ', href: '/van-hoa' },
        { label: section.title.replace(/^\d+\.\s*/, '') },
      ]} />

      {/* MAIN CONTENT */}
      <div className="container detail-body">
        <div className="detail-layout">
          {/* LEFT: CONTENT */}
          <div className="detail-main">
            {/* GIỚI THIỆU */}
            <section className="content-block">
              <h2>Giới thiệu</h2>
              <div className="prose">
                <p>{section.intro}</p>
              </div>
            </section>

            {/* CÁC ĐIỂM NỔI BẬT */}
            {section.points && section.points.length > 0 && (
              <section className="content-block">
                <h2>Nội dung chi tiết</h2>
                {section.points.map((point, idx) => (
                  <div key={idx} style={{ marginBottom: '24px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
                      <Sparkles size={18} color="#D4A853" />
                      {point.heading}
                    </h3>
                    <div className="prose">
                      <p>{point.content}</p>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* TRẢI NGHIỆM GỢI Ý */}
            {cultureData.experiences && cultureData.experiences.length > 0 && (
              <section className="content-block">
                <h2>Trải nghiệm gợi ý</h2>
                <div className="safer-box">
                  <ul className="safer-list">
                    {cultureData.experiences.slice(0, 3).map((exp, idx) => (
                      <li key={idx}>
                        <span className="check-icon"><Music size={16} color="var(--color-primary)" /></span>
                        <span><strong>{exp.title}</strong> – {exp.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* FUN FACT */}
            <section className="content-block">
              <div className="funfact-box">
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={20} color="var(--color-gold-dark)" /> Bạn có biết?
                </h3>
                <p>Dân ca Quan họ Bắc Ninh được UNESCO vinh danh là Di sản văn hóa phi vật thể đại diện của nhân loại vào năm 2009, khẳng định giá trị văn hóa vượt thời gian của vùng đất Kinh Bắc.</p>
              </div>
            </section>
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3>Thông Tin Văn Hóa</h3>
              <ul className="info-list">
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={15} /> Chủ đề:
                  </strong>
                  <span>{badge}</span>
                </li>
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Landmark size={15} /> Di sản:
                  </strong>
                  <span>UNESCO 2009</span>
                </li>
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={15} /> Vùng:
                  </strong>
                  <span>Bắc Ninh – Bắc Giang</span>
                </li>
              </ul>

              <div className="sidebar-cta">
                <Link href="/diem-den" className="btn btn-outline full-width" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Navigation size={16} /> Khám phá điểm đến
                </Link>
                <Link href="/am-thuc" className="btn btn-primary full-width" style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Utensils size={16} /> Đặc sản Bắc Ninh nên thử
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* RELATED SECTIONS */}
        <section className="related-section">
          <h2>Khám Phá Thêm Văn Hóa Kinh Bắc</h2>
          <div className="card-grid">
            {otherSections.map((rel) => (
              <div key={rel.id} className="card">
                <div className="card-image-wrap">
                  <Image
                    src={sectionImages[rel.id] || '/images/quan_ho_culture.jpg'}
                    alt={rel.title}
                    width={400}
                    height={220}
                    className="card-image"
                  />
                  <span className="card-badge">{sectionBadges[rel.id] || 'Văn hóa'}</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{rel.title.replace(/^\d+\.\s*/, '')}</h3>
                  <p className="card-subtitle">{rel.intro.substring(0, 60)}...</p>
                  <Link href={`/van-hoa/${rel.id}`} className="btn-sm btn-outline">
                    Tìm hiểu →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
