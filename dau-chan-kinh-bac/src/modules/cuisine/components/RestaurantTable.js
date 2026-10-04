/**
 * @file modules/cuisine/components/RestaurantTable.js
 * @description Bảng "Quán ăn gia truyền được giới thiệu": tên, món, địa chỉ,
 * giờ mở, số điện thoại (bấm để gọi).
 */

import Icon from '@/components/shared/Icon/Icon';
import { cuisine as t } from '@/locales/vi/cuisine';
import { telHref } from '@/logic/text';

/** Thứ tự cột bảng (khoá khớp locale cuisine.restaurants.columns) */
const COLUMNS = ['name', 'dish', 'address', 'hours', 'phone'];

/**
 * @param {{ restaurants: import('@/data/restaurants').Restaurant[] }} props
 * @returns {JSX.Element}
 */
export default function RestaurantTable({ restaurants }) {
  return (
    <section className="container spacer-bottom-lg">
      {/* Khung bảng bo góc */}
      <div className="restaurant-table-wrap">
        {/* Tiêu đề bảng */}
        <div className="restaurant-table-title">
          <Icon name="Sparkles" size={20} />
          {t.restaurants.title}
        </div>

        <table className="restaurant-table">
          <thead>
            <tr>
              {COLUMNS.map((key) => (
                <th key={key}>{t.restaurants.columns[key]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {restaurants.map((res) => (
              <tr key={res.name}>
                <td className="place-cell">{res.name}</td>
                <td>{res.dish}</td>
                <td className="desc-cell">{res.address}</td>
                <td className="time-cell">{res.hours}</td>
                <td>
                  {/* Liên kết gọi điện (icon + số cùng hàng) */}
                  <a href={telHref(res.phone)} className="icon-text icon-text--xs restaurant-table__phone">
                    <Icon name="PhoneCall" size={14} /> {res.phone}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
