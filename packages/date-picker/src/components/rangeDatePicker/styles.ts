import { css, styled } from 'styled-components';

export const StyledPicker = styled.div<{
  $hasValue: boolean;
}>`
  display: flex;
  width: 100%;
  min-width: 214px;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  label {
    ${({ theme }) => theme.typography.body1};
    color: ${p =>
      p.$hasValue
        ? ({ theme }) => theme.colors.secondary_500
        : ({ theme }) => theme.colors.typography_dark_200};
  }
`;

export const StyledCalendarPosition = styled.div`
  position: relative;

  .calendar {
    width: 100%;
  }

  .pWarning {
    ${({ theme }) => theme.typography.body2};
    color: ${({ theme }) => theme.colors.error_400};
  }
`;

export const StyledGroupInputs = styled.div<{ $calendarIsOpen: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 50%);

  .datePicker {
    padding: ${({ theme }) => theme.spacing.lg};
  }

  .datePicker:first-child {
    ${({ $calendarIsOpen }) => {
      if (!$calendarIsOpen)
        return css`
          border-right: none !important;
        `;
    }}

    border-radius: ${({ theme }) =>
      `${theme.border.sm} 0 0 ${theme.border.sm}`};
  }

  .datePicker:last-child {
    border-radius: ${({ theme }) =>
      `0 ${theme.border.sm} ${theme.border.sm} 0`};
  }
`;
