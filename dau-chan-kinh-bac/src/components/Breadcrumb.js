import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav">
      <div className="container breadcrumb-container">
        <Link href="/" className="breadcrumb-link">
          <Home size={14} /> <span>Trang chủ</span>
        </Link>
        {items.map((item, idx) => (
          <span key={idx} className="breadcrumb-item">
            <ChevronRight size={13} className="breadcrumb-sep" />
            {item.href ? (
              <Link href={item.href} className="breadcrumb-link">
                {item.label}
              </Link>
            ) : (
              <span className="breadcrumb-current">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
