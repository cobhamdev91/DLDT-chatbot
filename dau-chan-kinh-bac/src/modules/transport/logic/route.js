/**
 * @file modules/transport/logic/route.js
 * @description Logic THUẦN của bộ ước tính lộ trình Hà Nội → Bắc Ninh:
 *   - `estimateRoute`  : tính số liệu thô (km, phút, giá) cho 4 phương tiện.
 *   - `buildRouteRows` : ghép số liệu + câu chữ locale thành view-model hàng.
 * Không phụ thuộc React → dễ kiểm thử, tái sử dụng (vd cho chatbot).
 */

import { routeDestinations, routeOrigins, trainRoutes } from '@/data/transport';
import { findBySlug } from '@/logic/collection';

/** Giá trị mặc định của 2 dropdown */
export const DEFAULT_ORIGIN = 'hanoi_center';
export const DEFAULT_DESTINATION = 'bac_ninh_city';

/**
 * Cấu hình hiển thị 4 hàng phương tiện (thứ tự = thứ tự render).
 * - `slug`: phương tiện trong transportTypes để mở popover chi tiết.
 * - `icon`: tên icon registry; `tone`: modifier ô icon / nhãn.
 * @readonly
 */
export const ROUTE_MODES = Object.freeze([
  { key: 'car', slug: 'o-to-ca-nhan', icon: 'Car', badgeTone: 'fastest', recommended: true },
  { key: 'bus', slug: 'xe-khach-xe-buyt', icon: 'Bus', badgeTone: 'cheapest' },
  { key: 'moto', slug: 'xe-may', icon: 'Bike', badgeTone: 'scenic' },
  { key: 'train', slug: 'tau-hoa', icon: 'Train', badgeTone: 'vintage' },
]);

/** Hằng số công thức ước tính (giữ nguyên như bản cũ) */
const LIMITS = Object.freeze({ minKm: 15, minMinutes: 20, maxMinutes: 30, minCarMinutes: 25 });
const CAR_PRICE_PER_KM = Object.freeze({ min: 9.5, max: 13 });
const BUS_LONG_DISTANCE_KM = 30;
const BUS_WAIT_MINUTES = 15;
const MOTO_EXTRA_MINUTES = 5;
const PETROL = Object.freeze({ kmPerLitre: 40, thousandPerLitre: 24 });

/**
 * Làm tròn tới bội số 10 (nghìn đồng).
 * @param {number} value
 * @returns {number}
 */
const roundTen = (value) => Math.round(value / 10) * 10;

/**
 * @typedef {Object} RouteEstimate
 * @property {number} km - Tổng quãng đường.
 * @property {number} minMinutes - Thời gian tối thiểu.
 * @property {number} maxMinutes - Thời gian tối đa.
 * @property {{minutes: number, minPrice: number, maxPrice: number, way: string}} car
 * @property {{minutes: number, isLong: boolean, way: string}} bus
 * @property {{minutes: number, petrol: number, way: string}} moto
 * @property {{minutes: number, fare: string, way: string}} train
 */

/**
 * Tính số liệu thô cho cặp điểm đi / điểm đến.
 * Khoá không hợp lệ → rơi về mặc định (trung tâm Hà Nội / TP. Bắc Ninh).
 * @param {string} originId - Khoá điểm xuất phát.
 * @param {string} destinationId - Khoá điểm đến.
 * @returns {RouteEstimate}
 */
export function estimateRoute(originId, destinationId) {
  const start = findBySlug(routeOrigins, originId, 'id') ?? findBySlug(routeOrigins, DEFAULT_ORIGIN, 'id');
  const target =
    findBySlug(routeDestinations, destinationId, 'id') ?? findBySlug(routeDestinations, DEFAULT_DESTINATION, 'id');

  const km = Math.max(LIMITS.minKm, target.km + start.kmDiff);
  const minMinutes = Math.max(LIMITS.minMinutes, target.minTime + start.timeDiff);
  const maxMinutes = Math.max(LIMITS.maxMinutes, target.maxTime + start.timeDiff);

  // Tàu hỏa: đi thẳng nếu điểm đến có ga, ngược lại tàu + xe ôm trung chuyển
  const direct = target.hasTrain ? trainRoutes.direct[target.trainStation] : null;
  const train = direct
    ? { minutes: direct.minutes, fare: direct.fare, way: direct.note }
    : {
        minutes: minMinutes + trainRoutes.transfer.extraMinutes,
        fare: trainRoutes.transfer.fare,
        way: trainRoutes.transfer.note,
      };

  return {
    km,
    minMinutes,
    maxMinutes,
    car: {
      minutes: Math.max(LIMITS.minCarMinutes, Math.round(minMinutes * 0.9)),
      minPrice: roundTen(km * CAR_PRICE_PER_KM.min),
      maxPrice: roundTen(km * CAR_PRICE_PER_KM.max),
      way: start.carWay,
    },
    bus: { minutes: maxMinutes + BUS_WAIT_MINUTES, isLong: km > BUS_LONG_DISTANCE_KM, way: start.busWay },
    moto: {
      minutes: minMinutes + MOTO_EXTRA_MINUTES,
      petrol: Math.round((km / PETROL.kmPerLitre) * PETROL.thousandPerLitre) * 1000,
      way: start.motoWay,
    },
    train,
  };
}

/**
 * @typedef {Object} RouteRow
 * @property {string} key - car | bus | moto | train.
 * @property {string} slug - Slug phương tiện để mở popover.
 * @property {string} icon - Tên icon.
 * @property {string} badgeTone - Modifier nhãn đặc tính.
 * @property {boolean} recommended - Hàng được đề xuất (viền vàng).
 * @property {string} name - Tên phương tiện.
 * @property {string} badge - Nhãn đặc tính.
 * @property {string} tag - Ghi chú phụ.
 * @property {string} time - Thời gian đã định dạng.
 * @property {string} cost - Chi phí đã định dạng.
 * @property {string} route - Cung đường tóm tắt.
 * @property {string} desc - Mô tả trải nghiệm.
 * @property {string} advice - Lời khuyên di chuyển.
 */

/**
 * Ghép số liệu ước tính với câu chữ locale → view-model cho từng hàng + nhãn tổng.
 * @param {RouteEstimate} estimate - Kết quả `estimateRoute`.
 * @param {typeof import('@/locales/vi/transport').transport.estimator} t - Câu chữ bộ ước tính.
 * @returns {{distance: string, duration: string, rows: RouteRow[]}}
 */
export function buildRouteRows(estimate, t) {
  const { units } = t;

  /** Số liệu đã định dạng theo khoá phương tiện */
  const metrics = {
    car: {
      time: units.minutes(estimate.car.minutes),
      cost: units.carFare(estimate.car.minPrice, estimate.car.maxPrice),
      way: estimate.car.way,
    },
    bus: {
      time: units.minutes(estimate.bus.minutes),
      cost: units.perTicket(estimate.bus.isLong ? units.busFareLong : units.busFareShort),
      way: estimate.bus.way,
    },
    moto: {
      time: units.minutes(estimate.moto.minutes),
      cost: units.petrol(estimate.moto.petrol.toLocaleString('vi-VN')),
      way: estimate.moto.way,
    },
    train: {
      time: units.minutes(estimate.train.minutes),
      cost: units.perTicket(estimate.train.fare),
      way: estimate.train.way,
    },
  };

  const rows = ROUTE_MODES.map((mode) => {
    const copy = t.modes[mode.key];
    const metric = metrics[mode.key];
    return {
      ...mode,
      recommended: Boolean(mode.recommended),
      name: copy.name,
      badge: copy.badge,
      tag: copy.tag,
      time: metric.time,
      cost: metric.cost,
      route: metric.way,
      desc: copy.describe(metric.way),
      advice: copy.advice,
    };
  });

  return {
    distance: units.km(estimate.km),
    duration: units.minuteRange(estimate.minMinutes, estimate.maxMinutes),
    rows,
  };
}
