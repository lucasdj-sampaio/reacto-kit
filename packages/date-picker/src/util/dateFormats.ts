export function formatDateToString(
  date = new Date(),
  ignoreHour = false,
  timeFormat = 'en-us'
): string {
  let isoString = date.toISOString();

  let utcDate = new Date(isoString);

  if (ignoreHour) {
    utcDate.setHours(0);
    utcDate.setMinutes(0);
    utcDate.setSeconds(0);
  }

  let day = String(utcDate.getUTCDate()).padStart(2, '0');
  let month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  let year = utcDate.getUTCFullYear();

  return timeFormat === 'pt-br'
    ? `${day}/${month}/${year}`
    : `${year}-${month}-${day}`;
}

export function formatDateToISO(date: string, addTimeZone = false): string {
  const newDate = new Date(date);
  let timezoneOffset = newDate.getTimezoneOffset();

  newDate.setMinutes(
    newDate.getMinutes() + timezoneOffset * (addTimeZone ? 1 : -1)
  );

  return newDate.toISOString();
}
