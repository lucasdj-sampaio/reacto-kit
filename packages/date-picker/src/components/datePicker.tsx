import clsx from 'clsx';
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
  onChange,
}: IDatePickerProps) => {
  const ref = useRef<any>(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setValueHandle = (newValue: string | null) => {
    onChange(newValue);
    setOpenCalendar(false);
  };

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
    <div ref={ref} className="flex w-full min-w-[214px] flex-col gap-1">
      {label && (
        <label
          htmlFor={`${name}_id`}
          className={clsx('input-label text-sm font-medium', {
            value: value,
            empty: !value,
          })}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          placeholder={placeholder}
          value={value ?? ''}
          readOnly
          ref={el => {
            inputRef.current = el;
          }}
          onClick={() => {
            setOpenCalendar(!openCalendar);
            if (!openCalendar) setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className={clsx(
            'picker-input w-full rounded-md px-3 py-2 border border-gray-300 bg-white cursor-pointer transition-colors focus:ring-2',
            {
              warning: warning,
              focus: !warning,
            }
          )}
        />

        {warning && (
          <p className="warning-message absolute left-0 top-full mt-1 text-xs text-red-500">
            {warning}
          </p>
        )}

        {openCalendar && (
          <div className="absolute left-0 top-full z-10 mt-2">
            <Calendar
              language={language}
              selectedDate={value ? [value] : undefined}
              onChangeSingle={setValueHandle}
              period={period}
            />
          </div>
        )}
      </div>
    </div>
  );
};
