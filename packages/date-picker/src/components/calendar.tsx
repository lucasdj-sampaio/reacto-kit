import clsx from 'clsx';
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

  const isRangeMode = useMemo(() => selectedDate?.length === 2, [selectedDate]);
  const parsedSelected = useMemo(
    () => (selectedDate || []).map(s => (s ? toDateSafe(s, language) : null)),
    [selectedDate, language]
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

  const ablePastDates = !['future', 'fromToday'].includes(period);
  const ableFutureDates = period !== 'past';

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

    if (period === 'past') return date < today;
    if (period === 'future') return date > today;
    if (period === 'fromToday') return date >= today || isToday;
    return true;
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
  }, [month, year]);

  return (
    <div className="calendar w-full max-w-xs p-4 gap-4 shadow-lg flex flex-col bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <button
          className={clsx('calendar-arrow', {
            able: leftArrowCondition,
            disabled: !leftArrowCondition,
          })}
          disabled={!leftArrowCondition}
          onClick={() => leftArrowCondition && decreaseMonth()}
        >
          <GoArrowLeft />
        </button>

        <span className="calendar-current-month text-lg font-semibold">{`${getMonthByNumber(
          month,
          language
        )} ${year}`}</span>

        <button
          className={clsx('calendar-arrow', {
            able: rightArrowCondition,
            disabled: !rightArrowCondition,
          })}
          disabled={!rightArrowCondition}
          onClick={() => rightArrowCondition && increaseMonth()}
        >
          <GoArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdayLabels.map((w, i) => (
          <div
            key={`span_${w}_${i}`}
            className="calendar-weekday text-center select-none text-gray-500 text-xs font-medium"
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

          const isActive = parsedSelected
            ? parsedSelected.some(ps => ps !== null && isSameDay(ps, d))
            : false;

          const getRangeStatus = (d: Date) => {
            if (!isRangeMode)
              return { inRange: false, hoverInRange: false, isInverted: false };

            const [sel0, sel1] = parsedSelected;

            const rangeFrom = (a?: Date | null, b?: Date | null) => {
              if (!a || !b) return null;
              let start = a;
              let end = b;
              if (start > end) [start, end] = [end, start];
              return { start, end };
            };

            if (sel0 && sel1) {
              const { start, end } = rangeFrom(sel0, sel1)!;
              const isInverted = sel0 > sel1;
              return {
                inRange: d > start && d < end,
                hoverInRange: false,
                isInverted,
              };
            }

            const onlySel = sel0 || sel1;
            if (onlySel && hoverDate) {
              const { start, end } = rangeFrom(onlySel, hoverDate)!;
              const isInverted = !!(
                onlySel &&
                hoverDate &&
                onlySel > hoverDate
              );
              return {
                inRange: d > start && d < end,
                hoverInRange: d > start && d < end,
                isInverted,
              };
            }

            return { inRange: false, hoverInRange: false, isInverted: false };
          };

          const { inRange, hoverInRange, isInverted } = getRangeStatus(d);

          const ableDate = checkPrevOrNextDate(d);

          return (
            <button
              key={`p_${d}_${i}`}
              className={clsx('calendar-date', {
                able: ableDate,
                disabled: !ableDate,
                today: isToday,
                active: isActive,
                'in-range': inRange || hoverInRange,
                inverted: isInverted,
              })}
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
