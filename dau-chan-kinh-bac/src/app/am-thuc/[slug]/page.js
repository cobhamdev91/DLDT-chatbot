import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Utensils, Sparkles, Tag, Coins, Landmark } from 'lucide-react';
import { foods } from '@/data/foods';
import Breadcrumb from '@/components/Breadcrumb';
import ScrollBackground from '@/components/ScrollBackground';

export async function generateStaticParams() {
  return foods.map((f) => ({
    slug: f.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const food = foods.find((f) => f.slug === slug);
  if (!food) return { title: 'Món ăn không tồn tại' };

  return {
    title: `${food.name} – Đặc sản Bắc Ninh | Dấu chân Kinh Bắc`,
    description: food.description || `Tìm hiểu ${food.name}, đặc sản trứ danh vùng Kinh Bắc với hương vị và địa chỉ quán ngon.`,
  };
}

export default async function FoodDetailPage({ params }) {
  const { slug } = await params;
  const food = foods.find((f) => f.slug === slug);

  if (!food) {
    notFound();
  }

  const related = foods.filter((f) => f.slug !== food.slug).slice(0, 3);

  // Background images for the scroll-driven section (order = data-bg-index)
  const mainImage = food.image || '/images/bac_ninh_cuisine.jpg';
  const scenes = food.scenes || {};
  const bgImages = [
    { src: scenes.origin || mainImage, alt: `Nguồn gốc ${food.name}` },
    { src: scenes.features || mainImage, alt: `Chế biến ${food.name}` },
    { src: scenes.taste || mainImage, alt: `Hương vị ${food.name}` },
    { src: mainImage, alt: food.name },
  ];

  return (
    <article className="detail-page">
      {/* HERO BANNER */}
      <section className="detail-hero">
        <div className="detail-hero-image">
          <Image
            src={food.image || '/images/bac_ninh_cuisine.jpg'}
            alt={food.name}
            fill
            priority
            className="detail-hero-img"
          />
        </div>
        <div className="detail-hero-overlay"></div>
        <div className="container detail-hero-content">
          <span className="badge badge-gold">Đặc Sản Mỹ Vị Kinh Bắc</span>
          <h1 className="detail-title">{food.name}</h1>
          <p className="detail-lead" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            Nguồn gốc: <MapPin size={16} color="var(--color-gold)" /> {food.origin}
          </p>
        </div>
      </section>

      {/* SCROLL-DRIVEN BACKGROUND SECTION – sits directly below the hero */}
      <ScrollBackground images={bgImages} className="food-scroll-bg">
        <Breadcrumb items={[
          { label: 'Ẩm thực', href: '/am-thuc' },
          { label: food.name },
        ]} />

      {/* MAIN CONTENT WRAPPER */}
      <div className="container detail-body">
        <div className="detail-layout">
          {/* LEFT: CONTENT */}
          <div className="detail-main">
            {/* LỊCH SỬ & CÂU CHUYỆN */}
            {food.description && (
              <section className="content-block" data-bg-index="0">
                <h2>1. Nguồn gốc & Câu chuyện</h2>
                <div className="prose">
                  <p>{food.description}</p>
                </div>
              </section>
            )}

            {/* ĐẶC ĐIỂM CHẾ BIẾN */}
            {food.features && (
              <section className="content-block" data-bg-index="1">
                <h2>2. Nguyên liệu & Bí quyết chế biến</h2>
                <div className="experience-box">
                  <span className="exp-icon"><Utensils size={24} color="var(--color-primary)" /></span>
                  <p>{food.features}</p>
                </div>
              </section>
            )}

            {/* HƯƠNG VỊ ĐẶC TRƯNG */}
            {food.taste && (
              <section className="content-block" data-bg-index="2">
                <h2>3. Hương vị khi thưởng thức</h2>
                <div className="funfact-box">
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={20} color="var(--color-gold-dark)" /> Cảm nhận vị giác:
                  </h3>
                  <p>{food.taste}</p>
                </div>
              </section>
            )}

            {/* ĐỊA ĐIỂM THƯỞNG THỨC & MUA VỀ LÀM QUÀ */}
            {food.locations && food.locations.length > 0 && (
              <section className="content-block" data-bg-index="3">
                <h2>4. Địa chỉ quán ngon & Nơi mua uy tín</h2>
                <div className="locations-list">
                  {food.locations.map((loc, idx) => (
                    <div key={idx} className="location-item-card">
                      <div className="loc-icon"><MapPin size={22} color="#C83228" /></div>
                      <div>
                        <strong>{loc.name}</strong>
                        <p>{loc.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: SIDEBAR */}
          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3>Thông Tin Nhanh</h3>
              <ul className="info-list">
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={15} /> Món ăn:
                  </strong>
                  <span>{food.name}</span>
                </li>
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={15} /> Xuất xứ:
                  </strong>
                  <span>{food.origin}</span>
                </li>
                <li>
                  <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Coins size={15} /> Giá tham khảo:
                  </strong>
                  <span style={{ color: 'var(--color-gold-dark)', fontWeight: 700 }}>
                    {food.priceRange}
                  </span>
                </li>
              </ul>

              <div className="sidebar-cta">
                <Link href="/am-thuc" className="btn btn-outline full-width" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Utensils size={16} /> Khám phá thêm món ngon khác
                </Link>
                <Link href="/diem-den" className="btn btn-primary full-width" style={{ marginTop: '10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Landmark size={16} /> Điểm du lịch gần đây
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* RELATED FOODS */}
        <section className="related-section">
          <h2>Đặc Sản Khác Đáng Thử</h2>
          <div className="card-grid">
            {related.map((rel) => (
              <div key={rel.id} className="card">
                <div className="card-image-wrap">
                  <Image
                    src={rel.image || '/images/bac_ninh_cuisine.jpg'}
                    alt={rel.name}
                    width={400}
                    height={220}
                    className="card-image"
                  />
                  <span className="card-badge">Đặc sản</span>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{rel.name}</h3>
                  <p className="card-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} color="#C83228" /> {rel.origin}
                  </p>
                  <div className="card-footer">
                    <span className="card-price">{rel.priceRange}</span>
                    <Link href={`/am-thuc/${rel.slug}`} className="btn-sm btn-outline">
                      Xem chi tiết →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      </ScrollBackground>
    </article>
  );
}
