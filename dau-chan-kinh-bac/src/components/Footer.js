import Link from 'next/link';
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon, TiktokIcon } from './Icons';
import { siteContent } from '@/data/content';
import styles from './Footer.module.css';

const { footer: content, header: headerContent } = siteContent;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* BRAND COLUMN */}
        <div className={styles.brandCol}>
          <div className={styles.logoRow}>
            <div className={styles.logoCircle}>
              <Sparkles size={20} color="#FAF7F2" />
            </div>
            <div>
              <div className={styles.logoTitleRow}>
                <span className={styles.calligraphy}>{headerContent.logoCalligraphy}</span>
                <span className={styles.brandMain}>{headerContent.logoMain}</span>
                <span className={styles.redBadge}>{headerContent.redStamp}</span>
              </div>
              <span className={styles.tagline}>{headerContent.tagline}</span>
            </div>
          </div>
          <p className={styles.desc}>
            {content.brand.desc}
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>{content.quickLinks.title}</h4>
          <ul className={styles.linkList}>
            {content.quickLinks.links.map((link) => (
              <li key={link.href + link.label}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* USEFUL INFO */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>{content.usefulInfo.title}</h4>
          <ul className={styles.linkList}>
            {content.usefulInfo.links.map((link, idx) => (
              <li key={idx}><Link href={link.href}>{link.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* CONTACT & SOCIAL */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>{content.contact.title}</h4>
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <FacebookIcon size={16} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <InstagramIcon size={16} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="YouTube">
              <YoutubeIcon size={16} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="TikTok">
              <TiktokIcon size={16} />
            </a>
          </div>

          <div className={styles.contactItem}>
            <Phone size={16} style={{ color: '#D4A853', flexShrink: 0 }} />
            <span><strong>Hotline:</strong> {content.contact.hotline}</span>
          </div>
          <div className={styles.contactItem}>
            <Mail size={16} style={{ color: '#D4A853', flexShrink: 0 }} />
            <span><strong>Email:</strong> {content.contact.email}</span>
          </div>
          <div className={styles.contactItem}>
            <MapPin size={16} style={{ color: '#D4A853', flexShrink: 0 }} />
            <span><strong>Địa chỉ:</strong> {content.contact.address}</span>
          </div>
        </div>
      </div>

      <div className={styles.copyrightBar}>
        <div className={styles.innerBar}>
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
