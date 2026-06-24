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
