import { Dispatch, SetStateAction } from 'react';
import { SupportedLanguages } from '../types/supportedLanguages';

interface IBasePickerProps {
  name: string;
  label?: string;
  warning?: string;
  ableNextDates?: boolean;
  language?: SupportedLanguages;
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
