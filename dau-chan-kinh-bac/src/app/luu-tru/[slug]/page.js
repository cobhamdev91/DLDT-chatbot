import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, Coffee, User, Compass, Sparkles, MapPin, Coins, Phone, Building, Navigation } from 'lucide-react';
import { accommodations } from '@/data/accommodations';
import Breadcrumb from '@/components/Breadcrumb';

export async function generateStaticParams() {
  return accommodations.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const stay = accommodations.find((s) => s.slug === slug);
  if (!stay) return { title: 'Nơi lưu trú không tồn tại' };

  return {
    title: `${stay.name} – Khách Sạn & Nghỉ Dưỡng Bắc Ninh | Dấu chân Kinh Bắc`,
    description: stay.tagline || `Thông tin chi tiết về ${stay.name}, tiện ích phòng, trải nghiệm và giá tham khảo tại Bắc Ninh.`,
  };
}

export default async function AccommodationDetailPage({ params }) {
  const { slug } = await params;
  const stay = accommodations.find((s) => s.slug === slug);

  if (!stay) {
    notFound();
  }

  const related = accommodations.filter((s) => s.slug !== stay.slug).slice(0, 3);

  return (
    <article className="detail-page">
      {/* HERO BANNER */}
      <section className="detail-hero">
        <div className="detail-hero-image">
          <Image
            src={stay.heroImage || stay.image || '/images/hero_kinh_bac.jpg'}
            alt={stay.name}
            fill
            priority
            className="detail-hero-img"
          />
        </div>
        <div className="detail-hero-overlay"></div>
        <div className="container detail-hero-content">
          <span className="badge badge-gold">
            {stay.stars > 0 ? `${stay.stars} Sao • ${stay.type}` : stay.type}
          </span>
          <h1 className="detail-title">{stay.name}</h1>
          <p className="detail-lead">{stay.tagline}</p>
        </div>
      </section>

      <Breadcrumb items={[
        { label: 'Lưu trú', href: '/luu-tru' },
        { label: stay.name },
      ]} />

      {/* MAIN CONTENT */}
      <div className="container detail-body">
        <div className="detail-layout">
          {/* LEFT: CONTENT */}
          <div className="detail-main">
            {/* GIỚI THIỆU & CÂU CHUYỆN */}
            {stay.story && (
              <section className="content-block">
                <h2>1. Không gian & Cảm hứng lưu trú</h2>
                <div className="prose">
                  <p>{stay.story}</p>
                </div>
              </section>
            )}

            {/* HỆ THỐNG TIỆN ÍCH */}
            {stay.amenities && stay.amenities.length > 0 && (
              <section className="content-block">
                <h2>2. Tiện ích & Dịch vụ nổi bật</h2>
                <div className="highlights-grid">
                  {stay.amenities.map((item, idx) => (
                    <div key={idx} className="highlight-pill">
                      <span className="highlight-dot"><Check size={14} strokeWidth={2.5} color="#2E7D32" /></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* TRẢI NGHIỆM NÊN THỬ */}
            {stay.experience && (
              <section className="content-block">
                <h2>3. Trải nghiệm gợi ý cho kỳ nghỉ</h2>
                <div className="experience-box">
                  <span className="exp-icon"><Coffee size={24} color="var(--color-primary)" /></span>
                  <p>{stay.experience}</p>
                </div>
              </section>
            )}

            {/* ĐỐI TƯỢNG PHÙ HỢP */}
            {stay.suitableFor && stay.suitableFor.length > 0 && (
              <section className="content-block">
                <h2>4. Phù hợp nhất với</h2>
                <div className="highlights-grid">
                  {stay.suitableFor.map((target, idx) => (
                    <div key={idx} className="highlight-pill" style={{ borderColor: 'var(--color-gold)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <User size={14} color="var(--color-gold-dark)" /> {target}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* GỢI Ý HÀNH TRÌNH TỪ ĐIỂM LƯU TRÚ */}
            {stay.itinerary && (
              <section className="content-block">
                <div className="safer-box">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Compass size={20} color="var(--color-primary-dark)" /> Lộ trình khám phá kết nối thuận tiện
                  </h3>
                  <p style={{ marginTop: '8px', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                    {stay.itinerary}
                  </p>
                </div>
              </section>
            )}

            {/* BẠN CÓ BIẾT */}
            {stay.funFact && (
              <section className="content-block">
                <div className="funfact-box">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={20} color="var(--color-gold-dark)" /> Bạn có biết?
                  </h3>
                  <p>{stay.funFact}</p>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3>Thông Tin Đặt Phòng</h3>
              <ul className="info-list">
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={15} /> Địa chỉ:
                  </strong>
                  <span>{stay.location}</span>
                </li>
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Coins size={15} /> Giá tham khảo:
                  </strong>
                  <span style={{ color: 'var(--color-gold-dark)', fontWeight: 700 }}>
                    {stay.priceRange}
                  </span>
                </li>
                {stay.phone && (
                  <li>
                    <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={15} /> Hotline:
                    </strong>
                    <a href={`tel:${stay.phone}`} style={{ color: 'var(--color-primary)', fontWeight: 700 }}>
                      {stay.phone}
                    </a>
                  </li>
                )}
                {stay.scale && (
                  <li>
                    <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Building size={15} /> Quy mô:
                    </strong>
                    <span>{stay.scale}</span>
                  </li>
                )}
              </ul>

              <div className="sidebar-cta">
                {stay.phone && (
                  <a href={`tel:${stay.phone}`} className="btn btn-primary full-width" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Phone size={16} /> Gọi điện đặt phòng ngay
                  </a>
                )}
                <Link href="/phuong-tien" className="btn btn-outline full-width" style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Navigation size={16} /> Xem chỉ đường di chuyển
                </Link>
              </div>

              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', marginTop: '16px', lineHeight: 1.5 }}>
                * Lưu ý: Giá phòng có thể thay đổi vào dịp cuối tuần hoặc lễ Tết. Vui lòng liên hệ trực tiếp lễ tân khách sạn để nhận ưu đãi.
              </p>
            </div>
          </aside>
        </div>

        {/* RELATED STAYS */}
        <section className="related-section">
          <h2>Điểm Lưu Trú Khác Tại Bắc Ninh</h2>
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
                  <span className="card-badge">{rel.type}</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{rel.name}</h3>
                  <p className="card-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} color="#C83228" /> {rel.location.split(',')[1] || rel.location}
                  </p>
                  <div className="card-footer">
                    <span className="card-price">{rel.priceRange}</span>
                    <Link href={`/luu-tru/${rel.slug}`} className="btn-sm btn-outline">
                      Chi tiết →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
