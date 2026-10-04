/**
 * @file modules/stays/components/BookingBar.js
 * @description Thanh đặt phòng nhanh: 2 ô ngày (minh hoạ, không kiểm soát)
 * + dropdown khu vực + dropdown hạng phòng (có kiểm soát).
 */

'use client';

import { useState } from 'react';
import DatePicker from '@/components/shared/DatePicker/DatePicker';
import Dropdown from '@/components/shared/Dropdown/Dropdown';
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
  const [checkIn, setCheckIn] = useState(BOOKING_DEFAULTS.checkIn);
  const [checkOut, setCheckOut] = useState(BOOKING_DEFAULTS.checkOut);

  const areaOptions = AREA_KEYS.map((key) => ({
    value: key,
    label: t.booking.areas[key],
  }));

  const ratingOptions = RATING_KEYS.map((key) => ({
    value: key,
    label: t.booking.ratings[key],
  }));

  return (
    <section className="booking-bar">
      <div className="container">
        {/* Hộp trắng chứa lưới các trường nhập liệu cao cấp */}
        <div className="booking-bar__box">
          {/* Ngày nhận phòng */}
          <div className="booking-bar__field">
            <label htmlFor="stay-check-in">{t.booking.checkIn}</label>
            <DatePicker id="stay-check-in" value={checkIn} onChange={setCheckIn} />
          </div>

          {/* Ngày trả phòng */}
          <div className="booking-bar__field">
            <label htmlFor="stay-check-out">{t.booking.checkOut}</label>
            <DatePicker id="stay-check-out" value={checkOut} onChange={setCheckOut} />
          </div>

          {/* Khu vực */}
          <div className="booking-bar__field">
            <label htmlFor="stay-area">{t.booking.area}</label>
            <Dropdown
              id="stay-area"
              value={area}
              onChange={onAreaChange}
              options={areaOptions}
            />
          </div>

          {/* Hạng phòng */}
          <div className="booking-bar__field">
            <label htmlFor="stay-rating">{t.booking.rating}</label>
            <Dropdown
              id="stay-rating"
              value={rating}
              onChange={onRatingChange}
              options={ratingOptions}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
