import { styled } from 'styled-components';

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

  .pWarning {
    ${({ theme }) => theme.typography.body2};
    position: absolute;
    color: ${({ theme }) => theme.colors.error_400};
  }
`;
