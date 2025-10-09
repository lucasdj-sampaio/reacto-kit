import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  tailwindStyle,
}: IDatePickerProps) => {
  const ref = useRef<any>(null);
  const [openCalendar, setOpenCalendar] = useState(false);

  const setValueHandle = (newValue: string | null) => {
    onChange(newValue);
    setOpenCalendar(false);
  };

  const style = useMemo(
    () => ({
      label: `${tailwindStyle?.input?.label?.fontSize ?? 'text-sm'} 
      ${tailwindStyle?.input?.label?.fontWeight ?? 'font-medium'}
      ${tailwindStyle?.input?.label?.font ?? ''}`,

      fillLabelColor: `${
        tailwindStyle?.input?.label?.color ?? 'text-blue-600'
      }`,
      emptyLabelColor: `${
        tailwindStyle?.input?.emptyLabelColor ?? 'text-gray-500'
      }`,

      input: `w-full border focus:outline-none cursor-pointer rounded-md
      ${tailwindStyle?.input?.text?.color ?? ''} 
      ${tailwindStyle?.input?.text?.fontSize ?? ''} 
      ${tailwindStyle?.input?.text?.fontWeight ?? ''}
      ${tailwindStyle?.input?.text?.font ?? ''}
      ${tailwindStyle?.input?.background ?? 'bg-white'}
      ${tailwindStyle?.input?.padding ?? 'px-3 py-2'}`,

      inputBorder: `focus:ring-2 
      ${tailwindStyle?.input?.border?.color ?? 'border-gray-300'}
      ${
        tailwindStyle?.input?.border?.focusColor
          ? `focus:${tailwindStyle.input.border.focusColor}`
          : 'focus:ring-blue-400'
      }`,
    }),
    [tailwindStyle]
  );

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
          className={clsx(style.label, {
            [style.fillLabelColor]: value,
            [style.emptyLabelColor]: !value,
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
          onClick={() => {
            setOpenCalendar(!openCalendar);
          }}
          className={clsx(style.input, {
            ['border-red-500 focus:ring-2 focus:ring-red-400']: warning,
            [style.inputBorder]: !warning,
          })}
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
              onChangeSingle={setValueHandle}
              period={period}
              tailwindStyle={tailwindStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
};
