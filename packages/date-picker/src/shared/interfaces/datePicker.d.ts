import { Dispatch, SetStateAction } from 'react';
import { SupportedLanguage } from '../types/supportedLanguage';
import { SupportedPeriod } from '../types/supportedPeriod';

interface IBasePickerProps {
  name: string;
  label?: string;
  warning?: string;
  period?: SupportedPeriod;
  language?: SupportedLanguage;
  tailwindStyle?: {
    calendar?: string;
    textColors?: {
      month?: string;
      weekDays?: string;
      opaqueDates?: string;
    };
  };
}

interface IDatePickerProps extends IBasePickerProps {
  placeholder?: string;
  value?: string;
  setStateValue: Dispatch<SetStateAction<string>>;
}

interface IRangePickerProps extends IBasePickerProps {
  placeholders: [string, string];
  values: [string, string];
  setStateValues: [
    Dispatch<SetStateAction<string>>,
    Dispatch<SetStateAction<string>>
  ];
}

export type IPickerProps = IDatePickerProps | IRangePickerProps;
