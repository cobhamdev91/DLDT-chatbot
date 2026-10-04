/**
 * @file logic/calendar.js
 * @description Hàm thuần xử lý logic tính toán lịch và định dạng ngày tháng cho DatePicker.
 */

/**
 * Phân tích chuỗi ngày ISO 'YYYY-MM-DD' thành { year, month, day }.
 * @param {string} isoString
 * @returns {{ year: number, month: number, day: number } | null}
 */
export function parseDateISO(isoString) {
  if (!isoString || typeof isoString !== 'string') return null;
  const parts = isoString.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return { year: parts[0], month: parts[1] - 1, day: parts[2] };
}

/**
 * Chuyển năm, tháng (0-11), ngày thành chuỗi 'YYYY-MM-DD'.
 * @param {number} year
 * @param {number} month
 * @param {number} day
 * @returns {string}
 */
export function formatDateISO(year, month, day) {
  const m = String(month + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

/**
 * Định dạng ngày ISO 'YYYY-MM-DD' sang chuẩn hiển thị thân thiện 'DD/MM/YYYY'.
 * @param {string} isoString
 * @returns {string}
 */
export function formatDisplayDate(isoString) {
  const parsed = parseDateISO(isoString);
  if (!parsed) return '';
  const d = String(parsed.day).padStart(2, '0');
  const m = String(parsed.month + 1).padStart(2, '0');
  return `${d}/${m}/${parsed.year}`;
}

/**
 * Lấy ngày hôm nay theo chuẩn ISO 'YYYY-MM-DD'.
 * @returns {string}
 */
export function getTodayISO() {
  const now = new Date();
  return formatDateISO(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * Tạo danh sách các ô ngày trong tháng (bắt đầu từ Thứ Hai) cho lưới lịch.
 * @param {number} year
 * @param {number} month - 0 đến 11
 * @param {string} [selectedISO]
 * @returns {Array<{ dateISO: string, day: number, isCurrentMonth: boolean, isToday: boolean, isSelected: boolean }>}
 */
export function buildMonthGrid(year, month, selectedISO = '') {
  const todayISO = getTodayISO();

  const firstDayOfMonth = new Date(year, month, 1);
  // Thứ 2 là 0, CN là 6
  const startDay = (firstDayOfMonth.getDay() + 6) % 7;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const grid = [];

  // Các ngày đệm của tháng trước
  for (let i = startDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonthDate = new Date(year, month - 1, day);
    const dateISO = formatDateISO(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), day);
    grid.push({
      dateISO,
      day,
      isCurrentMonth: false,
      isToday: dateISO === todayISO,
      isSelected: dateISO === selectedISO,
    });
  }

  // Các ngày trong tháng hiện tại
  for (let day = 1; day <= daysInMonth; day++) {
    const dateISO = formatDateISO(year, month, day);
    grid.push({
      dateISO,
      day,
      isCurrentMonth: true,
      isToday: dateISO === todayISO,
      isSelected: dateISO === selectedISO,
    });
  }

  // Các ngày đệm của tháng sau để hoàn thiện tuần
  const remainingCells = (7 - (grid.length % 7)) % 7;
  for (let day = 1; day <= remainingCells; day++) {
    const nextMonthDate = new Date(year, month + 1, day);
    const dateISO = formatDateISO(nextMonthDate.getFullYear(), nextMonthDate.getMonth(), day);
    grid.push({
      dateISO,
      day,
      isCurrentMonth: false,
      isToday: dateISO === todayISO,
      isSelected: dateISO === selectedISO,
    });
  }

  return grid;
}
