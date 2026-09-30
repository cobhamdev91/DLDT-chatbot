

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav style={{
      padding: '12px 0',
      borderBottom: '1px solid rgba(107, 58, 42, 0.04)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.8125rem',
        color: '#9A8A7A',
        flexWrap: 'wrap',
      }}>
        <Link href="/" style={{ color: '#9A8A7A', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Home size={13} /> Trang chủ
        </Link>
        {items.map((item, idx) => (
          <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ChevronRight size={12} />
            {item.href ? (
              <Link href={item.href} style={{ color: '#9A8A7A', textDecoration: 'none' }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: '#3A2A1A', fontWeight: 600 }}>{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
