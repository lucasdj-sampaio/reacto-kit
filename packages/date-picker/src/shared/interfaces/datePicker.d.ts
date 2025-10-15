import { SupportedLanguage } from '../types/supportedLanguage';
import { SupportedPeriod } from '../types/supportedPeriod';

export interface IBasePickerProps {
  name: string;
  label?: string;
  warning?: string;
  period?: SupportedPeriod;
  language?: SupportedLanguage;
}

export interface IDatePickerProps extends IBasePickerProps {
  placeholder?: string;
  value?: string | null;
  onChange: (newValue: string | null) => void;
}

export interface IRangePickerProps extends IBasePickerProps {
  placeholders: [string, string];
  values: [string | null, string | null];
  onChange: (newValues: [string | null, string | null]) => void;
}

export type IPickerProps = IDatePickerProps | IRangePickerProps;
