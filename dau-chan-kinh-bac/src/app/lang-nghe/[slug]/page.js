import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Sparkles, Hammer, Gift, Lightbulb, Tag, Flame, Clock, Navigation, Utensils } from 'lucide-react';
import { craftVillages } from '@/data/craftVillages';
import Breadcrumb from '@/components/Breadcrumb';

export async function generateStaticParams() {
  return craftVillages.map((v) => ({
    slug: v.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const village = craftVillages.find((v) => v.slug === slug);
  if (!village) return { title: 'Làng nghề không tồn tại' };

  return {
    title: `${village.name} – Làng Nghề Bắc Ninh | Dấu chân Kinh Bắc`,
    description: `Khám phá ${village.name}, lịch sử truyền thống, trải nghiệm tự tay làm nghề và gợi ý quà lưu niệm đặc sắc.`,
  };
}

export default async function CraftVillageDetailPage({ params }) {
  const { slug } = await params;
  const village = craftVillages.find((v) => v.slug === slug);

  if (!village) {
    notFound();
  }

  const related = craftVillages.filter((v) => v.slug !== village.slug).slice(0, 3);

  return (
    <article className="detail-page">
      {/* HERO BANNER */}
      <section className="detail-hero">
        <div className="detail-hero-image">
          <Image
            src={village.image || '/images/craft_village_pottery.jpg'}
            alt={village.name}
            fill
            priority
            className="detail-hero-img"
          />
        </div>
        <div className="detail-hero-overlay"></div>
        <div className="container detail-hero-content">
          <span className="badge badge-gold">{village.category}</span>
          <h1 className="detail-title">{village.name}</h1>
          <p className="detail-lead" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={16} color="var(--color-gold)" /> {village.location}
          </p>
        </div>
      </section>

      <Breadcrumb items={[
        { label: 'Làng nghề', href: '/lang-nghe' },
        { label: village.name },
      ]} />

      {/* MAIN CONTENT */}
      <div className="container detail-body">
        <div className="detail-layout">
          {/* LEFT: CONTENT */}
          <div className="detail-main">
            {/* LỊCH SỬ HÌNH THÀNH */}
            {village.history && (
              <section className="content-block">
                <h2>1. Lịch sử hình thành & Giá trị văn hóa</h2>
                <div className="prose">
                  <p>{village.history}</p>
                </div>
              </section>
            )}

            {/* ĐIỂM NỔI BẬT */}
            {village.highlights && village.highlights.length > 0 && (
              <section className="content-block">
                <h2>2. Điểm đặc trưng nổi bật</h2>
                <div className="highlights-grid">
                  {village.highlights.map((item, idx) => (
                    <div key={idx} className="highlight-pill">
                      <span className="highlight-dot"><Sparkles size={14} color="#D4A853" /></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TRẢI NGHIỆM TẠI LÀNG NGHỀ */}
            {village.experiences && village.experiences.length > 0 && (
              <section className="content-block">
                <h2>3. Trải nghiệm thực tế nên thử</h2>
                <div className="safer-box">
                  <ul className="safer-list">
                    {village.experiences.map((exp, idx) => (
                      <li key={idx}>
                        <span className="check-icon"><Hammer size={16} color="var(--color-primary)" /></span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* GỢI Ý MUA QUÀ LƯU NIỆM */}
            {village.gifts && village.gifts.length > 0 && (
              <section className="content-block">
                <h2>4. Gợi ý quà lưu niệm mang về</h2>
                <div className="experience-box">
                  <span className="exp-icon"><Gift size={24} color="var(--color-primary)" /></span>
                  <div>
                    <ul style={{ paddingLeft: '18px', lineHeight: 1.8 }}>
                      {village.gifts.map((g, idx) => (
                        <li key={idx}>{g}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* LỜI KHUYÊN & LƯU Ý */}
            {village.tips && (
              <section className="content-block">
                <div className="funfact-box">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Lightbulb size={20} color="var(--color-gold-dark)" /> Lưu ý khi ghé thăm
                  </h3>
                  <p>{village.tips}</p>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3>Thông Tin Làng Nghề</h3>
              <ul className="info-list">
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={15} /> Tên làng:
                  </strong>
                  <span>{village.name}</span>
                </li>
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Flame size={15} /> Ngành nghề:
                  </strong>
                  <span>{village.category}</span>
                </li>
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={15} /> Vị trí:
                  </strong>
                  <span>{village.location}</span>
                </li>
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={15} /> Thời gian tham quan:
                  </strong>
                  <span>{village.duration}</span>
                </li>
              </ul>

              <div className="sidebar-cta">
                <Link href="/phuong-tien" className="btn btn-outline full-width" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Navigation size={16} /> Xem chỉ đường & phương tiện
                </Link>
                <Link href="/am-thuc" className="btn btn-primary full-width" style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Utensils size={16} /> Đặc sản Bắc Ninh nên thử
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* RELATED CRAFT VILLAGES */}
        <section className="related-section">
          <h2>Các Làng Nghề Truyền Thống Khác</h2>
          <div className="card-grid">
            {related.map((rel) => (
              <div key={rel.id} className="card">
                <div className="card-image-wrap">
                  <Image
                    src={rel.image || '/images/craft_village_pottery.jpg'}
                    alt={rel.name}
                    width={400}
                    height={220}
                    className="card-image"
                  />
                  <span className="card-badge">{rel.category}</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{rel.name}</h3>
                  <p className="card-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} color="#C83228" /> {rel.location.split(',')[1] || rel.location}
                  </p>
                  <Link href={`/lang-nghe/${rel.slug}`} className="btn-sm btn-outline">
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
