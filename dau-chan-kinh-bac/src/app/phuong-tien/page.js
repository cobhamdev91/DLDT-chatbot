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
  CalendarCheck,
  ChevronDown,
  Backpack,
  Users,
  TreePine,
  Camera
} from 'lucide-react';
import { transportTypes, itineraries, safetyRules } from '@/data/transport';
import ParallaxHero from '@/components/ParallaxHero';
import Breadcrumb from '@/components/Breadcrumb';
import { siteContent } from '@/data/content';

const { pageHeroes } = siteContent;

// Icon mappings for Lucide SVG icons (replaces character/emoji icons)
const itineraryIcons = {
  1: Backpack,
  2: Users,
  3: Bike,
  4: TreePine,
  5: Camera,
};

const transportIconMap = {
  'xe-khach-xe-buyt': Bus,
  'o-to-ca-nhan': Car,
  'xe-may': Bike,
  'taxi-cong-nghe': Smartphone,
  'thue-xe-co-lai': Users,
  'xe-dien-noi-khu': Zap,
  'tau-hoa': Train,
  'thue-xe-may-dia-phuong': Bike,
  'xe-dap-trai-nghiem': Compass,
};

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
  const [completedStops, setCompletedStops] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const timelineRef = useRef(null);

  // Scroll effect for Todo List Timeline (Auto-Check when scrolling down, Undo when scrolling back up)
  useEffect(() => {
    let ticking = false;

    const handleScrollTimeline = () => {
      if (!timelineRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!timelineRef.current) {
            ticking = false;
            return;
          }
          const items = timelineRef.current.querySelectorAll('.timeline-step-item');
          const windowHeight = window.innerHeight;
          // Check threshold: when item enters above 70% of viewport
          const checkThreshold = windowHeight * 0.70;
          // Undo threshold: when item scrolls back down past 76% of viewport (hysteresis prevents flicker)
          const undoThreshold = windowHeight * 0.76;

          setCompletedStops((prev) => {
            let changed = false;
            const next = { ...prev };
            items.forEach((item) => {
              const rect = item.getBoundingClientRect();
              const id = item.dataset.id;
              if (rect.top <= checkThreshold) {
                // Scrolled past or into active view -> Check
                if (!next[id]) {
                  next[id] = true;
                  changed = true;
                }
              } else if (rect.top > undoThreshold) {
                // Scrolled back up so item moves down past undo threshold -> Undo
                if (next[id]) {
                  delete next[id];
                  changed = true;
                }
              }
            });
            return changed ? next : prev;
          });
          ticking = false;
        });
        ticking = true;
      }
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
    setCompletedStops(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
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

  const [expandedRow, setExpandedRow] = useState(null);

  const toggleExpandRow = (key) => {
    setExpandedRow(prev => prev === key ? null : key);
  };

  const handleOpenTransportModal = (slug) => {
    const item = transportTypes.find(t => t.slug === slug);
    if (item) setSelectedTransport(item);
  };

  const transportRows = [
    {
      key: 'car',
      name: 'Ô Tô / Taxi Cao Tốc',
      slug: 'o-to-ca-nhan',
      icon: Car,
      iconColor: '#C83228',
      iconBg: 'rgba(200, 50, 40, 0.08)',
      badge: 'Nhanh nhất',
      badgeClass: 'badge-fastest',
      time: route.car.time,
      cost: route.car.cost,
      desc: route.car.desc,
      route: route.car.route,
      tag: 'Phù hợp gia đình & đoàn bạn'
    },
    {
      key: 'bus',
      name: 'Xe Buýt Công Cộng',
      slug: 'xe-khach-xe-buyt',
      icon: Bus,
      iconColor: '#2E7D32',
      iconBg: 'rgba(46, 125, 50, 0.08)',
      badge: 'Tiết kiệm nhất',
      badgeClass: 'badge-cheapest',
      time: route.bus.time,
      cost: route.bus.cost,
      desc: route.bus.desc,
      route: route.bus.route,
      tag: 'Tần suất 15–20 phút/chuyến'
    },
    {
      key: 'moto',
      name: 'Xe Máy Sông Đuống',
      slug: 'xe-may',
      icon: Bike,
      iconColor: '#C4873A',
      iconBg: 'rgba(196, 135, 58, 0.08)',
      badge: 'Phượt tự do',
      badgeClass: 'badge-scenic',
      time: route.moto.time,
      cost: route.moto.cost,
      desc: route.moto.desc,
      route: route.moto.route,
      tag: 'Đường đê xanh mát check-in'
    },
    {
      key: 'train',
      name: 'Tàu Hỏa Hoài Niệm',
      slug: 'tau-hoa',
      icon: Train,
      iconColor: '#1B3322',
      iconBg: 'rgba(27, 51, 34, 0.08)',
      badge: 'Trải nghiệm xưa',
      badgeClass: 'badge-vintage',
      time: route.train.time,
      cost: route.train.cost,
      desc: route.train.desc,
      route: route.train.route,
      tag: 'Vintage ngắm cảnh không tắc đường'
    }
  ];

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

      {/* 1. ROUTE ESTIMATOR — ROME2RIO / GOOGLE MAPS LIST ROW STYLE */}
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

            {/* MODERN DUAL-INPUT ROUTE CAPSULE (REMOVED REDUNDANT BUTTON) */}
            <div className="estimator-inputs-modern">
              <div className="input-group-modern">
                <label className="input-label-modern">
                  <MapPin size={15} color="#C83228" />
                  <span>ĐIỂM XUẤT PHÁT (HÀ NỘI)</span>
                </label>
                <select className="select-modern" value={origin} onChange={handleOriginChange}>
                  <option value="hanoi_center">Hà Nội (Hồ Gươm / Phố Cổ)</option>
                  <option value="my_dinh">Bến xe Mỹ Đình (Cầu Giấy)</option>
                  <option value="long_bien">Bến xe Long Biên (Ba Đình)</option>
                  <option value="noi_bai">Sân bay Nội Bài (Sóc Sơn)</option>
                  <option value="giap_bat">Bến xe Giáp Bát (Hoàng Mai)</option>
                </select>
              </div>
              
              <div className="swap-arrow-modern">
                <ArrowRight size={20} />
              </div>

              <div className="input-group-modern">
                <label className="input-label-modern">
                  <Compass size={15} color="#D4A853" />
                  <span>ĐIỂM ĐẾN TẠI BẮC NINH</span>
                </label>
                <select className="select-modern" value={destination} onChange={handleDestinationChange}>
                  <option value="bac_ninh_city">TP. Bắc Ninh (Trung tâm ẩm thực & văn hóa)</option>
                  <option value="den_do">Đền Đô (TP. Từ Sơn)</option>
                  <option value="chua_phat_tich">Chùa Phật Tích (Tiên Du)</option>
                  <option value="lang_dong_ho">Làng Tranh Đông Hồ (Thuận Thành)</option>
                  <option value="chua_but_thap">Chùa Bút Tháp (Thuận Thành)</option>
                  <option value="gom_phu_lang">Làng Gốm Phù Lãng (Quế Võ)</option>
                </select>
              </div>
            </div>

            {/* ROME2RIO / GOOGLE MAPS HORIZONTAL LIST ROWS */}
            <div className={`route-list-container ${isUpdating ? 'pulse-update' : ''}`}>
              {transportRows.map((item) => {
                const isExpanded = expandedRow === item.key;
                return (
                  <div 
                    key={item.key} 
                    className={`route-row-card ${isExpanded ? 'is-expanded' : ''} ${item.key === 'car' ? 'is-recommended' : ''}`}
                  >
                    <div className="route-row-main" onClick={() => toggleExpandRow(item.key)}>
                      {/* Column 1: Mode & Badges */}
                      <div className="route-col-mode">
                        <div className="route-mode-icon-box" style={{ background: item.iconBg, color: item.iconColor }}>
                          <item.icon size={26} />
                        </div>
                        <div className="route-mode-meta">
                          <div className="route-mode-title">{item.name}</div>
                          <div className="route-mode-tags">
                            <span className={`route-badge ${item.badgeClass}`}>
                              {item.badge}
                            </span>
                            <span className="route-sub-tag">{item.tag}</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Journey & Path */}
                      <div className="route-col-journey">
                        <div className="route-time-highlight">
                          <Clock size={16} />
                          <span>{item.time}</span>
                        </div>
                        <div className="route-path-summary" title={item.route}>
                          <MapPin size={13} color="#C83228" />
                          <span>{item.route}</span>
                        </div>
                      </div>

                      {/* Column 3: Fare */}
                      <div className="route-col-fare">
                        <div className="route-fare-amount">{item.cost}</div>
                        <div className="route-fare-note">Ước tính trọn chuyến</div>
                      </div>

                      {/* Column 4: Actions */}
                      <div className="route-col-cta" onClick={(e) => e.stopPropagation()}>
                        <button 
                          className="btn-route-action"
                          onClick={() => handleOpenTransportModal(item.slug)}
                        >
                          <span>Chi tiết</span>
                          <ArrowRight size={14} />
                        </button>
                        <button 
                          className={`btn-route-toggle ${isExpanded ? 'open' : ''}`}
                          onClick={() => toggleExpandRow(item.key)}
                          aria-label="Xem thêm thông tin lộ trình"
                        >
                          <ChevronDown size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Accordion Drawer */}
                    {isExpanded && (
                      <div className="route-accordion-drawer">
                        <div className="route-drawer-content">
                          <div className="drawer-item">
                            <strong>Trải nghiệm thực tế:</strong>
                            <p>{item.desc}</p>
                          </div>
                          <div className="drawer-item">
                            <strong>Lời khuyên di chuyển:</strong>
                            <p>
                              {item.key === 'car' && 'Nên đi theo hướng Cầu Thanh Trì hoặc Cầu Chương Dương để nhập làn cao tốc QL1A Mới. Chuẩn bị sẵn tài khoản ETC không dừng.'}
                              {item.key === 'bus' && 'Bến xe Long Biên là điểm đầu tuyến buýt 54. Bạn có thể thanh toán vé lượt trực tiếp hoặc quẹt thẻ buýt VinBus nếu đi các tuyến trung chuyển.'}
                              {item.key === 'moto' && 'Đoạn đường đê sông Đuống thoáng mát, ít xe tải lớn, phong cảnh hữu tình phù hợp dừng chân chụp ảnh đồng quê Kinh Bắc.'}
                              {item.key === 'train' && 'Tàu khởi hành từ Ga Long Biên (Hà Nội) dừng tại Ga Từ Sơn và Ga Bắc Ninh. Chuyến đi êm ái, phù hợp trải nghiệm văn hóa hoài niệm.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK-DIAL HOTLINE - VIP CONCIERGE 2-COLUMN GRID */}
      <section className="concierge-section" id="hotline-concierge">
        <div className="container">
          <div className="concierge-wrapper">
            <div className="concierge-header">
              <div className="concierge-header-left">
                <div className="concierge-header-icon">
                  <PhoneCall size={22} color="#C83228" />
                </div>
                <div>
                  <h3 className="concierge-header-title">Gọi Nhanh Taxi & Dịch Vụ Đưa Đón Địa Phương (24/7)</h3>
                  <p className="concierge-header-sub">Danh bạ uy tín, phục vụ 24/7, giá niêm yết rõ ràng và tài xế bản địa thông thạo đường</p>
                </div>
              </div>
              <span className="concierge-verified-badge">
                <Shield size={14} color="#2E7D32" /> Hotline Đã Xác Thực
              </span>
            </div>

            <div className="concierge-grid-2col">
              {/* Card 1: Taxi Mai Linh */}
              <div className="concierge-card-vip">
                <div className="concierge-icon-squircle" style={{ background: 'rgba(200, 50, 40, 0.08)', color: '#C83228' }}>
                  <Car size={24} />
                </div>
                <div className="concierge-details">
                  <div className="concierge-title-line">
                    <h4 className="concierge-brand-name">Taxi Mai Linh Bắc Ninh</h4>
                    <span className="concierge-status-pill online">24/7 Có Xe</span>
                  </div>
                  <p className="concierge-service-desc">Đội xe 4–7 chỗ đời mới • Đón nhanh toàn tỉnh & sân bay</p>
                  <div className="concierge-feature-pills">
                    <span className="concierge-pill"><Check size={11} strokeWidth={2.5} /> Đồng hồ chuẩn</span>
                    <span className="concierge-pill"><Check size={11} strokeWidth={2.5} /> Hóa đơn VAT</span>
                  </div>
                </div>
                <div className="concierge-call-box">
                  <a href="tel:02223895895" className="btn-concierge-hotline">
                    <Phone size={14} />
                    <span>0222.389.5895</span>
                  </a>
                </div>
              </div>

              {/* Card 2: Taxi Sao Mai */}
              <div className="concierge-card-vip">
                <div className="concierge-icon-squircle" style={{ background: 'rgba(184, 120, 27, 0.08)', color: '#B8781B' }}>
                  <Car size={24} />
                </div>
                <div className="concierge-details">
                  <div className="concierge-title-line">
                    <h4 className="concierge-brand-name">Taxi Sao Mai Bắc Ninh</h4>
                    <span className="concierge-status-pill gold">Tiết Kiệm</span>
                  </div>
                  <p className="concierge-service-desc">Hãng taxi uy tín lâu năm • Phủ sóng TP. Bắc Ninh & Từ Sơn</p>
                  <div className="concierge-feature-pills">
                    <span className="concierge-pill"><Check size={11} strokeWidth={2.5} /> Giá niêm yết</span>
                    <span className="concierge-pill"><Check size={11} strokeWidth={2.5} /> Tài xế bản địa</span>
                  </div>
                </div>
                <div className="concierge-call-box">
                  <a href="tel:02223875875" className="btn-concierge-hotline">
                    <Phone size={14} />
                    <span>0222.387.5875</span>
                  </a>
                </div>
              </div>

              {/* Card 3: Thuê xe máy */}
              <div className="concierge-card-vip">
                <div className="concierge-icon-squircle" style={{ background: 'rgba(196, 135, 58, 0.08)', color: '#C4873A' }}>
                  <Bike size={24} />
                </div>
                <div className="concierge-details">
                  <div className="concierge-title-line">
                    <h4 className="concierge-brand-name">Thuê Xe Máy Du Lịch</h4>
                    <span className="concierge-status-pill green">Giao Tận Nơi</span>
                  </div>
                  <p className="concierge-service-desc">Xe số & xe ga mới bảo dưỡng • Giao tại Ga Bắc Ninh & Khách sạn</p>
                  <div className="concierge-feature-pills">
                    <span className="concierge-pill"><Check size={11} strokeWidth={2.5} /> Kèm 2 mũ bảo hiểm</span>
                    <span className="concierge-pill"><Check size={11} strokeWidth={2.5} /> Hỗ trợ 24/7</span>
                  </div>
                </div>
                <div className="concierge-call-box">
                  <a href="tel:0986543210" className="btn-concierge-hotline">
                    <Phone size={14} />
                    <span>0986.543.210</span>
                  </a>
                </div>
              </div>

              {/* Card 4: App gọi xe */}
              <div className="concierge-card-vip">
                <div className="concierge-icon-squircle" style={{ background: 'rgba(21, 101, 192, 0.08)', color: '#1565C0' }}>
                  <Smartphone size={24} />
                </div>
                <div className="concierge-details">
                  <div className="concierge-title-line">
                    <h4 className="concierge-brand-name">App Gọi Xe Công Nghệ</h4>
                    <span className="concierge-status-pill blue">Grab • Xanh SM • Be</span>
                  </div>
                  <p className="concierge-service-desc">Đặt xe nhanh qua ứng dụng • Biết trước cước phí & lộ trình</p>
                  <div className="concierge-feature-pills">
                    <span className="concierge-pill"><Check size={11} strokeWidth={2.5} /> Xe máy & Ô tô</span>
                    <span className="concierge-pill"><Check size={11} strokeWidth={2.5} /> Không lo tiền lẻ</span>
                  </div>
                </div>
                <div className="concierge-call-box">
                  <button 
                    className="btn-concierge-app"
                    onClick={() => handleOpenTransportModal('taxi-cong-nghe')}
                  >
                    <Zap size={14} />
                    <span>Xem Hướng Dẫn</span>
                  </button>
                </div>
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
                    {(() => {
                      const TransportCardIcon = transportIconMap[item.slug] || Car;
                      return (
                        <div style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '10px',
                          background: '#FAF7F2',
                          border: '1px solid rgba(107, 58, 42, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#6B3A2A'
                        }}>
                          <TransportCardIcon size={22} strokeWidth={2.2} />
                        </div>
                      );
                    })()}
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

                  {/* 5. Highlights: Dạng Bullet list với icon Check SVG xanh lục bảo */}
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

      {/* 5. ITINERARY TIMELINE — TODO LIST SCROLL EFFECT WITH AUTO-CHECK & UNDO */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="tag-badge">Lịch Trình Tối Ưu</span>
            <h2 className="section-title">Lộ Trình Du Lịch Mẫu (Checklist Trải Nghiệm)</h2>
            <p className="section-desc">Cuộn xuống để tự động đánh dấu hoàn thành, cuộn ngược lại để hoàn tác (undo)</p>
            
            {/* Live Progress Pill */}
            {(() => {
              const doneCount = itineraries.filter(i => !!completedStops[i.id]).length;
              return (
                <div style={{ marginTop: '4px' }}>
                  <div className="timeline-progress-pill">
                    <span className="progress-dot-indicator" />
                    <span>Tiến độ hành trình: {doneCount}/{itineraries.length} chặng hoàn thành</span>
                  </div>
                </div>
              );
            })()}
          </div>

          <div ref={timelineRef} className="timeline-checklist-wrapper">
            {/* Base grey track */}
            <div className="timeline-track-base" />

            {/* Dynamic green progress line that fills on scroll down and retracts on scroll up */}
            {(() => {
              const doneCount = itineraries.filter(i => !!completedStops[i.id]).length;
              const pct = doneCount === 0 
                ? 0 
                : Math.min(100, Math.round(((doneCount - 1) / (itineraries.length - 1)) * 100));
              return (
                <div 
                  className="timeline-track-active" 
                  style={{ height: `${pct}%` }} 
                />
              );
            })()}

            {itineraries.map((itin) => {
              const isDone = !!completedStops[itin.id];
              return (
                <div 
                  key={itin.id} 
                  data-id={itin.id}
                  className={`timeline-step-item ${isDone ? 'is-done' : ''}`}
                  onClick={() => toggleStop(itin.id)}
                  title={isDone ? 'Bấm để hoàn tác (undo)' : 'Bấm để đánh dấu hoàn thành'}
                >
                  {/* Timeline interactive checkbox dot with icon morphing */}
                  {(() => {
                    const ItinIcon = itineraryIcons[itin.id] || Compass;
                    return (
                      <div className="timeline-dot">
                        <div className="timeline-icon-box">
                          <span className="timeline-icon-check">
                            <Check size={20} strokeWidth={3} />
                          </span>
                          <span className="timeline-icon-emoji">
                            <ItinIcon size={18} strokeWidth={2.2} />
                          </span>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Content card */}
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div className="timeline-card-title-line">
                        <h4 className="timeline-card-title">
                          {itin.title}
                        </h4>
                        <span className="timeline-badge-completed">
                          <Check size={12} strokeWidth={2.5} style={{ marginRight: '4px' }} /> Đã hoàn thành
                        </span>
                      </div>
                      <span className="timeline-badge-target">
                        {itin.target}
                      </span>
                    </div>
                    <p className="timeline-card-route">
                      {itin.route}
                    </p>
                    <div className="timeline-card-highlight">
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
              {(() => {
                const DrawerIcon = transportIconMap[selectedTransport.slug] || Car;
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: '#FAF7F2',
                      border: '1px solid rgba(107, 58, 42, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#6B3A2A',
                      flexShrink: 0
                    }}>
                      <DrawerIcon size={22} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary-dark)', margin: 0 }}>
                        {selectedTransport.name}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: '#9A8A7A', fontWeight: 500 }}>
                        {selectedTransport.category}
                      </span>
                    </div>
                  </div>
                );
              })()}
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
