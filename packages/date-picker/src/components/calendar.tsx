import { useEffect, useState } from 'react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { SupportedLanguage } from '../shared/types/supportedLanguage';
import { SupportedPeriod } from '../shared/types/supportedPeriod';
import { formatDateToString, parseDateFromString } from '../util/dateFormats';
import {
  createCalendarDates,
  getMonthByNumber,
  isSameDay,
  weekDays,
} from '../util/functions';

interface PickerProps {
  language?: SupportedLanguage;
  selectedDate?: any[];
  setStateValue: ((newValue: string) => void)[];
  pickerIndex?: number;
  period?: SupportedPeriod;
}

export const Calendar: React.FC<PickerProps> = ({
  language = 'en',
  selectedDate,
  setStateValue,
  pickerIndex = 0,
  period = 'all',
}: PickerProps) => {
  const today = new Date();
  const selectedDateIsEmpty =
    !selectedDate ||
    selectedDate.length === 0 ||
    selectedDate[pickerIndex] === '';

  const [fullDate, setFullDate] = useState(
    selectedDateIsEmpty
      ? today
      : new Date(
          parseDateFromString(
            selectedDate?.[pickerIndex] || today.toISOString(),
            language
          )
        )
  );

  const [year, setYear] = useState(fullDate.getFullYear());
  const [month, setMonth] = useState(fullDate.getMonth() + 1);
  const [dates, setDates] = useState<Date[]>(createCalendarDates(year, month));

  const renderMonthArrow = () => {
    const limitDate = formatDateToString(new Date(year, month - 1, 1));
    const thisMonth = formatDateToString(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );

    return limitDate !== thisMonth;
  };

  const periodIsFromToday = period === 'fromToday';
  const periodIsAll = period === 'all';

  const ablePastDates =
    period === 'future' || period === 'fromToday' ? false : true;
  const ableFutureDates = period === 'past' ? false : true;

  const leftArrowCondition = ablePastDates || renderMonthArrow();
  const rightArrowCondition = ableFutureDates || renderMonthArrow();

  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const increaseMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else setMonth(month + 1);
  };

  const decreaseMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else setMonth(month - 1);
  };

  const checkPrevOrNextDate = (date: Date) => {
    const isToday = isSameDay(date, today);

    return (
      (ablePastDates && date < today) ||
      (periodIsFromToday && (date > today || isToday)) ||
      (ableFutureDates && date > today)
    );
  };

  useEffect(() => {
    const currentDate = today;
    const dateCondition =
      month === currentDate.getMonth() + 1 &&
      year === currentDate.getFullYear();

    setFullDate(
      new Date(year, month - 1, dateCondition ? currentDate.getDate() : 1)
    );
    setDates(createCalendarDates(year, month));
  }, [month]);

  return (
    <div className="calendar w-full max-w-xs bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <button
          className={`p-2 rounded-full transition-colors ${
            leftArrowCondition
              ? 'hover:bg-gray-200 hover:cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!leftArrowCondition}
          onClick={() => leftArrowCondition && decreaseMonth()}
        >
          <GoArrowLeft />
        </button>

        <span className="font-semibold text-lg">{`${getMonthByNumber(
          month,
          language
        )} ${year}`}</span>

        <button
          className={`p-2 rounded-full transition-colors ${
            rightArrowCondition
              ? 'hover:bg-gray-200 hover:cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!rightArrowCondition}
          onClick={() => rightArrowCondition && increaseMonth()}
        >
          <GoArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 ">
        {weekDays(language).map((w, i) => (
          <div
            key={`span_${w}_${i}`}
            className="text-center font-medium text-gray-500 text-xs select-none"
          >
            {w}
          </div>
        ))}

        {dates.map((d, i) => {
          const isToday =
            (!selectedDate ||
              selectedDate.filter(f => f === '').length === 2) &&
            (periodIsFromToday || periodIsAll)
              ? isSameDay(d, today)
              : false;

          const isActive = selectedDate
            ? selectedDate.includes(formatDateToString(d, language))
            : false;

          let inRange = false;
          let hoverInRange = false;

          if (selectedDate?.length === 2) {
            if (selectedDate && selectedDate[0] && selectedDate[1]) {
              // parse selected dates using the language-aware parser
              let start = parseDateFromString(selectedDate[0], language);
              let end = parseDateFromString(selectedDate[1], language);
              if (start > end) [start, end] = [end, start];
              inRange = d > start && d < end;
            }

            if (hoverDate && selectedDate && selectedDate[0]) {
              let start = parseDateFromString(selectedDate[0], language);
              let end = hoverDate;
              if (start > end) [start, end] = [end, start];
              hoverInRange = d > start && d < end;
            }
          }

          const ableDate = checkPrevOrNextDate(d);

          return (
            <button
              key={`p_${d}_${i}`}
              className={`calendarOption_${formatDateToString(
                d,
                language
              )} w-8 h-8 flex items-center justify-center rounded-full transition-colors
                ${
                  ableDate
                    ? 'hover:bg-blue-100 cursor-pointer'
                    : 'text-gray-300 cursor-not-allowed'
                }
                ${isToday ? 'border-2 border-blue-500' : ''}
                ${isActive ? 'bg-blue-500 text-white' : ''}
                ${inRange ? 'bg-blue-100 text-blue-700' : ''}
                ${hoverInRange && !inRange ? 'bg-blue-100 text-blue-700' : ''}
              `}
              disabled={!ableDate}
              onMouseEnter={() => setHoverDate(d)}
              onMouseLeave={() => setHoverDate(null)}
              onClick={() =>
                ableDate
                  ? setStateValue[pickerIndex](formatDateToString(d, language))
                  : null
              }
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
