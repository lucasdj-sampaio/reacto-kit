import { useEffect, useRef, useState } from 'react';
import { IRangePickerProps } from '../shared/interfaces/datePicker';
import { Calendar } from './calendar';

export const RangeDatePicker: React.FC<IRangePickerProps> = ({
  name,
  label,
  placeholders,
  values,
  warning,
  language,
  period,
  onChange,
  tailwindStyle,
}: IRangePickerProps) => {
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];
  const clickOutsideRef = useRef<any>(null);
  const [openCalendar, setOpenCalendar] = useState(false);

  const style = {
    label: `${tailwindStyle?.input?.label?.fontSize ?? 'text-sm'} 
      ${tailwindStyle?.input?.label?.fontWeight ?? 'font-medium'}
      ${tailwindStyle?.input?.label?.font ?? ''}`,

    fillLabelColor: `${tailwindStyle?.input?.label?.color ?? 'text-blue-600'}`,
    emptyLabelColor: `${
      tailwindStyle?.input?.emptyLabelColor ?? 'text-gray-500'
    }`,

    input: `w-full border focus:outline-none cursor-pointer
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
  };

  const inputClassNames = `${style.input} ${
    warning
      ? 'border-red-500 focus:ring-2 focus:ring-red-400'
      : style.inputBorder
  }`;

  useEffect(() => {
    const checkIfClickedOutside = (e: { target: any }) => {
      if (
        clickOutsideRef.current &&
        !clickOutsideRef.current.contains(e.target)
      ) {
        setOpenCalendar(false);
      }
    };

    document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, []);

  return (
    <div
      ref={clickOutsideRef}
      className={`flex w-full min-w-[214px] flex-col gap-1`}
    >
      {label && (
        <label
          htmlFor={`${name}_id`}
          className={`${style.label} ${
            values ? style.fillLabelColor : style.emptyLabelColor
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <div className="grid grid-cols-2 gap-1">
          <input
            ref={el => {
              inputRefs[0].current = el;
            }}
            className={`${inputClassNames} rounded-l-md`}
            placeholder={placeholders[0]}
            value={values && values[0] ? values[0] : ''}
            readOnly
            onClick={() => {
              setCurrentInputIndex(0);
              setOpenCalendar(true);
              inputRefs[0].current?.focus();
            }}
          />

          <input
            ref={el => {
              inputRefs[1].current = el;
            }}
            className={`${inputClassNames} rounded-r-md`}
            placeholder={placeholders[1]}
            value={values && values[1] ? values[1] : ''}
            readOnly
            onClick={() => {
              setCurrentInputIndex(1);
              setOpenCalendar(true);
              inputRefs[1].current?.focus();
            }}
          />
        </div>

        {warning && !openCalendar && (
          <p className="absolute left-0 top-full mt-1 text-xs text-red-500">
            {warning}
          </p>
        )}

        {openCalendar && (
          <div className="absolute left-0 top-full z-10 mt-2">
            <Calendar
              language={language}
              selectedDate={values}
              pickerIndex={currentInputIndex}
              onChangeRange={next => {
                onChange(next);

                if (!next[1]) {
                  setCurrentInputIndex(1);
                  setTimeout(() => inputRefs[1].current?.focus(), 0);
                } else setOpenCalendar(false);
              }}
              period={period}
              tailwindStyle={tailwindStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
};
