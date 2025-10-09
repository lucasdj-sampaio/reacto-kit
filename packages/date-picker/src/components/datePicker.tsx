import { useEffect, useRef, useState } from 'react';
import { IDatePickerProps } from '../shared/interfaces/datePicker';
import { Calendar } from './calendar';

export const DatePicker: React.FC<IDatePickerProps> = ({
  name,
  label,
  placeholder,
  value,
  warning,
  language,
  period,
  setStateValue,
}: IDatePickerProps) => {
  const ref = useRef<any>(null);
  const [openCalendar, setOpenCalendar] = useState(false);

  const setValueHandle = (newValue: string) => {
    setStateValue(newValue);
    setOpenCalendar(false);
  };

  const inputClassNames = `w-full border ${
    warning
      ? 'border-red-500 focus:ring-2 focus:ring-red-400'
      : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
  } rounded-md px-3 py-2 focus:outline-none cursor-pointer bg-white`;

  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any }) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenCalendar(false);
      }
    };

    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={ref} className={`flex w-full min-w-[214px] flex-col gap-1`}>
      {label && (
        <label
          htmlFor={`${name}_id`}
          className={`text-sm font-medium ${
            value ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          placeholder={placeholder}
          value={value}
          readOnly
          onClick={() => {
            setOpenCalendar(!openCalendar);
          }}
          className={inputClassNames}
        />

        {warning && (
          <p className="absolute left-0 top-full mt-1 text-xs text-red-500">
            {warning}
          </p>
        )}

        {openCalendar && (
          <div className="absolute left-0 top-full z-10 mt-2">
            <Calendar
              language={language}
              selectedDate={value ? [value] : undefined}
              setStateValue={[setValueHandle]}
              period={period}
            />
          </div>
        )}
      </div>
    </div>
  );
};
