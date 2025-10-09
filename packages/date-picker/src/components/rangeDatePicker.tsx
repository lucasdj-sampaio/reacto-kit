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
  setStateValues,
}: IRangePickerProps) => {
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const clickOutsideRef = useRef<any>(null);
  const [openCalendar, setOpenCalendar] = useState(false);

  const inputClassNames = `w-full border ${
    warning
      ? 'border-red-500 focus:ring-2 focus:ring-red-400'
      : 'border-gray-300 focus:ring-2 focus:ring-blue-400'
  } focus:outline-none  cursor-pointer bg-white`;

  const setFirstValueHandle = (newValue: string) => {
    setStateValues[0](newValue);
    if (!values[1]) setCurrentInputIndex(1);
    else setOpenCalendar(false);
  };

  const setLastValueHandle = (newValue: string) => {
    setStateValues[1](newValue);
    if (!values[0]) setCurrentInputIndex(0);
    else setOpenCalendar(false);
  };

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
          className={`text-sm font-medium ${
            values ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <div className="grid grid-cols-2 gap-1">
          <input
            placeholder={placeholders[0]}
            value={values && values[0]}
            readOnly
            onClick={() => {
              setCurrentInputIndex(0);
              setOpenCalendar(!openCalendar);
            }}
            className={`${inputClassNames} rounded-l-md px-3 py-2`}
          />

          <input
            placeholder={placeholders[1]}
            value={values && values[1]}
            readOnly
            onClick={() => {
              setCurrentInputIndex(1);
              setOpenCalendar(!openCalendar);
            }}
            className={`${inputClassNames} rounded-r-md px-3 py-2`}
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
              setStateValue={[setFirstValueHandle, setLastValueHandle]}
              period={period}
            />
          </div>
        )}
      </div>
    </div>
  );
};
