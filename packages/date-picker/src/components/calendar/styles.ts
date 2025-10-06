import { formatDateToString } from '@/util/converter';
import { css, styled } from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  position: absolute;
  top: 115%;
  left: 0;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.border.sm};
  border: 1px solid ${({ theme }) => theme.colors.neutral_300};
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  z-index: 1;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const StyledMonthDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm} 0;

  span {
    ${({ theme }) => theme.typography.subtitle2};
    color: ${({ theme }) => theme.colors.typography_dark_100};
  }
`;

export const StyledArrow = styled.div<{ $isDisabled: boolean }>`
  svg {
    &:hover {
      cursor: ${({ $isDisabled }) => ($isDisabled ? 'pointer' : 'default')};
    }

    path {
      fill: ${({ $isDisabled, theme }) =>
        $isDisabled
          ? theme.colors.typography_dark_200
          : theme.colors.typography_dark_300};
    }
  }
`;

export const StyledCalendar = styled.div<{
  $fillDate?: string;
  $hoverOption?: string;
}>`
  display: grid;
  grid-template-columns: repeat(7, auto);
  row-gap: 2px;

  ${({ $fillDate, $hoverOption, theme }) => {
    if ($fillDate && $hoverOption) {
      let fillDate = new Date($fillDate);
      let hoverOption = new Date($hoverOption);
      let styles = '';

      const isReversed = fillDate > hoverOption;
      if (isReversed) [hoverOption, fillDate] = [fillDate, hoverOption];

      while (fillDate < hoverOption) {
        hoverOption.setDate(hoverOption.getDate() - 1);

        if (formatDateToString(hoverOption) === formatDateToString(fillDate))
          continue;

        styles += `
          .calendarOption_${formatDateToString(hoverOption)} {
            background: ${theme.colors.calendarHoverSelection};
          }
        `;
      }

      return css`
        ${styles}
      `;
    }
  }}
`;

export const StyledCalendarHeader = styled.span`
  ${({ theme }) => theme.typography.a2}
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  text-align: center;
  color: ${({ theme }) => theme.colors.typography_dark_100};
`;

export const StyledCalendarOptions = styled.p<{
  $ableDate: boolean;
  $todayFocus: boolean;
  $inRange: boolean;
  $active: boolean;
}>`
  ${({ theme }) => theme.typography.body1}
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  text-align: center;
  border-radius: 60px;
  transition: 0.5s ease;
  color: ${({ $ableDate, theme }) =>
    $ableDate
      ? theme.colors.typography_dark_100
      : theme.colors.typography_dark_300};

  ${({ $todayFocus }) => {
    if ($todayFocus) {
      return css`
        background: ${({ theme }) => theme.colors.secondary_200};
        color: ${({ theme }) => theme.colors.typography_light_100};
        font-weight: 600;
      `;
    }
  }}

  ${({ $inRange }) => {
    if ($inRange) {
      return css`
        background: ${({ theme }) => theme.colors.calendarHoverSelection};
      `;
    }
  }}

  ${({ $active }) => {
    if ($active) {
      return css`
        background: ${({ theme }) => theme.colors.calendarActive};
        border: 2px solid ${({ theme }) => theme.colors.opaqueSecondary_100};
        color: ${({ theme }) => theme.colors.secondary_300};
        font-weight: 600;
      `;
    }
  }}

  ${({ $ableDate }) => {
    if ($ableDate) {
      return css`
        &:hover {
          cursor: pointer;
          background: ${({ theme }) => theme.colors.calendarHover};
          color: ${({ theme }) => theme.colors.typography_dark_100};
        }
      `;
    } else {
      return css`
        cursor: default;
        background: transparent !important;
      `;
    }
  }}
`;
