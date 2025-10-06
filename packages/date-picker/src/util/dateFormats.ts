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

export function formatDateToBrType(
  date = new Date(),
  options?: {
    renderHour?: boolean;
    renderSecond?: boolean;
    timeSpacingChar?: string;
  }
): string {
  return options?.renderHour
    ? `${formatDateToString(
        date,
        options.renderHour,
        'pt-br'
      )} ${options.timeSpacingChar || ''} ${formatTimer(
        date,
        options.renderSecond
      )}`
    : formatDateToString(date, options?.renderHour, 'pt-br');
}

export function convertDtStringToNumber(date: string): number {
  return new Date(date).getTime();
}

export function formatTimer(date = new Date(), renderSecond = false): string {
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
    second: renderSecond ? '2-digit' : undefined,
  });
}

export function formatToTimezone(date = new Date()): string {
  const offsetMinutes = date.getTimezoneOffset();

  if (offsetMinutes === 0) {
    return 'GMT+00';
  } else {
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);

    const sign = offsetMinutes < 0 ? '+' : '-';
    return `GMT${sign}${offsetHours < 10 ? '0' : ''}${offsetHours}`;
  }
}

export function getDiferenceBetweenDates(firstDate: Date, lastDate: Date) {
  const date1 = new Date(firstDate).getTime();
  const date2 = new Date(lastDate).getTime();

  const diference = Math.abs(date1 - date2);
  const seconds = Math.floor(diference / 1000);

  const hour = Math.floor(seconds / 3600).toString();
  const minute = Math.floor((seconds % 3600) / 60).toString();
  const second = (seconds % 60).toString();

  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(
    2,
    '0'
  )}`;
}

export function formatDateToISO(date: string, addTimeZone = false): string {
  const newDate = new Date(date);
  let timezoneOffset = newDate.getTimezoneOffset();

  newDate.setMinutes(
    newDate.getMinutes() + timezoneOffset * (addTimeZone ? 1 : -1)
  );

  return newDate.toISOString();
}
