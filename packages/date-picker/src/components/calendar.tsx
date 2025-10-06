import { useEffect, useState } from 'react';
import { formatDateToISO, formatDateToString } from '../util/dateFormats';
import {
  createCalendarDates,
  getMonthByNumber,
  weekDays,
} from '../util/functions';

interface PickerProps {
  selectedDate?: any[];
  setStateValue: ((newValue: string) => void)[];
  pickerIndex?: number;
  ableNextDates?: boolean;
  ablePreviousDates?: boolean;
}

export const Calendar: React.FC<PickerProps> = ({
  selectedDate,
  setStateValue,
  pickerIndex = 0,
  ableNextDates = false,
  ablePreviousDates = !ableNextDates,
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
          formatDateToISO(
            selectedDate?.[pickerIndex] || today.toISOString(),
            true
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
  const prevMonthArrowCondition = ablePreviousDates || renderMonthArrow();
  const nextMonthArrowCondition = ableNextDates || renderMonthArrow();

  //const [hoverDate, setHoverDate] = useState('');

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

  const checkPreviousDate = (date: Date) => {
    return ablePreviousDates && date < today;
  };

  const checkNextDate = (date: Date) => {
    return ableNextDates && date > today;
  };

  const checkPrevOrNextDate = (date: Date) => {
    return checkPreviousDate(date) || checkNextDate(date);
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
            prevMonthArrowCondition
              ? 'hover:bg-gray-200'
              : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!prevMonthArrowCondition}
          onClick={() => prevMonthArrowCondition && decreaseMonth()}
        >
          {'leftArrow'}
        </button>

        <span className="font-semibold text-lg">{`${getMonthByNumber(
          month
        )} ${year}`}</span>

        <button
          className={`p-2 rounded-full transition-colors ${
            nextMonthArrowCondition
              ? 'hover:bg-gray-200'
              : 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!nextMonthArrowCondition}
          onClick={() => nextMonthArrowCondition && increaseMonth()}
        >
          {'rightArrow'}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((w, i) => (
          <div
            key={`span_${w}_${i}`}
            className="text-center font-medium text-gray-500 text-xs select-none"
          >
            {w}
          </div>
        ))}

        {dates.map((d, i) => {
          const formatedDate = formatDateToString(d);
          const isToday =
            (!selectedDate ||
              selectedDate.filter(f => f === '').length === 2) &&
            !ableNextDates
              ? formatedDate === formatDateToString(today)
              : false;
          const isActive = selectedDate
            ? selectedDate.includes(formatedDate)
            : false;
          const inRange =
            selectedDate &&
            d > new Date(selectedDate[0]) &&
            d < new Date(selectedDate[1]);
          const ableDate = checkPrevOrNextDate(d);
          return (
            <button
              key={`p_${d}_${i}`}
              className={`calendarOption_${formatedDate} w-8 h-8 flex items-center justify-center rounded-full transition-colors
                ${
                  ableDate
                    ? 'hover:bg-blue-100 cursor-pointer'
                    : 'text-gray-300 cursor-not-allowed'
                }
                ${isToday ? 'border-2 border-blue-500' : ''}
                ${isActive ? 'bg-blue-500 text-white' : ''}
                ${inRange ? 'bg-blue-100 text-blue-700' : ''}
              `}
              disabled={!ableDate}
              //onMouseEnter={() => setHoverDate(formatedDate)}
              //onMouseLeave={() => setHoverDate('')}
              onClick={() =>
                ableDate ? setStateValue[pickerIndex](formatedDate) : null
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
