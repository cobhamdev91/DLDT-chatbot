'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Utensils, Car, Bike, Hotel } from 'lucide-react';

export default function ItinerarySlideshow({ items = [] }) {
  if (items.length === 0) return null;

  // Always show exactly 3 items
  const displayItems = items.slice(0, 3);

  return (
    <div className="slideshow-container">
      {displayItems.map((item, idx) => (
        <div key={idx} className="slideshow-slide">
          <div className="itin-master-card">
            <div className="itin-img-box">
              <Image
                src={item.image}
                alt={item.imageAlt || item.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <span className="itin-badge-pill">{item.duration}</span>
            </div>
            <div className="itin-content-box">
              <h4 className="itin-card-title">{item.title}</h4>
              <p className="itin-card-sub">{item.subtitle}</p>
              <div className="itin-meta-bar">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} color="#C83228" /> {item.points}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {item.food === 'Lưu trú' ? <Hotel size={14} color="#B8781B" /> : <Utensils size={14} color="#B8781B" />}
                  {item.food}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {item.transport?.includes('Xe máy') ? <Bike size={14} color="#1B3322" /> : <Car size={14} color="#1B3322" />}
                  {item.transport}
                </span>
                <Link href="/phuong-tien" className="itin-detail-btn">
                  Chi tiết →
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
