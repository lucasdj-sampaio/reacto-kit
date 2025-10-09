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
): Date {
  const format = dateFormatMap[language];
  const parts = dateStr.match(/\d+/g);
  if (!parts) throw new Error(`Invalid date string: ${dateStr}`);

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
      throw new Error(`Unsupported date format for language: ${language}`);
  }

  return new Date(year, month - 1, day);
}
