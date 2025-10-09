import { SupportedLanguage } from '../shared/types/supportedLanguage';

const monthMap: { [key: string]: string[] } = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  pt: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  fr: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  jp: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  de: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ],
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
};

export const getMonthByNumber = (
  index: number,
  language: SupportedLanguage
) => {
  const lang = monthMap[language] ? language : 'en';
  return monthMap[lang][index - 1];
};

const weekDaysMap: { [key: string]: string[] } = {
  en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  pt: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  es: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  fr: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  jp: ['日', '月', '火', '水', '木', '金', '土'],
  de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  ru: ['Bc', 'Пн', 'Вт', 'Cp', 'Чт', 'Пт', 'C6'],
};

export const weekDays = (language: SupportedLanguage) => {
  const lang = weekDaysMap[language] ? language : 'en';
  return weekDaysMap[lang];
};

export const isSameDay = (d1: Date, d2: Date) =>
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

export function normalizeRange(
  a?: Date | null,
  b?: Date | null
): { start: Date; end: Date } | null {
  if (!a || !b) return null;
  let start = a;
  let end = b;
  if (start > end) [start, end] = [end, start];
  return { start, end };
}

export function formatDateInFullMonth(date: Date): string {
  const formatoData = new Intl.DateTimeFormat(navigator.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return formatoData.charAt(0).toUpperCase() + formatoData.slice(1);
}

export function getLastDayFromAMonth(date = new Date()) {
  const month = date.getMonth();
  return new Date(date.getFullYear(), month + 1, 0);
}

export function createCalendarDates(year: number, month: number): Date[] {
  const days: Date[] = [];
  const firstDate = new Date(year, month - 1, 1);

  const addPreviousDates = () => {
    for (let i = firstDate.getDay(); i > 0; i--) {
      const baseDate = new Date(firstDate);
      baseDate.setDate(baseDate.getDate() - i);

      days.push(baseDate);
    }
  };

  const addCurrentDates = () => {
    const lastDay = getLastDayFromAMonth(firstDate).getDate();
    for (let i = 1; i <= lastDay; i++) days.push(new Date(year, month - 1, i));
  };

  const addNextDates = () => {
    const currentLength = days.length;

    const totalDays = (currentLength > 5 * 7 ? 6 : 5) * 7;
    const daysToAdd = totalDays - currentLength;
    const nextMonth = new Date(year, month, 1);

    for (let i = 0; i < daysToAdd; i++) {
      const baseDate = new Date(nextMonth);
      baseDate.setDate(nextMonth.getDate() + i);
      days.push(baseDate);
    }
  };

  addPreviousDates();
  addCurrentDates();
  addNextDates();
  return days;
}
