export function formatDateInFullMonth(date: Date): string {
  const formatoData = new Intl.DateTimeFormat(navigator.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

  return formatoData.charAt(0).toUpperCase() + formatoData.slice(1);
}

export function getMonthByNumber(month: number) {
  const months = [
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
  ];

  return months[month - 1];
}

export const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

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

    const totalDays =
      (currentLength > 5 * weekDays.length ? 6 : 5) * weekDays.length;
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
