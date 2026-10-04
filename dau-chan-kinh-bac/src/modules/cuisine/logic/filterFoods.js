/**
 * @file modules/cuisine/logic/filterFoods.js
 * @description Hàm thuần lọc món ăn theo nhóm (giữ nguyên quy tắc bản cũ).
 */

/**
 * Khoá các nhóm lọc theo thứ tự hiển thị (nhãn nằm trong locale cuisine.list.filters).
 * @type {ReadonlyArray<'all'|'dishes'|'cakes'|'gifts'>}
 */
export const CUISINE_FILTERS = Object.freeze(['all', 'dishes', 'cakes', 'gifts']);

/** Từ khoá nhận diện món bánh trong tên món */
const CAKE_KEYWORDS = ['bánh'];
/** Từ khoá nhận diện đặc sản làm quà trong tên món */
const GIFT_KEYWORDS = ['nem', 'bánh', 'rượu'];
/** Chuỗi nhận diện nhóm bánh trong trường category */
const CAKE_CATEGORY = 'Bánh';

/**
 * Tên món có chứa một trong các từ khoá không.
 * @param {string} name - Tên món.
 * @param {string[]} keywords - Danh sách từ khoá (chữ thường).
 * @returns {boolean}
 */
function nameHasAny(name, keywords) {
  const lower = name.toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

/**
 * Bảng điều kiện của từng nhóm lọc.
 * "all" và "dishes" giữ hành vi cũ: hiển thị toàn bộ.
 * @type {Record<string, (food: Object) => boolean>}
 */
const PREDICATES = {
  all: () => true,
  dishes: () => true,
  cakes: (food) => nameHasAny(food.name, CAKE_KEYWORDS) || Boolean(food.category?.includes(CAKE_CATEGORY)),
  gifts: (food) => nameHasAny(food.name, GIFT_KEYWORDS),
};

/**
 * Lọc món ăn theo khoá nhóm.
 * @param {Object[]} foods - Danh sách món.
 * @param {string} filterKey - Khoá nhóm (một giá trị trong CUISINE_FILTERS).
 * @returns {Object[]}
 */
export function filterFoods(foods, filterKey) {
  const predicate = PREDICATES[filterKey] ?? PREDICATES.all;
  return foods.filter(predicate);
}
