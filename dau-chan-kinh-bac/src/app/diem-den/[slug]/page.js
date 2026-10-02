import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, Lightbulb, ShieldCheck, Check, MapPin, Landmark, Clock, Users, Navigation, Utensils } from 'lucide-react';
import { destinations } from '@/data/destinations';
import Breadcrumb from '@/components/Breadcrumb';

export async function generateStaticParams() {
  return destinations.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);
  if (!dest) return { title: 'Điểm đến không tồn tại' };

  return {
    title: `${dest.name} – Dấu chân Kinh Bắc`,
    description: dest.subtitle || `Khám phá ${dest.name} tại Bắc Ninh với lịch sử, điểm tham quan và kinh nghiệm du lịch.`,
  };
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  const dest = destinations.find((d) => d.slug === slug);

  if (!dest) {
    notFound();
  }

  // Related destinations
  const related = destinations.filter((d) => d.slug !== dest.slug).slice(0, 3);

  return (
    <article className="detail-page">
      {/* HERO BANNER */}
      <section className="detail-hero">
        <div className="detail-hero-image">
          <Image
            src={dest.image || '/images/hero_kinh_bac.jpg'}
            alt={dest.name}
            fill
            priority
            className="detail-hero-img"
          />
        </div>
        <div className="detail-hero-overlay"></div>
        <div className="container detail-hero-content">
          <span className="badge badge-gold">{dest.category}</span>
          <h1 className="detail-title">{dest.name}</h1>
          <p className="detail-lead">{dest.subtitle}</p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <Breadcrumb items={[
        { label: 'Điểm đến', href: '/diem-den' },
        { label: dest.name },
      ]} />

      {/* MAIN CONTENT WRAPPER */}
      <div className="container detail-body">
        <div className="detail-layout">
          {/* LEFT: MAIN ARTICLE CONTENT */}
          <div className="detail-main">
            {/* LỊCH SỬ HÌNH THÀNH */}
            {dest.history && (
              <section className="content-block">
                <h2>1. Lịch sử hình thành</h2>
                <div className="prose">
                  {dest.history.split('\n\n').map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* TÊN GỌI & Ý NGHĨA */}
            {dest.nameMeaning && (
              <section className="content-block">
                <h2>2. Tên gọi & Ý nghĩa</h2>
                <p>{dest.nameMeaning}</p>
              </section>
            )}

            {/* CÁC ĐIỂM THÚ VỊ / NỔI BẬT */}
            {dest.highlights && dest.highlights.length > 0 && (
              <section className="content-block">
                <h2>3. Các điểm thú vị nổi bật</h2>
                <div className="highlights-grid">
                  {dest.highlights.map((item, idx) => (
                    <div key={idx} className="highlight-pill">
                      <span className="highlight-dot"><Sparkles size={14} color="#D4A853" /></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TRẢI NGHIỆM NÊN THỬ */}
            {dest.experiences && (
              <section className="content-block">
                <h2>4. Trải nghiệm nên thử</h2>
                <div className="experience-box">
                  <span className="exp-icon"><Lightbulb size={24} color="var(--color-primary)" /></span>
                  <p>{dest.experiences}</p>
                </div>
              </section>
            )}

            {/* BẠN CÓ BIẾT? */}
            {dest.didYouKnow && (
              <section className="content-block">
                <div className="funfact-box">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={20} color="var(--color-gold-dark)" /> Bạn có biết?
                  </h3>
                  <p>{dest.didYouKnow}</p>
                </div>
              </section>
            )}

            {/* SAFER CHECK GUIDELINE */}
            {dest.saferCheck && dest.saferCheck.length > 0 && (
              <section className="content-block">
                <div className="safer-box">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={22} color="var(--color-primary)" /> Cẩm nang SAFER CHECK – Du lịch Văn minh & An toàn
                  </h3>
                  <ul className="safer-list">
                    {dest.saferCheck.map((rule, idx) => (
                      <li key={idx}>
                        <span className="check-icon"><Check size={16} strokeWidth={2.5} /></span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: SIDEBAR INFO */}
          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3>Thông Tin Nhanh</h3>
              <ul className="info-list">
                {dest.quickInfo?.location && (
                  <li>
                    <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={15} /> Địa điểm:
                    </strong>
                    <span>{dest.quickInfo.location}</span>
                  </li>
                )}
                {dest.quickInfo?.type && (
                  <li>
                    <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Landmark size={15} /> Loại hình:
                    </strong>
                    <span>{dest.quickInfo.type}</span>
                  </li>
                )}
                {dest.quickInfo?.duration && (
                  <li>
                    <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={15} /> Thời gian tham quan:
                    </strong>
                    <span>{dest.quickInfo.duration}</span>
                  </li>
                )}
                {dest.quickInfo?.suitableFor && (
                  <li>
                    <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={15} /> Phù hợp với:
                    </strong>
                    <span>{dest.quickInfo.suitableFor}</span>
                  </li>
                )}
                {dest.quickInfo?.specialty && (
                  <li>
                    <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={15} /> Giá trị nổi bật:
                    </strong>
                    <span>{dest.quickInfo.specialty}</span>
                  </li>
                )}
              </ul>

              <div className="sidebar-cta">
                <Link href="/phuong-tien" className="btn btn-outline full-width" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Navigation size={16} /> Xem hướng dẫn di chuyển
                </Link>
                <Link href="/am-thuc" className="btn btn-primary full-width" style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Utensils size={16} /> Món ngon gần điểm này
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* RELATED DESTINATIONS */}
        <section className="related-section">
          <h2>Điểm Đến Lân Cận Có Thể Bạn Thích</h2>
          <div className="card-grid">
            {related.map((rel) => (
              <div key={rel.id} className="card">
                <div className="card-image-wrap">
                  <Image
                    src={rel.image || '/images/hero_kinh_bac.jpg'}
                    alt={rel.name}
                    width={400}
                    height={220}
                    className="card-image"
                  />
                  <span className="card-badge">{rel.category}</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{rel.name}</h3>
                  <p className="card-subtitle">{rel.subtitle}</p>
                  <Link href={`/diem-den/${rel.slug}`} className="btn-sm btn-outline">
                    Khám phá →
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
