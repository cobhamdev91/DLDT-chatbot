/**
 * @file modules/cuisine/logic/filterFoods.js
 * @description Logic THUẦN lọc món ăn theo từ khóa, danh mục ẩm thực và khu vực xuất xứ.
 * Hoàn toàn không chứa state hay DOM.
 */

/** Khoá "tất cả" */
export const ALL_CUISINE_CATEGORY = 'all';
export const ALL_CUISINE_REGION = 'all';

/**
 * Khoá các nhóm lọc theo thứ tự hiển thị (nhãn nằm trong locale cuisine.list.filters).
 * @type {ReadonlyArray<'all'|'dishes'|'cakes'|'gifts'>}
 */
export const CUISINE_FILTERS = Object.freeze(['all', 'dishes', 'cakes', 'gifts']);

/** Từ khoá nhận diện món bánh trong tên món */
const CAKE_KEYWORDS = ['bánh'];
/** Từ khoá nhận diện đặc sản làm quà trong tên món */
const GIFT_KEYWORDS = ['nem', 'bánh', 'rượu', 'tương', 'vải', 'mì'];
/** Chuỗi nhận diện nhóm bánh trong trường category */
const CAKE_CATEGORY = 'Bánh';

/**
 * Tên món có chứa một trong các từ khoá không.
 * @param {string} name - Tên món.
 * @param {string[]} keywords - Danh sách từ khoá (chữ thường).
 * @returns {boolean}
 */
function nameHasAny(name, keywords) {
  const lower = (name || '').toLowerCase();
  return keywords.some((keyword) => lower.includes(keyword));
}

/**
 * Bảng điều kiện của từng nhóm lọc danh mục.
 * @type {Record<string, (food: Object) => boolean>}
 */
const CATEGORY_PREDICATES = {
  all: () => true,
  dishes: (food) => !food.name?.toLowerCase().startsWith('bánh ') && !food.name?.toLowerCase().includes('rượu') && !food.name?.toLowerCase().includes('vải'),
  cakes: (food) => nameHasAny(food.name, CAKE_KEYWORDS) || Boolean(food.category?.includes(CAKE_CATEGORY)),
  gifts: (food) => nameHasAny(food.name, GIFT_KEYWORDS),
};

/**
 * Trích xuất danh sách các khu vực xuất xứ tiêu biểu từ dữ liệu món ăn.
 * @param {Array<{origin?: string}>} foods - Danh sách món ăn.
 * @returns {string[]} Danh sách khu vực duy nhất đã sắp xếp.
 */
export function extractCuisineRegions(foods) {
  const regionsSet = new Set();

  foods.forEach((food) => {
    if (!food.origin) return;
    const parts = food.origin.split(',').map((p) => p.trim());
    // Lấy phần tử quận/huyện hoặc tỉnh thành cuối
    const mainRegion = parts.length > 1 ? parts[parts.length - 1] : parts[0];
    if (mainRegion) {
      regionsSet.add(mainRegion);
    }
  });

  return Array.from(regionsSet).sort();
}

/**
 * Lọc món ăn kết hợp đa tiêu chí: từ khóa, danh mục và khu vực.
 * Hỗ trợ tương thích ngược với chữ ký cũ filterFoods(foods, filterKey).
 *
 * @param {Object[]} foods - Danh sách món ăn ban đầu.
 * @param {string | { query?: string, category?: string, region?: string }} filterOptions - Tùy chọn lọc hoặc filterKey.
 * @returns {Object[]}
 */
export function filterFoods(foods, filterOptions = {}) {
  // Tương thích ngược nếu tham số thứ 2 là chuỗi filterKey
  if (typeof filterOptions === 'string') {
    const predicate = CATEGORY_PREDICATES[filterOptions] ?? CATEGORY_PREDICATES.all;
    return foods.filter(predicate);
  }

  const {
    query = '',
    category = ALL_CUISINE_CATEGORY,
    region = ALL_CUISINE_REGION,
  } = filterOptions;

  const normalizedQuery = query.trim().toLowerCase();
  const catPredicate = CATEGORY_PREDICATES[category] ?? CATEGORY_PREDICATES.all;

  return foods.filter((food) => {
    // 1. Lọc theo danh mục
    if (!catPredicate(food)) {
      return false;
    }

    // 2. Lọc theo khu vực xuất xứ
    if (region !== ALL_CUISINE_REGION) {
      const matchRegion = (food.origin || '').toLowerCase().includes(region.toLowerCase());
      if (!matchRegion) return false;
    }

    // 3. Lọc theo từ khóa tìm kiếm (tên, xuất xứ, mô tả, hương vị)
    if (normalizedQuery) {
      const matchName = (food.name || '').toLowerCase().includes(normalizedQuery);
      const matchOrigin = (food.origin || '').toLowerCase().includes(normalizedQuery);
      const matchDesc = (food.description || '').toLowerCase().includes(normalizedQuery);
      const matchTaste = (food.taste || '').toLowerCase().includes(normalizedQuery);
      if (!matchName && !matchOrigin && !matchDesc && !matchTaste) {
        return false;
      }
    }

    return true;
  });
}
