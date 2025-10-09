import { useEffect, useMemo, useState } from 'react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { SupportedLanguage } from '../shared/types/supportedLanguage';
import { SupportedPeriod } from '../shared/types/supportedPeriod';
import { formatDateToString, toDateSafe } from '../util/dateFormats';
import {
  createCalendarDates,
  getMonthByNumber,
  isSameDay,
  weekDays,
} from '../util/functions';

interface PickerProps {
  language?: SupportedLanguage;
  selectedDate?: (string | null)[];
  onChangeSingle?: (v: string | null) => void;
  onChangeRange?: (v: [string | null, string | null]) => void;
  pickerIndex?: number;
  period?: SupportedPeriod;
}

export const Calendar: React.FC<PickerProps> = ({
  language = 'en',
  selectedDate,
  onChangeSingle,
  onChangeRange,
  pickerIndex = 0,
  period = 'all',
}: PickerProps) => {
  const today = new Date();

  const parsedSelected: (Date | null)[] = (selectedDate || []).map(s =>
    s ? toDateSafe(s, language) : null
  );

  const selectedDateIsEmpty =
    !selectedDate || selectedDate.length === 0 || !selectedDate[pickerIndex];

  const [fullDate, setFullDate] = useState<Date>(
    selectedDateIsEmpty ? today : parsedSelected[pickerIndex] || today
  );

  const [year, setYear] = useState(fullDate.getFullYear());
  const [month, setMonth] = useState(fullDate.getMonth() + 1);
  const [dates, setDates] = useState<Date[]>(createCalendarDates(year, month));

  const weekdayLabels = useMemo(() => weekDays(language), [language]);

  const renderMonthArrow = () => {
    const limitDate = formatDateToString(new Date(year, month - 1, 1));
    const thisMonth = formatDateToString(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );

    return limitDate !== thisMonth;
  };

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
      (period === 'fromToday' && (date > today || isToday)) ||
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
        {weekdayLabels.map((w, i) => (
          <div
            key={`span_${w}_${i}`}
            className="text-center font-medium text-gray-500 text-xs select-none"
          >
            {w}
          </div>
        ))}

        {dates.map((d, i) => {
          const noSelection =
            !selectedDate ||
            selectedDate.length === 0 ||
            selectedDate.every(v => !v);

          const isToday =
            noSelection && period !== 'future' ? isSameDay(d, today) : false;

          const isActive = selectedDate
            ? selectedDate.includes(formatDateToString(d, language))
            : false;

          let inRange = false;
          let hoverInRange = false;

          if (selectedDate?.length === 2) {
            const sel0 = parsedSelected[0];
            const sel1 = parsedSelected[1];
            if (sel0 && sel1) {
              let start: Date = sel0;
              let end: Date = sel1;
              if (start > end) [start, end] = [end, start];
              inRange = d > start && d < end;
            }

            if (hoverDate && parsedSelected[0]) {
              const selStart = parsedSelected[0];
              if (selStart) {
                let start: Date = selStart;
                let end: Date = hoverDate;
                if (start > end) [start, end] = [end, start];
                hoverInRange = d > start && d < end;
              }
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
              onClick={() => {
                if (!ableDate) return null;
                const str = formatDateToString(d, language);

                if (onChangeSingle) return onChangeSingle(str);

                if (onChangeRange) {
                  const nextValues: [string | null, string | null] = [
                    parsedSelected[0]
                      ? formatDateToString(parsedSelected[0], language)
                      : null,
                    parsedSelected[1]
                      ? formatDateToString(parsedSelected[1], language)
                      : null,
                  ];
                  nextValues[pickerIndex] = str;
                  return onChangeRange(nextValues);
                }
                return null;
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};
