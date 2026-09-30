'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Compass, 
  ArrowRight, 
  Car, 
  Bus, 
  Bike, 
  Train, 
  Clock, 
  Zap, 
  Coins, 
  PhoneCall, 
  Phone, 
  Smartphone, 
  Check, 
  CheckCircle,
  Sparkles,
  X,
  Shield, 
  AlertTriangle, 
  Wifi, 
  CreditCard, 
  HardHat,
  MapPin,
  CalendarCheck
} from 'lucide-react';
import { transportTypes, itineraries, safetyRules } from '@/data/transport';
import ParallaxHero from '@/components/ParallaxHero';
import Breadcrumb from '@/components/Breadcrumb';
import { siteContent } from '@/data/content';

const { pageHeroes } = siteContent;

// Comprehensive routing calculation matrix
function calculateRoute(origin, destination) {
  // Base distances from Hanoi Center (km)
  const baseDest = {
    bac_ninh_city: { name: 'TP. Bắc Ninh (Trung tâm)', km: 31, minTime: 35, maxTime: 50 },
    den_do: { name: 'Đền Đô (TP. Từ Sơn)', km: 18, minTime: 25, maxTime: 35 },
    chua_phat_tich: { name: 'Chùa Phật Tích (Tiên Du)', km: 28, minTime: 35, maxTime: 45 },
    lang_dong_ho: { name: 'Làng Tranh Đông Hồ (Thuận Thành)', km: 34, minTime: 40, maxTime: 55 },
    chua_but_thap: { name: 'Chùa Bút Tháp (Thuận Thành)', km: 32, minTime: 40, maxTime: 50 },
    gom_phu_lang: { name: 'Làng Gốm Phù Lãng (Quế Võ)', km: 42, minTime: 50, maxTime: 65 },
  };

  const originOffsets = {
    hanoi_center: { name: 'Hà Nội (Hồ Gươm / Phố Cổ)', kmDiff: 0, timeDiff: 0, carWay: 'Cầu Chương Dương → QL1A Mới / Cao tốc', busWay: 'Bến xe Long Biên / Tuyến 54', motoWay: 'Cầu Đuống → Đường đê xanh ngát' },
    my_dinh: { name: 'Bến xe Mỹ Đình (Cầu Giấy)', kmDiff: +8, timeDiff: +12, carWay: 'Vành đai 3 trên cao → Cầu Thanh Trì → Cao tốc', busWay: 'Buýt 34 trung chuyển sang Buýt 54', motoWay: 'Phạm Văn Đồng → Cầu Thăng Long → QL18' },
    long_bien: { name: 'Bến xe Long Biên (Ba Đình)', kmDiff: -3, timeDiff: -8, carWay: 'Cầu Long Biên / Chương Dương → QL1A Mới', busWay: 'Đầu bến Tuyến Buýt 54 (Chạy thẳng 15p/chuyến)', motoWay: 'Dốc Cầu Long Biên → Đê sông Đuống' },
    noi_bai: { name: 'Sân bay Nội Bài (Sóc Sơn)', kmDiff: +4, timeDiff: -5, carWay: 'Võ Nguyên Giáp → Cao tốc QL18 thẳng tiến', busWay: 'Buýt 86 về trung tâm hoặc Xe ghép QL18', motoWay: 'QL18 đường gom rộng thoáng' },
    giap_bat: { name: 'Bến xe Giáp Bát (Hoàng Mai)', kmDiff: +6, timeDiff: +10, carWay: 'Giải Phóng → Cầu Thanh Trì → QL1A Mới', busWay: 'Tuyến Buýt 203 (Giáp Bát – Bắc Giang)', motoWay: 'Đường Tam Trinh → Đê Nam Dư' },
  };

  const target = baseDest[destination] || baseDest.bac_ninh_city;
  const start = originOffsets[origin] || originOffsets.hanoi_center;

  // Calculate actual distance & travel times
  const totalKm = Math.max(15, target.km + start.kmDiff);
  const totalMin = Math.max(20, target.minTime + start.timeDiff);
  const totalMax = Math.max(30, target.maxTime + start.timeDiff);

  // Car calculation
  const carMinPrice = Math.round((totalKm * 9.5) / 10) * 10;
  const carMaxPrice = Math.round((totalKm * 13) / 10) * 10;
  const carMinutes = Math.max(25, Math.round(totalMin * 0.9));

  // Bus calculation
  const busPrice = totalKm > 30 ? '15.000 – 30.000đ' : '10.000 – 20.000đ';
  const busMinutes = totalMax + 15;

  // Moto calculation
  const petrolCost = Math.round((totalKm / 40) * 24) * 1000;
  const motoMinutes = totalMin + 5;

  // Train calculation
  let trainAvailable = destination === 'bac_ninh_city' || destination === 'den_do';
  let trainTime = destination === 'den_do' ? '25 phút' : '45 phút';
  let trainNote = destination === 'den_do' ? 'Ga Long Biên → Ga Từ Sơn' : 'Ga Long Biên → Ga Bắc Ninh';
  let trainCost = destination === 'den_do' ? '30.000 – 45.000đ' : '40.000 – 70.000đ';

  if (!trainAvailable) {
    trainTime = `${totalMin + 20} phút`;
    trainNote = 'Tàu hỏa đến Ga Từ Sơn + Xe ôm ngắn';
    trainCost = '55.000 – 90.000đ';
  }

  return {
    dist: `${totalKm} km`,
    time: `${totalMin}–${totalMax} phút`,
    car: {
      time: `${carMinutes} phút`,
      cost: `${carMinPrice}k – ${carMaxPrice}k / chuyến`,
      desc: `Qua ${start.carWay}. Êm ái, mát mẻ và hoàn toàn riêng tư cho gia đình & đoàn bạn.`,
      route: start.carWay
    },
    bus: {
      time: `${busMinutes} phút`,
      cost: `${busPrice} / vé`,
      desc: `${start.busWay}. Phương án siêu tiết kiệm, tần suất đều đặn và an toàn tuyệt đối.`,
      route: start.busWay
    },
    moto: {
      time: `${motoMinutes} phút`,
      cost: `~${petrolCost.toLocaleString('vi-VN')}đ xăng`,
      desc: `Trải nghiệm qua ${start.motoWay}. Tự do ngắm cảnh đồng lúa chín và check-in ven sông.`,
      route: start.motoWay
    },
    train: {
      time: trainTime,
      cost: `${trainCost} / vé`,
      desc: `Chuyến tàu hoài niệm vintage qua ${trainNote}. Không lo tắc đường, ngắm cảnh bình yên.`,
      route: trainNote
    }
  };
}

// Badge map for transport types
const badgeMap = {
  'xe-khach-xe-buyt': { label: 'Tiết kiệm', color: '#2E7D32', bg: 'rgba(46,125,50,0.1)' },
  'o-to-ca-nhan': { label: 'Phổ biến', color: '#B8781B', bg: 'rgba(184,120,27,0.1)' },
  'xe-may': { label: 'Linh hoạt', color: '#C83228', bg: 'rgba(200,50,40,0.1)' },
  'taxi-cong-nghe': { label: 'Tiện lợi', color: '#1565C0', bg: 'rgba(21,101,192,0.1)' },
  'thue-xe-co-lai': { label: 'An nhàn', color: '#6A1B9A', bg: 'rgba(106,27,154,0.1)' },
  'xe-dien-noi-khu': { label: 'Sinh thái', color: '#2E7D32', bg: 'rgba(46,125,50,0.1)' },
  'thue-xe-may-dia-phuong': { label: 'Tự do', color: '#D97706', bg: 'rgba(217,119,6,0.1)' },
  'xe-dap-trai-nghiem': { label: 'Thư thái', color: '#059669', bg: 'rgba(5,150,105,0.1)' },
  'tau-hoa': { label: 'Hoài niệm', color: '#374151', bg: 'rgba(55,65,81,0.1)' }
};

export default function PhuongTienPage() {
  const [origin, setOrigin] = useState('hanoi_center');
  const [destination, setDestination] = useState('bac_ninh_city');
  const [filterMode, setFilterMode] = useState('all');
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [completedStops, setCompletedStops] = useState({ 1: true });
  const [isUpdating, setIsUpdating] = useState(false);
  const timelineRef = useRef(null);

  // Scroll effect for Todo List Timeline
  useEffect(() => {
    const handleScrollTimeline = () => {
      if (!timelineRef.current) return;
      const items = timelineRef.current.querySelectorAll('.timeline-step-item');
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const id = item.dataset.id;
        // As item scrolls into the viewport middle, mark as visited
        if (rect.top <= window.innerHeight * 0.7) {
          setCompletedStops((prev) => ({ ...prev, [id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScrollTimeline, { passive: true });
    handleScrollTimeline();
    return () => window.removeEventListener('scroll', handleScrollTimeline);
  }, []);

  // Dynamic route estimate calculation
  const route = calculateRoute(origin, destination);

  const handleOriginChange = (e) => {
    setOrigin(e.target.value);
    triggerPulse();
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    triggerPulse();
  };

  const triggerPulse = () => {
    setIsUpdating(true);
    setTimeout(() => setIsUpdating(false), 300);
  };

  const toggleStop = (id) => {
    setCompletedStops(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter transports based on modes
  const filteredTransports = transportTypes.filter((item) => {
    if (filterMode === 'all') return true;
    if (filterMode === 'ngoai-tinh') return ['xe-khach-xe-buyt', 'o-to-ca-nhan', 'xe-may', 'thue-xe-co-lai', 'tau-hoa'].includes(item.slug);
    if (filterMode === 'noi-do') return ['taxi-cong-nghe', 'thue-xe-may-dia-phuong', 'xe-dien-noi-khu', 'xe-dap-trai-nghiem'].includes(item.slug);
    if (filterMode === 'gia-dinh') return ['o-to-ca-nhan', 'thue-xe-co-lai', 'taxi-cong-nghe', 'xe-dien-noi-khu'].includes(item.slug);
    return true;
  });

  // Close side panel on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setSelectedTransport(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="transport-page">
      {/* PARALLAX HERO */}
      <ParallaxHero
        image={pageHeroes.phuongTien.image}
        imageAlt={pageHeroes.phuongTien.imageAlt}
        badge={pageHeroes.phuongTien.badge}
        title={pageHeroes.phuongTien.title}
        description={pageHeroes.phuongTien.desc}
        cutoutText="Di Chuyển"
      />

      {/* BREADCRUMB */}
      <Breadcrumb items={[{ label: 'Phương tiện di chuyển' }]} />

      {/* 1. ROUTE ESTIMATOR */}
      <section className="estimator-section">
        <div className="container">
          <div className="estimator-box">
            <div className="estimator-header">
              <div className="estimator-title">
                <Compass size={22} color="#C83228" />
                <span>Ước Tính & So Sánh Lộ Trình Nhanh</span>
              </div>
              <span className={`estimator-dist-badge ${isUpdating ? 'pulse-update' : ''}`}>
                Khoảng cách: ~{route.dist} • Thời gian: {route.time}
              </span>
            </div>

            <div className="estimator-inputs">
              <div className="input-group">
                <label className="input-label">ĐIỂM XUẤT PHÁT (HÀ NỘI)</label>
                <select className="select-styled" value={origin} onChange={handleOriginChange}>
                  <option value="hanoi_center">Hà Nội (Hồ Gươm / Phố Cổ)</option>
                  <option value="my_dinh">Bến xe Mỹ Đình (Cầu Giấy)</option>
                  <option value="long_bien">Bến xe Long Biên (Ba Đình)</option>
                  <option value="noi_bai">Sân bay Nội Bài (Sóc Sơn)</option>
                  <option value="giap_bat">Bến xe Giáp Bát (Hoàng Mai)</option>
                </select>
              </div>
              
              <div className="swap-arrow"><ArrowRight size={20} /></div>

              <div className="input-group">
                <label className="input-label">ĐIỂM ĐẾN TẠI BẮC NINH</label>
                <select className="select-styled" value={destination} onChange={handleDestinationChange}>
                  <option value="bac_ninh_city">TP. Bắc Ninh (Trung tâm ẩm thực & văn hóa)</option>
                  <option value="den_do">Đền Đô (TP. Từ Sơn)</option>
                  <option value="chua_phat_tich">Chùa Phật Tích (Tiên Du)</option>
                  <option value="lang_dong_ho">Làng Tranh Đông Hồ (Thuận Thành)</option>
                  <option value="chua_but_thap">Chùa Bút Tháp (Thuận Thành)</option>
                  <option value="gom_phu_lang">Làng Gốm Phù Lãng (Quế Võ)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <div style={{
                  padding: '12px 18px',
                  borderRadius: '10px',
                  background: '#6B3A2A',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(107, 58, 42, 0.2)'
                }}>
                  <Check size={16} /> Đã đồng bộ kết quả
                </div>
              </div>
            </div>

            {/* 4 COMPARE CARDS — Dynamically updating */}
            <div className={`compare-grid ${isUpdating ? 'pulse-update' : ''}`}>
              {/* CARD 1: CAR / TAXI */}
              <div className="compare-card recommended">
                <span className="badge-recommend" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Zap size={12} style={{ marginRight: '4px' }} /> Nhanh nhất
                </span>
                <div className="comp-top">
                  <span className="comp-icon"><Car size={24} color="#C83228" /></span>
                  <span className="comp-time"><Clock size={13} /> {route.car.time}</span>
                </div>
                <h4 className="comp-name">Ô Tô / Taxi Cao Tốc</h4>
                <div className="comp-cost">{route.car.cost}</div>
                <p style={{ fontSize: '0.8125rem', color: '#7A6A5A', lineHeight: 1.5, margin: '8px 0', flexGrow: 1 }}>
                  {route.car.desc}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#9A8A7A', borderTop: '1px dashed rgba(107,58,42,0.15)', paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="#C83228" /> {route.car.route}
                </div>
              </div>

              {/* CARD 2: BUS */}
              <div className="compare-card">
                <span className="badge-recommend" style={{ background: '#2E7D32', display: 'inline-flex', alignItems: 'center' }}>
                  <Coins size={12} style={{ marginRight: '4px' }} /> Tiết kiệm nhất
                </span>
                <div className="comp-top">
                  <span className="comp-icon"><Bus size={24} color="#2E7D32" /></span>
                  <span className="comp-time"><Clock size={13} /> {route.bus.time}</span>
                </div>
                <h4 className="comp-name">Xe Buýt Công Cộng</h4>
                <div className="comp-cost">{route.bus.cost}</div>
                <p style={{ fontSize: '0.8125rem', color: '#7A6A5A', lineHeight: 1.5, margin: '8px 0', flexGrow: 1 }}>
                  {route.bus.desc}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#9A8A7A', borderTop: '1px dashed rgba(107,58,42,0.15)', paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="#2E7D32" /> {route.bus.route}
                </div>
              </div>

              {/* CARD 3: MOTORBIKE */}
              <div className="compare-card">
                <div className="comp-top">
                  <span className="comp-icon"><Bike size={24} color="#B8781B" /></span>
                  <span className="comp-time"><Clock size={13} /> {route.moto.time}</span>
                </div>
                <h4 className="comp-name">Xe Máy Sông Đuống</h4>
                <div className="comp-cost">{route.moto.cost}</div>
                <p style={{ fontSize: '0.8125rem', color: '#7A6A5A', lineHeight: 1.5, margin: '8px 0', flexGrow: 1 }}>
                  {route.moto.desc}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#9A8A7A', borderTop: '1px dashed rgba(107,58,42,0.15)', paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="#B8781B" /> {route.moto.route}
                </div>
              </div>

              {/* CARD 4: TRAIN */}
              <div className="compare-card">
                <div className="comp-top">
                  <span className="comp-icon"><Train size={24} color="#1B3322" /></span>
                  <span className="comp-time"><Clock size={13} /> {route.train.time}</span>
                </div>
                <h4 className="comp-name">Tàu Hỏa Hoài Niệm</h4>
                <div className="comp-cost">{route.train.cost}</div>
                <p style={{ fontSize: '0.8125rem', color: '#7A6A5A', lineHeight: 1.5, margin: '8px 0', flexGrow: 1 }}>
                  {route.train.desc}
                </p>
                <div style={{ fontSize: '0.75rem', color: '#9A8A7A', borderTop: '1px dashed rgba(107,58,42,0.15)', paddingTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={12} color="#1B3322" /> {route.train.route}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK-DIAL HOTLINE */}
      <section className="quickdial-section">
        <div className="container">
          <div className="quickdial-wrapper">
            <div className="quickdial-bar">
              <div className="quickdial-title">
                <PhoneCall size={18} color="#C83228" />
                <span>Gọi nhanh Taxi & Xe máy địa phương</span>
              </div>
            </div>
            <div className="quickdial-grid">
              <div className="dial-card">
                <div className="dial-info">
                  <strong><Car size={14} color="#C83228" /> Taxi Mai Linh</strong>
                  <span>4–7 chỗ toàn tỉnh</span>
                </div>
                <a href="tel:02223895895" className="btn-dial"><Phone size={14} /> 0222.389.5895</a>
              </div>
              <div className="dial-card">
                <div className="dial-info">
                  <strong><Car size={14} color="#C83228" /> Taxi Sao Mai</strong>
                  <span>Giá niêm yết rõ ràng</span>
                </div>
                <a href="tel:02223875875" className="btn-dial"><Phone size={14} /> 0222.387.5875</a>
              </div>
              <div className="dial-card">
                <div className="dial-info">
                  <strong><Bike size={14} color="#B8781B" /> Thuê xe máy</strong>
                  <span>Giao tận Ga & Bến</span>
                </div>
                <a href="tel:0986543210" className="btn-dial"><Phone size={14} /> 0986.543.210</a>
              </div>
              <div className="dial-card">
                <div className="dial-info">
                  <strong><Smartphone size={14} color="#2E7D32" /> App gọi xe</strong>
                  <span>Grab, Xanh SM, Be</span>
                </div>
                <span className="btn-dial" style={{ cursor: 'default' }}><Zap size={14} /> Mở App</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FILTER BAR — Auto-apply, clean moderate radius, breathable gap */}
      <section style={{ padding: '24px 0 12px' }}>
        <div className="container">
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '14px 20px',
            border: '1px solid rgba(107, 58, 42, 0.08)',
            boxShadow: '0 4px 16px rgba(74, 37, 24, 0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '24px'
          }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#3A2A1A', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={16} color="#C83228" /> Chọn nhu cầu di chuyển:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { key: 'all', label: 'Tất cả', count: transportTypes.length },
                { key: 'ngoai-tinh', label: 'Chặng Ngoại Tỉnh (HN → BN)', count: 5 },
                { key: 'noi-do', label: 'Di Chuyển Nội Đô & Làng Nghề', count: 4 },
                { key: 'gia-dinh', label: 'Gia Đình & Đoàn Đông', count: 4 },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setFilterMode(m.key)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: filterMode === m.key ? '1.5px solid #C83228' : '1px solid rgba(107,58,42,0.12)',
                    background: filterMode === m.key ? '#C83228' : '#FAF7F2',
                    color: filterMode === m.key ? '#FFFFFF' : '#55443B',
                    fontWeight: filterMode === m.key ? 700 : 500,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{m.label}</span>
                  <span style={{
                    background: filterMode === m.key ? 'rgba(255,255,255,0.25)' : 'rgba(107,58,42,0.08)',
                    padding: '1px 6px',
                    borderRadius: '50px',
                    fontSize: '0.75rem',
                  }}>
                    {m.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRANSPORT CARDS — OPTIMIZED CARD ARCHITECTURE */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="trans-grid">
            {filteredTransports.map((item) => {
              const badge = badgeMap[item.slug];
              return (
                <div key={item.id} className="trans-card">
                  {/* 1. Header Card: Icon (left) + Badge (right) */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: '#FAF7F2',
                      border: '1px solid rgba(107, 58, 42, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {item.icon}
                    </div>
                    {badge && (
                      <span style={{
                        background: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.color}33`,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        letterSpacing: '0.3px',
                      }}>
                        {badge.label}
                      </span>
                    )}
                  </div>

                  {/* 2. Tên phương tiện (H3): Sans-serif Inter đậm, 18-20px */}
                  <h3 style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: '#2A120B',
                    lineHeight: 1.35,
                    marginBottom: '6px'
                  }}>
                    {item.name}
                  </h3>

                  {/* 3. Giá tiền (Price Tag): Nổi bật dưới tên, chuẩn WCAG */}
                  <div style={{
                    background: 'rgba(200, 50, 40, 0.06)',
                    border: '1px solid rgba(200, 50, 40, 0.15)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    display: 'inline-block',
                    marginBottom: '10px',
                    width: 'fit-content'
                  }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#C83228' }}>
                      {item.priceRange.split('(')[0].trim()}
                    </span>
                  </div>

                  {/* 4. Mô tả ngắn: Giới hạn 2 dòng text */}
                  <p style={{
                    fontSize: '0.8125rem',
                    color: '#7A6A5A',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginBottom: '12px',
                    minHeight: '38px'
                  }}>
                    {item.summary}
                  </p>

                  {/* 5. Highlights: Dạng Bullet list với icon checkmark ✓ xanh lục bảo */}
                  {item.pros && (
                    <div style={{ marginBottom: '14px', flexGrow: 1 }}>
                      {item.pros.slice(0, 2).map((p, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '5px' }}>
                          <Check size={14} color="#059669" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ fontSize: '0.75rem', color: '#4A3B32', lineHeight: 1.4, fontWeight: 500 }}>
                            {p}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 6. Footer Card: Tag phân loại bên trái, Nút Ghost CTA bên phải */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(107,58,42,0.06)',
                    marginTop: 'auto',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '0.75rem', color: '#9A8A7A', fontWeight: 500 }}>
                      {item.category}
                    </span>
                    <button
                      onClick={() => setSelectedTransport(item)}
                      className="btn-ghost-cta"
                    >
                      Xem chi tiết & lời khuyên →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ITINERARY TIMELINE — TODO LIST SCROLL EFFECT */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="tag-badge">Lịch Trình Tối Ưu</span>
            <h2 className="section-title">Lộ Trình Du Lịch Mẫu (Checklist Trải Nghiệm)</h2>
            <p className="section-desc">Bấm vào từng chặng để đánh dấu hoàn thành như danh sách Todo List hành trình</p>
          </div>

          <div ref={timelineRef} style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
            {/* Timeline vertical bar */}
            <div style={{
              position: 'absolute',
              left: '23px',
              top: '10px',
              bottom: '20px',
              width: '2px',
              background: 'linear-gradient(180deg, #059669 0%, #C83228 50%, rgba(200,50,40,0.1) 100%)',
            }} />

            {itineraries.map((itin, idx) => {
              const isDone = !!completedStops[itin.id];
              return (
                <div 
                  key={itin.id} 
                  data-id={itin.id}
                  className="timeline-step-item"
                  onClick={() => toggleStop(itin.id)}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '24px',
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                >
                  {/* Timeline interactive checkbox dot */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: isDone ? '#059669' : '#FFFFFF',
                    border: isDone ? '2px solid #059669' : '2px solid #C83228',
                    color: isDone ? '#FFFFFF' : '#C83228',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '1.15rem',
                    zIndex: 2,
                    boxShadow: isDone ? '0 4px 12px rgba(5,150,105,0.3)' : '0 2px 8px rgba(200,50,40,0.15)',
                    transition: 'all 0.25s ease'
                  }}>
                    {isDone ? <Check size={20} strokeWidth={3} /> : itin.icon}
                  </div>

                  {/* Content card */}
                  <div style={{
                    flex: 1,
                    background: isDone ? '#F4FBF7' : '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    border: isDone ? '1px solid rgba(5,150,105,0.25)' : '1px solid rgba(107,58,42,0.08)',
                    boxShadow: '0 2px 8px rgba(74,37,24,0.04)',
                    transition: 'all 0.25s ease'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{
                          fontSize: '0.96rem',
                          fontWeight: 700,
                          color: isDone ? '#059669' : 'var(--color-primary-dark)',
                          textDecoration: isDone ? 'none' : 'none'
                        }}>
                          {itin.title}
                        </h4>
                        {isDone && (
                          <span style={{ fontSize: '0.7rem', color: '#059669', background: 'rgba(5,150,105,0.1)', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                            ✓ Đã hoàn thành
                          </span>
                        )}
                      </div>
                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        color: '#C83228',
                        background: 'rgba(200,50,40,0.08)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                      }}>
                        {itin.target}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: '#7A6A5A', lineHeight: 1.5, marginBottom: '6px' }}>
                      {itin.route}
                    </p>
                    <div style={{ fontSize: '0.75rem', color: '#B8781B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={13} /> {itin.highlight}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SAFETY — BENTO GRID */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="tag-badge">Bảo Vệ Hành Trình</span>
            <h2 className="section-title">Cẩm Nang Di Chuyển An Toàn</h2>
            <p className="section-desc">Các nguyên tắc vàng giúp hành trình du lịch Kinh Bắc luôn trọn vẹn và an tâm</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            maxWidth: '960px',
            margin: '0 auto',
          }}>
            {/* Bento Hero 1 */}
            <div style={{
              gridColumn: 'span 2',
              background: 'linear-gradient(135deg, #2A120B 0%, #4A2518 100%)',
              color: '#FFFFFF',
              borderRadius: '16px',
              padding: '26px 28px',
              boxShadow: '0 8px 24px rgba(74,37,24,0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ color: '#D4A853', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={28} />
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#D4A853', fontWeight: 700 }}>
                  Ưu tiên số 1 • Khuyến cáo chính thức
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#FFFFFF' }}>
                {safetyRules[0].title}
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                {safetyRules[0].desc}
              </p>
            </div>

            {/* Bento Hero 2 */}
            <div style={{
              gridColumn: 'span 1',
              background: '#FFFFFF',
              color: '#3A2A1A',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(107,58,42,0.1)',
              boxShadow: '0 4px 16px rgba(74,37,24,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ color: '#C83228' }}><AlertTriangle size={24} /></div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {safetyRules[1].title}
              </h4>
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, color: '#7A6A5A' }}>
                {safetyRules[1].desc}
              </p>
            </div>

            {/* Bento Medium Cards 3, 4, 5 */}
            {safetyRules.slice(2).map((rule, idx) => {
              const icons = [<HardHat key="h" size={22} />, <CreditCard key="c" size={22} />, <Wifi key="w" size={22} />];
              return (
                <div key={idx} style={{
                  gridColumn: 'span 1',
                  background: '#FFFFFF',
                  color: '#3A2A1A',
                  borderRadius: '16px',
                  padding: '22px 20px',
                  border: '1px solid rgba(107,58,42,0.08)',
                  boxShadow: '0 4px 16px rgba(74,37,24,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ color: '#B8781B' }}>{icons[idx]}</div>
                  <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                    {rule.title}
                  </h4>
                  <p style={{ fontSize: '0.8125rem', lineHeight: 1.5, color: '#7A6A5A' }}>
                    {rule.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. SIDE PANEL POPOVER (Drawer on desktop, Bottom-sheet popup menu on mobile) */}
      {selectedTransport && (
        <>
          {/* Overlay backdrop */}
          <div
            onClick={() => setSelectedTransport(null)}
            className="popover-overlay"
          />
          {/* Popover sheet */}
          <div className="transport-popover">
            {/* Mobile handle bar */}
            <div className="mobile-handle-bar" />

            {/* Panel header */}
            <div className="popover-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.75rem' }}>{selectedTransport.icon}</span>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary-dark)', margin: 0 }}>
                    {selectedTransport.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#9A8A7A', fontWeight: 500 }}>
                    {selectedTransport.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTransport(null)}
                style={{
                  background: 'rgba(107, 58, 42, 0.08)',
                  border: 'none',
                  cursor: 'pointer',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  color: '#55443B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
            </div>

            {/* Panel scrollable content */}
            <div style={{ padding: '20px 24px', flex: 1, overflowY: 'auto' }}>
              {/* Price Tag */}
              <div style={{
                background: 'rgba(200,50,40,0.06)',
                border: '1px solid rgba(200,50,40,0.15)',
                padding: '12px 16px',
                borderRadius: '10px',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <Coins size={18} color="#C83228" />
                <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#C83228' }}>
                  {selectedTransport.priceRange}
                </span>
              </div>

              {/* Suitable for */}
              {selectedTransport.suitableFor && (
                <div style={{ marginBottom: '18px' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#3A2A1A', marginBottom: '6px' }}>
                    Phù hợp cho
                  </h4>
                  <p style={{ fontSize: '0.8125rem', color: '#55443B', lineHeight: 1.5 }}>
                    {selectedTransport.suitableFor}
                  </p>
                </div>
              )}

              {/* Details */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#3A2A1A', marginBottom: '6px' }}>
                  Chi tiết lộ trình
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#55443B', lineHeight: 1.6 }}>
                  {selectedTransport.details}
                </p>
              </div>

              {/* Pros */}
              <div style={{ marginBottom: '18px' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#3A2A1A', marginBottom: '6px' }}>
                  Ưu điểm nổi bật
                </h4>
                {selectedTransport.pros?.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                    <Check size={14} color="#059669" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.8125rem', color: '#55443B', lineHeight: 1.5 }}>{p}</span>
                  </div>
                ))}
              </div>

              {/* Cons */}
              {selectedTransport.cons && (
                <div style={{ marginBottom: '18px' }}>
                  <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#3A2A1A', marginBottom: '6px' }}>
                    Lưu ý & Nhược điểm
                  </h4>
                  {selectedTransport.cons.map((c, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                      <AlertTriangle size={13} color="#B8781B" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.8125rem', color: '#55443B', lineHeight: 1.5 }}>{c}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tips */}
              {selectedTransport.tips && (
                <div style={{
                  background: 'rgba(212,168,83,0.1)',
                  border: '1px solid rgba(212,168,83,0.25)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <Sparkles size={14} color="#B8781B" />
                    <strong style={{ fontSize: '0.8125rem', color: '#B8781B' }}>Lời khuyên từ thổ địa</strong>
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: '#55443B', lineHeight: 1.5, margin: 0 }}>
                    {selectedTransport.tips}
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .pulse-update {
          animation: pulseHighlight 0.3s ease-out;
        }
        @keyframes pulseHighlight {
          0% { transform: scale(0.99); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        .btn-ghost-cta {
          background: none;
          border: 1px solid rgba(200, 50, 40, 0.25);
          color: #C83228;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .btn-ghost-cta:hover {
          background: #C83228;
          color: #FFFFFF;
          border-color: #C83228;
        }
        .popover-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 9998;
          animation: fadeIn 0.2s ease;
          backdrop-filter: blur(2px);
        }
        .transport-popover {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 440px;
          max-width: 90vw;
          background: #FFFBF5;
          z-index: 9999;
          overflow-y: auto;
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.2);
          animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .popover-header {
          padding: 84px 24px 18px 24px;
          border-bottom: 1px solid rgba(107, 58, 42, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background: #FFFBF5;
          z-index: 2;
        }
        .mobile-handle-bar {
          display: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideUpBottom {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .transport-popover {
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            max-width: 100%;
            max-height: 82vh;
            border-radius: 20px 20px 0 0;
            animation: slideUpBottom 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 -10px 40px rgba(0,0,0,0.25);
          }
          .popover-header {
            padding: 16px 20px 14px 20px;
          }
          .mobile-handle-bar {
            display: block;
            width: 36px;
            height: 4px;
            border-radius: 2px;
            background: rgba(107, 58, 42, 0.2);
            margin: 10px auto 2px;
          }
        }
      `}</style>
    </div>
  );
}
