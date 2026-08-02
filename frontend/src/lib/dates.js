export const HOURS = Array.from({ length: 12 }, (_, i) => i + 8); // 08:00–19:00

export function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + diff);
  return d;
}

export function addDays(date, amount) {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}

export function getWeekDays(referenceDate) {
  const monday = startOfWeek(referenceDate);
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function slotDateTime(day, hour) {
  const d = new Date(day);
  d.setHours(hour, 0, 0, 0);
  return d;
}

const dayLabelFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
const dayNumberFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' });

export function formatDayLabel(date) {
  return dayLabelFormatter.format(date).replace('.', '');
}

export function formatDayNumber(date) {
  return dayNumberFormatter.format(date);
}

export function formatWeekRange(weekDays) {
  const first = weekDays[0];
  const last = weekDays[weekDays.length - 1];
  return `${dayNumberFormatter.format(first)} – ${dayNumberFormatter.format(last)}`;
}
