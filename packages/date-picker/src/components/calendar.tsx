import { useEffect, useMemo, useState } from 'react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { ITailwindProps } from '../shared/interfaces/tailwindProps';
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
  tailwindStyle?: ITailwindProps;
}

export const Calendar: React.FC<PickerProps> = ({
  language = 'en',
  selectedDate,
  onChangeSingle,
  onChangeRange,
  pickerIndex = 0,
  period = 'all',
  tailwindStyle,
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

  const style = {
    calendar: `w-full max-w-xs shadow-lg flex flex-col 
      ${tailwindStyle?.calendar?.background ?? 'bg-white'} 
      ${tailwindStyle?.calendar?.rounded ?? 'rounded-lg'} 
      ${tailwindStyle?.calendar?.padding ?? 'p-4'}`,

    monthArrows: `transition-colors ${
      tailwindStyle?.header?.arrow?.padding ?? 'p-2'
    } 
      ${tailwindStyle?.header?.arrow?.rounded ?? 'rounded-full'}`,
    ableArrow: `hover:cursor-pointer 
      ${
        tailwindStyle?.header?.arrow?.hoverColor
          ? `hover:${tailwindStyle.header.arrow.hoverColor}`
          : 'hover:bg-gray-200'
      }`,
    disabledArrow: 'opacity-50 cursor-not-allowed',

    currentMonth: `${tailwindStyle?.header?.month?.color ?? ''} 
      ${tailwindStyle?.header?.month?.fontSize ?? 'text-lg'} 
      ${tailwindStyle?.header?.month?.fontWeight ?? 'font-semibold'}
      ${tailwindStyle?.header?.month?.font ?? ''}`,

    weekText: `text-center select-none  
      ${tailwindStyle?.weekDays?.color ?? 'text-gray-500'} 
      ${tailwindStyle?.weekDays?.fontSize ?? 'text-xs'} 
      ${tailwindStyle?.weekDays?.fontWeight ?? 'font-medium'}
      ${tailwindStyle?.weekDays?.font ?? ''}`,

    days: `w-8 h-8 flex items-center justify-center transition-colors 
      ${tailwindStyle?.days?.rounded ?? 'rounded-full'}
      ${tailwindStyle?.days?.text?.color ?? ''} 
      ${tailwindStyle?.days?.text?.fontSize ?? ''} 
      ${tailwindStyle?.days?.text?.fontWeight ?? ''}
      ${tailwindStyle?.days?.text?.font ?? ''}`,

    todayBorder: `border-2 ${
      tailwindStyle?.days?.colors?.todayBorder ?? 'border-blue-500'
    }`,

    ableDate: `cursor-pointer 
      ${
        tailwindStyle?.days?.colors?.hover?.[0]
          ? `hover:${tailwindStyle?.days?.colors?.hover?.[0]}`
          : 'hover:bg-blue-100'
      }`,
    disabledDate: `cursor-not-allowed ${
      tailwindStyle?.days?.colors?.disabled ?? 'text-gray-300'
    }`,

    activeDate: `${
      tailwindStyle?.days?.colors?.selected ?? 'bg-blue-500 text-white'
    }`,

    hoverDate: `${
      tailwindStyle?.days?.colors?.hover ?? 'bg-blue-100 text-blue-700'
    }`,
  };

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
    <div className={`calendar ${style.calendar}`}>
      <div className="flex items-center justify-between mb-2">
        <button
          className={`${style.monthArrows} ${
            leftArrowCondition ? style.ableArrow : style.disabledArrow
          }`}
          disabled={!leftArrowCondition}
          onClick={() => leftArrowCondition && decreaseMonth()}
        >
          <GoArrowLeft />
        </button>

        <span className={style.currentMonth}>{`${getMonthByNumber(
          month,
          language
        )} ${year}`}</span>

        <button
          className={`${style.monthArrows} ${
            rightArrowCondition ? style.ableArrow : style.disabledArrow
          }`}
          disabled={!rightArrowCondition}
          onClick={() => rightArrowCondition && increaseMonth()}
        >
          <GoArrowRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 ">
        {weekdayLabels.map((w, i) => (
          <div key={`span_${w}_${i}`} className={style.weekText}>
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
              className={`${style.days} calendarOption_${formatDateToString(
                d,
                language
              )} 
                  ${ableDate ? style.ableDate : style.disabledDate}
                  ${isToday ? style.todayBorder : ''}
                  ${isActive ? style.activeDate : ''}
                  ${inRange ? style.hoverDate : ''}
                  ${hoverInRange && !inRange ? style.hoverDate : ''}
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
