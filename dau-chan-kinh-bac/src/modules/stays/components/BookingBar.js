/**
 * @file modules/stays/components/BookingBar.js
 * @description Thanh đặt phòng nhanh: 2 ô ngày (minh hoạ, không kiểm soát)
 * + dropdown khu vực + dropdown hạng phòng (có kiểm soát).
 */

'use client';

import { stays as t } from '@/locales/vi/stays';
import { BOOKING_DEFAULTS, STAY_AREAS, STAY_RATINGS } from '../logic/filterStays';

/** Danh sách khoá khu vực / hạng phòng theo thứ tự hiển thị */
const AREA_KEYS = Object.keys(STAY_AREAS);
const RATING_KEYS = Object.keys(STAY_RATINGS);

/**
 * @param {Object} props
 * @param {string} props.area - Khu vực đang chọn.
 * @param {(v: string) => void} props.onAreaChange - Đổi khu vực.
 * @param {string} props.rating - Hạng phòng đang chọn.
 * @param {(v: string) => void} props.onRatingChange - Đổi hạng phòng.
 * @returns {JSX.Element}
 */
export default function BookingBar({ area, onAreaChange, rating, onRatingChange }) {
  return (
    <section className="booking-bar">
      <div className="container">
        {/* Hộp trắng chứa lưới các trường */}
        <div className="booking-bar__box">
          {/* Ngày nhận phòng */}
          <div className="booking-bar__field">
            <label htmlFor="stay-check-in">{t.booking.checkIn}</label>
            <input id="stay-check-in" type="date" defaultValue={BOOKING_DEFAULTS.checkIn} />
          </div>

          {/* Ngày trả phòng */}
          <div className="booking-bar__field">
            <label htmlFor="stay-check-out">{t.booking.checkOut}</label>
            <input id="stay-check-out" type="date" defaultValue={BOOKING_DEFAULTS.checkOut} />
          </div>

          {/* Khu vực */}
          <div className="booking-bar__field">
            <label htmlFor="stay-area">{t.booking.area}</label>
            <select id="stay-area" value={area} onChange={(event) => onAreaChange(event.target.value)}>
              {AREA_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t.booking.areas[key]}
                </option>
              ))}
            </select>
          </div>

          {/* Hạng phòng */}
          <div className="booking-bar__field">
            <label htmlFor="stay-rating">{t.booking.rating}</label>
            <select id="stay-rating" value={rating} onChange={(event) => onRatingChange(event.target.value)}>
              {RATING_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t.booking.ratings[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
