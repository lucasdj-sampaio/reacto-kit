export interface ITailwindProps {
  calendar?: {
    background?: string;
    padding?: string;
    rounded?: string;
  };

  header?: {
    month?: ITailwindTextProps;
    arrow?: {
      padding?: string;
      rounded?: string;
      hoverColor?: string;
    };
  };

  weekDays?: ITailwindTextProps;

  days?: {
    text?: ITailwindTextProps;
    rounded?: string;

    colors?: {
      disabled?: string;
      todayBorder?: string;
      selected?: [string, string];
      hover?: [string, string];
    };
  };

  input?: {
    label?: ITailwindTextProps;
    emptyLabelColor?: string;
    text?: ITailwindTextProps;
    background?: string;
    padding?: string;
    border?: {
      color?: string;
      focusColor?: string;
    };
  };
}

interface ITailwindTextProps {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  font?: string;
}
