const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export type DateOption = {
  key: string;
  dayLabel: string;
  dateLabel: string;
  shortLabel: string;
  longLabel: string;
  weekday: string;
};

export function dateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year ?? 2000, (month ?? 1) - 1, day ?? 1);
}

export function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function buildDateOptions(count = 7): DateOption[] {
  const today = new Date();
  return Array.from({length: count}, (_, index) => {
    const date = addDays(today, index);
    const key = dateKey(date);
    const shortLabel = `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`;
    return {
      key,
      dayLabel:
        index === 0
          ? 'Today'
          : index === 1
            ? 'Tomorrow'
            : WEEKDAYS[date.getDay()]!,
      dateLabel: `${date.getDate()} ${MONTHS[date.getMonth()]}`,
      shortLabel,
      longLabel: `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`,
      weekday: WEEKDAYS[date.getDay()]!,
    };
  });
}

export function dateKeyLabel(key: string): string {
  const date = parseDateKey(key);
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatTime(iso: string): string {
  const date = new Date(iso);
  const hours = date.getHours();
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  return `${displayHour}:${minutes} ${suffix}`;
}

export function formatTimeRange(startsAt: string, endsAt: string): string {
  return `${formatTime(startsAt)} – ${formatTime(endsAt)}`;
}

export function formatDateTime(startsAt: string): string {
  const date = new Date(startsAt);
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} · ${formatTime(startsAt)}`;
}

export function dayBadge(iso: string): {day: string; month: string} {
  const date = new Date(iso);
  return {
    day: `${date.getDate()}`,
    month: MONTHS[date.getMonth()]!.toUpperCase(),
  };
}

export function formatIssuedAt(iso: string): string {
  const date = new Date(iso);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatUpdatedAt(iso: string | null): string {
  if (!iso) {
    return 'Not saved yet';
  }
  const date = new Date(iso);
  return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${formatTime(iso)}`;
}

export function todayLongLabel(): string {
  const date = new Date();
  return `${WEEKDAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

export function isSameDate(first: Date, second: Date): boolean {
  return dateKey(first) === dateKey(second);
}
