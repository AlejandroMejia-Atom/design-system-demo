export function formatDateValue(value: unknown): string {
  if (!(value instanceof Date)) {
    return '—';
  }
  return value.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTimeValue(value: unknown, hour12 = true): string {
  if (!(value instanceof Date)) {
    return '—';
  }
  return value.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12,
  });
}

export function formatDateRangeValue(value: unknown): string {
  if (!value || typeof value !== 'object' || !('start' in value) || !('end' in value)) {
    return '—';
  }
  const range = value as { start: Date | null; end: Date | null };
  const start = formatDateValue(range.start);
  const end = formatDateValue(range.end);
  if (start === '—' && end === '—') {
    return '—';
  }
  return `${start} → ${end}`;
}
