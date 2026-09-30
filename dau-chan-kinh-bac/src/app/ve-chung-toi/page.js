'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, 
  Heart, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import ParallaxHero from '@/components/ParallaxHero';
import { LotusIcon } from '@/components/Icons';

export default function AboutUsPage() {
  const values = [
    {
      icon: <Sparkles size={28} color="#C83228" />,
      title: 'Tôn Vinh Di Sản',
      desc: 'Bảo tồn và số hóa các giá trị văn hóa vô giá: Di sản Quan họ, các ngôi chùa cổ kính, và tinh hoa các làng nghề ngàn năm.'
    },
    {
      icon: <Compass size={28} color="#1B3322" />,
      title: 'Trải Nghiệm Thực Tế',
      desc: 'Cung cấp cẩm nang chi tiết từ phương tiện di chuyển, lộ trình mẫu, cơ sở lưu trú đến ẩm thực đặc trưng của từng vùng miền.'
    },
    {
      icon: <ShieldCheck size={28} color="#B8781B" />,
      title: 'Độ Tin Cậy & Chính Xác',
      desc: 'Mọi thông tin về giá vé, khoảng cách, cung đường và địa chỉ đều được kiểm chứng và cập nhật theo thực tế mới nhất.'
    },
    {
      icon: <Users size={28} color="#C83228" />,
      title: 'Đồng Hành Cùng Du Khách',
      desc: 'Tích hợp trợ lý AI thông minh sẵn sàng giải đáp 24/7 mọi thắc mắc về điểm đến và kế hoạch vi vu Kinh Bắc.'
    }
  ];

  return (
    <>
      {/* 1. HERO BANNER */}
      <ParallaxHero
        title="Về Chúng Tôi"
        subtitle="Hành trình số hóa & lan tỏa tình yêu di sản văn hóa miền Quan họ"
        bgImage="/images/hero_kinh_bac.jpg"
        height="60vh"
        cutoutText="KINH BẮC"
      />

      {/* 2. BREADCRUMB */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Breadcrumb items={[{ label: 'Về chúng tôi' }]} />
      </div>

      {/* 3. MISSION SECTION */}
      <section style={{ padding: '60px 0 40px', background: '#FDF6EC' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
            <span style={{ 
              color: '#C83228', 
              fontWeight: 700, 
              fontSize: '0.9rem', 
              textTransform: 'uppercase', 
              letterSpacing: '2px',
              display: 'inline-block',
              marginBottom: '10px'
            }}>
              Sứ Mệnh Của Chúng Tôi
            </span>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: '2.4rem', 
              color: '#3A2A1A', 
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: '18px'
            }}>
              Dấu Chân Kinh Bắc – Kết Nối Quá Khứ & Hiện Đại
            </h2>
            <p style={{ 
              fontSize: '1.08rem', 
              color: '#6B584C', 
              lineHeight: 1.8 
            }}>
              Website <strong>Dấu Chân Kinh Bắc</strong> là dự án cẩm nang du lịch điện tử toàn diện về vùng đất Bắc Ninh. 
              Với mong muốn đưa nét đẹp của những làn điệu dân ca Quan họ, mái chùa cổ Chùa Dâu, Đền Đô, cùng những tinh hoa 
              làng nghề thủ công đến gần hơn với du khách thập phương và thế hệ trẻ.
            </p>
          </div>

          {/* LOTUS DIVIDER */}
          <div className="lotus-divider-wrap" style={{ margin: '0 0 50px' }}>
            <div className="lotus-divider-line"></div>
            <div className="lotus-divider-icon">
              <LotusIcon size={24} />
            </div>
            <div className="lotus-divider-line"></div>
          </div>

          {/* CORE VALUES GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
          }}>
            {values.map((v, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '32px 24px',
                  boxShadow: '0 4px 20px rgba(107, 58, 42, 0.06)',
                  border: '1px solid rgba(107, 58, 42, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  background: '#FBF5EC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}>
                  {v.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#3A2A1A',
                  marginBottom: '10px'
                }}>
                  {v.title}
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  color: '#6B584C',
                  lineHeight: 1.65
                }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CALL TO ACTION BOX */}
          <div style={{
            background: 'linear-gradient(135deg, #1B3322 0%, #2A4D34 100%)',
            borderRadius: '20px',
            padding: '44px 36px',
            color: '#FFFFFF',
            textAlign: 'center',
            boxShadow: '0 12px 40px rgba(27, 51, 34, 0.2)'
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.8rem',
              fontWeight: 800,
              marginBottom: '12px',
              color: '#F8E8D2'
            }}>
              Cùng Dấu Chân Kinh Bắc Khám Phá Ngay Hôm Nay
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#C0D6C8',
              maxWidth: '650px',
              margin: '0 auto 28px',
              lineHeight: 1.7
            }}>
              Khám phá trọn bộ cẩm nang các điểm di tích lịch sử, tinh hoa ẩm thực, văn hóa lễ hội và các làng nghề độc đáo nhất của Bắc Ninh.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link 
                href="/diem-den"
                style={{
                  background: '#C83228',
                  color: '#FFFFFF',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s'
                }}
              >
                Khám phá Điểm đến <ArrowRight size={16} />
              </Link>
              <Link 
                href="/phuong-tien"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  padding: '12px 28px',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s'
                }}
              >
                Hướng dẫn Di chuyển
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
