const dateTimeFormatMap: { [key: string]: string } = {
  en: 'en-US',
  pt: 'pt-BR',
  es: 'es-ES',
  fr: 'fr-FR',
  jp: 'ja-JP',
  de: 'de-DE',
  ru: 'ru-RU',
};

export const formatDateToString = (
  date = new Date(),
  language: keyof typeof dateTimeFormatMap = 'en'
): string => new Intl.DateTimeFormat(dateTimeFormatMap[language]).format(date);

const dateFormatMap: { [key: string]: string } = {
  en: 'MM/DD/YYYY',
  pt: 'DD/MM/YYYY',
  es: 'DD/MM/YYYY',
  fr: 'DD/MM/YYYY',
  jp: 'YYYY/MM/DD',
  de: 'DD.MM.YYYY',
  ru: 'DD.MM.YYYY',
};

export function parseDateFromString(
  dateStr: string,
  language: keyof typeof dateFormatMap
): Date | null {
  const format = dateFormatMap[language];
  const parts = dateStr.match(/\d+/g);
  if (!parts) return null;

  let day: number, month: number, year: number;

  switch (format) {
    case 'MM/DD/YYYY':
      [month, day, year] = parts.map(Number);
      break;
    case 'DD/MM/YYYY':
      [day, month, year] = parts.map(Number);
      break;
    case 'YYYY/MM/DD':
      [year, month, day] = parts.map(Number);
      break;
    case 'DD.MM.YYYY':
      [day, month, year] = parts.map(Number);
      break;
    default:
      return null;
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  )
    return null;

  return date;
}

export function toDateSafe(
  dateStr: string,
  language: keyof typeof dateFormatMap
): Date | null {
  const localized = parseDateFromString(dateStr, language);
  if (localized) return localized;

  const iso = new Date(dateStr);
  return isNaN(iso.getTime()) ? null : iso;
}
