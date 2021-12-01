export function getNumberOfDaysInBetween(
  start: string | Date,
  end: string | Date
): number {
  const date1 = new Date(start);
  const date2 = new Date(end);

  const oneDay = 1000 * 60 * 60 * 24;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}

export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
