/**
 * @file components/shared/Icon/Icon.js
 * @description Bảng tra icon theo TÊN (chuỗi) → component lucide-react.
 * Cho phép tầng dữ liệu / logic thuần (data/*, builder view-model) chỉ lưu
 * tên icon dạng chuỗi, còn tầng UI mới quyết định render component nào.
 * Chỉ import tường minh các icon được dùng để giữ bundle nhỏ.
 */

import {
  ArrowRight,
  ArrowRightLeft,
  Backpack,
  Bed,
  Bike,
  BookOpen,
  Building,
  Bus,
  Camera,
  Car,
  CarFront,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  ClipboardList,
  Clock,
  Coffee,
  Coins,
  Compass,
  CreditCard,
  Flame,
  Gift,
  Hammer,
  HardHat,
  Heart,
  Home,
  Hotel,
  Info,
  Landmark,
  Leaf,
  Lightbulb,
  MapPin,
  Mic,
  Music,
  Navigation,
  Phone,
  PhoneCall,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Tag,
  Train,
  TreePine,
  TriangleAlert,
  Users,
  User,
  Utensils,
  Wifi,
  X,
  Zap,
} from 'lucide-react';

/**
 * Bảng tên → component. Thêm icon mới: import ở trên và khai báo tại đây.
 * @type {Readonly<Record<string, import('react').ElementType>>}
 */
export const ICONS = Object.freeze({
  ArrowRight,
  ArrowRightLeft,
  Backpack,
  Bed,
  Bike,
  BookOpen,
  Building,
  Bus,
  Camera,
  Car,
  CarFront,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  ClipboardList,
  Clock,
  Coffee,
  Coins,
  Compass,
  CreditCard,
  Flame,
  Gift,
  Hammer,
  HardHat,
  Heart,
  Home,
  Hotel,
  Info,
  Landmark,
  Leaf,
  Lightbulb,
  MapPin,
  Mic,
  Music,
  Navigation,
  Phone,
  PhoneCall,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Tag,
  Train,
  TreePine,
  /** Tam giác cảnh báo (tên cũ AlertTriangle) */
  TriangleAlert,
  Users,
  User,
  Utensils,
  Wifi,
  X,
  Zap,
});

/**
 * Render icon theo tên. Tên không tồn tại → không render (an toàn).
 * @param {Object} props
 * @param {string} props.name - Tên icon trong ICONS.
 * @param {number} [props.size=16] - Kích thước (px).
 * @param {number} [props.strokeWidth] - Độ dày nét.
 * @param {string} [props.className] - Class bổ sung.
 * @param {string} [props.fill] - Màu tô (vd "currentColor" cho icon đặc).
 * @returns {JSX.Element|null}
 */
export default function Icon({ name, size = 16, strokeWidth, className, fill }) {
  const Component = ICONS[name];
  if (!Component) return null;
  // Chỉ truyền `fill` khi có giá trị: lucide gộp thuộc tính thừa vào SVG nên
  // `fill={undefined}` sẽ ghi đè mặc định fill="none" → icon bị tô đặc màu đen
  // (chỉ xảy ra ở Client Component; ở Server Component undefined bị lược khi tuần tự hoá).
  const fillProps = fill ? { fill } : {};
  return <Component size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" {...fillProps} />;
}
